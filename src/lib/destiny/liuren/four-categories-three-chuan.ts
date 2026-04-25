/**
 * 大六壬 - 四課三傳
 * 
 * 四課（日干課、日支課及其遞推）
 * 九種起傳方式
 * 初傳、中傳、末傳
 */

import { EarthlyBranch, HeavenlyStem, GanZhi, LiuRenCourse, LiuRenTransmission } from '../types';

const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 四課
// ========================================

/**
 * 天干寄宮
 * 
 * 甲寄寅宮、乙寄辰宮、丙寄巳宮、丁寄未宮、戊寄巳宮
 * 己寄未宮、庚寄申宮、辛寄戌宮、壬寄亥宮、癸寄丑宮
 */
const STEM_RESIDENCE: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '寅', '乙': '辰', '丙': '巳', '丁': '未', '戊': '巳',
  '己': '未', '庚': '申', '辛': '戌', '壬': '亥', '癸': '丑',
};

/**
 * 計算四課
 * 
 * 四課是六壬課式的基本結構：
 * - 第一課：日干上神（日干寄宮的天盤上神）→ 以日干所在地支的天盤上神為初
 * - 第二課：日干上神之干的上神（遞推）
 * - 第三課：日支上神（日支的天盤上神）
 * - 第四課：日支上神之支的上神（遞推）
 */
export function calculateFourCourses(
  dayGanZhi: GanZhi,
  heavenPlate: EarthlyBranch[],
  earthPlate: EarthlyBranch[]
): LiuRenCourse[] {
  const courses: LiuRenCourse[] = [];

  // === 第一課：日干上神 ===
  const dayStemResidence = STEM_RESIDENCE[dayGanZhi.stem];
  const dayStemResIndex = EARTHLY_BRANCHES.indexOf(dayStemResidence);
  const firstUpperGod = heavenPlate[dayStemResIndex];

  courses.push({
    order: 1,
    name: '日干課',
    bottom: dayStemResidence,
    top: firstUpperGod,
    display: `${firstUpperGod} / ${dayStemResidence}`,
  });

  // === 第二課：日干上神之上神 ===
  const firstUpperIndex = EARTHLY_BRANCHES.indexOf(firstUpperGod);
  const secondUpperGod = heavenPlate[firstUpperIndex];

  courses.push({
    order: 2,
    name: '日干遞課',
    bottom: firstUpperGod,
    top: secondUpperGod,
    display: `${secondUpperGod} / ${firstUpperGod}`,
  });

  // === 第三課：日支上神 ===
  const dayBranchIndex = EARTHLY_BRANCHES.indexOf(dayGanZhi.branch);
  const thirdUpperGod = heavenPlate[dayBranchIndex];

  courses.push({
    order: 3,
    name: '日支課',
    bottom: dayGanZhi.branch,
    top: thirdUpperGod,
    display: `${thirdUpperGod} / ${dayGanZhi.branch}`,
  });

  // === 第四課：日支上神之上神 ===
  const thirdUpperIndex = EARTHLY_BRANCHES.indexOf(thirdUpperGod);
  const fourthUpperGod = heavenPlate[thirdUpperIndex];

  courses.push({
    order: 4,
    name: '日支遞課',
    bottom: thirdUpperGod,
    top: fourthUpperGod,
    display: `${fourthUpperGod} / ${thirdUpperGod}`,
  });

  return courses;
}

// ========================================
// 三傳起法
// ========================================

/**
 * 五行對應
 */
const BRANCH_ELEMENT: Record<EarthlyBranch, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};

/**
 * 五行剋關係
 */
const ELEMENT_OVERCOMES: Record<string, string> = {
  '木': '土', '火': '金', '土': '水', '金': '木', '水': '火',
};

/**
 * 判斷天盤支是否剋地盤支
 */
function doesOvercome(heaven: EarthlyBranch, earth: EarthlyBranch): boolean {
  return ELEMENT_OVERCOMES[BRANCH_ELEMENT[heaven]] === BRANCH_ELEMENT[earth];
}

