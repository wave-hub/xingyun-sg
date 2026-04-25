"use client";

import { motion } from "framer-motion";
import { Star, Zap, Users, Clock, CheckCircle, ArrowRight, BookOpen, Brain, UserCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import PricingTable, { defaultPricingTiers } from "@/components/destiny/PricingTable";
import { Link } from "@/i18n/routing";
import { masters } from "@/data/masters";

export default function ZiweiPage() {
  const ziweiMasters = masters.filter((m) => m.specialties.includes("紫微斗數"));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-yin-black to-yin-black" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-english">ZI WEI DOU SHU</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif-tc font-bold text-ivory mb-4">
              紫微斗數
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-6">
              帝王之術，人生全景地圖。以出生時間排定命盤，十二宮全方位解讀人生格局。
            </p>
            <p className="text-sm text-neutral-500 font-english mb-8">
              The Emperor&apos;s Art — A complete life map revealed through the 12 palaces
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/destiny/ziwei/chart">
                <Button variant="primary" size="lg">
                  免費排盤
                  <Zap className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/destiny/ziwei/ai-reading">
                <Button variant="outline" size="lg">
                  AI 解讀
                  <Brain className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 什麼是紫微斗數 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-6 text-center">
              什麼是紫微斗數？
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">淵源</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    紫微斗數源自五代末年的陳摶（陳希夷），為中國古代最高級別的預測學之一，
                    被譽為「帝王學」。以出生年、月、日、時排定命盤，通過一百多顆星曜的組合變化，
                    全面解讀人生各個面向。紫微斗數以紫微星為帝座，象征人生最高主宰，
                    配合天府、太陽、太陰等主星，構成精密的命運推算體系。
                  </p>
                </CardContent>
              </Card>
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">特色</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    紫微斗數的最大特色是能夠全方位地描繪人生全景。通過十二宮的解讀，
                    可以了解事業、財運、感情、健康、人際等各方面的運勢。命宮為核心，
                    三方四正互相呼應，構成完整的命運網絡。不同格局的組合，
                    能精準預測人生的高低起伏和轉折點。
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 適合人群 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">
            適合誰？
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Compass className="w-5 h-5" />, title: "人生迷茫者", desc: "不知道未來方向，需要全面的人生指引" },
              { icon: <BookOpen className="w-5 h-5" />, title: "命理愛好者", desc: "對中國傳統術數有興趣，想深入了解" },
              { icon: <Zap className="w-5 h-5" />, title: "決策時刻", desc: "面臨重大人生抉擇，需要參考" },
              { icon: <Clock className="w-5 h-5" />, title: "運勢查詢", desc: "想知道當年當月的運勢走勢" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="default" className="p-5 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-serif-tc font-semibold text-ivory mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 服務類型 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">
            服務類型
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card variant="glass" className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-gold" />
                  <div>
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory">AI 快速解讀</h3>
                    <p className="text-xs text-neutral-500">AI-Powered Quick Reading</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["AI 即時生成報告", "基礎格局分析", "十二宮概覽", "價格親民"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/destiny/ziwei/ai-reading">
                  <Button variant="outline" size="sm" className="w-full">
                    開始體驗 · S$28 起
                  </Button>
                </Link>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card variant="glass" className="p-6 h-full border-gold/20">
                <Badge variant="default" className="mb-3">推薦</Badge>
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-gold" />
                  <div>
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory">人工深度諮詢</h3>
                    <p className="text-xs text-neutral-500">Master Deep Consultation</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["資深大師一對一", "十二宮深度解析", "大運流年推算", " personalized 建議"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" size="sm" className="w-full">
                  預約大師 · S$288 起
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 價格表 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-3 text-center">
            價格方案
          </h2>
          <p className="text-neutral-400 text-center mb-10">選擇適合您的解讀方案</p>
          <PricingTable method="紫微斗數 Zi Wei Dou Shu" />
        </div>
      </section>

      {/* 大師團隊 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">
            專屬大師團隊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ziweiMasters.map((master, i) => (
              <motion.div
                key={master.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card variant="glass" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar-red/20 flex items-center justify-center text-gold font-serif-tc font-bold text-xl flex-shrink-0">
                      {master.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif-tc font-semibold text-ivory">{master.name}</h3>
                      <p className="text-xs text-gold mb-1">{master.title}</p>
                      <p className="text-xs text-neutral-500 mb-2">{master.yearsExperience} 年經驗 · ⭐ {master.rating}</p>
                      <p className="text-sm text-neutral-400 line-clamp-2">{master.bio}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
