/**
 * 大六壬 - 天地盤
 * 
 * 地盤固定排列，天盤由月將加臨
 */

import { EarthlyBranch, GanZhi, HeavenlyStem } from '../types';

const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 地盤
// ========================================

/**
 * 地盤固定排列
 * 
 * 六壬地盤從午開始順時針排列：
 * 午 未 申 酉
 * 巳       戌
 * 辰       亥
 * 卯 寅 丑 子
 * 
 * 以數組表示（索引0=子，1=丑...）
 */
export function getEarthPlate(): EarthlyBranch[] {
  return [...EARTHLY_BRANCHES]; // 固定：子丑寅卯辰巳午未申酉戌亥
}

// ========================================
// 天盤
// ========================================

/**
 * 計算天盤
 * 
 * 天盤的排法：
 * 以月將加臨於時辰地支之上，其餘地支按固定順序排列
 * 
 * 例如：月將為亥，時辰為子
 * 則天盤：亥加子，子上為子，子上為亥...
 * 
 * 算法：
 * 1. 確定月將在地盤的位置（月將地支的索引）
 * 2. 將月將對齊時辰地支
 * 3. 其餘地支順時針排列
 */
export function getHeavenPlate(yueJiang: EarthlyBranch, hourBranch: EarthlyBranch): EarthlyBranch[] {
  const yueJiangIndex = EARTHLY_BRANCHES.indexOf(yueJiang);
  const hourBranchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);

  // 天盤排列：月將加於時辰之上
  // offset = 時辰位置 - 月將位置
  const offset = (hourBranchIndex - yueJiangIndex + 12) % 12;

  const heavenPlate: EarthlyBranch[] = new Array(12);
  for (let i = 0; i < 12; i++) {
    const branchIndex = (i + offset) % 12;
    heavenPlate[i] = EARTHLY_BRANCHES[branchIndex];
  }

  return heavenPlate;
}

/**
 * 查找天盤上某個地支落在哪個位置
 */
export function findHeavenPlatePosition(heavenPlate: EarthlyBranch[], branch: EarthlyBranch): number {
  return heavenPlate.indexOf(branch);
}

/**
 * 獲取天盤上某位置的地支
 */
export function getHeavenBranchAt(heavenPlate: EarthlyBranch[], position: number): EarthlyBranch {
  return heavenPlate[position % 12];
}

/**
 * 獲取某地支的天盤上神
 * 
 * 「上神」= 天盤中落在此地支位置的支
 */
export function getUpperGod(heavenPlate: EarthlyBranch[], position: number): EarthlyBranch {
  return heavenPlate[position % 12];
}

/**
 * 五行生剋關係
 */
export function wuXingRelation(branch1: EarthlyBranch, branch2: EarthlyBranch): '生' | '剋' | '同' | null {
  const elements: Record<string, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水',
  };
  const generates: Record<string, string> = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
  };
  const overcomes: Record<string, string> = {
    '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
  };

  const e1 = elements[branch1];
  const e2 = elements[branch2];

  if (e1 === e2) return '同';
  if (generates[e1] === e2) return '生';
  if (overcomes[e1] === e2) return '剋';
  return null;
}

/**
 * 判斷天盤上某支是否剋（賊）地盤上某支
 */
export function isHeavenOvercomesEarth(heavenBranch: EarthlyBranch, earthBranch: EarthlyBranch): boolean {
  const elements: Record<string, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水',
  };
  const overcomes: Record<string, string> = {
    '木': '土', '火': '金', '土': '水', '金': '木', '水': '火',
  };
  return overcomes[elements[heavenBranch]] === elements[earthBranch];
}

/**
 * 判斷是否比和（天盤地盤同類五行）
 */
export function isBiHe(heavenBranch: EarthlyBranch, earthBranch: EarthlyBranch): boolean {
  const elements: Record<string, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水',
  };
  return elements[heavenBranch] === elements[earthBranch];
}
