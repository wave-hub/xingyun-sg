/**
 * 八字命理 - 干支曆法
 * 
 * 年柱、月柱、日柱、時柱干支推算
 * 基於節氣精確計算
 */

import { GanZhi, HeavenlyStem, EarthlyBranch } from '../types';

// ========================================
// 基礎常量
// ========================================

const HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 節氣精確數據
// ========================================

/**
 * 節氣日期表（2024年）
 * [月份, 日期, 節氣名稱]
 * 只包含節（不用氣）——用於月柱判斷
 * 
 * 十二節：立春、驚蟄、清明、立夏、芒種、小暑、立秋、白露、寒露、立冬、大雪、小寒
 */
interface JieQiData {
  month: number;
  day: number;
  name: string;
  /** 月份對應（立春=正月, 驚蟄=二月...） */
  lunarMonth: number;
}

/** 2024年十二節精確日期 */
const JIE_QI_2024: JieQiData[] = [
  { month: 2, day: 4, name: '立春', lunarMonth: 1 },
  { month: 3, day: 5, name: '驚蟄', lunarMonth: 2 },
  { month: 4, day: 4, name: '清明', lunarMonth: 3 },
  { month: 5, day: 5, name: '立夏', lunarMonth: 4 },
  { month: 6, day: 5, name: '芒種', lunarMonth: 5 },
  { month: 7, day: 6, name: '小暑', lunarMonth: 6 },
  { month: 8, day: 7, name: '立秋', lunarMonth: 7 },
  { month: 9, day: 7, name: '白露', lunarMonth: 8 },
  { month: 10, day: 8, name: '寒露', lunarMonth: 9 },
  { month: 11, day: 7, name: '立冬', lunarMonth: 10 },
  { month: 12, day: 6, name: '大雪', lunarMonth: 11 },
  { month: 1, day: 6, name: '小寒', lunarMonth: 12 },
];

/**
 * 近似節氣日期表（多年度通用近似值）
 * 每年的節氣日期相差1-2天
 */
function getApproxJieQiDate(year: number, jieQiName: string): { month: number; day: number } {
  // 使用壽星萬年曆近似公式
  // 節氣日期在公曆中的分布相對固定（±1天）
  const jieQiDates: Record<string, [number, number]> = {
    '小寒': [1, 5], '大寒': [1, 20],
    '立春': [2, 4], '雨水': [2, 19],
    '驚蟄': [3, 5], '春分': [3, 20],
    '清明': [4, 4], '穀雨': [4, 20],
    '立夏': [5, 5], '小滿': [5, 21],
    '芒種': [6, 5], '夏至': [6, 21],
    '小暑': [7, 7], '大暑': [7, 22],
    '立秋': [8, 7], '處暑': [8, 23],
    '白露': [9, 7], '秋分': [9, 23],
    '寒露': [10, 8], '霜降': [10, 23],
    '立冬': [11, 7], '小雪': [11, 22],
    '大雪': [12, 7], '冬至': [12, 22],
  };
  const [month, day] = jieQiDates[jieQiName] || [1, 1];
  
  // 根據年份進行微調（每4年相差1天）
  const adjustment = Math.floor((year - 2024) / 4);
  const adjustedDay = Math.max(1, Math.min(28, day + adjustment));
  
  return { month, day: adjustedDay };
}

// ========================================
// 年柱推算
// ========================================

/**
 * 計算年柱干支（以立春為界）
 * 
 * 立春前出生屬上一年干支
 */
export function getYearPillar(date: Date): GanZhi {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 判斷是否已過立春
  const liChun = getApproxJieQiDate(year, '立春');
  let effectiveYear = year;
  if (month < liChun.month || (month === liChun.month && day < liChun.day)) {
    effectiveYear = year - 1;
  }

  const ganZhiIndex = ((effectiveYear - 4) % 60 + 60) % 60;
  const stem = HEAVENLY_STEMS[ganZhiIndex % 10];
  const branch = EARTHLY_BRANCHES[ganZhiIndex % 12];

  return { stem, branch, display: `${stem}${branch}` };
}

// ========================================
// 月柱推算
// ========================================

/**
 * 計算月柱干支（以節氣為界）
 * 
 * 月柱以「節」為界：
 * - 立春 ~ 驚蟄 = 正月（寅月）
 * - 驚蟄 ~ 清明 = 二月（卯月）
 * - 依此類推...
 */
