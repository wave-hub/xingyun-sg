/**
 * 星運堂 XingYun Tang - 統一類型定義
 * 三大術數（紫微斗數、八字命理、大六壬）的共用及各自類型
 */

// ========================================
// 共用出生信息
// ========================================

export interface BirthInfo {
  /** 出生日期，ISO 格式 YYYY-MM-DD */
  birthDate: string;
  /** 出生時間，HH:mm 格式（24小時制） */
  birthTime: string;
  /** 性別 */
  gender: 'male' | 'female';
  /** 曆法類型 */
  calendarType: 'solar' | 'lunar';
  /** 出生地（用於真太陽時計算），可選 */
  location?: string;
}

// ========================================
// 天干地支基礎類型
// ========================================

/** 十天干 */
export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
/** 十二地支 */
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
/** 五行 */
export type WuXing = '木' | '火' | '土' | '金' | '水';
/** 陰陽 */
export type YinYang = '陰' | '陽';

/** 干支組合 */
export interface GanZhi {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  /** 顯示文字，如「甲子」 */
  display: string;
}

// ========================================
// 紫微斗數類型
// ========================================

/** 星曜亮度等級 */
export type StarBrightness = '廟' | '旺' | '得地' | '平' | '落陷';

/** 紫微星曜 */
export interface ZiWeiStar {
  /** 星名 */
  name: string;
  /** 顯示名稱（繁體） */
  displayName: string;
  /** 星曜類型 */
  type: 'major' | 'minor' | 'evil' | 'special';
  /** 五行 */
  element: WuXing;
  /** 陰陽 */
  yinYang: YinYang;
  /** 簡要含義 */
  meaning: string;
  /** 是否為主星 */
  isMajor: boolean;
}

/** 星曜在宮位中的狀態 */
export interface StarInPalace {
  /** 星名 */
  name: string;
  /** 顯示名稱 */
  displayName: string;
  /** 星曜類型 */
  type: 'major' | 'minor' | 'evil' | 'special';
  /** 當前亮度 */
  brightness: StarBrightness;
  /** 五行 */
  element: WuXing;
}

/** 宮位名稱 */
export type PalaceName =
  | '命宮' | '兄弟宮' | '夫妻宮' | '子女宮'
  | '財帛宮' | '疾厄宮' | '遷移宮' | '交友宮'
  | '官祿宮' | '田宅宮' | '福德宮' | '父母宮';

/** 四化類型 */
export type Transformation = '祿' | '權' | '科' | '忌';

/** 宮位數據 */
export interface ZiWeiPalace {
  /** 宮位名稱 */
  name: PalaceName;
  /** 宮位索引 (0-11, 對應地支) */
  index: number;
  /** 地支 */
  branch: EarthlyBranch;
  /** 宮干 */
  stem: HeavenlyStem;
  /** 宮內星曜 */
  stars: StarInPalace[];
  /** 宮位四化（若此宮干有四化） */
  transformations?: {
    star: string;
    type: Transformation;
  }[];
}

/** 大限 */
export interface DaXian {
  /** 大限起始年齡 */
  startAge: number;
  /** 大限結束年齡 */
  endAge: number;
  /** 大限干支 */
  ganZhi: GanZhi;
  /** 大限宮位 */
  palaceIndex: number;
}

/** 流年 */
export interface LiuNian {
  /** 流年年份 */
  year: number;
  /** 流年干支 */
  ganZhi: GanZhi;
}

/** 紫微斗數完整命盤 */
export interface ZiWeiChart {
  /** 排盤方法 */
  method: 'ziwei';
  /** 出生信息 */
  birthInfo: BirthInfo;
  /** 農曆日期 */
  lunarDate: {
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
    ganZhi: GanZhi;
  };
  /** 命宮地支索引 */
  mingPalaceIndex: number;
  /** 身宮地支索引 */
  bodyPalaceIndex: number;
  /** 十二宮完整數據 */
  palaces: ZiWeiPalace[];
  /** 生年四化 */
  yearTransformations: {
    type: Transformation;
    star: string;
  }[];
  /** 大限列表 */
  daXian: DaXian[];
  /** 流年 */
  liuNian: LiuNian[];
  /** 五行局 */
  wuXingJu: string;
  /** 命主星 */
  mingZhuStar: string;
  /** 身主星 */
  shenZhuStar: string;
}