/**
 * 判斷天盤支是否生地盤支
 */
function doesGenerate(heaven: EarthlyBranch, earth: EarthlyBranch): boolean {
  const generates: Record<string, string> = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
  };
  return generates[BRANCH_ELEMENT[heaven]] === BRANCH_ELEMENT[earth];
}

/**
 * 計算三傳
 * 
 * 九種起傳方式，按優先級依次嘗試：
 * 1. 賊剋法（最常用）：四課中有上剋下的情況
 * 2. 比用法：多個賊剋時取與日干相比者
 * 3. 涉害法：兩個賊剋者程度相同時
 * 4. 遙剋法：四課無上剋下，但有下剋上且隔位剋
 * 5. 昴星法：四課無剋，取昴星（酉）
 * 6. 別責法：四課有三課相同
 * 7. 八專法：四課干支相同
 * 8. 伏吟法：天盤地盤相同
 * 9. 返吟法：天盤與地盤對沖
 */
export function calculateThreeTransmissions(
  dayGanZhi: GanZhi,
  courses: LiuRenCourse[],
  heavenPlate: EarthlyBranch[],
  earthPlate: EarthlyBranch[]
): LiuRenTransmission {
  // 嘗試賊剋法
  const keResult = tryKeChuan(courses, dayGanZhi);
  if (keResult) return keResult;

  // 嘗試遙剋法
  const yaoKeResult = tryYaoKe(courses, dayGanZhi);
  if (yaoKeResult) return yaoKeResult;

  // 其他起法（簡化處理）
  return tryFallbackTransmissions(courses, dayGanZhi, heavenPlate, earthPlate);
}

/**
 * 賊剋法：四課中上剋下者為初傳
 */
function tryKeChuan(courses: LiuRenCourse[], dayGanZhi: GanZhi): LiuRenTransmission | null {
  const kePairs: { course: LiuRenCourse; index: number }[] = [];

  courses.forEach((course, index) => {
    const top = course.top as EarthlyBranch;
    const bottom = course.bottom as EarthlyBranch;
    if (doesOvercome(top, bottom)) {
      kePairs.push({ course, index });
    }
  });

  if (kePairs.length === 0) return null;

  let firstKe: LiuRenCourse;
  let method = '賊剋';

  if (kePairs.length === 1) {
    firstKe = kePairs[0].course;
  } else {
    // 比用法：取與日干五行相同者
    const dayElement = BRANCH_ELEMENT[dayGanZhi.branch];
    const sameElement = kePairs.find(k =>
      BRANCH_ELEMENT[k.course.top as EarthlyBranch] === dayElement
    );
    if (sameElement) {
      firstKe = sameElement.course;
      method = '比用';
    } else {
      // 取先見者
      firstKe = kePairs[0].course;
    }
  }

  // 初傳
  const chu = firstKe.top as EarthlyBranch;

  // 中傳：初傳的沖位
  const chuIndex = EARTHLY_BRANCHES.indexOf(chu);
  const zhongIndex = (chuIndex + 6) % 12;
  const zhong = EARTHLY_BRANCHES[zhongIndex];

  // 末傳：中傳的沖位
  const moIndex = (zhongIndex + 6) % 12;
  const mo = EARTHLY_BRANCHES[moIndex];

  return {
    chu: { branch: chu, general: '' },
    zhong: { branch: zhong, general: '' },
    mo: { branch: mo, general: '' },
    method,
  };
}

/**
 * 遙剋法：四課無上剋下，取遙剋者
 */
