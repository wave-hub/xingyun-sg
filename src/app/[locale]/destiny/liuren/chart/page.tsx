"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import LiuRenChart from "@/components/destiny/liuren/LiuRenChart";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/routing";

export default function LiurenChartPage() {
  const [question, setQuestion] = useState("");
  const [chartGenerated, setChartGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setChartGenerated(true);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 text-sm font-english">DA LIU REN DIVINATION</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              大六壬起課
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto">
              輸入您想問的問題，即刻起課占卜
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-brand max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!chartGenerated ? (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <Card variant="glass" className="p-6 md:p-10">
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ivory mb-2">
                        您想問什麼？（占卜問題）
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="例如：近期事業運勢如何？這筆投資是否合適？"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-yin-black-light border border-neutral-700 text-ivory placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
                      />
                      <p className="text-xs text-neutral-500 mt-1">請專注於一個具體問題，效果更佳</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-neutral-500 mb-2">
                        起課將使用當前時間（系統自動取時辰）
                      </p>
                      <Button type="submit" variant="primary" size="lg" disabled={!question.trim()}>
                        立即起課
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="taoist-divider">
                      <span className="taoist-divider-symbol">☲</span>
                    </div>
                  </form>
                </Card>
              </motion.div>
            ) : (
              <motion.div key="chart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Badge variant="default" className="mb-2">課已起</Badge>
                    <p className="text-sm text-neutral-400">問題：{question}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setChartGenerated(false)}>
                    重新起課
                  </Button>
                </div>

                <div className="rounded-2xl border border-gold/20 bg-yin-black-light/30 p-4 md:p-8">
                  <LiuRenChart />
                </div>

                <div className="text-center mt-8 space-y-4">
                  <p className="text-neutral-400 text-sm">需要更詳細的斷課分析？讓 AI 為您深入解讀</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/destiny/liuren/ai-reading">
                      <Button variant="primary" size="lg">AI 深度斷課</Button>
                    </Link>
                    <Button variant="outline" size="lg">預約大師</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
