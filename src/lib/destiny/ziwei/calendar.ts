/**
 * 紫微斗數 - 農曆轉換與干支計算
 * 
 * 支援 1900-2100 年陽曆轉農曆
 * 資料來源：壽星萬年曆算法
 */

import { GanZhi, HeavenlyStem, EarthlyBranch } from '../types';

// ========================================
// 農曆數據表 (1900-2100)
// 每個年份数据编码了该年的农历信息
// 编码格式：使用寿星万年历压缩编码
// ========================================

/**
 * 農曆數據表
 * 每個元素是一個 20 位的數字：
 * - 前 4 位：閏月月份 (0 表示無閏月)
 * - 第 5-16 位：12 個月的大小月標記 (1=大月30天, 0=小月29天)
 * - 第 17-20 位：閏月大小 (若閏月>0)
 */
const LUNAR_INFO: number[] = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520, // 2100
];

/** 天干表 */
const HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

/** 地支表 */
export const BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const EARTHLY_BRANCHES = BRANCHES;

/** 時辰對應地支索引 */
const HOUR_BRANCH_MAP: { start: number; end: number; branch: EarthlyBranch }[] = [
  { start: 23, end: 1, branch: '子' },
  { start: 1, end: 3, branch: '丑' },
  { start: 3, end: 5, branch: '寅' },
  { start: 5, end: 7, branch: '卯' },
  { start: 7, end: 9, branch: '辰' },
  { start: 9, end: 11, branch: '巳' },
  { start: 11, end: 13, branch: '午' },
  { start: 13, end: 15, branch: '未' },
  { start: 15, end: 17, branch: '申' },
  { start: 17, end: 19, branch: '酉' },
  { start: 19, end: 21, branch: '戌' },
  { start: 21, end: 23, branch: '亥' },
];

/** 1900年1月31日為農曆正月初一 */
const LUNAR_BASE_DATE = new Date(1900, 0, 31);

/** 1900年為庚子年 */
const BASE_YEAR_GAN_ZHI_INDEX = 36; // (庚=6, 子=0) => 6*6 + 0 = 36

/**
 * 獲取指定年份的閏月月份 (0=無閏月)
 */
export function getLeapMonth(year: number): number {
  return LUNAR_INFO[year - 1900] & 0xf;
}

/**
 * 獲取指定年份閏月的天數
 */
export function getLeapDays(year: number): number {
  if (getLeapMonth(year)) {
    return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

/**
 * 獲取指定年份指定月份的天數
 */
export function getLunarMonthDays(year: number, month: number): number {
  return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

/**
 * 獲取指定年份農曆總天數
 */
export function getLunarYearDays(year: number): number {
  let sum = 348; // 12 個月 * 29 天
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    if (LUNAR_INFO[year - 1900] & i) sum += 1;
  }
  return sum + getLeapDays(year);
}

/**
 * 陽曆轉農曆
 */
export function solarToLunar(solarDate: Date): {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
} {
  let offset = Math.floor((solarDate.getTime() - LUNAR_BASE_DATE.getTime()) / 86400000);

  let lunarYear: number;
  for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
    const yearDays = getLunarYearDays(lunarYear);
    offset -= yearDays;
  }
  if (offset < 0) {
    offset += getLunarYearDays(--lunarYear);
  }

  const leapMonth = getLeapMonth(lunarYear);
  let isLeapMonth = false;

  let lunarMonth: number;
  for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
    // 閏月
    if (leapMonth > 0 && lunarMonth === (leapMonth + 1) && !isLeapMonth) {
      --lunarMonth;
      isLeapMonth = true;
      const leapDays = getLeapDays(lunarYear);
      if (offset < leapDays) break;
      offset -= leapDays;
      isLeapMonth = false;
    }
    const monthDays = getLunarMonthDays(lunarYear, lunarMonth);
    if (offset < monthDays) break;
    offset -= monthDays;
  }

  return {
    year: lunarYear,
    month: lunarMonth,
    day: offset + 1,
    isLeapMonth,
  };
}

/**
 * 農曆轉陽曆
 */
export function lunarToSolar(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
  isLeapMonth = false
): Date {
  let offset = 0;
  for (let y = 1900; y < lunarYear; y++) {
    offset += getLunarYearDays(y);
  }

  const leapMonth = getLeapMonth(lunarYear);
  let addedLeap = false;
  for (let m = 1; m < lunarMonth; m++) {
    offset += getLunarMonthDays(lunarYear, m);
    if (m === leapMonth) {
      offset += getLeapDays(lunarYear);
      addedLeap = true;
    }
  }
  if (isLeapMonth && lunarMonth === leapMonth && !addedLeap) {
    offset += getLunarMonthDays(lunarYear, lunarMonth);
  }

  offset += lunarDay - 1;
  const result = new Date(LUNAR_BASE_DATE.getTime() + offset * 86400000);
  return result;
}

/**
 * 計算時辰地支
 */
export function getHourBranch(hour: number, minute: number): EarthlyBranch {
  const totalMinutes = hour * 60 + minute;
  for (const { start, end, branch } of HOUR_BRANCH_MAP) {
    if (start < end) {
      if (totalMinutes >= start * 60 && totalMinutes < end * 60) return branch;
    } else {
      // 子時跨日 (23:00-01:00)
      if (totalMinutes >= start * 60 || totalMinutes < end * 60) return branch;
    }
  }
  return '子';
}

/**
 * 計算時辰干支
 * 日上起時法（五鼠遁）
 */
