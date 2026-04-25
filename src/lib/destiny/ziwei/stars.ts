/**
 * 紫微斗數 - 星曜系統
 * 
 * 包含十四主星、輔星、煞星的完整數據
 * 星曜亮度（廟旺利落陷）判定
 */

import { WuXing, YinYang, StarBrightness, ZiWeiStar } from '../types';

// ========================================
// 十四主星
// ========================================

export const MAJOR_STARS: ZiWeiStar[] = [
  {
    name: 'ziwei',
    displayName: '紫微',
    type: 'major',
    element: '土',
    yinYang: '陽',
    meaning: '帝星，領袖之才，有威嚴和領導力，主貴氣、官爵',
    isMajor: true,
  },
  {
    name: 'tianji',
    displayName: '天機',
    type: 'major',
    element: '木',
    yinYang: '陰',
    meaning: '智慧之星，善於策劃，思維靈活，主機智、聰慧',
    isMajor: true,
  },
  {
    name: 'taiyang',
    displayName: '太陽',
    type: 'major',
    element: '火',
    yinYang: '陽',
    meaning: '光明之星，熱情大方，主貴人、官祿、男性親長',
    isMajor: true,
  },
  {
    name: 'wuqu',
    displayName: '武曲',
    type: 'major',
    element: '金',
    yinYang: '陰',
    meaning: '財星，性格剛毅果斷，主財運、事業、武職',
    isMajor: true,
  },
  {
    name: 'tiantong',
    displayName: '天同',
    type: 'major',
    element: '水',
    yinYang: '陽',
    meaning: '福星，性格溫和樂觀，主福气、人緣、享福',
    isMajor: true,
  },
  {
    name: 'lianzhen',
    displayName: '廉貞',
    type: 'major',
    element: '火',
    yinYang: '陰',
    meaning: '囚星，桃花之星，性格複雜，主官非、桃花、藝術才華',
    isMajor: true,
  },
  {
    name: 'tianfu',
    displayName: '天府',
    type: 'major',
    element: '土',
    yinYang: '陽',
    meaning: '財庫之星，寬容大度，主財帛、田宅、儲蓄',
    isMajor: true,
  },
  {
    name: 'taiyin',
    displayName: '太陰',
    type: 'major',
    element: '水',
    yinYang: '陰',
    meaning: '陰柔之星，溫柔體貼，主財運、女性親長、文藝',
    isMajor: true,
  },
  {
    name: 'tanlang',
    displayName: '貪狼',
    type: 'major',
    element: '木',
    yinYang: '陽',
    meaning: '桃花之星，多才多藝，主桃花、慾望、人際交際',
    isMajor: true,
  },
  {
    name: 'jumen',
    displayName: '巨門',
    type: 'major',
    element: '土',
    yinYang: '陰',
    meaning: '暗曜，口才好但易生是非，主口舌、分析、研究',
    isMajor: true,
  },
  {
    name: 'tianxiang',
    displayName: '天相',
    type: 'major',
    element: '水',
    yinYang: '陽',
    meaning: '印星，溫和正直，主輔佐、衣食、隨和',
    isMajor: true,
  },
  {
    name: 'tianliang',
    displayName: '天梁',
    type: 'major',
    element: '土',
    yinYang: '陰',
    meaning: '蔭星，成熟穩重，主庇佑、壽元、醫藥',
    isMajor: true,
  },
  {
    name: 'qisha',
    displayName: '七殺',
    type: 'major',
    element: '金',
    yinYang: '陰',
    meaning: '將星，性格剛強果斷，主武職、衝勁、權力',
    isMajor: true,
  },
  {
    name: 'pojun',
    displayName: '破軍',
    type: 'major',
    element: '水',
    yinYang: '陰',
    meaning: '耗星，敢作敢為，主破耗、開創、變動',
    isMajor: true,
  },
];

// ========================================
// 六吉星（輔星）
// ========================================

