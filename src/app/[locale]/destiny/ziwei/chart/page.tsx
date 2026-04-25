"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import BirthForm, { type BirthInfo } from "@/components/destiny/BirthForm";
import ChartDisplay from "@/components/destiny/ziwei/ChartDisplay";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/routing";

export default function ZiweiChartPage() {
  const [chartGenerated, setChartGenerated] = useState(false);
  const [birthInfo, setBirthInfo] = useState<BirthInfo | null>(null);

  const handleSubmit = (info: BirthInfo) => {
    setBirthInfo(info);
    setChartGenerated(true);
  };

  const handleReset = () => {
    setChartGenerated(false);
    setBirthInfo(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4">
        <div className="container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-english">FREE ZI WEI CHART</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              免費紫微斗數排盤
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto">
              輸入出生信息，即刻獲得您的紫微命盤
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-brand max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!chartGenerated ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="rounded-2xl border border-neutral-700/50 bg-yin-black-light/50 p-6 md:p-10">
                  <BirthForm onSubmit={handleSubmit} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* 出生信息回顧 */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Badge variant="default" className="mb-2">排盤完成</Badge>
                    <p className="text-sm text-neutral-400">
                      {birthInfo?.birthDate} · {birthInfo?.gender === "male" ? "男命" : "女命"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    重新排盤
                  </Button>
                </div>

                {/* 命盤展示 */}
                <div className="rounded-2xl border border-gold/20 bg-yin-black-light/30 p-4 md:p-8">
                  <ChartDisplay />
                </div>

                {/* CTA */}
                <div className="text-center mt-8 space-y-4">
                  <p className="text-neutral-400 text-sm">
                    想要深入了解您的命盤？讓 AI 或大師為您詳細解讀
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/destiny/ziwei/ai-reading">
                      <Button variant="primary" size="lg">
                        AI 解讀命盤
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      預約大師
                    </Button>
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
