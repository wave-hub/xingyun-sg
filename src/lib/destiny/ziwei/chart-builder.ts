/**
 * 紫微斗數 - 命盤組裝器
 * 
 * 接收 BirthInfo，輸出完整的 ZiWeiChart 對象
 * 整合 calendar、stars、palace、four-transformations 模塊
 */

import { BirthInfo, ZiWeiChart, ZiWeiPalace, DaXian, LiuNian, Transformation, StarInPalace, HeavenlyStem, EarthlyBranch } from '../types';
import {
  solarToLunar, getHourBranch, getLunarYearGanZhi, getLunarDayGanZhi,
  BRANCHES
} from './calendar';
import {
  MAJOR_STAR_BRIGHTNESS, ZUOFU_POSITIONS, YOUBI_POSITIONS,
  WENCHANG_POSITIONS, WENQU_POSITIONS, TIANKUI_POSITIONS, TIANYUE_POSITIONS,
  LUCUN_POSITIONS, TIANMA_POSITIONS, HONGLUAN_POSITIONS, TIANXI_POSITIONS,
  DIKONG_POSITIONS, DIJIE_POSITIONS, getHuoxingPosition, getLingxingPosition,
  getQingyangPosition, getTuoluoPosition, ALL_STARS, MING_ZHU_STAR, SHEN_ZHU_STAR,
} from './stars';
import {
  getMingPalaceIndex, getBodyPalaceIndex, getAllPalaceStems,
  getWuXingJu, getWuXingJuNumber, getZiWeiPosition,
  getAllMajorStarPositions, PALACE_NAMES, getPalaceBranch
} from './palace';
import { YEAR_FOUR_TRANSFORMATIONS, getPalaceTransformation } from './four-transformations';

/**
 * 構建完整的紫微斗數命盤
 */
export function buildZiWeiChart(birthInfo: BirthInfo): ZiWeiChart {
  const birthDate = new Date(birthInfo.birthDate);
  const [hourStr, minuteStr] = birthInfo.birthTime.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // 1. 轉換為農曆
  const lunar = solarToLunar(birthDate);

  // 2. 獲取干支
  const lunarYearGanZhi = getLunarYearGanZhi(lunar.year);
  const lunarDayGanZhi = getLunarDayGanZhi(birthDate);
  const hourBranch = getHourBranch(hour, minute);
  const hourBranchIndex = BRANCHES.indexOf(hourBranch);

  // 3. 確定命宮和身宮位置
  const mingPalaceIndex = getMingPalaceIndex(lunar.month, hourBranchIndex);
  const bodyPalaceIndex = getBodyPalaceIndex(lunar.month, hourBranchIndex);

  // 4. 計算宮干
  const palaceStems = getAllPalaceStems(mingPalaceIndex, lunarYearGanZhi.stem);

  // 5. 計算五行局
  const mingStem = palaceStems[mingPalaceIndex];
  const mingBranch = BRANCHES[mingPalaceIndex];
  const wuXingJu = getWuXingJu(mingStem, mingBranch);
  const wuXingJuNumber = getWuXingJuNumber(wuXingJu);

  // 6. 確定紫微星位置
  const ziweiPos = getZiWeiPosition(wuXingJuNumber, lunar.day);

  // 7. 計算所有主星位置
  const majorStarPositions = getAllMajorStarPositions(ziweiPos);

  // 8. 計算輔星位置
  const yearBranchIndex = BRANCHES.indexOf(lunarYearGanZhi.branch);
  const yearStemIndex = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(lunarYearGanZhi.stem);

  const allStarPositions: Record<string, number> = { ...majorStarPositions };

  // 左輔（依月份）
  allStarPositions['zuofu'] = ZUOFU_POSITIONS[(lunar.month - 1) % 12];
  // 右弼（依月份）
  allStarPositions['youbi'] = YOUBI_POSITIONS[(lunar.month - 1) % 12];
  // 文昌（依時辰）
  allStarPositions['wenchang'] = WENCHANG_POSITIONS[hourBranchIndex];
  // 文曲（依時辰）
  allStarPositions['wenqu'] = WENQU_POSITIONS[hourBranchIndex];
  // 天魁（依年支）
  allStarPositions['tiankui'] = TIANKUI_POSITIONS[yearBranchIndex];
  // 天鉞（依年支）
  allStarPositions['tianyue'] = TIANYUE_POSITIONS[yearBranchIndex];
  // 祿存（依年干）
  allStarPositions['luCun'] = LUCUN_POSITIONS[yearStemIndex >= 0 ? yearStemIndex : 0];
  // 天馬（依年支）
  allStarPositions['tianma'] = TIANMA_POSITIONS[yearBranchIndex];
  // 紅鸞（依年支）
  allStarPositions['hongLuan'] = HONGLUAN_POSITIONS[yearBranchIndex];
  // 天喜（依年支）
  allStarPositions['tianxi'] = TIANXI_POSITIONS[yearBranchIndex];
  // 地空（依時辰）
  allStarPositions['dikong'] = DIKONG_POSITIONS[hourBranchIndex];
  // 地劫（依時辰）
  allStarPositions['dijie'] = DIJIE_POSITIONS[hourBranchIndex];
  // 火星
  allStarPositions['huoxing'] = getHuoxingPosition(yearBranchIndex, lunar.day, hourBranchIndex);
  // 鈴星
  allStarPositions['lingxing'] = getLingxingPosition(yearBranchIndex, lunar.day, hourBranchIndex);
  // 擎羊和陀羅（跟祿存）
  const luCunPos = allStarPositions['luCun'];
  allStarPositions['qingyang'] = getQingyangPosition(luCunPos);
  allStarPositions['tuoluo'] = getTuoluoPosition(luCunPos);

  // 9. 生年四化
  const yearFourTrans = YEAR_FOUR_TRANSFORMATIONS[lunarYearGanZhi.stem];
  const yearTransformations: { type: Transformation; star: string }[] = yearFourTrans
    ? [
        { type: '祿', star: yearFourTrans.lu },
        { type: '權', star: yearFourTrans.quan },
        { type: '科', star: yearFourTrans.ke },
        { type: '忌', star: yearFourTrans.ji },
      ]
    : [];

  // 10. 組裝十二宮
  const palaces: ZiWeiPalace[] = [];
  for (let i = 0; i < 12; i++) {
    const relativeIndex = (i - mingPalaceIndex + 12) % 12;
    const palaceName = PALACE_NAMES[relativeIndex];
    const palaceBranch = getPalaceBranch(i);
    const palaceStem = palaceStems[i];

    // 獲取此宮的所有星曜
    const stars: StarInPalace[] = [];
    for (const [starName, pos] of Object.entries(allStarPositions)) {
      if (pos === i) {
        const starData = ALL_STARS[starName];
        const displayName = starData?.displayName || starName;
        const element = starData?.element || '土' as const;
        const type = starData?.type || 'special' as const;

        // 計算亮度（主星才查表，其他星標記為"平"）
        let brightness: '廟' | '旺' | '得地' | '平' | '落陷' = '平';
        if (MAJOR_STAR_BRIGHTNESS[starName]) {
          brightness = MAJOR_STAR_BRIGHTNESS[starName][i];
        }

        stars.push({ name: starName, displayName, type, brightness, element });
      }
    }

    // 按星曜重要性排序：主星 > 輔星 > 雜曜 > 煞星
    stars.sort((a, b) => {
      const order: Record<string, number> = { major: 0, minor: 1, special: 2, evil: 3 };
      return (order[a.type] || 4) - (order[b.type] || 4);
    });

    // 宮干四化
    const transformations = getPalaceTransformation(palaceStem);

    palaces.push({
      name: palaceName,
      index: i,
      branch: palaceBranch,
      stem: palaceStem,
      stars,
      transformations,
    });
  }

  // 11. 大限
  const daXian = calculateDaXian(mingPalaceIndex, birthInfo.gender === 'male' ? '陽' : '陰', lunarYearGanZhi.stem);

  // 12. 流年
  const currentYear = new Date().getFullYear();
  const liuNian = calculateLiuNian(currentYear, 10);

  // 13. 命主星和身主星
  const mingZhuStar = MING_ZHU_STAR[mingPalaceIndex] || '未定';
  const shenZhuStar = SHEN_ZHU_STAR[bodyPalaceIndex] || '未定';

  return {
    method: 'ziwei',
    birthInfo,
    lunarDate: {
      year: lunar.year,
      month: lunar.month,
      day: lunar.day,
      isLeapMonth: lunar.isLeapMonth,
      ganZhi: lunarYearGanZhi,
    },
    mingPalaceIndex,
    bodyPalaceIndex,
    palaces,
    yearTransformations,
    daXian,
    liuNian,
    wuXingJu,
    mingZhuStar,
    shenZhuStar,
  };
}

