"use client";

import { motion } from "framer-motion";
import { Star, Compass, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/routing";

const methods = [
  {
    icon: <Star className="w-10 h-10" />,
    name: "紫微斗數",
    nameEn: "Zi Wei Dou Shu",
    description: "人生地圖 — 十二宮全景解讀，精準定位命運格局",
    descriptionEn: "Life Map — Complete 12 Palace Reading",
    href: "/destiny/ziwei",
    features: ["免費排盤", "AI 快速解讀", "人工深度諮詢", "十二宮全析"],
    gradient: "from-purple-500/20 via-indigo-500/10 to-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
  },
  {
    icon: <Compass className="w-10 h-10" />,
    name: "八字命理",
    nameEn: "Ba Zi",
    description: "能量底色 — 五行氣勢趨勢分析，掌握命運能量",
    descriptionEn: "Energy Blueprint — Five Elements Analysis",
    href: "/destiny/bazi",
    features: ["免費排盤", "五行分析", "大運推算", "流年詳解"],
    gradient: "from-amber-500/20 via-orange-500/10 to-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    hoverBorder: "hover:border-amber-400/40",
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    name: "大六壬",
    nameEn: "Da Liu Ren",
    description: "事態預測 — 精準斷課決策輔助，洞悉事態發展",
    descriptionEn: "Event Forecast — Precise Divination",
    href: "/destiny/liuren",
    features: ["起課斷事", "三傳解析", "將神指示", "吉凶判斷"],
    gradient: "from-teal-500/20 via-cyan-500/10 to-teal-500/20",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    borderColor: "border-teal-500/20",
    hoverBorder: "hover:border-teal-400/40",
  },
];

export default function DestinyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />

        <div className="relative z-10 container-brand text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="default" size="lg" className="mb-6">
              三術合一 · 指點迷津
            </Badge>
            <h1 className="text-3xl md:text-5xl font-serif-tc font-bold text-ivory mb-4">
              選擇你的命理之路
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-2">
              星運堂提供三大術數預測服務，從不同角度全方位解讀命運格局
            </p>
            <p className="text-sm text-neutral-500 font-english">
              Choose your path to self-discovery through ancient Chinese metaphysics
            </p>
          </motion.div>
        </div>
      </section>

      {/* 三術選擇 */}
      <section className="py-12 px-4">
        <div className="container-brand max-w-5xl mx-auto">
          <div className="space-y-8">
            {methods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={method.href}>
                  <Card className={`overflow-hidden border ${method.borderColor} ${method.hoverBorder} transition-all duration-300 hover:shadow-lg group cursor-pointer`}>
                    <div className="flex flex-col md:flex-row">
                      {/* 圖標區 */}
                      <div className={`md:w-48 p-8 flex items-center justify-center bg-gradient-to-br ${method.gradient}`}>
                        <div className={`${method.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                          {method.icon}
                        </div>
                      </div>

                      {/* 內容區 */}
                      <CardContent className="flex-1 p-6 md:p-8">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-1">
                              {method.name}
                            </h2>
                            <p className="text-xs text-neutral-500 font-english mb-3">
                              {method.nameEn}
                            </p>
                            <p className="text-sm text-neutral-400 mb-4 max-w-md">
                              {method.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                        </div>

                        {/* 功能標籤 */}
                        <div className="flex flex-wrap gap-2">
                          {method.features.map((f, fi) => (
                            <Badge key={fi} variant="secondary" size="sm">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 三術合參推薦 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-gold/20 p-8 md:p-12 bg-gradient-to-br from-gold/5 via-yin-black-light to-gold/5 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,168,83,0.03)_0%,_transparent_70%)]" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="text-gold text-sm font-medium">旗艦產品推薦</span>
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-3xl font-serif-tc font-bold gradient-text-gold mb-3">
                  三術合參
                </h3>
                <p className="text-neutral-400 max-w-xl mx-auto mb-6">
                  紫微斗數看格局、八字看能量、大六壬斷事態。三術交叉印證，
                  為您提供最全面、最可靠的命理分析報告。
                </p>
                <Button variant="secondary" size="lg">
                  立即體驗
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
