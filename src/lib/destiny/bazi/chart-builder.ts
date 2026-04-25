/**
 * 八字命理 - 八字盤組裝器
 * 
 * 整合所有模塊，生成完整 BaziChart
 */

import {
  BirthInfo, BaziChart, EarthlyBranch, ShenSha,
} from '../types';
import { getYearPillar, getMonthPillar, getDayPillar, getHourPillar, getJieQiInfo } from './calendar';
import { calculateFourPillars, HIDDEN_STEMS } from './four-pillars';
import { countWuXing, determineXiJiShen, STEM_ELEMENT, BRANCH_ELEMENT } from './five-elements';
import { getTenGod } from './ten-gods';
import { calculateDaYun, getCurrentDaYun } from './da-yun';

// ========================================
// 納音五行
// ========================================

/**
 * 六十甲子納音表
 * 每兩個干支為一組，共用一個納音
 */
const NA_YIN_TABLE: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金',
  '丙寅': '爐中火', '丁卯': '爐中火',
  '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '劍鋒金', '癸酉': '劍鋒金',
  '甲戌': '山頭火', '乙亥': '山頭火',
  '丙子': '澗下水', '丁丑': '澗下水',
  '戊寅': '城頭土', '己卯': '城頭土',
  '庚辰': '白蠟金', '辛巳': '白蠟金',
  '壬午': '楊柳木', '癸未': '楊柳木',
  '甲申': '泉中水', '乙酉': '泉中水',
  '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹靂火', '己丑': '霹靂火',
  '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '長流水', '癸巳': '長流水',
  '甲午': '砂石金', '乙未': '砂石金',
  '丙申': '山下火', '丁酉': '山下火',
  '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土',
  '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆燈火', '乙巳': '覆燈火',
  '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驛土', '己酉': '大驛土',
  '庚戌': '釵钏金', '辛亥': '釵钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木',
  '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木',
  '壬戌': '大海水', '癸亥': '大海水',
};

// ========================================
// 空亡
// ========================================

/**
 * 計算空亡地支
 * 
 * 空亡規則：日柱干支在六十甲子中的位置，
 * 其所在旬的兩個空亡地支
 */
export function calculateKongWang(dayBranch: EarthlyBranch): EarthlyBranch[] {
  const branchOrder: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const branchIndex = branchOrder.indexOf(dayBranch);

  // 甲子旬：戌亥空
  // 甲戌旬：申酉空
  // 甲申旬：午未空
  // 甲午旬：辰巳空
  // 甲辰旬：寅卯空
  // 甲寅旬：子丑空
  const kongWangMap: EarthlyBranch[][] = [
    ['戌', '亥'], ['申', '酉'], ['午', '未'],
    ['辰', '巳'], ['寅', '卯'], ['子', '丑'],
  ];

  const xunIndex = Math.floor(branchIndex / 2);
  return kongWangMap[xunIndex] || [];
}

// ========================================
// 神煞
// ========================================

/**
 * 計算常見神煞
 */
export function calculateShenSha(
  yearBranch: EarthlyBranch,
  dayBranch: EarthlyBranch,
  monthBranch: EarthlyBranch,
  hourBranch: EarthlyBranch
): string[] {
  const shenSha: string[] = [];

  // 天乙貴人（以日干查）
  const tianYiGuiRen: Record<string, EarthlyBranch[]> = {
    '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
    '乙': ['子', '申'], '己': ['子', '申'],
    '丙': ['亥', '酉'], '丁': ['亥', '酉'],
    '壬': ['卯', '巳'], '癸': ['卯', '巳'],
    '辛': ['午', '寅'],
  };

  // 文昌貴人
  const wenChangMap: Record<string, EarthlyBranch> = {
    '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
    '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯',
  };

  // 驛馬
  const yiMaMap: Record<string, EarthlyBranch> = {
    '寅': '申', '午': '申', '戌': '申',
    '申': '寅', '子': '寅', '辰': '寅',
    '巳': '亥', '酉': '亥', '丑': '亥',
    '亥': '巳', '卯': '巳', '未': '巳',
  };

  // 桃花
  const taoHuaMap: Record<string, EarthlyBranch> = {
    '寅': '卯', '午': '卯', '戌': '卯',
    '申': '酉', '子': '酉', '辰': '酉',
    '巳': '午', '酉': '午', '丑': '午',
    '亥': '子', '卯': '子', '未': '子',
  };

  // 華蓋
  const huaGaiMap: Record<string, EarthlyBranch> = {
    '寅': '戌', '午': '戌', '戌': '戌',
    '申': '辰', '子': '辰', '辰': '辰',
    '巳': '丑', '酉': '丑', '丑': '丑',
    '亥': '未', '卯': '未', '未': '未',
  };

  // 將星
  const jiangXingMap: Record<string, EarthlyBranch> = {
    '寅': '午', '午': '午', '戌': '午',
    '申': '子', '子': '子', '辰': '子',
    '巳': '酉', '酉': '酉', '丑': '酉',
    '亥': '卯', '卯': '卯', '未': '卯',
  };

  const allBranches = [yearBranch, monthBranch, dayBranch, hourBranch];

  // 檢查驛馬
  if (allBranches.includes(yiMaMap[yearBranch])) {
    shenSha.push('驛馬');
  }

  // 檢查桃花
  if (allBranches.includes(taoHuaMap[yearBranch])) {
    shenSha.push('桃花');
  }

  // 檢查華蓋
  if (allBranches.includes(huaGaiMap[yearBranch])) {
    shenSha.push('華蓋');
  }

  // 檢查將星
  if (allBranches.includes(jiangXingMap[yearBranch])) {
    shenSha.push('將星');
  }

  return [...new Set(shenSha)];
}

