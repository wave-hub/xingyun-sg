/**
 * 大六壬 - 六壬曆法
 * 
 * 月將安排、日干支、時辰確定
 */

import { GanZhi, HeavenlyStem, EarthlyBranch } from '../types';

const HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 月將
// ========================================

/**
 * 月將對應表
 * 
 * 月將以中氣定之（非節氣）：
 * - 雨水後月將為亥（登明）
 * - 春分後月將為戌（河魁）
 * - 穀雨後月將為酉（從魁）
 * - 小滿後月將為申（傳送）
 * - 夏至後月將為未（小吉）
 * - 大暑後月將為午（勝光）
 * - 處暑後月將為巳（太一）
 * - 秋分後月將為辰（天罡）
 * - 霜降後月將為卯（太衝）
 * - 小雪後月將為寅（功曹）
 * - 冬至後月將為丑（大吉）
 * - 大寒後月將為子（神后）
 */

/**
 * 中氣近似日期對應月將
 * 索引 = 月份 (1-12)，值 = 月將地支
 */
export const YUE_JIANG_MAP: Record<number, EarthlyBranch> = {
  1: '丑', 2: '子', 3: '亥', 4: '戌', 5: '酉', 6: '申',
  7: '未', 8: '午', 9: '巳', 10: '辰', 11: '卯', 12: '寅',
};

/**
 * 月將別名
 */
export const YUE_JIANG_NAMES: Record<EarthlyBranch, string> = {
  '子': '神后', '丑': '大吉', '寅': '功曹', '卯': '太衝',
  '辰': '天罡', '巳': '太一', '午': '勝光', '未': '小吉',
  '申': '傳送', '酉': '從魁', '戌': '河魁', '亥': '登明',
};

/**
 * 根據月份確定月將
 */
export function getYueJiang(month: number): EarthlyBranch {
  return YUE_JIANG_MAP[month] || '子';
}

// ========================================
// 時辰計算
// ========================================

/**
 * 時辰地支確定
 */
export function getHourBranch(hour: number, minute: number): EarthlyBranch {
  const totalMinutes = hour * 60 + minute;
  const ranges: { start: number; end: number; branch: EarthlyBranch }[] = [
    { start: 23 * 60, end: 1 * 60, branch: '子' },
    { start: 1 * 60, end: 3 * 60, branch: '丑' },
    { start: 3 * 60, end: 5 * 60, branch: '寅' },
    { start: 5 * 60, end: 7 * 60, branch: '卯' },
    { start: 7 * 60, end: 9 * 60, branch: '辰' },
    { start: 9 * 60, end: 11 * 60, branch: '巳' },
    { start: 11 * 60, end: 13 * 60, branch: '午' },
    { start: 13 * 60, end: 15 * 60, branch: '未' },
    { start: 15 * 60, end: 17 * 60, branch: '申' },
    { start: 17 * 60, end: 19 * 60, branch: '酉' },
    { start: 19 * 60, end: 21 * 60, branch: '戌' },
    { start: 21 * 60, end: 23 * 60, branch: '亥' },
  ];

  for (const { start, end, branch } of ranges) {
    if (start > end) {
      if (totalMinutes >= start || totalMinutes < end) return branch;
    } else {
      if (totalMinutes >= start && totalMinutes < end) return branch;
    }
  }
  return '子';
}

// ========================================
// 日干支計算
// ========================================

/**
 * 計算日干支
 */
export function getDayGanZhi(date: Date): GanZhi {
  const baseDate = new Date(1900, 0, 1);
  const diff = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);
  const ganZhiIndex = ((diff + 10) % 60 + 60) % 60;
  return {
    stem: HEAVENLY_STEMS[ganZhiIndex % 10],
    branch: EARTHLY_BRANCHES[ganZhiIndex % 12],
    display: `${HEAVENLY_STEMS[ganZhiIndex % 10]}${EARTHLY_BRANCHES[ganZhiIndex % 12]}`,
  };
}

/**
 * 計算時柱干支
 */
export function getHourGanZhi(dayStem: HeavenlyStem, hourBranch: EarthlyBranch): GanZhi {
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const branchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);
  const hourStemBase = (dayStemIndex % 5) * 2;
  const hourStemIndex = (hourStemBase + branchIndex) % 10;
  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch: hourBranch,
    display: `${HEAVENLY_STEMS[hourStemIndex]}${hourBranch}`,
  };
}

/**
 * 計算年柱干支
 */
export function getYearGanZhi(date: Date): GanZhi {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let effectiveYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    effectiveYear = year - 1;
  }
  const ganZhiIndex = ((effectiveYear - 4) % 60 + 60) % 60;
  return {
    stem: HEAVENLY_STEMS[ganZhiIndex % 10],
    branch: EARTHLY_BRANCHES[ganZhiIndex % 12],
    display: `${HEAVENLY_STEMS[ganZhiIndex % 10]}${EARTHLY_BRANCHES[ganZhiIndex % 12]}`,
  };
}

/**
 * 計算月柱干支
 */
export function getMonthGanZhi(date: Date, yearPillar: GanZhi): GanZhi {
  const year = date.getFullYear();
  const monthBranches: EarthlyBranch[] = [
    '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑',
  ];
  const jieQiDates: [number, number][] = [
    [2, 4], [3, 6], [4, 5], [5, 6], [6, 6], [7, 7],
    [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6],
  ];

  let lunarMonth = 1;
  for (let i = 0; i < 12; i++) {
    const [m, d] = jieQiDates[i];
    const jieDate = new Date(year, m - 1, d);
    if (date >= jieDate) {
      lunarMonth = i + 1;
    }
  }

  const branchIndex = (lunarMonth - 1) % 12;
  const stemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem);
  const monthStemBase = (stemIndex % 5) * 2 + 2;
  const monthStemIndex = (monthStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranches[branchIndex],
    display: `${HEAVENLY_STEMS[monthStemIndex]}${monthBranches[branchIndex]}`,
  };
}
