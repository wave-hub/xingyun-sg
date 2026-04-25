/**
 * 合參整合器 - 三術合一交叉驗證
 * 
 * 接收三個 chart，生成合參分析結構
 */

import {
  BirthInfo, CombinedReading, ZiWeiChart, BaziChart, LiuRenChart,
} from './types';
import { buildZiWeiChart } from './ziwei/chart-builder';
import { buildBaziChart } from './bazi/chart-builder';
import { buildLiuRenChart } from './liuren/chart-builder';

/**
 * 構建三術合參
 * 
 * 同時計算三個術數命盤，進行交叉驗證
 */
export function buildCombinedReading(birthInfo: BirthInfo): CombinedReading {
  // 1. 計算三個命盤
  const ziweiChart = buildZiWeiChart(birthInfo);
  const baziChart = buildBaziChart(birthInfo);
  const liurenChart = buildLiuRenChart(birthInfo);

  // 2. 提取各術數摘要
  const ziweiSummary = extractZiWeiSummary(ziweiChart);
  const baziSummary = extractBaziSummary(baziChart);
  const liurenSummary = extractLiuRenSummary(liurenChart);

  // 3. 交叉驗證
  const crossValidation = performCrossValidation(
    ziweiChart, baziChart, liurenChart
  );

  return {
    method: 'combined',
    birthInfo,
    ziweiSummary,
    baziSummary,
    liurenSummary,
    crossValidation,
  };
}

// ========================================
// 摘要提取
// ========================================

function extractZiWeiSummary(chart: ZiWeiChart) {
  const mingPalace = chart.palaces.find(p => p.name === '命宮');
  const mingPalaceStars = mingPalace
    ? mingPalace.stars.filter(s => s.type === 'major').map(s => s.displayName)
    : [];

  return {
    mingPalaceStars,
    yearTransformations: chart.yearTransformations,
    wuXingJu: chart.wuXingJu,
    mingZhuStar: chart.mingZhuStar,
    shenZhuStar: chart.shenZhuStar,
    bodyPalaceStars: chart.palaces
      .find(p => p.index === chart.bodyPalaceIndex)
      ?.stars.filter(s => s.type === 'major').map(s => s.displayName) || [],
  };
}

function extractBaziSummary(chart: BaziChart) {
  return {
    fourPillars: [
      chart.pillars.year.display,
      chart.pillars.month.display,
      chart.pillars.day.display,
      chart.pillars.hour.display,
    ],
    dayMaster: chart.dayMaster.display,
    dayMasterElement: chart.dayMaster.element,
    wuXingCount: chart.wuXingCount,
    xiJiShen: chart.xiJiShen,
    shenSha: chart.shenSha,
    naYin: chart.naYin,
  };
}

function extractLiuRenSummary(chart: LiuRenChart) {
  return {
    transmission: {
      chu: `${chart.transmission.chu.general || ''}${chart.transmission.chu.branch}`,
      zhong: `${chart.transmission.zhong.general || ''}${chart.transmission.zhong.branch}`,
      mo: `${chart.transmission.mo.general || ''}${chart.transmission.mo.branch}`,
    },
    heavenGenerals: chart.heavenGenerals.map(hg => `${hg.general}臨${hg.position}`),
    transmissionMethod: chart.transmissionMethod,
    yueJiang: chart.yueJiang,
    courses: chart.courses.map(c => c.display),
  };
}

// ========================================
// 交叉驗證
// ========================================

function performCrossValidation(
  ziwei: ZiWeiChart,
  bazi: BaziChart,
  liuren: LiuRenChart
): CombinedReading['crossValidation'] {
  const agreements: string[] = [];
  const differences: string[] = [];

  validateWuXingTrend(ziwei, bazi, agreements, differences);
  validateCareer(ziwei, bazi, agreements, differences);
  validateWealth(ziwei, bazi, agreements, differences);
  validateRelationships(ziwei, bazi, liuren, agreements, differences);
  validateLiuRenGenerals(liuren, agreements, differences);

  const overallAssessment = generateOverallAssessment(agreements, differences);

  return { agreements, differences, overallAssessment };
}

