"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, BookOpen, Download, Share2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface ReportSection {
  id: string;
  title: string;
  titleEn: string;
  icon?: React.ReactNode;
  content: string;
  highlights?: string[];
}

export interface ReportData {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  method: string;
  methodEn: string;
  generatedAt: string;
  sections: ReportSection[];
  recommendation?: {
    title: string;
    description: string;
    productId: string;
  };
}

interface ReadingReportProps {
  report: ReportData;
  className?: string;
}

// Mock report data
export const mockReport: ReportData = {
  title: "紫微斗數命理解讀報告",
  titleEn: "Zi Wei Dou Shu Reading Report",
  subtitle: "陳先生 · 己未年生 · 男命",
  subtitleEn: "Mr. Chen · Born in Ji Wei Year · Male",
  method: "紫微斗數",
  methodEn: "Zi Wei Dou Shu",
  generatedAt: "2025-04-23 14:30",
  sections: [
    {
      id: "overview",
      title: "命盤總覽",
      titleEn: "Chart Overview",
      icon: <Sparkles className="w-4 h-4" />,
      content:
        "您的命盤以紫微星坐命於辰宮，天府星同宮，構成「紫府同宮格」。此格局為紫微斗數中的上等格局，主貴氣充足、事業有成。命宮三方四正會照左輔右弼、天魁天鉞，貴人運極佳，一生多得長輩提攜及貴人相助。\n\n命身宮分離，說明您前半生根基深厚，後半生有轉型發展的機會。身宮落在財帛宮，代表您後半生的重心將轉向財務管理及資產配置。",
      highlights: [
        "紫府同宮 — 天生領袖格局",
        "左輔右弼夾命 — 貴人運極佳",
        "天魁天鉞會照 — 逢凶化吉",
      ],
    },
    {
      id: "career",
      title: "事業宮解讀",
      titleEn: "Career Palace Analysis",
      icon: <BookOpen className="w-4 h-4" />,
      content:
        "事業宮（官祿宮）在子宮，天機星獨坐。天機為南斗益算之星，主智慧、策劃與變動。您天生具有敏銳的觀察力和分析能力，適合從事需要策略思維的工作。\n\n化科星落入事業宮，代表您在專業領域具有學術聲望和研究能力。當前大運（第三大運）走天梁星，利於教育、顧問、顧問型工作。建議把握2025-2027年的事業上升期。",
      highlights: [
        "天機化科 — 智慧型事業路線",
        "第三大運走天梁 — 適合顧問教育業",
        "2025-2027為事業黃金期",
      ],
    },
    {
      id: "wealth",
      title: "財運分析",
      titleEn: "Wealth Analysis",
      icon: <Sparkles className="w-4 h-4" />,
      content:
        "財帛宮在卯宮，武曲天相同宮。武曲為財星，天相為印星，組成「武相朝垣格」。此格局主正財穩定、理財有道。您適合以穩健的方式累積財富，如定期存款、基金定投等。\n\n福德宮見祿存星，一生不缺物質享受，但需注意「祿逢沖破」之象 — 建議避免高風險投資。流年財運方面，2025年丙午年財帛宮流祿入命，為進財之年。",
      highlights: [
        "武相朝垣 — 正財穩定",
        "祿存入福德 — 一生衣食無憂",
        "2025流祿入命 — 進財之年",
      ],
    },
    {
      id: "relationship",
      title: "感情與人際",
      titleEn: "Relationships",
      icon: <BookOpen className="w-4 h-4" />,
      content:
        "夫妻宮在酉宮，太陽星獨坐。太陽為中天主星，入夫妻宮代表配偶為人慷慨、有才華、善於社交。但太陽在酉宮為「日落西山」之象，需注意配偶健康。\n\n遷移宮見紅鸞、天喜，社交運極佳，容易在社交場合遇到貴人及桃花。若已婚者，需注意流年桃花星過強可能帶來的誘惑。建議佩戴相應的開光靈器以增強感情穩定。",
      highlights: [
        "太陽入夫妻 — 配偶有才華",
        "紅鸞天喜入遷移 — 社交運旺",
        "建議佩戴桃花姻緣靈器",
      ],
    },
  ],
  recommendation: {
    title: "龍龜聚財翡翠吊墜",
    description: "根據您的命盤分析，龍龜有助於穩固財運、化解事業阻礙",
    productId: "prod-003",
  },
};

export default function ReadingReport({ report, className }: ReadingReportProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(report.sections.map((s) => s.id))
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      {/* 報告頭部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Badge variant="default" size="lg" className="mb-4">
          {report.method} · {report.methodEn}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-serif-tc font-bold text-ivory mb-2">
          {report.title}
        </h1>
        <p className="text-neutral-400 font-english">{report.titleEn}</p>
        <p className="text-sm text-neutral-500 mt-2">{report.subtitle}</p>
        <p className="text-xs text-neutral-600 mt-1">
          生成時間：{report.generatedAt}
        </p>

        {/* 操作按鈕 */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            下載 PDF
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
            分享
          </Button>
        </div>
      </motion.div>

      {/* 分隔線 */}
      <div className="taoist-divider mb-8">
        <span className="taoist-divider-symbol">☰</span>
      </div>

      {/* 報告章節 */}
      <div className="space-y-4">
        {report.sections.map((section, index) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="overflow-hidden">
                {/* 章節頭部 */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-gold/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {section.icon && (
                      <div className="text-gold">{section.icon}</div>
                    )}
                    <div>
                      <h2 className="text-lg font-serif-tc font-semibold text-ivory">
                        {section.title}
                      </h2>
                      <p className="text-xs text-neutral-500">{section.titleEn}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                {/* 章節內容 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="px-5 pb-5">
                        {/* 亮點 */}
                        {section.highlights && section.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {section.highlights.map((h, i) => (
                              <Badge key={i} variant="warning" size="sm">
                                {h}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* 正文 */}
                        <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 推薦靈器 */}
      {report.recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="taoist-divider mb-6">
            <span className="taoist-divider-symbol">✦</span>
          </div>
          <Card variant="elevated" className="p-6">
            <div className="flex items-start gap-4">
              {/* Placeholder 圖片 */}
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gold/20 to-cinnabar-red/20 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-8 h-8 text-gold" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gold mb-1">根據您的命盤推薦</p>
                <h3 className="text-lg font-serif-tc font-semibold text-ivory mb-1">
                  {report.recommendation.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-3">
                  {report.recommendation.description}
                </p>
                <Button size="sm">
                  查看詳情
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
