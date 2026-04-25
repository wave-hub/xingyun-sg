/**
 * 紫微斗數 - 十二宮系統
 * 
 * 宮位定位、宮干計算、紫微星定位算法
 */

import { EarthlyBranch, HeavenlyStem, PalaceName, StarInPalace } from '../types';

// ========================================
// 十二宮名稱與對應
// ========================================

/** 十二宮名稱順序 */
export const PALACE_NAMES: PalaceName[] = [
  '命宮', '兄弟宮', '夫妻宮', '子女宮',
  '財帛宮', '疾厄宮', '遷移宮', '交友宮',
  '官祿宮', '田宅宮', '福德宮', '父母宮',
];

/** 十二地支 */
export const BRANCHES: EarthlyBranch[] = [
  '子', '丑', '寅', '卯', '辰', '巳',
  '午', '未', '申', '酉', '戌', '亥',
];

/** 十天干 */
export const STEMS: HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸',
];

// ========================================
// 命宮定位
// ========================================

/**
 * 根據農曆月份和時辰確定命宮位置
 * 
 * 算法：
 * 1. 從寅宮開始，正月起寅
 * 2. 月份順數到出生月
 * 3. 時辰逆數到出生時辰
 * 
 * 命宮位置 = (月份位置 + 時辰位置) mod 12
 * 其中：月從寅開始(index 2)，時從子開始(index 0)
 */
export function getMingPalaceIndex(lunarMonth: number, hourBranchIndex: number): number {
  // 正月對應寅宮 (index 2)
  // 月位 = (lunarMonth - 1 + 2) % 12 = (lunarMonth + 1) % 12
  const monthPos = (lunarMonth + 1) % 12;
  
  // 命宮 = 月位 - 時辰位置 (逆數)
  // 簡化公式：(月位 - 時辰 + 12) % 12
  const mingPalace = (monthPos - hourBranchIndex + 12) % 12;
  
  return mingPalace;
}

/**
 * 根據命宮位置確定身宮位置
 * 
 * 身宮與命宮同起點，但順數時辰而非逆數
 */
export function getBodyPalaceIndex(lunarMonth: number, hourBranchIndex: number): number {
  const monthPos = (lunarMonth + 1) % 12;
  const bodyPalace = (monthPos + hourBranchIndex) % 12;
  return bodyPalace;
}

// ========================================
// 宮干計算
// ========================================

/**
 * 五虎遁月法：年干定寅月天干
 * 甲己年起丙寅，乙庚年起戊寅，丙辛年起庚寅，丁壬年起壬寅，戊癸年起甲寅
 */
const YEAR_STEM_MONTH_BASE: Record<HeavenlyStem, number> = {
  '甲': 2, '己': 2, // 丙
  '乙': 4, '庚': 4, // 戊
  '丙': 6, '辛': 6, // 庚
  '丁': 8, '壬': 8, // 壬
  '戊': 0, '癸': 0, // 甲
};

/**
 * 計算宮位天干
 * 
 * 從命宮起甲，逆時針排列
 * 命宮天干根據五虎遁法從年干推算
 */
export function getPalaceStem(
  palaceIndex: number,
  mingPalaceIndex: number,
  yearStem: HeavenlyStem
): HeavenlyStem {
  // 命宮天干通過年干推算
  // 從命宮開始，各宮按固定順序排干
  const mingStemIndex = (YEAR_STEM_MONTH_BASE[yearStem] + mingPalaceIndex * 2) % 10;
  const relativeIndex = (palaceIndex - mingPalaceIndex + 12) % 12;
  const stemIndex = (mingStemIndex + relativeIndex) % 10;
  return STEMS[stemIndex];
}

/**
 * 計算所有十二宮的天干
 */
export function getAllPalaceStems(
  mingPalaceIndex: number,
  yearStem: HeavenlyStem
): HeavenlyStem[] {
  return Array.from({ length: 12 }, (_, i) =>
    getPalaceStem(i, mingPalaceIndex, yearStem)
  );
}

// ========================================
// 紫微星定位
// ========================================

/**
 * 紫微星安星表
 * 
 * 根據五行局數和出生日來確定紫微星所在宮位
 * 
 * 五行局數 = 命宮干支納音五行
 * 水二局、木三局、金四局、土五局、火六局
 * 
 * 表格結構：五行局數 -> (出生日 % 局數) -> 宮位偏移
 */
