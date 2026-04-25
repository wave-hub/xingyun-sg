/**
 * 大六壬 - 十二將神（天將）
 * 
 * 十二天將完整數據與安排規則
 */

import { EarthlyBranch, LiuRenGeneral } from '../types';

const EARTHLY_BRANCHES: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ========================================
// 十二天將數據
// ========================================

export const TWELVE_GENERALS: LiuRenGeneral[] = [
  {
    name: '貴人',
    branch: '丑',
    type: '吉',
    characteristics: ['尊貴', '長官', '貴人', '庇護', '官長', '助力'],
    symbolism: '代表貴人、長官、尊貴之人，主榮達、受提拔',
  },
  {
    name: '螣蛇',
    branch: '巳',
    type: '凶',
    characteristics: ['驚恐', '纏繞', '怪異', '虛驚', '夢魘', '精神不安'],
    symbolism: '代表蛇蟲驚擾、夢魘虛驚、糾纏不清之事',
  },
  {
    name: '朱雀',
    branch: '午',
    type: '凶',
    characteristics: ['口舌', '文書', '爭訟', '信息', '是非', '消息'],
    symbolism: '代表文書口舌、官司爭訟、遠方信息',
  },
  {
    name: '六合',
    branch: '卯',
    type: '吉',
    characteristics: ['和合', '婚姻', '合作', '仲介', '盟約', '美滿'],
    symbolism: '代表和合婚姻、合作交易、媒人仲介',
  },
  {
    name: '勾陣（勾陳）',
    branch: '辰',
    type: '凶',
    characteristics: ['遲滯', '糾紛', '牽連', '田土', '拖延', '糾葛'],
    symbolism: '代表遲滯拖延、田土糾紛、牽連之事',
  },
  {
    name: '青龍',
    branch: '寅',
    type: '吉',
    characteristics: ['喜慶', '財帛', '婚姻', '科名', '吉祥', '貴人'],
    symbolism: '代表喜慶財祿、婚姻科名、吉祥如意的正向力量',
  },
  {
    name: '天空',
    branch: '戌',
    type: '凶',
    characteristics: ['欺騙', '空亡', '虛偽', '不實', '破敗', '空手'],
    symbolism: '代表虛偽欺騙、空亡無實、徒勞之事',
  },
  {
    name: '白虎',
    branch: '申',
    type: '凶',
    characteristics: ['血光', '兇險', '孝服', '道路', '權力', '軍旅'],
    symbolism: '代表血光之災、道路兇險、喪事孝服，也有軍旅權力之意',
  },
  {
    name: '太常',
    branch: '未',
    type: '吉',
    characteristics: ['衣食', '財祿', '宴會', '溫飽', '農田', '常業'],
    symbolism: '代表衣食財祿、宴會吉慶、安穩之業',
  },
  {
    name: '玄武',
    branch: '亥',
    type: '凶',
    characteristics: ['盜賊', '暗昧', '陰私', '詐欺', '水災', '不明'],
    symbolism: '代表盜賊詐欺、暗昧不明之事、陰私水患',
  },
  {
    name: '太陰',
    branch: '酉',
    type: '吉',
    characteristics: ['隱祕', '貴人', '財帛', '女貴', '私寶', '神祕'],
    symbolism: '代表暗中貴人、私密財帛、陰柔助力',
  },
  {
    name: '天后',
    branch: '子',
    type: '吉',
    characteristics: ['女性貴人', '后妃', '水', '柔順', '庇護', '生育'],
    symbolism: '代表后妃女性貴人、水之力量、溫柔庇護',
  },
];

/** 將神查找表 */
export const GENERAL_BY_NAME: Record<string, LiuRenGeneral> = {};
TWELVE_GENERALS.forEach(g => { GENERAL_BY_NAME[g.name] = g; });

// ========================================
// 貴人規則
// ========================================

/**
 * 晝貴夜貴
 * 
 * 天乙貴人的晝夜分佈：
 * - 晝貴（卯時至酉時）：貴人起於丑，逆行
 * - 夜貴（酉時至卯時）：貴人起於未，逆行
 * 
 * 查貴人法（以日干查）：
 * 甲戊庚牛羊（丑未）
 * 乙己鼠猴鄉（子申）
 * 丙丁豬雞位（亥酉）
 * 壬癸兔蛇藏（卯巳）
 * 六辛逢馬虎（午寅）
 */
