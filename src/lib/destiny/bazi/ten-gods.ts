/**
 * 八字命理 - 十神系統
 * 
 * 十神完整映射與推算
 * 正印/偏印/比肩/劫財/食神/傷官/正財/偏財/正官/七殺
 */

import { HeavenlyStem, EarthlyBranch, TenGodName } from '../types';
import { STEM_ELEMENT, STEM_YIN_YANG } from './five-elements';

// ========================================
// 十神對應關係
// ========================================

/**
 * 十神查找表
 * 外層鍵：日主五行
 * 內層鍵：他干五行 + 同異性的組合
 */
type TenGodKey = `${string}_${'同' | '異'}`;

/**
 * 十神推算公式：
 * 
 * 同我者（生日主五行相同）：
 *   - 陰陽相同 → 比肩
 *   - 陰陽不同 → 劫財
 * 
 * 我生者（生日主五行所生）：
 *   - 陰陽相同 → 食神
 *   - 陰陽不同 → 傷官
 * 
 * 我剋者（日主五行所剋）：
 *   - 陰陽相同 → 偏財
 *   - 陰陽不同 → 正財
 * 
 * 剋我者（剋日主五行）：
 *   - 陰陽相同 → 七殺
 *   - 陰陽不同 → 正官
 * 
 * 生我者（生日主的五行）：
 *   - 陰陽相同 → 偏印
 *   - 陰陽不同 → 正印
 */

/** 五行相生相剋 */
const GENERATES: Record<string, string> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
};

const OVERCOMES: Record<string, string> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
};

/**
 * 計算某天干相對於日主的十神
 */
export function getTenGod(dayMaster: HeavenlyStem, otherStem: HeavenlyStem): TenGodName {
  if (dayMaster === otherStem) {
    return '比肩';
  }

  const dmElement = STEM_ELEMENT[dayMaster];
  const otherElement = STEM_ELEMENT[otherStem];
  const dmYinYang = STEM_YIN_YANG[dayMaster];
  const otherYinYang = STEM_YIN_YANG[otherStem];
  const isSameYinYang = dmYinYang === otherYinYang;

  if (dmElement === otherElement) {
    // 同我（比劫）
    return isSameYinYang ? '比肩' : '劫財';
  }

  if (GENERATES[dmElement] === otherElement) {
    // 我生（食傷）
    return isSameYinYang ? '食神' : '傷官';
  }

  if (OVERCOMES[dmElement] === otherElement) {
    // 我剋（財星）
    return isSameYinYang ? '偏財' : '正財';
  }

  if (OVERCOMES[otherElement] === dmElement) {
    // 剋我（官殺）
    return isSameYinYang ? '七殺' : '正官';
  }

  if (GENERATES[otherElement] === dmElement) {
    // 生我（印星）
    return isSameYinYang ? '偏印' : '正印';
  }

  return '比肩'; // fallback
}

/**
 * 為四柱填充十神信息
 */
export function fillPillarTenGods(
  dayMaster: HeavenlyStem,
  yearStem: HeavenlyStem,
  monthStem: HeavenlyStem,
  hourStem: HeavenlyStem,
  yearBranch: EarthlyBranch,
  monthBranch: EarthlyBranch,
  dayBranch: EarthlyBranch,
  hourBranch: EarthlyBranch
): void {
  // 十神主要看天干
  // 藏干的十神也需要計算
}

// ========================================
// 十神含義數據
// ========================================

export const TEN_GOD_MEANINGS: Record<TenGodName, {
  nature: string;
  keywords: string[];
  description: string;
  favorableWhen: string;
}> = {
  '比肩': {
    nature: '中性',
    keywords: ['獨立', '自信', '競爭', '合作', '自主'],
    description: '與日主同性質，代表自我意識、獨立能力、同輩關係。過旺則固執、不聽勸。',
    favorableWhen: '身弱時為喜，幫扶日主',
  },
  '劫財': {
    nature: '中性偏凶',
    keywords: ['爭奪', '衝動', '好勝', '花錢', '口舌'],
    description: '與日主同性質但陰陽不同，代表競爭對手、財物損耗。也代表行動力和魄力。',
    favorableWhen: '身極弱時為喜，但容易引發破財',
  },
  '食神': {
    nature: '吉',
    keywords: ['才華', '享受', '溫和', '子女', '藝術'],
    description: '我生之同性，代表才華展現、生活享受、子女緣分。是最溫和的吉星。',
    favorableWhen: '身強時最能發揮，為喜神',
  },
  '傷官': {
    nature: '中性偏凶',
    keywords: ['叛逆', '創意', '口才', '浪漫', '好勝'],
    description: '我生之異性，代表才華但帶叛逆，口才好但易得罪人。傷官配印為貴格。',
    favorableWhen: '身強時為喜，配合印星可化解',
  },
  '正財': {
    nature: '吉',
    keywords: ['勤勞', '穩定', '務實', '妻子', '收入'],
    description: '我剋之異性，代表正當收入、勤奮工作、穩定財富、妻子。最穩定的財星。',
    favorableWhen: '身強時為喜，代表財運穩定',
  },
  '偏財': {
    nature: '吉',
    keywords: ['意外之財', '人緣', '投機', '父親', '慷慨'],
    description: '我剋之同性，代表意外財富、投資收益、社交能力。偏財格的人善於理財。',
    favorableWhen: '身強時為喜，利於投資經商',
  },
  '正官': {
    nature: '吉',
    keywords: ['規矩', '事業', '地位', '丈夫', '責任'],
    description: '剋我之異性，代表正當事業、社會地位、法律規範、丈夫。是最正統的貴星。',
    favorableWhen: '身強時為喜，代表事業有成',
  },
  '七殺': {
    nature: '凶中帶吉',
    keywords: ['權力', '魄力', '壓力', '冒險', '武職'],
    description: '剋我之同性，代表權力鬥爭、壓力挑戰、武職軍職。有制化則為大貴。',
    favorableWhen: '有食神制或印星化時為貴格',
  },
  '正印': {
    nature: '吉',
    keywords: ['學識', '母親', '貴人', '保護', '仁慈'],
    description: '生我之異性，代表學問、母親、長輩貴人、保護力。是最溫和的生扶之星。',
    favorableWhen: '身弱時最為需要，為第一喜神',
  },
  '偏印': {
    nature: '中性偏凶',
    keywords: ['孤僻', '宗教', '靈感', '繼母', '多學少精'],
    description: '生我之同性，代表非正統學問、宗教靈感、偏門技藝。偏印格有孤獨傾向。',
    favorableWhen: '身弱時為喜，但有梟印奪食之忌',
  },
};