export const MINOR_STARS: ZiWeiStar[] = [
  {
    name: 'zuofu',
    displayName: '左輔',
    type: 'minor',
    element: '土',
    yinYang: '陽',
    meaning: '吉星，主貴人相助、輔佐之力、人際和諧',
    isMajor: false,
  },
  {
    name: 'youbi',
    displayName: '右弼',
    type: 'minor',
    element: '水',
    yinYang: '陰',
    meaning: '吉星，主貴人相助、溫和助力、人際融洽',
    isMajor: false,
  },
  {
    name: 'wenchang',
    displayName: '文昌',
    type: 'minor',
    element: '金',
    yinYang: '陽',
    meaning: '文星，主學業、文才、考試、聲名',
    isMajor: false,
  },
  {
    name: 'wenqu',
    displayName: '文曲',
    type: 'minor',
    element: '水',
    yinYang: '陰',
    meaning: '文星，主才華、文藝、口才、藝術',
    isMajor: false,
  },
  {
    name: 'tiankui',
    displayName: '天魁',
    type: 'minor',
    element: '火',
    yinYang: '陽',
    meaning: '貴星，主貴人、提攜、晉升、功名',
    isMajor: false,
  },
  {
    name: 'tianyue',
    displayName: '天鉞',
    type: 'minor',
    element: '火',
    yinYang: '陰',
    meaning: '貴星，主貴人、暗中相助、臨危解難',
    isMajor: false,
  },
  {
    name: 'luCun',
    displayName: '祿存',
    type: 'minor',
    element: '土',
    yinYang: '陽',
    meaning: '財星，主財運、加薪、收入穩定',
    isMajor: false,
  },
  {
    name: 'tianma',
    displayName: '天馬',
    type: 'minor',
    element: '火',
    yinYang: '陽',
    meaning: '動星，主遷動、旅行、奔波、異鄉發展',
    isMajor: false,
  },
  {
    name: 'hongLuan',
    displayName: '紅鸞',
    type: 'minor',
    element: '水',
    yinYang: '陰',
    meaning: '桃花星，主婚戀喜慶、人緣、異性緣',
    isMajor: false,
  },
  {
    name: 'tianxi',
    displayName: '天喜',
    type: 'minor',
    element: '木',
    yinYang: '陽',
    meaning: '桃花星，主喜慶、婚姻、社交活躍',
    isMajor: false,
  },
];

// ========================================
// 六煞星
// ========================================

export const EVIL_STARS: ZiWeiStar[] = [
  {
    name: 'huoxing',
    displayName: '火星',
    type: 'evil',
    element: '火',
    yinYang: '陽',
    meaning: '煞星，主暴躁、血光、意外、破財',
    isMajor: false,
  },
  {
    name: 'lingxing',
    displayName: '鈴星',
    type: 'evil',
    element: '火',
    yinYang: '陰',
    meaning: '煞星，主暗傷、精神壓力、陰險',
    isMajor: false,
  },
  {
    name: 'qingyang',
    displayName: '擎羊',
    type: 'evil',
    element: '金',
    yinYang: '陽',
    meaning: '煞星，主刑傷、開刀、性格剛烈',
    isMajor: false,
  },
  {
    name: 'tuoluo',
    displayName: '陀羅',
    type: 'evil',
    element: '金',
    yinYang: '陰',
    meaning: '煞星，主拖延、糾纏、暗疾、固執',
    isMajor: false,
  },
  {
    name: 'dikong',
    displayName: '地空',
    type: 'evil',
    element: '火',
    yinYang: '陽',
    meaning: '空亡星，主破財、虛幻、宗教靈感',
    isMajor: false,
  },
  {
    name: 'dijie',
    displayName: '地劫',
    type: 'evil',
    element: '火',
    yinYang: '陰',
    meaning: '空亡星，主劫奪、破敗、精神波動',
    isMajor: false,
  },
];

// ========================================
// 雜曜
// ========================================

