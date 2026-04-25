/**
 * 大六壬 - 課盤組裝器
 * 
 * 整合所有模塊，生成完整 LiuRenChart
 */

import { BirthInfo, LiuRenChart, GanZhi, EarthlyBranch } from '../types';
import {
  getYueJiang, YUE_JIANG_NAMES, getHourBranch,
  getDayGanZhi, getHourGanZhi, getYearGanZhi, getMonthGanZhi,
} from './calendar';
import {
  getEarthPlate, getHeavenPlate,
} from './heaven-stem-earth-branch';
import {
  calculateFourCourses, calculateThreeTransmissions,
} from './four-categories-three-chuan';
import {
  assignGenerals, assignGeneralsToTransmissions, getTianYiGuiRen,
} from './twelve-generals';

const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/**
 * 構建完整的大六壬課盤
 */
export function buildLiuRenChart(birthInfo: BirthInfo): LiuRenChart {
  const birthDate = new Date(birthInfo.birthDate);
  const [hourStr, minuteStr] = birthInfo.birthTime.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // 1. 計算四柱干支
  const yearGanZhi = getYearGanZhi(birthDate);
  const monthGanZhi = getMonthGanZhi(birthDate, yearGanZhi);
  const dayGanZhi = getDayGanZhi(birthDate);
  const hourBranch = getHourBranch(hour, minute);
  const hourGanZhi = getHourGanZhi(dayGanZhi.stem, hourBranch);

  // 2. 月將
  const month = birthDate.getMonth() + 1;
  const yueJiang = getYueJiang(month);

  // 3. 天地盤
  const earthPlate = getEarthPlate();
  const heavenPlate = getHeavenPlate(yueJiang, hourBranch);

  // 4. 四課
  const courses = calculateFourCourses(dayGanZhi, heavenPlate, earthPlate);

  // 5. 三傳
  const rawTransmission = calculateThreeTransmissions(
    dayGanZhi, courses, heavenPlate, earthPlate
  );

  // 6. 天將安排
  const generalAssignments = assignGenerals(dayGanZhi, hourBranch, heavenPlate);

  // 7. 為三傳分配天將
  const transmissionGenerals = assignGeneralsToTransmissions(
    {
      chu: rawTransmission.chu.branch,
      zhong: rawTransmission.zhong.branch,
      mo: rawTransmission.mo.branch,
    },
    generalAssignments
  );

  // 8. 空亡
  const branchIndex = EARTHLY_BRANCHES.indexOf(dayGanZhi.branch);
  const kongWang: EarthlyBranch[] = [
    EARTHLY_BRANCHES[(Math.floor(branchIndex / 2) * 2 + 10) % 12],
    EARTHLY_BRANCHES[(Math.floor(branchIndex / 2) * 2 + 11) % 12],
  ];

  return {
    method: 'liuren',
    birthInfo,
    divinationTime: {
      yearGanZhi,
      monthGanZhi,
      dayGanZhi,
      hourGanZhi,
    },
    yueJiang,
    yueJiangName: YUE_JIANG_NAMES[yueJiang],
    plate: {
      earthPlate,
      heavenPlate,
    },
    courses,
    transmission: {
      chu: {
        branch: rawTransmission.chu.branch,
        general: transmissionGenerals.chu,
      },
      zhong: {
        branch: rawTransmission.zhong.branch,
        general: transmissionGenerals.zhong,
      },
      mo: {
        branch: rawTransmission.mo.branch,
        general: transmissionGenerals.mo,
      },
      method: rawTransmission.method,
    },
    generals: generalAssignments,
    heavenGenerals: generalAssignments,
    kongWang,
    transmissionMethod: rawTransmission.method,
  } as LiuRenChart & { yueJiangName?: string };
}
