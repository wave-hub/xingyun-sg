// 靈器商品 Mock 數據

export interface Product {
  id: string;
  nameZh: string;
  nameEn: string;
  slug: string;
  category: "bracelet" | "pendant" | "statue" | "amulet" | "ring" | "misc";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  shortDescription: string;
  isBlessed: boolean;
  certificate: string;
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
}

export const products: Product[] = [
  {
    id: "prod-001",
    nameZh: "紫微鎮宅琉璃塔",
    nameEn: "Zi Wei Crystal Pagoda",
    slug: "ziwei-crystal-pagoda",
    category: "statue",
    categoryLabel: "擺件",
    price: 268,
    originalPrice: 328,
    images: ["/placeholder/pagoda-1.jpg"],
    description:
      "以紫微星為靈感，採用天然紫水晶手工雕琢而成。九層塔身象徵九宮飛星，塔頂嵌有硃砂符篆，經道教大師開光加持。適合安奉於書房或客廳財位，有助於鎮宅辟邪、提升事業運勢。Each pagoda is hand-carved from natural amethyst, blessed by Taoist masters.",
    shortDescription: "天然紫水晶九層塔，開光鎮宅之寶",
    isBlessed: true,
    certificate: "道教科儀認證 · 開光大師簽章",
    tags: ["開光認證", "紫水晶", "鎮宅", "熱銷"],
    stock: 15,
    rating: 4.8,
    reviewCount: 126,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "prod-002",
    nameZh: "五行平衡檀木手串",
    nameEn: "Five Elements Sandalwood Bracelet",
    slug: "five-elements-sandalwood-bracelet",
    category: "bracelet",
    categoryLabel: "手串",
    price: 158,
    originalPrice: 198,
    images: ["/placeholder/bracelet-1.jpg"],
    description:
      "精選印度老山檀香木，配合金、銀、玉、瑪瑙、琉璃五種材质珠子，對應五行金木水火土。每顆珠子經過高功法師持咒加持，佩戴可調和五行氣場，增強個人運勢平衡。Handmade from Indian sandalwood with five element stones.",
    shortDescription: "老山檀香木搭配五行寶石，調和氣場",
    isBlessed: true,
    certificate: "五行法會認證 · 高功法師加持",
    tags: ["開光認證", "檀香木", "五行", "手串"],
    stock: 42,
    rating: 4.9,
    reviewCount: 203,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "prod-003",
    nameZh: "龍龜聚財翡翠吊墜",
    nameEn: "Dragon Turtle Jade Pendant",
    slug: "dragon-turtle-jade-pendant",
    category: "pendant",
    categoryLabel: "吊墜",
    price: 388,
    originalPrice: 458,
    images: ["/placeholder/pendant-1.jpg"],
    description:
      "選用緬甸A貨翡翠，精雕龍龜造型。龍龜為風水中的財神瑞獸，龜殼刻有八卦紋理。吊墜背面刻有聚財符咒，配合硃砂點睛開光。佩戴可招財進寶、化解小人。Made from Grade A Myanmar jadeite with feng shui blessings.",
    shortDescription: "緬甸A貨翡翠龍龜，招財辟邪",
    isBlessed: true,
    certificate: "翡翠鑑定證書 · 開光符篆認證",
    tags: ["開光認證", "翡翠", "招財", "新品"],
    stock: 8,
    rating: 4.7,
    reviewCount: 67,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "prod-004",
    nameZh: "八卦開運紅繩手鏈",
    nameEn: "Bagua Fortune Red Thread Bracelet",
    slug: "bagua-red-thread-bracelet",
    category: "bracelet",
    categoryLabel: "手串",
    price: 68,
    images: ["/placeholder/bracelet-2.jpg"],
    description:
      "以道教科儀硃砂紅繩為基，搭配手工編織八卦結，中心鑲嵌天然硃砂珠。每條手鏈均於吉日吉時開光，有助於擋煞化太歲、增強桃花運。純手工編織，每一條都是獨一無二的存在。Handwoven red thread bracelet with cinnabar and bagua charm.",
    shortDescription: "手工硃砂紅繩，擋煞化太歲",
    isBlessed: true,
    certificate: "硃砂鑑定 · 道教科儀開光",
    tags: ["開光認證", "硃砂", "擋煞", "熱銷"],
    stock: 100,
    rating: 4.6,
    reviewCount: 341,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "prod-005",
    nameZh: "文昌智慧文昌筆",
    nameEn: "Wen Chang Wisdom Pen",
    slug: "wenchang-wisdom-pen",
    category: "misc",
    categoryLabel: "文具",
    price: 128,
    originalPrice: 158,
    images: ["/placeholder/pen-1.jpg"],
    description:
      "以天然紫竹為材，筆身刻有文昌帝君符咒。文昌筆為學業功名之靈器，適合學生、考生及文職人員使用。每支筆均經文昌法會開光，有助於提升智慧、順利通過考試。Crafted from natural purple bamboo with Wenchang blessings.",
    shortDescription: "紫竹筆身刻符，文昌法會開光",
    isBlessed: true,
    certificate: "文昌法會認證 · 開光筆",
    tags: ["開光認證", "文昌", "學業", "考運"],
    stock: 35,
    rating: 4.5,
    reviewCount: 89,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "prod-006",
    nameZh: "觀音慈悲白玉掛件",
    nameEn: "Guanyin Compassion Jade Pendant",
    slug: "guanyin-white-jade-pendant",
    category: "pendant",
    categoryLabel: "吊墜",
    price: 488,
    images: ["/placeholder/pendant-2.jpg"],
    description:
      "精選和田白玉，以傳統工藝雕琢觀世音菩薩法相。觀音為慈悲之象征，佩戴可護身平安、化解災厄。經寺院高僧誦經開光七天七夜，法力殊勝。White jade Guanyin pendant blessed through seven-day chanting ceremony.",
    shortDescription: "和田白玉觀音，寺院七日誦經開光",
    isBlessed: true,
    certificate: "寺院開光證書 · 白玉鑑定",
    tags: ["寺院開光", "白玉", "護身", "平安"],
    stock: 5,
    rating: 5.0,
    reviewCount: 42,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "prod-007",
    nameZh: "虎眼石事業運戒指",
    nameEn: "Tiger Eye Career Ring",
    slug: "tiger-eye-career-ring",
    category: "ring",
    categoryLabel: "戒指",
    price: 218,
    originalPrice: 268,
    images: ["/placeholder/ring-1.jpg"],
    description:
      "天然南非虎眼石打磨而成，金絲貓眼效果隨光線閃爍。虎眼石為事業守護之石，有助於增強決斷力、提升職場競爭力。戒圈內壁刻有增運符咒。Natural South African tiger eye stone with career blessing charms.",
    shortDescription: "南非虎眼石，增強事業運",
    isBlessed: true,
    certificate: "法師開光認證 · 寶石鑑定",
    tags: ["開光認證", "虎眼石", "事業", "新品"],
    stock: 20,
    rating: 4.7,
    reviewCount: 58,
    isFeatured: false,
    isNew: true,
  },
  {
    id: "prod-008",
    nameZh: "太歲平安符包",
    nameEn: "Tai Sui Peace Talisman",
    slug: "taisui-peace-talisman",
    category: "amulet",
    categoryLabel: "符咒",
    price: 38,
    images: ["/placeholder/talisman-1.jpg"],
    description:
      "每年由道觀高功法師於太歲星君殿前祈請製作，內含當年太歲符咒。適合本命年及沖太歲者佩戴或隨身攜帶，有助於化解太歲煞氣、保佑全年平安順遂。Yearly Tai Sui talisman crafted by Taoist masters at the Tai Sui shrine.",
    shortDescription: "道觀高功法師製作，化解太歲煞氣",
    isBlessed: true,
    certificate: "道觀認證 · 當年太歲符",
    tags: ["太歲", "平安", "本命年", "熱銷"],
    stock: 200,
    rating: 4.8,
    reviewCount: 512,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "prod-009",
    nameZh: "黑曜石貔貅手串",
    nameEn: "Obsidian Pixiu Bracelet",
    slug: "obsidian-pixiu-bracelet",
    category: "bracelet",
    categoryLabel: "手串",
    price: 188,
    originalPrice: 228,
    images: ["/placeholder/bracelet-3.jpg"],
    description:
      "冰種黑曜石打磨，搭配手工精雕貔貅頭飾。貔貅為招財進寶的瑞獸，只進不出。配合黑曜石強大的辟邪能量，是商務人士及創業者的首選靈器。Ice-grade obsidian with hand-carved Pixiu charm for wealth attraction.",
    shortDescription: "冰種黑曜石貔貅，招財辟邪首選",
    isBlessed: true,
    certificate: "法師開光認證 · 黑曜石鑑定",
    tags: ["開光認證", "黑曜石", "招財", "貔貅"],
    stock: 30,
    rating: 4.9,
    reviewCount: 278,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "prod-010",
    nameZh: "水晶球風水擺件",
    nameEn: "Crystal Ball Feng Shui Ornament",
    slug: "crystal-ball-fengshui",
    category: "statue",
    categoryLabel: "擺件",
    price: 358,
    images: ["/placeholder/crystal-ball-1.jpg"],
    description:
      "天然白水晶球，直徑約8厘米。水晶球為風水中的萬能化解器，可聚氣、化煞、轉運。底部配備紫檀木座，座上刻有九宮飛星圖。經開光後適合安奉於客廳或辦公室。Natural clear crystal ball with rosewood stand, activated for feng shui.",
    shortDescription: "天然白水晶球，風水聚氣化煞",
    isBlessed: true,
    certificate: "水晶鑑定 · 風水開光認證",
    tags: ["開光認證", "水晶球", "風水", "新品"],
    stock: 12,
    rating: 4.6,
    reviewCount: 45,
    isFeatured: false,
    isNew: true,
  },
  {
    id: "prod-011",
    nameZh: "桃花姻緣紅絲帶",
    nameEn: "Peach Blossom Romance Ribbon",
    slug: "peach-blossom-ribbon",
    category: "amulet",
    categoryLabel: "符咒",
    price: 58,
    images: ["/placeholder/ribbon-1.jpg"],
    description:
      "以道教科儀製作的桃花姻緣紅絲帶，繡有月老星君符文。適合未婚求偶者繫於手腕或隨身攜帶，有助於增強桃花運、締結良緣。每條絲帶均在月老廟前祈願開光。Taoist peach blossom ribbon blessed at Yue Lao temple for romance.",
    shortDescription: "月老廟祈願開光，增強桃花姻緣",
    isBlessed: true,
    certificate: "月老廟認證 · 道教科儀開光",
    tags: ["桃花", "姻緣", "月老", "熱銷"],
    stock: 80,
    rating: 4.4,
    reviewCount: 167,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "prod-012",
    nameZh: "翡翠文昌塔吊墜",
    nameEn: "Jade Wenchang Tower Pendant",
    slug: "jade-wenchang-tower-pendant",
    category: "pendant",
    categoryLabel: "吊墜",
    price: 328,
    originalPrice: 388,
    images: ["/placeholder/pendant-3.jpg"],
    description:
      "緬甸冰種翡翠雕琢九層文昌塔，塔身通透潤澤。文昌塔為功名事業之象徵，適合學子佩戴提升考運，也適合文職人員佩戴以助升遷。經文昌法會七日開光。Nine-tier Wenchang tower carved from ice-grade Myanmar jadeite.",
    shortDescription: "冰種翡翠九層文昌塔，考運升遷",
    isBlessed: true,
    certificate: "翡翠A貨證書 · 文昌法會開光",
    tags: ["開光認證", "翡翠", "文昌", "考運"],
    stock: 10,
    rating: 4.8,
    reviewCount: 73,
    isFeatured: false,
    isNew: false,
  },
];

export const categories = [
  { id: "all", label: "全部", labelEn: "All" },
  { id: "bracelet", label: "手串", labelEn: "Bracelets" },
  { id: "pendant", label: "吊墜", labelEn: "Pendants" },
  { id: "statue", label: "擺件", labelEn: "Ornaments" },
  { id: "amulet", label: "符咒", labelEn: "Talismans" },
  { id: "ring", label: "戒指", labelEn: "Rings" },
  { id: "misc", label: "其他", labelEn: "Others" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}
