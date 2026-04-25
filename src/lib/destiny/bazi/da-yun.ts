/**
 * 八字命理 - 大運系統
 * 
 * 大運起運歲數、排列、流年推演
 */

import { GanZhi, DaYun, HeavenlyStem, EarthlyBranch } from '../types';
import { getTenGod } from './ten-gods';
import { STEM_ELEMENT } from './five-elements';

const HEAVENLY_STEMS: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 大運起運計算
// ========================================

/**
 * 計算起運歲數
 * 
 * 原則：
 * - 從出生日到最近一個節氣的距離
 * - 陽年男命/陰年女命：順數到下一個節
 * - 陰年男命/陽年女命：逆數到上一個節
 * - 每三天折一年
 * 
 * 陽年：年干為甲丙戊庚壬
 * 陰年：年干為乙丁己辛癸
 */
export function calculateStartAge(
  birthDate: Date,
  yearStem: HeavenlyStem,
  gender: 'male' | 'female'
): number {
  const stemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const isYangYear = stemIndex % 2 === 0;
  const isMale = gender === 'male';

  // 順行 or 逆行
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);

  // 節氣近似日期（出生年）
  const year = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  // 12 個節的近似日期
  const jieQiDays: [number, number][] = [
    [1, 6], [2, 4], [3, 6], [4, 5], [5, 6], [6, 6],
    [7, 7], [8, 8], [9, 8], [10, 8], [11, 7], [12, 7],
  ];

  let daysDiff: number = 0;

  if (isForward) {
    // 順數：找下一個節
    for (const [m, d] of jieQiDays) {
      const jieDate = new Date(year, m - 1, d);
      if (jieDate > birthDate) {
        daysDiff = Math.floor((jieDate.getTime() - birthDate.getTime()) / 86400000);
        break;
      }
    }
    daysDiff = daysDiff || 90;
  } else {
    // 逆數：找上一個節
    for (let i = jieQiDays.length - 1; i >= 0; i--) {
      const [m, d] = jieQiDays[i];
      const jieDate = new Date(year, m - 1, d);
      if (jieDate < birthDate) {
        daysDiff = Math.floor((birthDate.getTime() - jieDate.getTime()) / 86400000);
        break;
      }
    }
    daysDiff = daysDiff || 90;
  }

  // 每三天折一年
  const startAge = Math.max(1, Math.round(daysDiff / 3));
  return startAge;
}

/**
 * 計算大運序列
 */
export function calculateDaYun(
  birthDate: Date,
  yearPillar: GanZhi,
  monthPillar: GanZhi,
  yearStem: HeavenlyStem,
  gender: 'male' | 'female',
  dayMaster: HeavenlyStem
): DaYun[] {
  const startAge = calculateStartAge(birthDate, yearStem, gender);
  const stemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const isYangYear = stemIndex % 2 === 0;
  const isMale = gender === 'male';
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);

  const monthStemIndex = HEAVENLY_STEMS.indexOf(monthPillar.stem);
  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthPillar.branch);

  const daYun: DaYun[] = [];

  for (let i = 1; i <= 8; i++) {
    let newStemIndex: number, newBranchIndex: number;

    if (isForward) {
      newStemIndex = (monthStemIndex + i) % 10;
      newBranchIndex = (monthBranchIndex + i) % 12;
    } else {
      newStemIndex = (monthStemIndex - i + 100) % 10;
      newBranchIndex = (monthBranchIndex - i + 120) % 12;
    }

    const stem = HEAVENLY_STEMS[newStemIndex];
    const branch = EARTHLY_BRANCHES[newBranchIndex];
    const tenGod = getTenGod(dayMaster, stem);
    const element = STEM_ELEMENT[stem];

    daYun.push({
      startAge: startAge + (i - 1) * 10,
      endAge: startAge + i * 10 - 1,
      ganZhi: {
        stem,
        branch,
        display: `${stem}${branch}`,
      },
      tenGod,
      element,
      display: `${stem}${branch} (${tenGod})`,
    });
  }

  return daYun;
}

/**
 * 獲取當前大運
 */
export function getCurrentDaYun(daYunList: DaYun[], currentAge: number): DaYun | undefined {
  return daYunList.find(dy => currentAge >= dy.startAge && currentAge <= dy.endAge);
}

/**
 * 計算流年干支
 */
export function calculateLiuNianDaYun(year: number, count: number): GanZhi[] {
  const results: GanZhi[] = [];
  for (let i = 0; i < count; i++) {
    const y = year + i;
    const ganZhiIndex = ((y - 4) % 60 + 60) % 60;
    const stem = HEAVENLY_STEMS[ganZhiIndex % 10];
    const branch = EARTHLY_BRANCHES[ganZhiIndex % 12];
    results.push({ stem, branch, display: `${stem}${branch}` });
  }
  return results;
}