export function getMonthPillar(date: Date, yearPillar: GanZhi): GanZhi {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 十二個節和對應月份
  const jieNames = ['立春', '驚蟄', '清明', '立夏', '芒種', '小暑',
    '立秋', '白露', '寒露', '立冬', '大雪', '小寒'];

  // 判斷當前屬於哪個月
  let lunarMonth: number = month;

  // 找出出生日期在哪兩個節之間
  // 先確定月份區間
  for (let i = 0; i < 12; i++) {
    const currentJie = jieNames[i];
    const nextJie = jieNames[(i + 1) % 12];
    const current = getApproxJieQiDate(year, currentJie);
    const next = getApproxJieQiDate(year, nextJie);

    // 小寒跨年處理
    if (currentJie === '小寒') {
      if ((month > current.month) || (month === current.month && day >= current.day)) {
        lunarMonth = 12; // 丑月
        break;
      }
    } else {
      if ((month > current.month) || (month === current.month && day >= current.day)) {
        if (nextJie === '小寒') {
          // 下一个是小寒，即当前是十一月（子月）
          lunarMonth = (i + 1) % 12 || 12;
        } else if ((month < next.month) || (month === next.month && day < next.day)) {
          lunarMonth = i + 1;
          break;
        }
      }
    }
  }

  if (!lunarMonth) {
    lunarMonth = month <= 2 ? 12 : month - 1;
  }

  // 月支固定：正月寅、二月卯...
  const monthBranches: EarthlyBranch[] = [
    '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑',
  ];
  const branchIndex = (lunarMonth - 1) % 12;

  // 月干推算（五虎遁月法）
  // 甲己年起丙寅，乙庚年起戊寅，丙辛年起庚寅，丁壬年起壬寅，戊癸年起甲寅
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem);
  const monthStemBase = (yearStemIndex % 5) * 2 + 2; // 丙=2
  const monthStemIndex = (monthStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranches[branchIndex],
    display: `${HEAVENLY_STEMS[monthStemIndex]}${monthBranches[branchIndex]}`,
  };
}

// ========================================
// 日柱推算
// ========================================

/**
 * 計算日柱干支
 * 
 * 以1900年1月1日（甲戌日）為基準
 */
export function getDayPillar(date: Date): GanZhi {
  const baseDate = new Date(1900, 0, 1); // 1900-01-01 為甲戌日
  const diff = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);
  const ganZhiIndex = ((diff + 10) % 60 + 60) % 60; // 甲戌 = index 10

  const stem = HEAVENLY_STEMS[ganZhiIndex % 10];
  const branch = EARTHLY_BRANCHES[ganZhiIndex % 12];

  return { stem, branch, display: `${stem}${branch}` };
}

// ========================================
// 時柱推算
// ========================================

/**
 * 時辰地支對應表
 */
const HOUR_BRANCHES: { startHour: number; endHour: number; branch: EarthlyBranch }[] = [
  { startHour: 23, endHour: 1, branch: '子' },
  { startHour: 1, endHour: 3, branch: '丑' },
  { startHour: 3, endHour: 5, branch: '寅' },
  { startHour: 5, endHour: 7, branch: '卯' },
  { startHour: 7, endHour: 9, branch: '辰' },
  { startHour: 9, endHour: 11, branch: '巳' },
  { startHour: 11, endHour: 13, branch: '午' },
  { startHour: 13, endHour: 15, branch: '未' },
  { startHour: 15, endHour: 17, branch: '申' },
  { startHour: 17, endHour: 19, branch: '酉' },
  { startHour: 19, endHour: 21, branch: '戌' },
  { startHour: 21, endHour: 23, branch: '亥' },
];

/**
 * 計算時柱干支
 * 
 * 日上起時法（五鼠遁）：
 * - 甲己日起甲子時
 * - 乙庚日起丙子時
 * - 丙辛日起戊子時
 * - 丁壬日起庚子時
 * - 戊癸日起壬子時
 */
export function getHourPillar(date: Date, birthTime: string, dayPillar: GanZhi): GanZhi {
  const [hourStr, minuteStr] = birthTime.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // 確定時辰地支
  let hourBranch: EarthlyBranch = '子';
  const totalMinutes = hour * 60 + minute;

  for (const hb of HOUR_BRANCHES) {
    if (hb.startHour < hb.endHour) {
      if (totalMinutes >= hb.startHour * 60 && totalMinutes < hb.endHour * 60) {
        hourBranch = hb.branch;
        break;
      }
    } else {
      if (totalMinutes >= hb.startHour * 60 || totalMinutes < hb.endHour * 60) {
        hourBranch = hb.branch;
        break;
      }
    }
  }

  const branchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);

  // 時干推算
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.stem);
  const hourStemBase = (dayStemIndex % 5) * 2;
  const hourStemIndex = (hourStemBase + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch: hourBranch,
    display: `${HEAVENLY_STEMS[hourStemIndex]}${hourBranch}`,
  };
}

// ========================================
// 節氣查詢
// ========================================

/**
 * 獲取當前所在月份的節氣信息
 */
export function getJieQiInfo(date: Date): {
  monthJieQi: string;
  nextJieQi: string;
  nextJieQiDate: string;
} {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const jieNames = ['小寒', '立春', '驚蟄', '清明', '立夏', '芒種',
    '小暑', '立秋', '白露', '寒露', '立冬', '大雪'];

  let monthJieQi = '';
  let nextJieQi = '';
  let nextJieQiDate = '';

  for (let i = 0; i < 12; i++) {
    const jie = getApproxJieQiDate(year, jieNames[i]);
    if (month > jie.month || (month === jie.month && day >= jie.day)) {
      monthJieQi = jieNames[i];
      const nextIdx = (i + 1) % 12;
      const nextJie = getApproxJieQiDate(year, jieNames[nextIdx]);
      nextJieQi = jieNames[nextIdx];
      nextJieQiDate = `${year}-${String(nextJie.month).padStart(2, '0')}-${String(nextJie.day).padStart(2, '0')}`;
    }
  }

  return { monthJieQi, nextJieQi, nextJieQiDate };
}