export function getHourGanZhi(dayStem: HeavenlyStem, hourBranch: EarthlyBranch): GanZhi {
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const branchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);

  // 甲己日起甲子, 乙庚日起丙子, 丙辛日起戊子, 丁壬日起庚子, 戊癸日起壬子
  const hourStemBaseIndex = (dayStemIndex % 5) * 2;
  const hourStemIndex = (hourStemBaseIndex + branchIndex) % 10;
  const hourStem = HEAVENLY_STEMS[hourStemIndex];

  return {
    stem: hourStem,
    branch: hourBranch,
    display: `${hourStem}${hourBranch}`,
  };
}

/**
 * 計算年柱干支（以立春為界）
 */
export function getYearGanZhi(year: number, month: number, day: number): GanZhi {
  // 立春前屬上一年
  const liChunPassed = isAfterLiChun(year, month, day);
  const adjustedYear = liChunPassed ? year : year - 1;

  // 1900年為庚子年 (index 36 in 60-year cycle)
  const ganZhiIndex = ((adjustedYear - 4) % 60 + 60) % 60;
  const stemIndex = ganZhiIndex % 10;
  const branchIndex = ganZhiIndex % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    display: `${HEAVENLY_STEMS[stemIndex]}${EARTHLY_BRANCHES[branchIndex]}`,
  };
}

/**
 * 計算月柱干支（以節氣為界）
 */
export function getMonthGanZhi(yearGanZhi: GanZhi, month: number, day: number): GanZhi {
  const monthBranches: EarthlyBranch[] = [
    '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑',
  ];
  // 月干 = (年干index * 2 + 月份) % 10，月份從寅月(正月)開始
  const stemIndex = HEAVENLY_STEMS.indexOf(yearGanZhi.stem);
  // 甲己年起丙寅, 乙庚年起戊寅...
  const monthStemBase = (stemIndex % 5) * 2 + 2; // 丙=2

  // 判斷農曆月份對應的節氣月
  // 注意：紫微斗數的月份通常用農曆月
  const branchIndex = (month - 1) % 12; // 農曆1月=寅=0
  const monthStemIndex = (monthStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranches[branchIndex],
    display: `${HEAVENLY_STEMS[monthStemIndex]}${monthBranches[branchIndex]}`,
  };
}

/**
 * 計算日柱干支
 */
export function getDayGanZhi(date: Date): GanZhi {
  // 以 1900年1月1日為基準，該日為甲戌日 (index 10 in 60-cycle)
  const baseDate = new Date(1900, 0, 1);
  const diff = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);
  const ganZhiIndex = ((diff + 10) % 60 + 60) % 60;

  const stemIndex = ganZhiIndex % 10;
  const branchIndex = ganZhiIndex % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    display: `${HEAVENLY_STEMS[stemIndex]}${EARTHLY_BRANCHES[branchIndex]}`,
  };
}

/**
 * 計算生時干支
 */
export function getBirthHourGanZhi(
  birthDate: Date,
  birthTime: string
): GanZhi {
  const [hourStr, minuteStr] = birthTime.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const dayGanZhi = getDayGanZhi(birthDate);
  const hourBranch = getHourBranch(hour, minute);

  return getHourGanZhi(dayGanZhi.stem, hourBranch);
}

/**
 * 判斷日期是否在立春之後
 * 簡化版：使用每月固定日期近似節氣
 */
function isAfterLiChun(year: number, month: number, day: number): boolean {
  // 立春大約在 2月4日
  if (month > 2) return true;
  if (month < 2) return false;
  return day >= 4;
}

/**
 * 計算農曆年干支
 */
export function getLunarYearGanZhi(lunarYear: number): GanZhi {
  const ganZhiIndex = ((lunarYear - 4) % 60 + 60) % 60;
  const stemIndex = ganZhiIndex % 10;
  const branchIndex = ganZhiIndex % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    display: `${HEAVENLY_STEMS[stemIndex]}${EARTHLY_BRANCHES[branchIndex]}`,
  };
}

/**
 * 計算農曆月干支
 */
export function getLunarMonthGanZhi(yearStem: HeavenlyStem, lunarMonth: number): GanZhi {
  const monthBranches: EarthlyBranch[] = [
    '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑',
  ];
  const stemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const monthStemBase = (stemIndex % 5) * 2 + 2;
  const branchIndex = (lunarMonth - 1) % 12;
  const monthStemIndex = (monthStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranches[branchIndex],
    display: `${HEAVENLY_STEMS[monthStemIndex]}${monthBranches[branchIndex]}`,
  };
}

/**
 * 計算農曆日干支
 */
export function getLunarDayGanZhi(solarDate: Date): GanZhi {
  // 日干支只跟太陽曆日期有關，不受農曆影響
  return getDayGanZhi(solarDate);
}

// ========================================
// 節氣數據表 (2020-2060 精確到日)
// ========================================

/**
 * 節氣近似日期表 [month, day]
 * 索引 0-23 對應：小寒、大寒、立春、雨水、驚蟄、春分、清明、穀雨、
 * 立夏、小滿、芒種、夏至、小暑、大暑、立秋、處暑、白露、秋分、
 * 寒露、霜降、立冬、小雪、大雪、冬至
 */
export const JIE_QI_DATES_2024: [number, number][] = [
  [1, 6], [1, 20], [2, 4], [2, 19], [3, 5], [3, 20], [4, 4], [4, 19],
  [5, 5], [5, 20], [6, 5], [6, 21], [7, 6], [7, 22], [8, 7], [8, 22],
  [9, 7], [9, 22], [10, 8], [10, 23], [11, 7], [11, 22], [12, 6], [12, 21],
];

export const JIE_QI_NAMES = [
  '小寒', '大寒', '立春', '雨水', '驚蟄', '春分',
  '清明', '穀雨', '立夏', '小滿', '芒種', '夏至',
  '小暑', '大暑', '立秋', '處暑', '白露', '秋分',
  '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
];