function tryYaoKe(courses: LiuRenCourse[], dayGanZhi: GanZhi): LiuRenTransmission | null {
  // 簡化遙剋法：在四課中尋找下剋上的情況
  const reverseKe: LiuRenCourse[] = [];

  courses.forEach(course => {
    const top = course.top as EarthlyBranch;
    const bottom = course.bottom as EarthlyBranch;
    if (doesOvercome(bottom, top)) {
      reverseKe.push(course);
    }
  });

  if (reverseKe.length === 0) return null;

  const firstKe = reverseKe[0];
  const chu = firstKe.bottom as EarthlyBranch;

  const chuIndex = EARTHLY_BRANCHES.indexOf(chu);
  const zhongIndex = (chuIndex + 6) % 12;
  const moIndex = (zhongIndex + 6) % 12;

  return {
    chu: { branch: chu, general: '' },
    zhong: { branch: EARTHLY_BRANCHES[zhongIndex], general: '' },
    mo: { branch: EARTHLY_BRANCHES[moIndex], general: '' },
    method: '遙剋',
  };
}

/**
 * 其他起傳法（昴星法、伏吟法等）
 */
function tryFallbackTransmissions(
  courses: LiuRenCourse[],
  dayGanZhi: GanZhi,
  heavenPlate: EarthlyBranch[],
  earthPlate: EarthlyBranch[]
): LiuRenTransmission {
  // 檢查伏吟（天盤地盤相同）
  let isFuYin = true;
  for (let i = 0; i < 12; i++) {
    if (heavenPlate[i] !== earthPlate[i]) {
      isFuYin = false;
      break;
    }
  }

  if (isFuYin) {
    // 伏吟法
    const dayBranchIndex = EARTHLY_BRANCHES.indexOf(dayGanZhi.branch);
    const chu = dayGanZhi.branch;
    const zhong = EARTHLY_BRANCHES[(dayBranchIndex + 6) % 12];
    const mo = EARTHLY_BRANCHES[(dayBranchIndex + 6 + 6) % 12];

    return {
      chu: { branch: chu, general: '' },
      zhong: { branch: zhong, general: '' },
      mo: { branch: mo, general: '' },
      method: '伏吟',
    };
  }

  // 檢查返吟（天盤地盤對沖）
  let isFanYin = true;
  for (let i = 0; i < 12; i++) {
    const chongIndex = (i + 6) % 12;
    if (heavenPlate[i] !== earthPlate[chongIndex]) {
      isFanYin = false;
      break;
    }
  }

  if (isFanYin) {
    const dayBranchIndex = EARTHLY_BRANCHES.indexOf(dayGanZhi.branch);
    const chu = EARTHLY_BRANCHES[(dayBranchIndex + 6) % 12];
    const zhong = dayGanZhi.branch;
    const mo = EARTHLY_BRANCHES[(dayBranchIndex + 6) % 12];

    return {
      chu: { branch: chu, general: '' },
      zhong: { branch: zhong, general: '' },
      mo: { branch: mo, general: '' },
      method: '返吟',
    };
  }

  // 昴星法（默認）
  const dayStemIndex = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(dayGanZhi.stem);
  const dayBranchIndex = EARTHLY_BRANCHES.indexOf(dayGanZhi.branch);

  if (dayStemIndex % 2 === 0) {
    // 陽日：取酉上神為初傳
    const youIndex = EARTHLY_BRANCHES.indexOf('酉');
    const chu = heavenPlate[youIndex];
    const chuIdx = EARTHLY_BRANCHES.indexOf(chu);
    return {
      chu: { branch: chu, general: '' },
      zhong: { branch: EARTHLY_BRANCHES[(chuIdx + 6) % 12], general: '' },
      mo: { branch: EARTHLY_BRANCHES[(dayBranchIndex + 6) % 12], general: '' },
      method: '昴星',
    };
  } else {
    // 陰日：取天盤上丑上神為初傳
    const chouIndex = EARTHLY_BRANCHES.indexOf('丑');
    const chu = heavenPlate[chouIndex];
    const chuIdx = EARTHLY_BRANCHES.indexOf(chu);
    return {
      chu: { branch: chu, general: '' },
      zhong: { branch: EARTHLY_BRANCHES[(chuIdx + 6) % 12], general: '' },
      mo: { branch: EARTHLY_BRANCHES[(dayBranchIndex + 6) % 12], general: '' },
      method: '昴星',
    };
  }
}