export const SPECIAL_STARS: ZiWeiStar[] = [
  {
    name: 'tiande',
    displayName: '天德',
    type: 'special',
    element: '火',
    yinYang: '陽',
    meaning: '吉曜，主品德高尚、逢凶化吉',
    isMajor: false,
  },
  {
    name: 'yuede',
    displayName: '月德',
    type: 'special',
    element: '水',
    yinYang: '陰',
    meaning: '吉曜，主溫和善良、貴人緣',
    isMajor: false,
  },
  {
    name: 'tiancai',
    displayName: '天才',
    type: 'special',
    element: '木',
    yinYang: '陽',
    meaning: '主聰明才智、學習能力',
    isMajor: false,
  },
  {
    name: 'tianshou',
    displayName: '天壽',
    type: 'special',
    element: '土',
    yinYang: '陰',
    meaning: '主健康長壽、穩重',
    isMajor: false,
  },
  {
    name: 'tianku',
    displayName: '天虛',
    type: 'special',
    element: '水',
    yinYang: '陽',
    meaning: '主精神空虛、情緒低落',
    isMajor: false,
  },
  {
    name: 'zhangshen',
    displayName: '長星',
    type: 'special',
    element: '金',
    yinYang: '陽',
    meaning: '主長壽、延年',
    isMajor: false,
  },
];

/** 所有星曜的合併查找表 */
export const ALL_STARS: Record<string, ZiWeiStar> = {};

[...MAJOR_STARS, ...MINOR_STARS, ...EVIL_STARS, ...SPECIAL_STARS].forEach(star => {
  ALL_STARS[star.name] = star;
});

// ========================================
// 星曜亮度表 (廟旺得地平落陷)
// ========================================

/**
 * 十四主星在各宮位（以地支表示）的亮度表
 * 宮位索引對應地支：0=子 1=丑 2=寅 3=卯 4=辰 5=巳 6=午 7=未 8=申 9=酉 10=戌 11=亥
 */
export const MAJOR_STAR_BRIGHTNESS: Record<string, StarBrightness[]> = {
  // 紫微: 子丑寅卯辰巳午未申酉戌亥
  ziwei:   ['得地', '平',   '平',   '落陷', '落陷', '得地', '廟',   '旺',   '得地', '平',   '平',   '落陷'],
  // 天機
  tianji:  ['落陷', '平',   '旺',   '平',   '平',   '得地', '落陷', '落陷', '得地', '平',   '平',   '廟'],
  // 太陽
  taiyang: ['落陷', '落陷', '平',   '得地', '得地', '得地', '廟',   '旺',   '平',   '得地', '平',   '落陷'],
  // 武曲
  wuqu:    ['得地', '得地', '落陷', '落陷', '平',   '平',   '平',   '平',   '廟',   '廟',   '旺',   '旺'],
  // 天同
  tiantong:['落陷', '平',   '平',   '得地', '得地', '得地', '廟',   '旺',   '得地', '得地', '得地', '落陷'],
  // 廉貞
  lianzhen:['平',   '平',   '平',   '平',   '落陷', '落陷', '廟',   '廟',   '得地', '得地', '旺',   '旺'],
  // 天府
  tianfu:  ['平',   '得地', '廟',   '得地', '得地', '平',   '平',   '得地', '廟',   '得地', '得地', '平'],
  // 太陰
  taiyin:  ['廟',   '旺',   '落陷', '落陷', '平',   '平',   '落陷', '落陷', '得地', '平',   '旺',   '廟'],
  // 貪狼
  tanlang: ['得地', '得地', '平',   '平',   '廟',   '旺',   '落陷', '落陷', '得地', '得地', '平',   '平'],
  // 巨門
  jumen:   ['落陷', '得地', '平',   '旺',   '平',   '平',   '平',   '落陷', '落陷', '得地', '旺',   '平'],
  // 天相
  tianxiang:['平',  '平',   '得地', '得地', '得地', '落陷', '落陷', '得地', '得地', '得地', '得地', '平'],
  // 天梁
  tianliang:['平',  '落陷', '得地', '旺',   '平',   '平',   '得地', '得地', '平',   '落陷', '落陷', '得地'],
  // 七殺
  qisha:   ['得地', '平',   '得地', '平',   '落陷', '落陷', '廟',   '平',   '得地', '平',   '得地', '平'],
  // 破軍
  pojun:   ['落陷', '落陷', '得地', '平',   '平',   '旺',   '旺',   '得地', '得地', '平',   '落陷', '落陷'],
};

