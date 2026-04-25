// 文章 Mock 數據

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  category: string;
  categoryLabel: string;
  author: string;
  publishDate: string;
  readTime: number;
  coverImage: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "art-001",
    title: "2025乙巳蛇年運勢總覽：三術合參預測",
    titleEn: "2025 Year of the Snake: A Comprehensive Three-Method Forecast",
    slug: "2025-snake-year-forecast",
    excerpt:
      "從紫微斗數、八字、大六壬三大術數角度，全面解析2025乙巳蛇年各生肖的運勢走向，包括事業、財運、感情及健康方面的詳細預測。",
    excerptEn:
      "A comprehensive analysis of 2025 Year of the Snake from Zi Wei Dou Shu, Ba Zi, and Da Liu Ren perspectives.",
    content: "",
    category: "yearly-forecast",
    categoryLabel: "年度運勢",
    author: "玄清道長",
    publishDate: "2025-01-15",
    readTime: 12,
    coverImage: "/placeholder/article-1.jpg",
    tags: ["蛇年", "運勢", "三術合參", "年度預測"],
  },
  {
    id: "art-002",
    title: "紫微斗數入門：認識你的命盤十二宮",
    titleEn: "Beginner's Guide to Zi Wei Dou Shu: Understanding the 12 Palaces",
    slug: "ziwei-doushu-beginner-guide",
    excerpt:
      "紫微斗數以出生時間排出的命盤，分為十二宮位，每個宮位代表人生的不同面向。本文帶你逐步認識命盤結構，了解十二宮的基本含義。",
    excerptEn:
      "An introduction to the 12 palaces of Zi Wei Dou Shu and what each palace represents in your life.",
    content: "",
    category: "tutorial",
    categoryLabel: "入門教程",
    author: "靜虚師姐",
    publishDate: "2025-02-20",
    readTime: 8,
    coverImage: "/placeholder/article-2.jpg",
    tags: ["紫微斗數", "入門", "十二宮", "教程"],
  },
  {
    id: "art-003",
    title: "八字命理中的五行調和：如何找到你的幸運色",
    titleEn: "Five Elements in Ba Zi: Finding Your Lucky Colors",
    slug: "bazi-five-elements-lucky-colors",
    excerpt:
      "每個人的八字中五行的強弱不同，決定了你的幸運顏色。本文教你如何從八字命盤中判斷五行喜忌，找出最適合你的顏色搭配。",
    excerptEn:
      "Learn how to determine your favorable and unfavorable elements from your Ba Zi chart and discover your lucky colors.",
    content: "",
    category: "knowledge",
    categoryLabel: "命理知識",
    author: "明德先生",
    publishDate: "2025-03-10",
    readTime: 6,
    coverImage: "/placeholder/article-3.jpg",
    tags: ["八字", "五行", "幸運色", "知識"],
  },
  {
    id: "art-004",
    title: "新加坡風水指南：住宅選址與布局要點",
    titleEn: "Feng Shui Guide for Singapore: Residential Site Selection & Layout",
    slug: "singapore-fengshui-guide",
    excerpt:
      "新加坡的地理環境獨特，風水布局有其特殊考量。本文從新加坡的地形、建築特點出發，提供實用的住宅風水選址與布局建議。",
    excerptEn:
      "Practical feng shui tips for residential site selection and layout in Singapore's unique geographical environment.",
    content: "",
    category: "fengshui",
    categoryLabel: "風水知識",
    author: "玄清道長",
    publishDate: "2025-04-05",
    readTime: 10,
    coverImage: "/placeholder/article-4.jpg",
    tags: ["風水", "新加坡", "住宅", "布局"],
  },
  {
    id: "art-005",
    title: "大六壬斷課入門：如何起課與解讀",
    titleEn: "Introduction to Da Liu Ren: How to Cast and Read a Divination",
    slug: "liuren-beginner-guide",
    excerpt:
      "大六壬為三式之首，以精準斷事著稱。本文介紹大六壬的基本概念、起課方法及解讀技巧，帶你走進這門古老而精妙的預測學問。",
    excerptEn:
      "An introduction to Da Liu Ren divination, covering basic concepts, casting methods, and interpretation techniques.",
    content: "",
    category: "tutorial",
    categoryLabel: "入門教程",
    author: "玄清道長",
    publishDate: "2025-04-18",
    readTime: 15,
    coverImage: "/placeholder/article-5.jpg",
    tags: ["大六壬", "入門", "斷課", "教程"],
  },
];