// ========================================
// 大限計算
// ========================================

/**
 * 計算大限
 * 
 * 大限起運歲數計算：
 * - 陽年男命/陰年女命：順行（命宮開始往數）
 * - 陰年男命/陽年女命：逆行（命宮開始往逆數）
 * 
 * 每個大限十年
 */
function calculateDaXian(
  mingPalaceIndex: number,
  genderYinYang: '陽' | '陰',
  yearStem: string
): DaXian[] {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const stemIndex = stems.indexOf(yearStem);
  const isYang = stemIndex % 2 === 0;
  const isForward = (isYang && genderYinYang === '陽') || (!isYang && genderYinYang === '陰');

  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const daXian: DaXian[] = [];
  let startAge = 2; // 一般2歲起運（簡化）
  let currentPalace = mingPalaceIndex;

  for (let i = 0; i < 8; i++) {
    const startIdx = (stemIndex + (isForward ? i : -i) + 100) % 10;
    const branchIdx = (currentPalace + (isForward ? i : -i) + 120) % 12;

    daXian.push({
      startAge: startAge + i * 10,
      endAge: startAge + (i + 1) * 10 - 1,
      ganZhi: {
        stem: stems[startIdx] as HeavenlyStem,
        branch: branches[branchIdx] as EarthlyBranch,
        display: `${stems[startIdx]}${branches[branchIdx]}`,
      },
      palaceIndex: (mingPalaceIndex + (isForward ? i : -i) + 120) % 12,
    });
  }

  return daXian;
}

// ========================================
// 流年計算
// ========================================

/**
 * 計算流年干支
 */
function calculateLiuNian(startYear: number, count: number): LiuNian[] {
  const stems: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const branches: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const liuNian: LiuNian[] = [];

  for (let i = 0; i < count; i++) {
    const year = startYear + i;
    const ganZhiIndex = ((year - 4) % 60 + 60) % 60;
    const stemIndex = ganZhiIndex % 10;
    const branchIndex = ganZhiIndex % 12;

    liuNian.push({
      year,
      ganZhi: {
        stem: stems[stemIndex],
        branch: branches[branchIndex],
        display: `${stems[stemIndex]}${branches[branchIndex]}`,
      },
    });
  }

  return liuNian;
}