function validateWuXingTrend(
  ziwei: ZiWeiChart,
  bazi: BaziChart,
  agreements: string[],
  differences: string[]
): void {
  const ziweiElement = ziwei.wuXingJu.charAt(0);
  const baziElement = bazi.dayMaster.element;

  if (ziweiElement === baziElement) {
    agreements.push(`紫微五行局（${ziwei.wuXingJu}）與八字日主（${baziElement}）同屬${ziweiElement}行，核心五行一致`);
  } else {
    const generates: Record<string, string> = {
      '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
    };
    if (generates[ziweiElement] === baziElement || generates[baziElement] === ziweiElement) {
      agreements.push(`紫微五行局（${ziweiElement}）與八字日主（${baziElement}）相生，格局和諧`);
    } else {
      differences.push(`紫微五行局（${ziweiElement}）與八字日主（${baziElement}）有所不同，需綜合判斷`);
    }
  }
}

function validateCareer(
  ziwei: ZiWeiChart,
  bazi: BaziChart,
  agreements: string[],
  _differences: string[]
): void {
  const guanLuPalace = ziwei.palaces.find(p => p.name === '官祿宮');
  const careerStars = guanLuPalace?.stars.filter(s => s.type === 'major') || [];

  const allTenGods = [
    ...bazi.pillars.year.tenGods,
    ...bazi.pillars.month.tenGods,
    ...bazi.pillars.hour.tenGods,
  ];
  const hasGuanOrSha = allTenGods.some(tg => tg.god === '正官' || tg.god === '七殺');

  if (careerStars.length > 0 && hasGuanOrSha) {
    agreements.push(`紫微官祿宮有主星${careerStars.map(s => s.displayName).join('、')}坐守，八字有官殺星，事業運勢有保障`);
  }
}

function validateWealth(
  ziwei: ZiWeiChart,
  bazi: BaziChart,
  agreements: string[],
  _differences: string[]
): void {
  const caiBoPalace = ziwei.palaces.find(p => p.name === '財帛宮');
  const wealthStars = caiBoPalace?.stars.filter(s => s.type === 'major') || [];

  const allTenGods = [
    ...bazi.pillars.year.tenGods,
    ...bazi.pillars.month.tenGods,
    ...bazi.pillars.hour.tenGods,
  ];
  const hasCai = allTenGods.some(tg => tg.god === '正財' || tg.god === '偏財');

  if (wealthStars.length > 0 && hasCai) {
    agreements.push(`紫微財帛宮有主星坐守，八字有財星，財運基礎穩固`);
  }
}

function validateRelationships(
  ziwei: ZiWeiChart,
  bazi: BaziChart,
  liuren: LiuRenChart,
  agreements: string[],
  _differences: string[]
): void {
  const jiaoYouPalace = ziwei.palaces.find(p => p.name === '交友宮');
  const friendStars = jiaoYouPalace?.stars.filter(s => s.type === 'minor') || [];
  const hasLiuHe = liuren.heavenGenerals.some(hg => hg.general === '六合');

  if (friendStars.length > 0 && hasLiuHe) {
    agreements.push(`紫微交友宮有吉星輔助，六壬見六合天將，人際關係和諧`);
  }
}

function validateLiuRenGenerals(
  liuren: LiuRenChart,
  agreements: string[],
  differences: string[]
): void {
  const goodGenerals = liuren.heavenGenerals.filter(hg => hg.type === '吉');
  const badGenerals = liuren.heavenGenerals.filter(hg => hg.type === '凶');

  if (goodGenerals.length > badGenerals.length) {
    agreements.push(`六壬天將中吉將居多（${goodGenerals.map(g => g.general).join('、')}），整體趨勢向好`);
  } else if (badGenerals.length > goodGenerals.length) {
    differences.push(`六壬天將中凶將較多（${badGenerals.map(g => g.general).join('、')}），需留意挑戰`);
  }
}

function generateOverallAssessment(
  agreements: string[],
  differences: string[]
): string {
  if (agreements.length >= 3) {
    return `三術合參結果高度一致，共有${agreements.length}項結論互相印證。命主人生格局清晰，各項運勢有良好的交叉支撐。${differences.length > 0 ? `另有${differences.length}項需要綜合參考的細節。` : ''}`;
  } else if (agreements.length >= 1) {
    return `三術合參結果部分一致，${agreements.length}項結論互相印證。各術數角度提供不同層面的參考，建議綜合三方面信息進行判斷。${differences.length > 0 ? `${differences.length}項差異反映了不同術數體系的側重不同。` : ''}`;
  } else {
    return `三術合參結果各有側重，需從多角度綜合分析。不同術數體系各有其獨特視角，建議以某一術數為主，其餘為輔進行參考。`;
  }
}