const ZIWEI_POSITION_TABLE: Record<number, number[]> = {
  2:  [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0, 5, 10, 3, 8, 1], // 水二局
  3:  [0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8, 0, 4, 8],     // 木三局
  4:  [0, 3, 6, 9, 0, 3, 6, 9, 0, 3, 6, 9, 0, 3, 6, 9, 0, 3, 6, 9, 0, 3, 6, 9, 0, 3, 6, 9, 0, 3],     // 金四局
  5:  [0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10], // 土五局
  6:  [0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10], // 火六局
};

/**
 * 計算五行局數（根據命宮納音）
 * 
 * 納音五行局數對照表（以命宮天干地支的納音）
 */
export function getWuXingJu(palaceStem: HeavenlyStem, palaceBranch: EarthlyBranch): string {
  const stemIndex = STEMS.indexOf(palaceStem);
  const branchIndex = BRANCHES.indexOf(palaceBranch);
  const ganZhiIndex = (stemIndex * 6 + branchIndex) % 30;
  
  // 納音五行局數對應（60甲子納音）
  const naYinJu: Record<number, string> = {
    0: '水二局', 1: '水二局', 2: '木三局', 3: '木三局', 4: '金四局',
    5: '金四局', 6: '土五局', 7: '土五局', 8: '火六局', 9: '火六局',
    10: '木三局', 11: '木三局', 12: '金四局', 13: '金四局', 14: '土五局',
    15: '土五局', 16: '火六局', 17: '火六局', 18: '水二局', 19: '水二局',
    20: '金四局', 21: '金四局', 22: '土五局', 23: '土五局', 24: '火六局',
    25: '火六局', 26: '水二局', 27: '水二局', 28: '木三局', 29: '木三局',
  };
  
  return naYinJu[ganZhiIndex % 30] || '土五局';
}

/**
 * 獲取五行局數字
 */
export function getWuXingJuNumber(wuXingJu: string): number {
  const match = wuXingJu.match(/(\d)/);
  return match ? parseInt(match[1], 10) : 5;
}

/**
 * 確定紫微星所在宮位
 * 
 * @param wuXingJuNumber 五行局數 (2,3,4,5,6)
 * @param lunarDay 農曆生日
 * @returns 紫微星所在的宮位索引 (0-11)
 */
export function getZiWeiPosition(wuXingJuNumber: number, lunarDay: number): number {
  const table = ZIWEI_POSITION_TABLE[wuXingJuNumber] || ZIWEI_POSITION_TABLE[5];
  const dayIndex = (lunarDay - 1) % table.length;
  return table[dayIndex];
}

// ========================================
// 其他主星安星法（相對於紫微星）
// ========================================

/**
 * 根據紫微星位置計算其他主星位置
 * 
 * 紫微星系統的星曜分布規律：
 * - 紫微星位置確定後，天府星系和殺破狼星系的其餘星曜根據固定相對位置排列
 */

/**
 * 紫微星系（紫微為首的星組）
 * 紫微的相對位置確定後，以下星曜位置固定
 */
export function getZiWeiStarGroupPositions(ziweiPos: number): Record<string, number> {
  return {
    ziwei: ziweiPos,
  };
}

/**
 * 天府星系（天府為首的星組）
 * 天府永遠在紫微的對面
 */
export function getTianFuStarGroupPositions(ziweiPos: number): Record<string, number> {
  return {
    tianfu: (4 - ziweiPos + 12) % 12,
  };
}

/**
 * 完整的十四主星安星法
 * 
 * 根據紫微和天府位置，推算所有十四主星的位置
 * 這是最核心的算法
 */
export function getAllMajorStarPositions(ziweiPos: number): Record<string, number> {
  const tianfuPos = (4 - ziweiPos + 12) % 12;
  
  const positions: Record<string, number> = {};
  
  // === 紫微星系 ===
  positions['ziwei'] = ziweiPos;
  
  // 天機：紫微逆時針前一宮
  positions['tianji'] = (ziweiPos - 1 + 12) % 12;
  
  // 太陽
  positions['taiyang'] = (ziweiPos - 3 + 12) % 12;
  
  // 武曲
  positions['wuqu'] = (ziweiPos - 4 + 12) % 12;
  
  // 天同
  positions['tiantong'] = (ziweiPos - 5 + 12) % 12;
  
  // 廉貞
  positions['lianzhen'] = (ziweiPos - 8 + 12) % 12;
  
  // === 天府星系 ===
  positions['tianfu'] = tianfuPos;
  
  // 太陰：天府順時針前一宮
  positions['taiyin'] = (tianfuPos + 1) % 12;
  
  // 貪狼
  positions['tanlang'] = (tianfuPos + 2) % 12;
  
  // 巨門
  positions['jumen'] = (tianfuPos + 3) % 12;
  
  // 天相
  positions['tianxiang'] = (tianfuPos + 4) % 12;
  
  // 天梁
  positions['tianliang'] = (tianfuPos + 5) % 12;
  
  // 七殺
  positions['qisha'] = (tianfuPos + 6) % 12;
  
  // 破軍
  positions['pojun'] = (tianfuPos + 10) % 12;
  
  return positions;
}