// ========================================
// 輔星安星法
// ========================================

/**
 * 左輔位置表
 * 索引 = 生月 (1-12)
 * 值 = 宮位索引 (0-11, 子=0)
 */
export const ZUOFU_POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];

/**
 * 右弼位置表
 * 索引 = 生月 (1-12)
 * 值 = 宮位索引
 */
export const YOUBI_POSITIONS = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

/**
 * 文昌位置表
 * 索引 = 生時辰 (1-12, 子=1)
 * 值 = 宮位索引
 */
export const WENCHANG_POSITIONS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11];

/**
 * 文曲位置表
 * 索引 = 生時辰 (1-12, 子=1)
 */
export const WENQU_POSITIONS = [4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5];

/**
 * 天魁位置表
 * 索引 = 生年支 (0=子 ... 11=亥)
 */
export const TIANKUI_POSITIONS = [11, 9, 7, 5, 3, 1, 1, 3, 5, 7, 9, 11];

/**
 * 天鉞位置表
 * 索引 = 生年支
 */
export const TIANYUE_POSITIONS = [7, 9, 11, 1, 3, 5, 5, 3, 1, 11, 9, 7];

/**
 * 祿存位置表
 * 索引 = 生年干 (0=甲 ... 9=癸)
 */
export const LUCUN_POSITIONS = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];

/**
 * 火星位置表
 * 依年支和時辰的組合
 * 簡化版：根據年支 + 生日 + 時辰推算
 */
export function getHuoxingPosition(yearBranchIndex: number, birthDay: number, hourBranchIndex: number): number {
  // 簡化安星法
  const base = (yearBranchIndex + birthDay + hourBranchIndex) % 12;
  return (base + 2) % 12;
}

/**
 * 鈴星位置表
 */
export function getLingxingPosition(yearBranchIndex: number, birthDay: number, hourBranchIndex: number): number {
  const base = (yearBranchIndex + birthDay + hourBranchIndex) % 12;
  return (base + 3) % 12;
}

/**
 * 擎羊位置（跟隨祿存，前一宮）
 */
export function getQingyangPosition(luCunPosition: number): number {
  return (luCunPosition + 1) % 12;
}

/**
 * 陀羅位置（跟隨祿存，後一宮）
 */
export function getTuoluoPosition(luCunPosition: number): number {
  return (luCunPosition - 1 + 12) % 12;
}

/**
 * 地空位置表
 * 索引 = 生時辰 (1-12, 子=1)
 */
export const DIKONG_POSITIONS = [11, 9, 7, 5, 3, 1, 11, 9, 7, 5, 3, 1];

/**
 * 地劫位置表
 */
export const DIJIE_POSITIONS = [1, 3, 5, 7, 9, 11, 1, 3, 5, 7, 9, 11];

/**
 * 天馬位置表
 * 索引 = 生年支 (0=子 ... 11=亥)
 */
export const TIANMA_POSITIONS = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5];

/**
 * 紅鸞位置表
 * 索引 = 生年支 (0=子 ... 11=亥)
 */
export const HONGLUAN_POSITIONS = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * 天喜位置表
 */
export const TIANXI_POSITIONS = [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8];

// ========================================
// 命主星
// ========================================

/**
 * 命宮主星對應
 * 索引 = 命宮地支 (0=子 ... 11=亥)
 */
export const MING_ZHU_STAR: string[] = [
  '貪狼', '巨門', '祿存', '文曲', '廉貞', '武曲',
  '破軍', '武曲', '貪狼', '天同', '天機', '天同',
];

/**
 * 身宮主星對應
 */
export const SHEN_ZHU_STAR: string[] = [
  '天相', '天梁', '天同', '文昌', '天機', '火星',
  '天同', '天梁', '天相', '文昌', '天機', '火星',
];
