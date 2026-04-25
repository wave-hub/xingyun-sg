"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, CreditCard, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ReadingReport, { mockReport } from "@/components/destiny/ReadingReport";

const steps = [
  { id: 1, label: "選擇方案", labelEn: "Choose Plan" },
  { id: 2, label: "輸入問題", labelEn: "Your Question" },
  { id: 3, label: "確認支付", labelEn: "Payment" },
  { id: 4, label: "生成報告", labelEn: "Report" },
];

const plans = [
  { id: "quick", name: "AI 快速斷課", price: "S$28", features: ["自動起課", "四課三傳", "吉凶判斷"] },
  { id: "full", name: "AI 完整斷課", price: "S$68", features: ["包含快速版", "課體分析", "化解建議"], popular: true },
  { id: "master", name: "人工深度斷課", price: "S$288", features: ["包含 AI 版", "大師分析", "一對一諮詢"] },
];

export default function LiurenAiReadingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep(2);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setCurrentStep(3);
    }
  };

  const handlePayment = () => {
    setCurrentStep(4);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <section className="py-12 px-4">
        <div className="container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-english">AI-POWERED DIVINATION</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              大六壬 AI 斷課
            </h1>
            <p className="text-neutral-400">三步獲得專業斷課分析報告</p>
          </motion.div>
        </div>
      </section>

      {/* 步驟 */}
      <div className="px-4 mb-10">
        <div className="container-brand max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step.id ? "bg-gold text-yin-black" : "bg-neutral-700 text-neutral-400"
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <p className={`text-[10px] mt-1 ${currentStep >= step.id ? "text-gold" : "text-neutral-500"}`}>{step.label}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${currentStep > step.id ? "bg-gold" : "bg-neutral-700"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="px-4 pb-20">
        <div className="container-brand max-w-4xl mx-auto">
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">選擇斷課方案</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button key={plan.id} onClick={() => handlePlanSelect(plan.id)}
                    className={`text-left rounded-xl border p-6 transition-all duration-300 ${
                      plan.popular ? "border-gold/30 bg-gold/5" : "border-neutral-700/50 bg-yin-black-light/50"
                    }`}>
                    {plan.popular && <Badge variant="default" className="mb-3">最受歡迎</Badge>}
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory mb-1">{plan.name}</h3>
                    <p className="text-2xl font-bold text-gold mb-2">{plan.price}</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle className="w-3 h-3 text-gold" />{f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">輸入您的問題</h2>
              <div className="rounded-2xl border border-neutral-700/50 bg-yin-black-light/50 p-6 md:p-10 max-w-lg mx-auto">
                <form onSubmit={handleQuestionSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-ivory mb-2">占卜問題</label>
                    <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
                      placeholder="請具體描述您想問的問題..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-yin-black-light border border-neutral-700 text-ivory placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!question.trim()}>
                    下一步
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">確認訂單</h2>
              <div className="max-w-md mx-auto">
                <Card variant="glass" className="p-6 mb-6">
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-neutral-400">方案</span><span className="text-ivory">{plans.find(p => p.id === selectedPlan)?.name}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-neutral-400">問題</span><span className="text-ivory text-right max-w-[200px] line-clamp-2">{question}</span></div>
                      <div className="border-t border-neutral-700/50 pt-3 flex justify-between"><span className="text-neutral-400">金額</span><span className="text-xl font-bold text-gold">{plans.find(p => p.id === selectedPlan)?.price}</span></div>
                    </div>
                  </CardContent>
                </Card>
                <Button variant="primary" size="lg" className="w-full" onClick={handlePayment}>
                  <CreditCard className="w-4 h-4" />確認支付
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isGenerating ? (
                <div className="text-center py-20">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold mx-auto mb-6" />
                  <h2 className="text-xl font-serif-tc font-bold text-ivory mb-2">AI 正在起課斷事...</h2>
                  <p className="text-sm text-neutral-400">四課三傳運算中，請稍候片刻</p>
                </div>
              ) : showReport ? (
                <ReadingReport report={{ ...mockReport, title: "大六壬斷課報告", titleEn: "Da Liu Ren Divination Report", method: "大六壬", methodEn: "Da Liu Ren" }} />
              ) : null}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
