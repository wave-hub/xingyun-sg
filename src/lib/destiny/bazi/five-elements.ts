/**
 * 八字命理 - 五行系統
 * 
 * 五行對應、強弱計算、喜忌神判斷
 */

import { HeavenlyStem, EarthlyBranch, WuXing, WuXingCount, XiJiShen, BaziPillar } from '../types';
import { HIDDEN_STEMS } from './four-pillars';

// ========================================
// 五行對應表
// ========================================

/** 天干五行對應 */
export const STEM_ELEMENT: Record<HeavenlyStem, WuXing> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

/** 地支五行對應（主氣） */
export const BRANCH_ELEMENT: Record<EarthlyBranch, WuXing> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};

/** 地支藏干五行（含所有藏干） */
export const BRANCH_HIDDEN_ELEMENTS: Record<EarthlyBranch, WuXing[]> = {
  '子': ['水'],
  '丑': ['土', '水', '金'],
  '寅': ['木', '火', '土'],
  '卯': ['木'],
  '辰': ['土', '木', '水'],
  '巳': ['火', '土', '金'],
  '午': ['火', '土'],
  '未': ['土', '火', '木'],
  '申': ['金', '水', '土'],
  '酉': ['金'],
  '戌': ['土', '金', '火'],
  '亥': ['水', '木'],
};

/** 天干陰陽 */
export const STEM_YIN_YANG: Record<HeavenlyStem, '陽' | '陰'> = {
  '甲': '陽', '乙': '陰', '丙': '陽', '丁': '陰',
  '戊': '陽', '己': '陰', '庚': '陽', '辛': '陰',
  '壬': '陽', '癸': '陰',
};

/** 地支陰陽 */
export const BRANCH_YIN_YANG: Record<EarthlyBranch, '陽' | '陰'> = {
  '子': '陽', '丑': '陰', '寅': '陽', '卯': '陰',
  '辰': '陽', '巳': '陰', '午': '陽', '未': '陰',
  '申': '陽', '酉': '陰', '戌': '陽', '亥': '陰',
};

// ========================================
// 五行相生相剋
// ========================================

/** 五行相生 */
export const ELEMENT_GENERATES: Record<WuXing, WuXing> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
};

/** 五行相剋 */
export const ELEMENT_OVERCOMES: Record<WuXing, WuXing> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
};

/** 五行被生 */
export const ELEMENT_GENERATED_BY: Record<WuXing, WuXing> = {
  '木': '水', '火': '木', '土': '火', '金': '土', '水': '金',
};

/** 五行被剋 */
export const ELEMENT_OVERCOMES_BY: Record<WuXing, WuXing> = {
  '木': '金', '土': '木', '水': '土', '火': '水', '金': '火',
};

// ========================================
// 五行統計
// ========================================

/**
 * 統計八字中的五行數量
 * 
 * 計算方式：
 * - 天干各計1分
 * - 地支主氣計1分，餘氣計0.5分，雜氣計0.3分
 */
export function countWuXing(
  dayMaster: HeavenlyStem,
  pillars: { year: BaziPillar; month: BaziPillar; day: BaziPillar; hour: BaziPillar }
): WuXingCount {
  const counts: Record<WuXing, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

  // 統計天干（不含日主自身）
  const stems = [pillars.year.stem, pillars.month.stem, pillars.hour.stem];
  stems.forEach(stem => {
    counts[STEM_ELEMENT[stem]] += 1;
  });

  // 統計地支（含藏干，按權重）
  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];
  branches.forEach(branch => {
    const hidden = HIDDEN_STEMS[branch] || [];
    hidden.forEach((stem, idx) => {
      if (idx === 0) counts[STEM_ELEMENT[stem]] += 1;      // 主氣 1分
      else if (idx === 1) counts[STEM_ELEMENT[stem]] += 0.5; // 餘氣 0.5分
      else counts[STEM_ELEMENT[stem]] += 0.3;                // 雜氣 0.3分
    });
  });

  // 日主自身也算
  counts[STEM_ELEMENT[dayMaster]] += 1.5;

  // 找出最強和最弱五行
  const sorted = (Object.entries(counts) as [WuXing, number][]).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];

  // 日主強弱判斷
  const dayMasterElement = STEM_ELEMENT[dayMaster];
  const dayMasterScore = counts[dayMasterElement];
  const avgScore = Object.values(counts).reduce((a, b) => a + b, 0) / 5;

  let strength: WuXingCount['dayMasterStrength'];
  if (dayMasterScore > avgScore * 1.5) strength = '強';
  else if (dayMasterScore > avgScore * 1.1) strength = '偏強';
  else if (dayMasterScore > avgScore * 0.9) strength = '中和';
  else if (dayMasterScore > avgScore * 0.5) strength = '偏弱';
  else strength = '弱';

  return {
    wood: counts['木'],
    fire: counts['火'],
    water: counts['水'],
    metal: counts['金'],
    earth: counts['土'],
    strongest,
    weakest,
    dayMasterStrength: strength,
  };
}

// ========================================
// 喜忌神判斷
// ========================================

/**
 * 判斷喜忌神
 * 
 * 原則：
 * - 身強喜剋泄耗（食傷、財、官殺）
 * - 身弱喜生扶（印星、比劫）
 */
export function determineXiJiShen(
  dayMaster: HeavenlyStem,
  wuXingCount: WuXingCount
): XiJiShen {
  const dayMasterElement = STEM_ELEMENT[dayMaster];
  const { dayMasterStrength } = wuXingCount;

  // 確定需要和不需要的五行
  const needed: WuXing[] = [];
  const avoided: WuXing[] = [];

  if (dayMasterStrength === '強' || dayMasterStrength === '偏強') {
    // 身強：喜食傷(泄)、財(耗)、官殺(剋)
    needed.push(ELEMENT_GENERATES[dayMasterElement]);    // 食傷(我生)
    needed.push(ELEMENT_OVERCOMES[dayMasterElement]);    // 財(我剋)
    needed.push(ELEMENT_OVERCOMES_BY[dayMasterElement]);  // 官殺(剋我)
    
    avoided.push(dayMasterElement);                       // 比劫(同我)
    avoided.push(ELEMENT_GENERATED_BY[dayMasterElement]);  // 印星(生我)
  } else {
    // 身弱：喜印星(生)、比劫(扶)
    needed.push(ELEMENT_GENERATED_BY[dayMasterElement]);  // 印星(生我)
    needed.push(dayMasterElement);                        // 比劫(同我)
    needed.push(ELEMENT_GENERATES[dayMasterElement]);     // 食傷(泄秀，緩和)
    
    avoided.push(ELEMENT_OVERCOMES[dayMasterElement]);    // 財(耗我)
    avoided.push(ELEMENT_OVERCOMES_BY[dayMasterElement]);  // 官殺(剋我)
  }

  // 用神 = 最需要的五行（喜神中最重要的）
  const yongShen = [needed[0]];

  // 閒神 = 不太重要的五行
  const allElements: WuXing[] = ['木', '火', '土', '金', '水'];
  const xianShen = allElements.filter(e => !needed.includes(e) && !avoided.includes(e));

  return {
    xiShen: needed,
    jiShen: avoided,
    yongShen,
    xianShen,
  };
}
