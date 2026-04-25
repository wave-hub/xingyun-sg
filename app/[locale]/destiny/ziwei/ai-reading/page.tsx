"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, CreditCard, ArrowRight, Brain, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import BirthForm, { type BirthInfo } from "@/components/destiny/BirthForm";
import ReadingReport, { mockReport } from "@/components/destiny/ReadingReport";

const steps = [
  { id: 1, label: "選擇套餐", labelEn: "Choose Plan" },
  { id: 2, label: "填寫信息", labelEn: "Birth Info" },
  { id: 3, label: "確認支付", labelEn: "Payment" },
  { id: 4, label: "生成報告", labelEn: "Report" },
];

const plans = [
  { id: "quick", name: "AI 快速解讀", price: "S$28", desc: "即時 AI 生成基礎報告", features: ["命盤排定", "基本格局", "十二宮概覽"] },
  { id: "full", name: "AI 完整解讀", price: "S$68", desc: "AI 深度分析完整報告", features: ["包含快速版所有內容", "五行分析", "大運流年"], popular: true },
  { id: "master", name: "人工深度解讀", price: "S$288", desc: "大師一對一諮詢", features: ["包含完整版所有內容", "十二宮深度解析", "大師點評 + 建議"] },
];

export default function ZiweiAiReadingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [birthInfo, setBirthInfo] = useState<BirthInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep(2);
  };

  const handleBirthSubmit = (info: BirthInfo) => {
    setBirthInfo(info);
    setCurrentStep(3);
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
      {/* Header */}
      <section className="py-12 px-4">
        <div className="container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-english">AI-POWERED READING</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              紫微斗數 AI 解讀
            </h1>
            <p className="text-neutral-400">三步獲得專業命理解讀報告</p>
          </motion.div>
        </div>
      </section>

      {/* 步驟指示器 */}
      <div className="px-4 mb-10">
        <div className="container-brand max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-gold text-yin-black"
                      : "bg-neutral-700 text-neutral-400"
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <p className={`text-[10px] mt-1 ${currentStep >= step.id ? "text-gold" : "text-neutral-500"}`}>
                    {step.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                    currentStep > step.id ? "bg-gold" : "bg-neutral-700"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <section className="px-4 pb-20">
        <div className="container-brand max-w-4xl mx-auto">

          {/* Step 1: 選擇套餐 */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">選擇解讀方案</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`text-left rounded-xl border p-6 transition-all duration-300 ${
                      plan.popular
                        ? "border-gold/30 bg-gold/5 hover:border-gold/50"
                        : "border-neutral-700/50 bg-yin-black-light/50 hover:border-gold/20"
                    }`}
                  >
                    {plan.popular && <Badge variant="default" className="mb-3">最受歡迎</Badge>}
                    <h3 className="text-lg font-serif-tc font-semibold text-ivory mb-1">{plan.name}</h3>
                    <p className="text-2xl font-bold text-gold mb-2">{plan.price}</p>
                    <p className="text-xs text-neutral-400 mb-4">{plan.desc}</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle className="w-3 h-3 text-gold" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: 填寫信息 */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">填寫出生信息</h2>
              <div className="rounded-2xl border border-neutral-700/50 bg-yin-black-light/50 p-6 md:p-10 max-w-lg mx-auto">
                <BirthForm onSubmit={handleBirthSubmit} submitLabel="下一步" />
              </div>
            </motion.div>
          )}

          {/* Step 3: 確認支付 */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6 text-center">確認訂單</h2>
              <div className="max-w-md mx-auto">
                <Card variant="glass" className="p-6 mb-6">
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">方案</span>
                        <span className="text-ivory">{plans.find(p => p.id === selectedPlan)?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">出生日期</span>
                        <span className="text-ivory">{birthInfo?.birthDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">性別</span>
                        <span className="text-ivory">{birthInfo?.gender === "male" ? "男" : "女"}</span>
                      </div>
                      <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                        <span className="text-neutral-400">金額</span>
                        <span className="text-xl font-bold text-gold">{plans.find(p => p.id === selectedPlan)?.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 支付方式 */}
                <h3 className="text-sm font-medium text-ivory mb-3">選擇支付方式</h3>
                <div className="space-y-2 mb-6">
                  {["信用卡 / Debit Card", "PayNow", "GrabPay", "加密貨幣"].map((method, i) => (
                    <button
                      key={i}
                      className={`w-full p-3 rounded-lg border text-sm text-left transition-all ${
                        i === 0
                          ? "border-gold/30 bg-gold/5 text-ivory"
                          : "border-neutral-700/50 text-neutral-400 hover:border-gold/20"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={handlePayment}>
                  <CreditCard className="w-4 h-4" />
                  確認支付
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: 生成報告 */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isGenerating ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold mx-auto mb-6"
                  />
                  <h2 className="text-xl font-serif-tc font-bold text-ivory mb-2">
                    AI 正在為您生成解讀報告...
                  </h2>
                  <p className="text-sm text-neutral-400">紫微星運算中，請稍候片刻</p>
                </div>
              ) : showReport ? (
                <ReadingReport report={mockReport} />
              ) : null}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
