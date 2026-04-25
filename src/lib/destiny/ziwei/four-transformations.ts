/**
 * 紫微斗數 - 四化飛星系統
 * 
 * 化祿、化權、化科、化忌
 * 依天干查四化，宮干飛化
 */

import { HeavenlyStem, Transformation } from '../types';

// ========================================
// 四化基本映射表
// ========================================

/**
 * 四化星表
 * 以天干為鍵，對應四化星曜
 * 
 * 甲：廉貞化祿、破軍化權、武曲化科、太陽化忌
 * 乙：天機化祿、天梁化權、紫微化科、太陰化忌
 * 丙：天同化祿、天機化權、文昌化科、廉貞化忌
 * 丁：太陰化祿、天同化權、天機化科、巨門化忌
 * 戊：貪狼化祿、太陰化權、右弼化科、天機化忌
 * 己：武曲化祿、貪狼化權、天梁化科、文曲化忌
 * 庚：太陽化祿、武曲化權、太陰化科、天同化忌
 * 辛：巨門化祿、太陽化權、文曲化科、文昌化忌
 * 壬：天梁化祿、紫微化權、左輔化科、武曲化忌
 * 癸：破軍化祿、巨門化權、太陰化科、貪狼化忌
 */

export interface FourTransformation {
  lu: string;    // 化祿星
  quan: string;  // 化權星
  ke: string;    // 化科星
  ji: string;    // 化忌星
}

/** 生年四化表（依生年天干） */
export const YEAR_FOUR_TRANSFORMATIONS: Record<HeavenlyStem, FourTransformation> = {
  '甲': { lu: '廉貞', quan: '破軍', ke: '武曲', ji: '太陽' },
  '乙': { lu: '天機', quan: '天梁', ke: '紫微', ji: '太陰' },
  '丙': { lu: '天同', quan: '天機', ke: '文昌', ji: '廉貞' },
  '丁': { lu: '太陰', quan: '天同', ke: '天機', ji: '巨門' },
  '戊': { lu: '貪狼', quan: '太陰', ke: '右弼', ji: '天機' },
  '己': { lu: '武曲', quan: '貪狼', ke: '天梁', ji: '文曲' },
  '庚': { lu: '太陽', quan: '武曲', ke: '太陰', ji: '天同' },
  '辛': { lu: '巨門', quan: '太陽', ke: '文曲', ji: '文昌' },
  '壬': { lu: '天梁', quan: '紫微', ke: '左輔', ji: '武曲' },
  '癸': { lu: '破軍', quan: '巨門', ke: '太陰', ji: '貪狼' },
};

/**
 * 宮干四化表（用於飛星）
 * 各宮天干也有自己的四化
 * 與生年四化使用同一張表
 */

// ========================================
// 四化含義數據
// ========================================

/**
 * 化祿在各宮的含義
 */
export const HUA_LU_MEANINGS: Record<string, string> = {
  '命宮': '天生具有該星化祿的特質，一生受福，人際關係良好，有貴人相助',
  '兄弟宮': '兄弟姊妹感情融洽，能互相幫助',
  '夫妻宮': '婚姻美滿，配偶有財運或帶來財富',
  '子女宮': '子女孝顺有成，子女帶來福氣',
  '財帛宮': '財運亨通，收入穩定且有增長',
  '疾厄宮': '身體健康，少病少災',
  '遷移宮': '在外運勢好，出外發展順利，有貴人',
  '交友宮': '朋友多且有益，人際交往順利',
  '官祿宮': '事業發展順利，職場受器重',
  '田宅宮': '房地產運好，居住環境舒適',
  '福德宮': '精神生活豐富，內心滿足',
  '父母宮': '與父母關係良好，得父母庇蔭',
};

/**
 * 化權在各宮的含義
 */
