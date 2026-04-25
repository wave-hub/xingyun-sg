// 客戶評價 Mock 數據

export interface Testimonial {
  id: string;
  name: string;
  nameEn: string;
  avatarInitial: string;
  location: string;
  rating: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  service: string;
  serviceEn: string;
  date: string;
  isVerified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    name: "陳美玲",
    nameEn: "Chen Mei Ling",
    avatarInitial: "陳",
    location: "新加坡 · 烏節路",
    rating: 5,
    title: "紫微斗數改變了我對人生的理解",
    titleEn: "Zi Wei Dou Shu Changed My Understanding of Life",
    content:
      "一直覺得人生迷茫，不知道該往哪個方向走。玄清道長用紫微斗數幫我排了命盤，詳細解讀了我的十二宮。最驚訝的是他說我三十五歲會有一次事業上的大轉折，當時覺得不可能，但去年真的發生了！現在回頭看，那次的解讀幫我提前做好了準備。",
    contentEn:
      "I always felt lost in life. Master Xuan Qing read my Zi Wei Dou Shu chart and predicted a major career shift at age 35. It happened exactly as predicted!",
    service: "紫微斗數深度解讀",
    serviceEn: "Deep Zi Wei Dou Shu Reading",
    date: "2025-03-15",
    isVerified: true,
  },
  {
    id: "test-002",
    name: "林偉豪",
    nameEn: "Lim Wei Hao",
    avatarInitial: "林",
    location: "新加坡 · 武吉知馬",
    rating: 5,
    title: "八字合婚讓我做出了正確的決定",
    titleEn: "Ba Zi Marriage Compatibility Helped Me Make the Right Decision",
    content:
      "和女友準備結婚時，母親堅持要做八字合婚。本來不太相信，但明德先生的分析非常專業客觀，不僅分析了我和女友的八字配合度，還給了很多婚姻相處的建議。最難得的是他不只說好話，也指出了需要注意的地方。現在孩子都快出生了，非常感謝！",
    contentEn:
      "Master Ming De provided an objective and professional Ba Zi marriage compatibility analysis. His advice was practical and balanced.",
    service: "八字合婚",
    serviceEn: "Ba Zi Marriage Compatibility",
    date: "2025-02-28",
    isVerified: true,
  },
  {
    id: "test-003",
    name: "張雅琪",
    nameEn: "Zhang Ya Qi",
    avatarInitial: "張",
    location: "馬來西亞 · 吉隆坡",
    rating: 5,
    title: "靜虚師姐讓我找回了自信",
    titleEn: "Sister Jing Xu Helped Me Find My Confidence Again",
    content:
      "去年經歷了一段很低谷的時期，朋友推薦了靜虚師姐。她不只幫我看了命盤，還從心理學的角度幫我分析了性格中的優勢和盲點。那種被理解和被引導的感覺真的很溫暖。現在我的狀態好了很多，也開始積極規劃未來了。",
    contentEn:
      "Sister Jing Xu didn't just read my chart — she combined psychological insights with traditional analysis. The guidance was truly comforting and practical.",
    service: "紫微斗數AI解讀 + 心靈諮詢",
    serviceEn: "Zi Wei AI Reading + Spiritual Counseling",
    date: "2025-04-02",
    isVerified: true,
  },
  {
    id: "test-004",
    name: "王建國",
    nameEn: "Wang Jian Guo",
    avatarInitial: "王",
    location: "新加坡 · 濱海灣",
    rating: 4,
    title: "大六壬預測真的很精準",
    titleEn: "Da Liu Ren Predictions Are Remarkably Accurate",
    content:
      "做了一筆大投資前，想問問運勢。玄清道長用大六壬幫我起課斷事，預測了大概的時間節點和需要注意的事項。雖然過程中有些波折，但最終結果確實如他所說。不過也要提醒大家，命理只是參考，自己的判斷和努力同樣重要。",
    contentEn:
      "Master Xuan Qing used Da Liu Ren to help me time a major investment decision. The predictions were remarkably accurate, though personal judgment matters too.",
    service: "大六壬斷課",
    serviceEn: "Da Liu Ren Divination",
    date: "2025-01-20",
    isVerified: true,
  },
  {
    id: "test-005",
    name: "李佳恩",
    nameEn: "Lee Jia En",
    avatarInitial: "李",
    location: "新加坡 · 裕廊",
    rating: 5,
    title: "開光靈器帶來了好運",
    titleEn: "Blessed Items Brought Good Fortune",
    content:
      "年初買了龍龜翡翠吊墜，收到後質量非常好，附帶的開光證書也很正規。佩戴了三個月後，感覺工作上的人際關係明顯改善，談了幾個案子都比較順利。雖然不一定全是靈器的功勞，但心理上的正面暗示也很有價值。包裝精美，送禮也很合適。",
    contentEn:
      "The Dragon Turtle jade pendant was beautifully crafted with authentic blessing certificates. I've noticed positive changes since wearing it.",
    service: "靈器商城 — 龍龜翡翠吊墜",
    serviceEn: "Shop — Dragon Turtle Jade Pendant",
    date: "2025-04-10",
    isVerified: true,
  },
  {
    id: "test-006",
    name: "黃志明",
    nameEn: "Ng Chee Meng",
    avatarInitial: "黃",
    location: "新加坡 · 宏茂橋",
    rating: 5,
    title: "三術合參的報告超級詳細",
    titleEn: "The Three-Method Combined Report Was Incredibly Detailed",
    content:
      "嘗試了三術合參的旗艦服務，同時用紫微斗數、八字和大六壬三種術數來分析我的運勢。報告非常詳細，有三十多頁，每一頁都是乾貨。三種術數互相印證的感覺很特別，讓我對自己的運勢有了更立體的了解。價格雖然不便宜，但物有所值。",
    contentEn:
      "The Three-Method Combined report was 30+ pages of valuable insights. Seeing three divination systems cross-verify was a truly unique experience.",
    service: "三術合參旗艦解讀",
    serviceEn: "Three-Method Combined Premium Reading",
    date: "2025-03-28",
    isVerified: true,
  },
];

export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonials.filter((t) => t.service === service);
}

export function getTopTestimonials(limit = 3): Testimonial[] {
  return [...testimonials]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
