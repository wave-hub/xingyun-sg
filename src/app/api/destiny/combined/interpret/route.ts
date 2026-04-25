/**
 * POST: 三術合參解讀
 * 
 * 路由: /api/destiny/combined/interpret
 * 同時計算三個術數命盤 + AI 合參解讀
 */

import { NextRequest, NextResponse } from 'next/server';
import { BirthInfo, DestinyResponse, CombinedReading, ReadingReport } from '@/lib/destiny/types';
import { buildCombinedReading } from '@/lib/destiny/combined';
import { interpretDestiny } from '@/lib/ai/interpreter';

function validateBirthInfo(body: unknown): { valid: boolean; birthInfo?: BirthInfo; question?: string; error?: string } {
  const info = body as Record<string, unknown>;

  if (!info.birthInfo) {
    return { valid: false, error: '缺少 birthInfo 字段' };
  }

  const birthInfo = info.birthInfo as BirthInfo;

  if (!birthInfo.birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthInfo.birthDate)) {
    return { valid: false, error: 'birthDate 格式錯誤' };
  }

  if (!birthInfo.birthTime || !/^\d{2}:\d{2}$/.test(birthInfo.birthTime)) {
    return { valid: false, error: 'birthTime 格式錯誤' };
  }

  if (!['male', 'female'].includes(birthInfo.gender)) {
    return { valid: false, error: 'gender 需為 male 或 female' };
  }

  return {
    valid: true,
    birthInfo,
    question: typeof info.question === 'string' ? info.question : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { valid, birthInfo, question, error } = validateBirthInfo(body);

    if (!valid || !birthInfo) {
      return NextResponse.json<DestinyResponse<null>>({
        success: false,
        error: error || '輸入驗證失敗',
      }, { status: 400 });
    }

    // 計算三術合參
    const combined: CombinedReading = buildCombinedReading(birthInfo);

    // AI 合參解讀
    const report: ReadingReport = await interpretDestiny(
      'combined',
      combined,
      birthInfo,
      question
    );

    return NextResponse.json<DestinyResponse<ReadingReport>>({
      success: true,
      data: report,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '三術合參解讀失敗';
    return NextResponse.json<DestinyResponse<null>>({
      success: false,
      error: message,
    }, { status: 500 });
  }
}