// ========================================
// 宮位工具函數
// ========================================

/**
 * 獲取宮位名稱
 */
export function getPalaceName(palaceIndex: number, mingPalaceIndex: number): PalaceName {
  const relativeIndex = (palaceIndex - mingPalaceIndex + 12) % 12;
  return PALACE_NAMES[relativeIndex];
}

/**
 * 根據宮位索引獲取對應地支
 */
export function getPalaceBranch(palaceIndex: number): EarthlyBranch {
  return BRANCHES[palaceIndex];
}

/**
 * 將星曜組織為宮位格式
 */
export function organizeStarsIntoPalaces(
  starPositions: Record<string, number>,
  mingPalaceIndex: number,
  palaceStems: HeavenlyStem[]
): StarInPalace[][] {
  const palaces: StarInPalace[][] = Array.from({ length: 12 }, () => []);
  
  for (const [starName, posIndex] of Object.entries(starPositions)) {
    if (posIndex >= 0 && posIndex < 12) {
      // 簡化：所有星曜都標記為"平"
      palaces[posIndex].push({
        name: starName,
        displayName: getStarDisplayName(starName),
        type: getStarType(starName),
        brightness: '平' as const,
        element: getStarElement(starName),
      });
    }
  }
  
  return palaces;
}

/**
 * 獲取星曜顯示名稱
 */
function getStarDisplayName(name: string): string {
  const names: Record<string, string> = {
    ziwei: '紫微', tianji: '天機', taiyang: '太陽', wuqu: '武曲',
    tiantong: '天同', lianzhen: '廉貞', tianfu: '天府', taiyin: '太陰',
    tanlang: '貪狼', jumen: '巨門', tianxiang: '天相', tianliang: '天梁',
    qisha: '七殺', pojun: '破軍', zuofu: '左輔', youbi: '右弼',
    wenchang: '文昌', wenqu: '文曲', tiankui: '天魁', tianyue: '天鉞',
    luCun: '祿存', tianma: '天馬', hongLuan: '紅鸞', tianxi: '天喜',
    huoxing: '火星', lingxing: '鈴星', qingyang: '擎羊', tuoluo: '陀羅',
    dikong: '地空', dijie: '地劫', tiande: '天德', yuede: '月德',
    tiancai: '天才', tianshou: '天壽',
  };
  return names[name] || name;
}

/**
 * 獲取星曜類型
 */
function getStarType(name: string): 'major' | 'minor' | 'evil' | 'special' {
  const majorStars = ['ziwei', 'tianji', 'taiyang', 'wuqu', 'tiantong', 'lianzhen',
    'tianfu', 'taiyin', 'tanlang', 'jumen', 'tianxiang', 'tianliang', 'qisha', 'pojun'];
  const evilStars = ['huoxing', 'lingxing', 'qingyang', 'tuoluo', 'dikong', 'dijie'];
  const minorStars = ['zuofu', 'youbi', 'wenchang', 'wenqu', 'tiankui', 'tianyue',
    'luCun', 'tianma', 'hongLuan', 'tianxi'];

  if (majorStars.includes(name)) return 'major';
  if (evilStars.includes(name)) return 'evil';
  if (minorStars.includes(name)) return 'minor';
  return 'special';
}

/**
 * 獲取星曜五行
 */
function getStarElement(name: string): '木' | '火' | '土' | '金' | '水' {
  const elements: Record<string, '木' | '火' | '土' | '金' | '水'> = {
    ziwei: '土', tianji: '木', taiyang: '火', wuqu: '金',
    tiantong: '水', lianzhen: '火', tianfu: '土', taiyin: '水',
    tanlang: '木', jumen: '土', tianxiang: '水', tianliang: '土',
    qisha: '金', pojun: '水', zuofu: '土', youbi: '水',
    wenchang: '金', wenqu: '水', tiankui: '火', tianyue: '火',
    luCun: '土', tianma: '火', huoxing: '火', lingxing: '火',
    qingyang: '金', tuoluo: '金', dikong: '火', dijie: '火',
  };
  return elements[name] || '土';
}