// ========================================
// 組裝完整八字盤
// ========================================

/**
 * 構建完整八字命盤
 */
export function buildBaziChart(birthInfo: BirthInfo): BaziChart {
  const birthDate = new Date(birthInfo.birthDate);

  // 1. 計算四柱
  const pillars = calculateFourPillars(birthInfo);

  // 2. 日主
  const dayMasterStem = pillars.day.stem;
  const dayMasterElement = STEM_ELEMENT[dayMasterStem];
  const yinYang = (['甲', '丙', '戊', '庚', '壬'].includes(dayMasterStem)) ? '陽' : '陰';

  // 3. 填充十神
  const allStems = [
    { pillar: pillars.year, stem: pillars.year.stem },
    { pillar: pillars.month, stem: pillars.month.stem },
    { pillar: pillars.day, stem: pillars.day.stem },
    { pillar: pillars.hour, stem: pillars.hour.stem },
  ];

  allStems.forEach(({ pillar, stem }) => {
    pillar.tenGods = [{
      stem,
      god: getTenGod(dayMasterStem, stem),
    }];

    // 藏干十神
    const hidden = HIDDEN_STEMS[pillar.branch] || [];
    hidden.forEach(hs => {
      pillar.tenGods.push({
        stem: hs,
        god: getTenGod(dayMasterStem, hs),
      });
    });
  });

  // 4. 五行統計
  const wuXingCount = countWuXing(dayMasterStem, pillars);

  // 5. 喜忌神
  const xiJiShen = determineXiJiShen(dayMasterStem, wuXingCount);

  // 6. 納音
  const naYin = {
    year: NA_YIN_TABLE[pillars.year.display] || '未知',
    month: NA_YIN_TABLE[pillars.month.display] || '未知',
    day: NA_YIN_TABLE[pillars.day.display] || '未知',
    hour: NA_YIN_TABLE[pillars.hour.display] || '未知',
  };

  // 7. 節氣
  const jieQi = getJieQiInfo(birthDate);

  // 8. 大運
  const daYun = calculateDaYun(
    birthDate,
    { stem: pillars.year.stem, branch: pillars.year.branch, display: pillars.year.display },
    { stem: pillars.month.stem, branch: pillars.month.branch, display: pillars.month.display },
    pillars.year.stem,
    birthInfo.gender,
    dayMasterStem
  );

  // 9. 當前大運
  const currentAge = Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 86400000));
  const currentDaYun = getCurrentDaYun(daYun, currentAge);

  // 10. 空亡
  const kongWang = calculateKongWang(pillars.day.branch);

  // 11. 神煞
  const shenSha = calculateShenSha(
    pillars.year.branch,
    pillars.day.branch,
    pillars.month.branch,
    pillars.hour.branch
  );

  return {
    method: 'bazi',
    birthInfo,
    pillars,
    dayMaster: {
      stem: dayMasterStem,
      element: dayMasterElement,
      yinYang: yinYang as '陽' | '陰',
      display: dayMasterStem,
    },
    wuXingCount,
    xiJiShen,
    naYin,
    jieQi,
    daYun,
    currentDaYun,
    kongWang,
    shenSha,
  };
}
