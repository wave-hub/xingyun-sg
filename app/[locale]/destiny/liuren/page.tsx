"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, CheckCircle, Brain, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import PricingTable from "@/components/destiny/PricingTable";
import { Link } from "@/i18n/routing";
import { masters } from "@/data/masters";

export default function LiurenPage() {
  const liurenMasters = masters.filter((m) => m.specialties.includes("大六壬"));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/30 via-yin-black to-yin-black" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 text-sm font-english">DA LIU REN</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif-tc font-bold text-ivory mb-4">
              大六壬
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-6">
              三式之首，精準斷課，洞悉事態發展與吉凶禍福
            </p>
            <p className="text-sm text-neutral-500 font-english mb-8">
              The foremost of the Three Styles — precise divination for decision-making
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/destiny/liuren/chart">
                <Button variant="primary" size="lg">起課占卜 <Zap className="w-4 h-4" /></Button>
              </Link>
              <Link href="/destiny/liuren/ai-reading">
                <Button variant="outline" size="lg">AI 斷課 <Brain className="w-4 h-4" /></Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 介紹 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-6 text-center">什麼是大六壬？</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">地位</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    大六壬與太乙神數、奇門遁甲並稱「三式」，為中國古代最高級別的預測術。
                    大六壬以日辰為基礎，配合四課三傳，通過天地盤的推演，
                    精準預測特定事件的發展趨勢和吉凶結果。自古以來便為軍事、政治決策的重要參考工具。
                  </p>
                </CardContent>
              </Card>
              <Card variant="glass" className="p-6">
                <CardContent>
                  <h3 className="text-lg font-serif-tc font-semibold text-gold mb-3">特色</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    與紫微斗數和八字不同，大六壬主要用於「斷事」——針對特定問題進行精準預測。
                    無論是事業決策、投資判斷、感情走向還是糾紛訴訟，
                    大六壬都能通過起課分析，給出明確的吉凶判斷和時間節點預測。
                    被譽為「百占百靈」的斷事神術。
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 適合場景 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">適合場景</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "💼", title: "事業決策", desc: "是否該跳槽？創業是否合適？" },
              { icon: "💰", title: "投資判斷", desc: "這筆投資的吉凶如何？" },
              { icon: "❤️", title: "感情走向", desc: "這段感情有結果嗎？" },
              { icon: "⚖️", title: "糾紛訴訟", desc: "官司的勝算如何？" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card variant="default" className="p-5 text-center h-full">
                  <div className="text-3xl mb-3">{item.icon}</div>
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
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">服務類型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card variant="glass" className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-gold" />
                  <div>
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory">AI 快速斷課</h3>
                    <p className="text-xs text-neutral-500">AI-Powered Quick Divination</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["自動起課", "四課三傳解析", "吉凶判斷", "時間節點預測"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/destiny/liuren/ai-reading">
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
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory">人工深度斷課</h3>
                    <p className="text-xs text-neutral-500">Master Deep Divination</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["包含 AI 版所有內容", "課體深度分析", "化解方案", "大師一對一諮詢"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />{f}
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
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-3 text-center">價格方案</h2>
          <p className="text-neutral-400 text-center mb-10">選擇適合您的斷課方案</p>
          <PricingTable method="大六壬 Da Liu Ren" />
        </div>
      </section>

      {/* 大師 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">專屬大師團隊</h2>
          <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
            {liurenMasters.map((master, i) => (
              <motion.div key={master.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card variant="glass" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-teal-500/20 flex items-center justify-center text-gold font-serif-tc font-bold text-xl flex-shrink-0">
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