const GUIREN_DAYLIGHT: Record<string, EarthlyBranch> = {
  '甲': '丑', '戊': '丑', '庚': '丑',
  '乙': '子', '己': '子',
  '丙': '亥', '丁': '亥',
  '壬': '卯', '癸': '卯',
  '辛': '午',
};

const GUIREN_NIGHT: Record<string, EarthlyBranch> = {
  '甲': '未', '戊': '未', '庚': '未',
  '乙': '申', '己': '申',
  '丙': '酉', '丁': '酉',
  '壬': '巳', '癸': '巳',
  '辛': '寅',
};

/**
 * 判斷是晝時還是夜時
 */
export function isDayTime(hourBranch: EarthlyBranch): boolean {
  const dayHours: EarthlyBranch[] = ['卯', '辰', '巳', '午', '未', '申'];
  return dayHours.includes(hourBranch);
}

/**
 * 根據日干和時辰獲取天乙貴人地支
 */
export function getTianYiGuiRen(dayStem: string, hourBranch: EarthlyBranch): EarthlyBranch {
  const isDay = isDayTime(hourBranch);
  const guirenMap = isDay ? GUIREN_DAYLIGHT : GUIREN_NIGHT;
  return guirenMap[dayStem] || '丑';
}

// ========================================
// 天將安排
// ========================================

/**
 * 天將安排順序
 * 
 * 從貴人起，逆時針排列：
 * 貴人 → 螣蛇 → 朱雀 → 六合 → 勾陣 → 青龍 → 天空 → 白虎 → 太常 → 玄武 → 太陰 → 天后
 * 
 * 對應地支順序（以貴人位置為起點逆行）：
 * 貴人(0) 螣蛇(11) 朱雀(10) 六合(9) 勾陣(8) 青龍(7) 天空(6) 白虎(5) 太常(4) 玄武(3) 太陰(2) 天后(1)
 */
const GENERAL_SEQUENCE = [
  '貴人', '天后', '太陰', '玄武', '太常', '白虎',
  '天空', '青龍', '勾陣', '六合', '朱雀', '螣蛇',
];

/**
 * 將十二天將安排到天盤各位置
 * 
 * 以天乙貴人加臨於日干或日支上，
 * 其餘天將按照固定順序排列
 */
export function assignGenerals(
  dayGanZhi: { stem: string; branch: string },
  hourBranch: EarthlyBranch,
  heavenPlate: EarthlyBranch[]
): { position: EarthlyBranch; general: string; type: '吉' | '凶' | '中' }[] {
  // 確定貴人位置
  const guirenBranch = getTianYiGuiRen(dayGanZhi.stem, hourBranch);
  const guirenIndex = EARTHLY_BRANCHES.indexOf(guirenBranch);

  // 從貴人位置開始，逆時針排列各天將
  const assignments: { position: EarthlyBranch; general: string; type: '吉' | '凶' | '中' }[] = [];

  for (let i = 0; i < 12; i++) {
    const positionIndex = (guirenIndex - i + 12) % 12;
    const generalName = GENERAL_SEQUENCE[i];
    const general = GENERAL_BY_NAME[generalName];

    assignments.push({
      position: EARTHLY_BRANCHES[positionIndex],
      general: generalName,
      type: general?.type || '中',
    });
  }

  return assignments;
}

/**
 * 為三傳分配天將
 */
export function assignGeneralsToTransmissions(
  transmissions: { chu: EarthlyBranch; zhong: EarthlyBranch; mo: EarthlyBranch },
  generalAssignments: { position: EarthlyBranch; general: string; type: '吉' | '凶' | '中' }[]
): { chu: string; zhong: string; mo: string } {
  const findGeneral = (branch: EarthlyBranch) => {
    const found = generalAssignments.find(a => a.position === branch);
    return found?.general || '未定';
  };

  return {
    chu: findGeneral(transmissions.chu),
    zhong: findGeneral(transmissions.zhong),
    mo: findGeneral(transmissions.mo),
  };
}
