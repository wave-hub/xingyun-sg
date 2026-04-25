/**
 * 八字命理 - 四柱排盤
 * 
 * 完整四柱計算，包含藏干
 */

import { BirthInfo, BaziPillar, HeavenlyStem, EarthlyBranch, GanZhi } from '../types';
import { getYearPillar, getMonthPillar, getDayPillar, getHourPillar } from './calendar';

// ========================================
// 地支藏干
// ========================================

/**
 * 地支藏干表
 * 每個地支所藏天干，按主氣、餘氣、雜氣排列
 */
export const HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
};

// ========================================
// 四柱計算
// ========================================

/**
 * 計算完整四柱
 */
export function calculateFourPillars(birthInfo: BirthInfo): {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour: BaziPillar;
} {
  const birthDate = new Date(birthInfo.birthDate);

  const yearPillar = getYearPillar(birthDate);
  const monthPillar = getMonthPillar(birthDate, yearPillar);
  const dayPillar = getDayPillar(birthDate);
  const hourPillar = getHourPillar(birthDate, birthInfo.birthTime, dayPillar);

  return {
    year: buildPillar(yearPillar),
    month: buildPillar(monthPillar),
    day: buildPillar(dayPillar),
    hour: buildPillar(hourPillar),
  };
}

/**
 * 構建單柱數據
 */
function buildPillar(ganZhi: GanZhi): BaziPillar {
  return {
    stem: ganZhi.stem,
    branch: ganZhi.branch,
    hiddenStems: HIDDEN_STEMS[ganZhi.branch] || [],
    tenGods: [], // 由 ten-gods 模塊填充
    display: ganZhi.display,
  };
}

/**
 * 確定日主（日干）
 */
export function getDayMaster(birthInfo: BirthInfo): {
  stem: HeavenlyStem;
  display: string;
} {
  const birthDate = new Date(birthInfo.birthDate);
  const dayPillar = getDayPillar(birthDate);
  return {
    stem: dayPillar.stem,
    display: dayPillar.display,
  };
}