// ========================================
// 八字命理類型
// ========================================

/** 八字四柱 */
export interface BaziPillar {
  /** 天干 */
  stem: HeavenlyStem;
  /** 地支 */
  branch: EarthlyBranch;
  /** 地支藏干 */
  hiddenStems: HeavenlyStem[];
  /** 十神（相對於日主） */
  tenGods: {
    stem: string;
    god: string;
  }[];
  /** 顯示文字 */
  display: string;
}

/** 十神名稱 */
export type TenGodName =
  | '比肩' | '劫財'
  | '食神' | '傷官'
  | '正財' | '偏財'
  | '正官' | '七殺'
  | '正印' | '偏印';

/** 五行統計 */
export interface WuXingCount {
  wood: number;
  fire: number;
  water: number;
  metal: number;
  earth: number;
  /** 最強五行 */
  strongest: WuXing;
  /** 最弱五行 */
  weakest: WuXing;
  /** 日主強弱 */
  dayMasterStrength: '強' | '偏強' | '中和' | '偏弱' | '弱';
}

/** 喜忌神 */
// 神煞類型
export type ShenSha = string;

export interface XiJiShen {
  /** 喜神 */
  xiShen: WuXing[];
  /** 忌神 */
  jiShen: WuXing[];
  /** 用神 */
  yongShen: WuXing[];
  /** 閒神 */
  xianShen: WuXing[];
}

/** 大運 */
export interface DaYun {
  /** 起運年齡 */
  startAge: number;
  /** 大運干支 */
  ganZhi: GanZhi;
  /** 大運天干十神 */
  tenGod: string;
  /** 大運天干五行 */
  element: WuXing;
  /** 影響年段 */
  endAge: number;
  /** 顯示文字 */
  display: string;
}

/** 八字完整命盤 */
export interface BaziChart {
  /** 排盤方法 */
  method: 'bazi';
  /** 出生信息 */
  birthInfo: BirthInfo;
  /** 四柱 */
  pillars: {
    year: BaziPillar;
    month: BaziPillar;
    day: BaziPillar;
    hour: BaziPillar;
  };
  /** 日主 */
  dayMaster: {
    stem: HeavenlyStem;
    element: WuXing;
    yinYang: YinYang;
    display: string;
  };
  /** 五行統計 */
  wuXingCount: WuXingCount;
  /** 喜忌神 */
  xiJiShen: XiJiShen;
  /** 納音五行 */
  naYin: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  /** 節氣信息 */
  jieQi: {
    monthJieQi: string;
    nextJieQi: string;
    nextJieQiDate: string;
  };
  /** 大運列表 */
  daYun: DaYun[];
  /** 當前大運 */
  currentDaYun?: DaYun;
  /** 空亡 */
  kongWang: EarthlyBranch[];
  /** 神煞 */
  shenSha: string[];
}

// ========================================
// 大六壬類型
// ========================================

/** 六壬天地盤 */
export interface LiuRenPlate {
  /** 地盤十二支（固定位置） */
  earthPlate: EarthlyBranch[];
  /** 天盤十二支（月將加臨後） */
  heavenPlate: EarthlyBranch[];
}

/** 四課 */
export interface LiuRenCourse {
  /** 課次 (1-4) */
  order: number;
  /** 課名 */
  name: string;
  /** 第一層（地支） */
  bottom: EarthlyBranch;
  /** 第二層（天干/地支） */
  top: EarthlyBranch | HeavenlyStem;
  /** 顯示文字 */
  display: string;
}