export const HUA_QUAN_MEANINGS: Record<string, string> = {
  '命宮': '性格剛強有主見，具有領導力，做事果斷',
  '兄弟宮': '兄弟姐妹中有成就者，或與兄弟姐妹關係較為競爭',
  '夫妻宮': '配偶事業有成或性格較強勢',
  '子女宮': '子女能力強，有獨立性',
  '財帛宮': '對財務有主導權，善於理財投資',
  '疾厄宮': '注意肝膽系統和心血管方面的健康',
  '遷移宮': '在外有權勢，外出發展有管理能力',
  '交友宮': '在朋友圈中有領導地位',
  '官祿宮': '事業心強，有管理才能，容易升遷',
  '田宅宮': '對房產有掌控力，善於置產',
  '福德宮': '追求精神權威，有自己的信仰和堅持',
  '父母宮': '與父母有權力互動，或父母較嚴格',
};

/**
 * 化科在各宮的含義
 */
export const HUA_KE_MEANINGS: Record<string, string> = {
  '命宮': '聰明好學，有才華和名聲，性格溫和',
  '兄弟宮': '兄弟姐妹中有學術成就者',
  '夫妻宮': '配偶溫文爾雅，婚姻和諧',
  '子女宮': '子女聰明好學，學業有成',
  '財帛宮': '以才華和名聲獲得財富',
  '疾厄宮': '健康狀況尚可，得醫術庇佑',
  '遷移宮': '在外有良好名聲，受人敬重',
  '交友宮': '結交有學識的朋友',
  '官祿宮': '以專業能力獲得肯定，學術或技術領域發展',
  '田宅宮': '居住環境文雅，注重生活品質',
  '福德宮': '精神生活豐富，有文藝才華',
  '父母宮': '父母有學識，關係溫和',
};

/**
 * 化忌在各宮的含義
 */
export const HUA_JI_MEANINGS: Record<string, string> = {
  '命宮': '性格固執或容易執著，需學習放下和寬容',
  '兄弟宮': '與兄弟姐妹可能有誤會或疏離',
  '夫妻宮': '感情需經營，可能有執著或溝通障礙',
  '子女宮': '對子女的教育需要耐心，或子女時期較叛逆',
  '財帛宮': '理財需謹慎，容易有財務壓力或投資失誤',
  '疾厄宮': '需注意身體健康，定期檢查',
  '遷移宮': '外出發展可能遇到阻力，需做好準備',
  '交友宮': '人際關係需用心維護，容易有誤會',
  '官祿宮': '職場可能遇到瓶頸，需要耐心和毅力',
  '田宅宮': '置產需謹慎，注意合約細節',
  '福德宮': '容易操心、精神緊張，需要放鬆',
  '父母宮': '與父母的溝通需要用心，可能有代溝',
};

// ========================================
// 四化解釋函數
// ========================================

/**
 * 獲取星曜化入某宮的含義
 */
export function getTransformationMeaning(
  transformation: Transformation,
  palaceName: string,
  starName: string
): string {
  const meaningMaps: Record<Transformation, Record<string, string>> = {
    '祿': HUA_LU_MEANINGS,
    '權': HUA_QUAN_MEANINGS,
    '科': HUA_KE_MEANINGS,
    '忌': HUA_JI_MEANINGS,
  };

  const baseMeaning = meaningMaps[transformation]?.[palaceName] || '此宮受四化影響';
  return `${starName}化${transformation}入${palaceName}：${baseMeaning}`;
}

/**
 * 計算宮干四化（飛星）
 * 
 * 給定一個宮的天干，返回該干對應的四化星
 */
export function getPalaceTransformation(stem: HeavenlyStem): {
  type: Transformation;
  star: string;
}[] {
  const fourTrans = YEAR_FOUR_TRANSFORMATIONS[stem];
  if (!fourTrans) return [];

  return [
    { type: '祿', star: fourTrans.lu },
    { type: '權', star: fourTrans.quan },
    { type: '科', star: fourTrans.ke },
    { type: '忌', star: fourTrans.ji },
  ];
}

/**
 * 計算飛星落宮
 * 
 * 查找某顆四化星在命盤中落入哪個宮位
 */
export function findTransformationPalace(
  starName: string,
  starPositions: Record<string, number>
): number | null {
  const pos = starPositions[starName];
  return pos !== undefined ? pos : null;
}
