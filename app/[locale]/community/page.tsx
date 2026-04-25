"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, Calendar, BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { articles } from "@/data/articles";
import { testimonials } from "@/data/testimonials";
import { Link } from "@/i18n/routing";

const dailyFortune = [
  { zodiac: "鼠", fortune: "★★★★", color: "text-blue-400" },
  { zodiac: "牛", fortune: "★★★", color: "text-green-400" },
  { zodiac: "虎", fortune: "★★★★★", color: "text-amber-400" },
  { zodiac: "兔", fortune: "★★★", color: "text-purple-400" },
  { zodiac: "龍", fortune: "★★★★", color: "text-red-400" },
  { zodiac: "蛇", fortune: "★★★", color: "text-amber-400" },
  { zodiac: "馬", fortune: "★★★★", color: "text-blue-400" },
  { zodiac: "羊", fortune: "★★★", color: "text-green-400" },
  { zodiac: "猴", fortune: "★★★★★", color: "text-amber-400" },
  { zodiac: "雞", fortune: "★★★", color: "text-red-400" },
  { zodiac: "狗", fortune: "★★★★", color: "text-amber-400" },
  { zodiac: "豬", fortune: "★★★★", color: "text-blue-400" },
];

const events = [
  { date: "2025-05-01", title: "五一命理講座", desc: "主題：如何看懂自己的命盤", location: "新加坡 · 烏節路" },
  { date: "2025-05-15", title: "風水工作坊", desc: "辦公室風水布局實戰", location: "線上 Zoom" },
  { date: "2025-06-01", title: "端午節特別活動", desc: "端午節運勢預測 + 靈器祈福", location: "新加坡 · 牛車水" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black" />
        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              星運堂社群
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto">
              與同好交流命理心得，獲取每日運勢推播與獨家活動資訊
            </p>
          </motion.div>
        </div>
      </section>

      <div className="px-4 pb-20 space-y-16">
        <div className="container-brand max-w-5xl mx-auto">
          {/* Telegram 入口 */}
          <section className="mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card variant="elevated" className="p-8 md:p-12 bg-gradient-to-r from-blue-950/30 via-yin-black-light to-yin-black-light border-blue-500/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <Send className="w-12 h-12 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-2">
                      加入 Telegram 社群
                    </h2>
                    <p className="text-neutral-400 mb-4">
                      與上千位命理愛好者交流心得，獲取每日運勢推播、獨家活動通知及限時優惠。
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:justify-start justify-center">
                      <Button variant="primary" size="md">
                        立即加入
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <span className="text-xs text-neutral-500">已有 2,800+ 成員</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </section>

          {/* 每日運勢 */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <h2 className="text-xl font-serif-tc font-bold text-ivory">今日運勢</h2>
              </div>
              <Badge variant="default">每日更新</Badge>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {dailyFortune.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card variant="default" className="p-3 text-center hover:border-gold/20 transition-colors cursor-default">
                    <div className="text-2xl mb-1">{item.zodiac}</div>
                    <p className={`text-xs font-medium ${item.color}`}>{item.fortune}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/destiny">
                <Button variant="ghost" size="sm">
                  查看詳細運勢
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>

          {/* 文章列表 */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-serif-tc font-bold text-ivory">命理知識</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card variant="default" className="p-5 h-full group cursor-pointer hover:border-gold/20">
                    <Badge variant="secondary" size="sm" className="mb-3">{article.categoryLabel}</Badge>
                    <h3 className="text-base font-serif-tc font-semibold text-ivory mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{article.excerpt.slice(0, 80)}...</p>
                    <p className="text-xs text-neutral-600">{article.author} · {article.readTime} 分鐘 · {article.publishDate}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 活動日曆 */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-serif-tc font-bold text-ivory">近期活動</h2>
            </div>
            <div className="space-y-4">
              {events.map((event, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card variant="default" className="p-5 flex items-start gap-4 group cursor-pointer hover:border-gold/20">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gold/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-gold">{event.date.split("-")[1]}月</span>
                      <span className="text-xl font-bold text-gold">{event.date.split("-")[2]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-serif-tc font-semibold text-ivory mb-1 group-hover:text-gold transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-1">{event.desc}</p>
                      <p className="text-xs text-neutral-500">📍 {event.location}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