/** 三傳 */
export interface LiuRenTransmission {
  /** 初傳 */
  chu: {
    branch: EarthlyBranch;
    general: string;
  };
  /** 中傳 */
  zhong: {
    branch: EarthlyBranch;
    general: string;
  };
  /** 末傳 */
  mo: {
    branch: EarthlyBranch;
    general: string;
  };
  /** 起傳方式 */
  method: string;
}

/** 十二將神 */
export interface LiuRenGeneral {
  /** 將神名 */
  name: string;
  /** 對應地支 */
  branch: EarthlyBranch;
  /** 類型 */
  type: '吉' | '凶' | '中';
  /** 特性 */
  characteristics: string[];
  /** 象徵 */
  symbolism: string;
}

/** 六壬課盤 */
export interface LiuRenChart {
  /** 排課方法 */
  method: 'liuren';
  /** 出生信息 */
  birthInfo: BirthInfo;
  /** 占課時間 */
  divinationTime: {
    yearGanZhi: GanZhi;
    monthGanZhi: GanZhi;
    dayGanZhi: GanZhi;
    hourGanZhi: GanZhi;
  };
  /** 月將 */
  yueJiang: EarthlyBranch;
  /** 天地盤 */
  plate: LiuRenPlate;
  /** 四課 */
  courses: LiuRenCourse[];
  /** 三傳 */
  transmission: LiuRenTransmission;
  /** 十二將神臨宮 */
  generals: {
    position: EarthlyBranch;
    general: string;
  }[];
  /** 天將加臨 */
  heavenGenerals: {
    position: EarthlyBranch;
    general: string;
    type: '吉' | '凶' | '中';
  }[];
  /** 日空亡 */
  kongWang: EarthlyBranch[];
  /** 起傳方式 */
  transmissionMethod: string;
}

// ========================================
// 合參類型
// ========================================

/** 三術合參結果 */
export interface CombinedReading {
  /** 排盤方法 */
  method: 'combined';
  /** 出生信息 */
  birthInfo: BirthInfo;
  /** 紫微命盤（摘要） */
  ziweiSummary: {
    mingPalaceStars: string[];
    yearTransformations: { type: Transformation; star: string }[];
    wuXingJu: string;
  };
  /** 八字摘要 */
  baziSummary: {
    fourPillars: string[];
    dayMaster: string;
    wuXingCount: WuXingCount;
    xiJiShen: XiJiShen;
  };
  /** 六壬摘要 */
  liurenSummary: {
    transmission: {
      chu: string;
      zhong: string;
      mo: string;
    };
    heavenGenerals: string[];
  };
  /** 交叉驗證 */
  crossValidation: {
    /** 三術一致的結論 */
    agreements: string[];
    /** 需要綜合判斷的差異 */
    differences: string[];
    /** 綜合評估 */
    overallAssessment: string;
  };
}

// ========================================
// 解讀報告統一格式
// ========================================

export interface ReadingReport {
  /** 術數類型 */
  method: 'ziwei' | 'bazi' | 'liuren' | 'combined';
  /** 命盤數據 */
  chartData: ZiWeiChart | BaziChart | LiuRenChart | CombinedReading;
  /** AI 解讀內容 */
  interpretation: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
    summary: string;
    remedies: string[];
  };
  /** 生成時間 */
  generatedAt: string;
}

// ========================================
// API 請求/響應類型
// ========================================

/** 計算命盤請求 */
export interface CalculateRequest {
  birthInfo: BirthInfo;
  /** 是否包含大運/流年 */
  includeDaYun?: boolean;
  /** 流年起始年 */
  liuNianStart?: number;
  /** 流年數量 */
  liuNianCount?: number;
}

/** AI 解讀請求 */
export interface InterpretRequest {
  birthInfo: BirthInfo;
  /** 用戶額外問題 */
  question?: string;
  /** 解讀語言 */
  language?: 'zh-TW' | 'zh-CN' | 'en';
}

/** API 統一響應 */
export interface DestinyResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
