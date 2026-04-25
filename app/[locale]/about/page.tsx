"use client";

import { motion } from "framer-motion";
import { Star, Compass, BookOpen, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { masters } from "@/data/masters";
import { Link } from "@/i18n/routing";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />

        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif-tc font-bold text-ivory mb-4 gradient-text-gold">
              關於星運堂
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              古老智慧，現代傳承。我們致力於將中國傳統術數文化帶給每一位尋求指引的人。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-6 text-center">品牌故事</h2>
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                星運堂創立於新加坡，源於一個簡單的信念：古老的智慧應該被更多人了解和運用。
                在現代社會的快速節奏中，人們常常感到迷茫和不安，
                而中國傳統的術數文化——紫微斗數、八字命理、大六壬——
                正是一把幫助人們重新認識自我、把握方向的鑰匙。
              </p>
              <p>
                「星運堂」之名，取「星辰引運」之意。紫微星為帝座之星，指引命運方向；
                「堂」為傳道授業之所，象征我們不僅提供服務，更致力於傳播正統的術數文化。
                我們相信，真正的命理服務不應該是玄學迷信，而是一門有理有據的學問，
                能夠幫助人們做出更明智的人生決策。
              </p>
              <p>
                作為新加坡首創的「三術合一」命理平台，我們獨家整合紫微斗數、八字命理、大六壬三大術數，
                提供全方位的命運分析。同時結合現代 AI 技術，讓古老的智慧以更便捷的方式觸達每一個人。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 三術簡介（SEO 內容） */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">三術簡介</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                name: "紫微斗數",
                nameEn: "Zi Wei Dou Shu",
                content: "紫微斗數起源於五代十國時期，由陳摶（陳希夷）所創。以出生年、月、日、時排定命盤，通過一百多顆星曜的組合變化，全面解讀人生各個面向。紫微斗數以紫微星為帝座，配合天府、天機、太陽等主星，構成精密的命運推算體系。被譽為「帝王學」，是中國最高級別的預測學之一。",
                color: "text-purple-400",
                bg: "bg-purple-500/10",
              },
              {
                icon: <Compass className="w-6 h-6" />,
                name: "八字命理",
                nameEn: "Ba Zi",
                content: "八字命理，又稱四柱推命，起源於漢代，成熟於唐宋。以出生年、月、日、時的天干地支（共八個字）為基礎，分析五行氣勢的強弱、十神的生剋制化關係，判斷一個人的性格特質、運勢走向和人生格局。八字命理是中國歷史最悠久、應用最廣泛的命理學之一。",
                color: "text-amber-400",
                bg: "bg-amber-500/10",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                name: "大六壬",
                nameEn: "Da Liu Ren",
                content: "大六壬與太乙神數、奇門遁甲並稱「三式」，為中國古代最高級別的預測術。大六壬以日辰為基礎，配合天地盤、四課三傳，通過精確的推演體系預測特定事件的發展趨勢。自古以來便為軍事和政治決策的重要參考工具，被譽為「百占百靈」的斷事神術。",
                color: "text-teal-400",
                bg: "bg-teal-500/10",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card variant="glass" className="p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-serif-tc font-bold text-ivory mb-1">{item.name}</h3>
                  <p className="text-xs text-neutral-500 font-english mb-3">{item.nameEn}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 大師團隊 */}
      <section className="py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">
            大師團隊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {masters.map((master, i) => (
              <motion.div key={master.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card variant="glass" className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar-red/20 flex items-center justify-center text-gold font-serif-tc font-bold text-2xl mx-auto mb-4">
                    {master.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-serif-tc font-semibold text-ivory mb-1">{master.name}</h3>
                  <p className="text-xs text-gold mb-1">{master.nameEn}</p>
                  <p className="text-xs text-neutral-400 mb-3">{master.title}</p>
                  <p className="text-xs text-neutral-500 mb-3">{master.yearsExperience} 年經驗 · ⭐ {master.rating} ({master.reviewCount} 評價)</p>
                  <p className="text-sm text-neutral-400 line-clamp-4">{master.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                    {master.certifications.slice(0, 2).map((cert, ci) => (
                      <Badge key={ci} variant="secondary" size="sm">{cert.slice(0, 10)}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 合規聲明 */}
      <section className="py-16 px-4 bg-yin-black-light/30">
        <div className="container-brand max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-serif-tc font-bold text-ivory">合規聲明</h2>
            </div>
            <Card variant="glass" className="p-6">
              <CardContent>
                <div className="space-y-3 text-sm text-neutral-400 leading-relaxed">
                  <p>
                    星運堂（XingYun Tang）所有命理預測服務僅供參考與娛樂用途。
                    命理預測不構成任何專業建議（包括但不限於醫療、法律、財務、投資建議）。
                  </p>
                  <p>
                    顧客應根據自身情況做出獨立判斷。我們不保證預測結果的準確性，
                    也不對因參考預測結果而做出的任何決定承擔責任。
                  </p>
                  <p>
                    星運堂靈器商城所售商品均為工藝品，其「開光」服務為宗教文化儀式，
                    不構成任何功效保證。購買靈器不應替代專業的心理、醫療或其他專業協助。
                  </p>
                  <p className="text-xs text-neutral-600">
                    © 2025 星運堂 XingYun Tang. All rights reserved. Registered in Singapore.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
