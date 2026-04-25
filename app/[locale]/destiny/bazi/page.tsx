"use client";

import { motion } from "framer-motion";
import { Compass, Zap, CheckCircle, Brain, UserCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import PricingTable from "@/components/destiny/PricingTable";
import { Link } from "@/i18n/routing";
import { masters } from "@/data/masters";

export default function BaziPage() {
  const baziMasters = masters.filter((m) => m.specialties.includes("八字命理"));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-yin-black to-yin-black" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-english">BA ZI · EIGHT CHARACTERS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif-tc font-bold text-ivory mb-4">
              八字命理
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-6">
              以天干地支為基石，分析五行氣勢與人生能量底色
            </p>
            <p className="text-sm text-neutral-500 font-english mb-8">
              The ancient art of Five Elements analysis through Heavenly Stems and Earthly Branches
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/destiny/bazi/chart">
                <Button variant="primary" size="lg">
                  免費排盤
                  <Zap className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/destiny/bazi/ai-reading">
                <Button variant="outline" size="lg">
                  AI 解讀
                  <Brain className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 介紹 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-6 text-center">
              什麼是八字命理？
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">原理</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    八字命理，又稱四柱推命，以出生年、月、日、時四組天干地支（共八個字）為基礎。
                    天干代表外在表現，地支代表內在潛能，通過五行生剋制化的關係，
                    分析一個人的性格特質、運勢走向和人生格局。八字命理是中國最普及的命理學之一，
                    有著數千年的歷史積累和驗證。
                  </p>
                </CardContent>
              </Card>
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">應用</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    八字命理可以幫助你了解自己的五行強弱、喜用神和忌神，
                    從而選擇最適合自己的職業方向、合作夥伴和生活環境。
                    通過大運和流年的推算，可以預判人生各階段的運勢起伏，
                    在關鍵時刻做出更明智的決策。
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 服務類型 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">服務類型</h2>
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
                  {["四柱排定", "五行強弱分析", "日主格局判定", "大運概覽"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/destiny/bazi/ai-reading">
                  <Button variant="outline" size="sm" className="w-full">開始體驗 · S$28 起</Button>
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
                  {["包含 AI 版所有內容", "大運流年詳細推算", "擇日合婚", "个性化化解建議"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" size="sm" className="w-full">預約大師 · S$288 起</Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 價格表 */}
      <section className="py-16 px-4">
        <div className="container-brand">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-3 text-center">價格方案</h2>
          <p className="text-neutral-400 text-center mb-10">選擇適合您的解讀方案</p>
          <PricingTable method="八字命理 Ba Zi" />
        </div>
      </section>

      {/* 大師 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">專屬大師團隊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {baziMasters.map((master, i) => (
              <motion.div key={master.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card variant="glass" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-amber-500/20 flex items-center justify-center text-gold font-serif-tc font-bold text-xl flex-shrink-0">
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
