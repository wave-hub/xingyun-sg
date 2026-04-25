/**
 * 星運堂 XingYun Tang - AI 調用封裝
 * 
 * 根據術數類型選擇 prompt，調用 OpenAI API
 * 支援流式輸出與錯誤處理
 */

import { ReadingReport, BirthInfo, ZiWeiChart, BaziChart, LiuRenChart, CombinedReading } from '../destiny/types';
import {
  ZIWEI_SYSTEM_PROMPT,
  BAZI_SYSTEM_PROMPT,
  LIUREN_SYSTEM_PROMPT,
  COMBINED_SYSTEM_PROMPT,
  buildUserMessage,
} from './prompts';

// ========================================
// 配置
// ========================================

const OPENAI_API_URL = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenAIStreamChunk {
  id: string;
  choices: Array<{
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

// ========================================
// System Prompt 選擇
// ========================================

const SYSTEM_PROMPTS: Record<string, string> = {
  ziwei: ZIWEI_SYSTEM_PROMPT,
  bazi: BAZI_SYSTEM_PROMPT,
  liuren: LIUREN_SYSTEM_PROMPT,
  combined: COMBINED_SYSTEM_PROMPT,
};

// ========================================
// 非流式調用
// ========================================

/**
 * 調用 AI 進行命理解讀（非流式）
 * 
 * @param method 術數類型
 * @param chartData 命盤數據
 * @param birthInfo 出生信息
 * @param userQuestion 用戶問題（可選）
 * @param maxRetries 最大重試次數
 * @returns 完整的解讀報告
 */
export async function interpretDestiny(
  method: 'ziwei' | 'bazi' | 'liuren' | 'combined',
  chartData: ZiWeiChart | BaziChart | LiuRenChart | CombinedReading,
  birthInfo: BirthInfo,
  userQuestion?: string,
  maxRetries = 2
): Promise<ReadingReport> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY 環境變量未設置');
  }

  const systemPrompt = SYSTEM_PROMPTS[method] || ZIWEI_SYSTEM_PROMPT;
  const chartDataJson = JSON.stringify(chartData, null, 2);
  const userMessage = buildUserMessage(method, chartDataJson, userQuestion);

  const messages: OpenAIMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ];

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI API 錯誤 (${response.status}): ${errorBody}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content || '無法生成解讀';

      return buildReadingReport(method, chartData, content);
    } catch (error) {
      lastError = error as Error;
      // 指數退避重試
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('AI 解讀失敗');
}

// ========================================
// 流式調用
// ========================================

/**
 * 調用 AI 進行命理解讀（流式）
 * 
 * @returns AsyncGenerator，每次 yield 一個文本片段
 */
export async function* interpretDestinyStream(
  method: 'ziwei' | 'bazi' | 'liuren' | 'combined',
  chartData: object,
  birthInfo: BirthInfo,
  userQuestion?: string
): AsyncGenerator<string, void, unknown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY 環境變量未設置');
  }

  const systemPrompt = SYSTEM_PROMPTS[method] || ZIWEI_SYSTEM_PROMPT;
  const chartDataJson = JSON.stringify(chartData, null, 2);
  const userMessage = buildUserMessage(method, chartDataJson, userQuestion);

  const messages: OpenAIMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API 錯誤 (${response.status}): ${errorBody}`);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (!trimmed.startsWith('data: ')) continue;

      try {
        const chunk: OpenAIStreamChunk = JSON.parse(trimmed.slice(6));
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      } catch {
        // 解析錯誤，跳過
      }
    }
  }
}

// ========================================
// 報告構建
// ========================================

/**
 * 構建標準化解讀報告
 */
function buildReadingReport(
  method: 'ziwei' | 'bazi' | 'liuren' | 'combined',
  chartData: ZiWeiChart | BaziChart | LiuRenChart | CombinedReading,
  aiContent: string
): ReadingReport {
  // 從 AI 輸出中提取結構化內容
  const sections = parseSections(aiContent);
  const summary = extractSummary(aiContent);
  const remedies = extractRemedies(aiContent);

  const titles: Record<string, string> = {
    ziwei: '紫微斗數命盤解讀',
    bazi: '八字命理解讀',
    liuren: '大六壬課盤斷課',
    combined: '三術合一命理分析',
  };

  return {
    method,
    chartData,
    interpretation: {
      title: titles[method],
      sections,
      summary,
      remedies,
    },
    generatedAt: new Date().toISOString(),
  };
}

/**
 * 解析 AI 輸出中的章節
 */
function parseSections(content: string): Array<{ heading: string; content: string }> {
  const sections: Array<{ heading: string; content: string }> = [];
  const lines = content.split('\n');
  let currentHeading = '總論';
  let currentContent: string[] = [];

  for (const line of lines) {
    // 匹配標題行（數字開頭 + 中文字符 或 【】）
    const headingMatch = line.match(/^(?:\d+[\.\、\）]|[一二三四五六七八九十]+[、\.\）])\s*(.+)/);
    const bracketMatch = line.match(/^【(.+)】$/);

    if (headingMatch || bracketMatch) {
      if (currentContent.length > 0) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n').trim(),
        });
      }
      currentHeading = headingMatch ? headingMatch[1].trim() : (bracketMatch?.[1]?.trim() || '未命名');
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return sections;
}

/**
 * 提取摘要
 */
function extractSummary(content: string): string {
  // 嘗試找到總結段落
  const summaryPatterns = [
    /總[結論而言].+?[。！]/s,
    /綜合[來看以上].+?[。！]/s,
    /總體而言.+?[。！]/s,
  ];

  for (const pattern of summaryPatterns) {
    const match = content.match(pattern);
    if (match) return match[0].trim();
  }

  // 取最後一段作為摘要
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  return paragraphs[paragraphs.length - 1]?.trim() || content.slice(0, 200);
}

/**
 * 提取開運建議
 */
function extractRemedies(content: string): string[] {
  const remedies: string[] = [];

  // 匹配建議列表
  const patterns = [
    /開運建議[：:]\s*\n([\s\S]+?)(?=\n\n|\n【|\n\d|$)/,
    /建議[：:]\s*\n([\s\S]+?)(?=\n\n|\n【|\n\d|$)/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const items = match[1]
        .split(/[\n\d][\.、\）]/)
        .map(s => s.replace(/^[•\-\*]\s*/, '').trim())
        .filter(s => s.length > 5);
      remedies.push(...items);
    }
  }

  return [...new Set(remedies)].slice(0, 5);
}
