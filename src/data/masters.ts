// 大師 Mock 數據

export interface Master {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  specialties: string[];
  specialtiesEn: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  bioEn: string;
  avatarUrl: string;
  priceRange: { min: number; max: number };
  certifications: string[];
  isAvailable: boolean;
}

export const masters: Master[] = [
  {
    id: "master-001",
    name: "玄清道長",
    nameEn: "Master Xuan Qing",
    title: "紫微斗數 · 大六壬 首席顧問",
    titleEn: "Chief Consultant — Zi Wei Dou Shu & Da Liu Ren",
    specialties: ["紫微斗數", "大六壬", "風水堪輿", "擇日"],
    specialtiesEn: ["Zi Wei Dou Shu", "Da Liu Ren", "Feng Shui", "Date Selection"],
    yearsExperience: 28,
    rating: 4.9,
    reviewCount: 1247,
    bio: "玄清道長出身道教世家，自幼隨祖父研習命理學。二十八年來服務超過三千位客戶，擅長以紫微斗數精準定位人生格局，輔以大六壬斷事決疑。曾為多家上市公司提供企業風水顧問服務，並在新加坡道教協會擔任學術顧問。Master Xuan Qing comes from a Taoist family with 28 years of experience in destiny analysis.",
    bioEn:
      "Master Xuan Qing comes from a Taoist family with over 28 years of experience. Having served more than 3,000 clients, he specializes in using Zi Wei Dou Shu to map life patterns and Da Liu Ren for precise divination.",
    avatarUrl: "/placeholder/master-1.jpg",
    priceRange: { min: 188, max: 888 },
    certifications: [
      "中國道教協會認證道長",
      "新加坡道教總會顧問",
      "國際命理師聯盟高級會員",
    ],
    isAvailable: true,
  },
  {
    id: "master-002",
    name: "明德先生",
    nameEn: "Master Ming De",
    title: "八字命理 · 擇日 首席顧問",
    titleEn: "Chief Consultant — Ba Zi & Date Selection",
    specialties: ["八字命理", "擇日合婚", "姓名學", "陽宅風水"],
    specialtiesEn: ["Ba Zi", "Date Selection", "Name Analysis", "Feng Shui"],
    yearsExperience: 22,
    rating: 4.8,
    reviewCount: 892,
    bio: "明德先生畢業於武漢大學哲學系，後拜入命理名家門下深造。擅長以八字命理分析五行格局，精於擇日合婚及姓名學。其獨特的「五行調和」理論受到業內廣泛認可，曾多次受邀在新加坡中華總商會舉辦命理講座。Master Ming De combines academic philosophy with traditional Chinese metaphysics.",
    bioEn:
      "Master Ming De graduated from Wuhan University with a degree in philosophy before apprenticing under renowned metaphysics masters. His unique 'Five Elements Harmony' theory is widely recognized in the industry.",
    avatarUrl: "/placeholder/master-2.jpg",
    priceRange: { min: 128, max: 588 },
    certifications: [
      "國際易學聯合會認證命理師",
      "中華姓名學研究會高級研究員",
      "新加坡風水師協會會員",
    ],
    isAvailable: true,
  },
  {
    id: "master-003",
    name: "靜虚師姐",
    nameEn: "Sister Jing Xu",
    title: "紫微斗數 · 塔羅 雙修顧問",
    titleEn: "Consultant — Zi Wei Dou Shu & Tarot",
    specialties: ["紫微斗數", "塔羅牌", "能量療癒", "冥想指導"],
    specialtiesEn: ["Zi Wei Dou Shu", "Tarot Reading", "Energy Healing", "Meditation"],
    yearsExperience: 15,
    rating: 4.7,
    reviewCount: 634,
    bio: "靜虚師姐擁有心理學碩士學位，將現代心理學與傳統命理學相結合，形成獨特的「心靈命理」諮詢風格。擅長運用紫微斗數分析性格特質與人生方向，並以塔羅牌輔助日常決策指引。她的溫和細膩的諮詢方式深受女性客戶喜愛。Sister Jing Xu merges psychology with traditional Chinese metaphysics.",
    bioEn:
      "Sister Jing Xu holds a Master's degree in Psychology and uniquely blends modern psychology with traditional Chinese metaphysics. Her gentle and detailed consultation style is especially beloved by female clients.",
    avatarUrl: "/placeholder/master-3.jpg",
    priceRange: { min: 88, max: 388 },
    certifications: [
      "國際塔羅牌協會認證讀牌師",
      "美國催眠治療師協會會員",
      "新加坡心理學會準會員",
    ],
    isAvailable: true,
  },
];
