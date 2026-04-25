"use client";

import { motion } from "framer-motion";
import { Check, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionEn: string;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
  cta: string;
  ctaEn: string;
}

interface PricingTableProps {
  tiers?: PricingTier[];
  method?: string;
  className?: string;
}

// 預設價格表
export const defaultPricingTiers: PricingTier[] = [
  {
    id: "ai-quick",
    name: "AI 快速解讀",
    nameEn: "AI Quick Reading",
    price: 28,
    description: "AI 即時生成基礎報告",
    descriptionEn: "Instant AI-generated basic report",
    features: [
      { text: "命盤排定", included: true },
      { text: "基本格局分析", included: true },
      { text: "十二宮概覽", included: true },
      { text: "五行強弱分析", included: false },
      { text: "大運流年解析", included: false },
      { text: "人工大師點評", included: false },
    ],
    cta: "立即解讀",
    ctaEn: "Get Reading",
  },
  {
    id: "ai-full",
    name: "AI 完整解讀",
    nameEn: "AI Full Reading",
    price: 68,
    description: "AI 深度分析完整報告",
    descriptionEn: "Comprehensive AI deep analysis",
    features: [
      { text: "命盤排定", included: true },
      { text: "基本格局分析", included: true },
      { text: "十二宮概覽", included: true },
      { text: "五行強弱分析", included: true },
      { text: "大運流年解析", included: true },
      { text: "人工大師點評", included: false },
    ],
    isPopular: true,
    cta: "立即解讀",
    ctaEn: "Get Reading",
  },
  {
    id: "master-deep",
    name: "人工深度解讀",
    nameEn: "Master Deep Reading",
    price: 288,
    originalPrice: 388,
    description: "資深大師一對一深度諮詢",
    descriptionEn: "One-on-one consultation with senior master",
    features: [
      { text: "命盤排定", included: true },
      { text: "基本格局分析", included: true },
      { text: "十二宮深度解析", included: true },
      { text: "五行強弱分析", included: true },
      { text: "大運流年精確推算", included: true },
      { text: "人工大師一對一點評", included: true },
    ],
    cta: "預約大師",
    ctaEn: "Book Master",
  },
];

export default function PricingTable({
  tiers = defaultPricingTiers,
  method,
  className,
}: PricingTableProps) {
  return (
    <div className={cn("max-w-5xl mx-auto", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={cn(
              "relative rounded-xl border p-6 transition-all duration-300 flex flex-col",
              tier.isPopular
                ? "border-gold bg-gradient-to-b from-gold/5 to-yin-black-light shadow-lg shadow-gold/10 scale-[1.02]"
                : "border-neutral-700/50 bg-yin-black-light/50 hover:border-gold/20"
            )}
          >
            {/* 熱門標記 */}
            {tier.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" className="flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  最受歡迎
                </Badge>
              </div>
            )}

            {/* 術數名稱 */}
            {method && (
              <p className="text-xs text-gold mb-3">{method}</p>
            )}

            {/* 名稱 */}
            <h3 className="text-xl font-serif-tc font-bold text-ivory mb-0.5">
              {tier.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-4 font-english">
              {tier.nameEn}
            </p>

            {/* 價格 */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gold">
                  {formatPrice(tier.price, false)}
                </span>
                {tier.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    {formatPrice(tier.originalPrice, false)}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-1">{tier.description}</p>
            </div>

            {/* 分隔線 */}
            <div className="border-t border-neutral-700/50 my-4" />

            {/* 功能列表 */}
            <ul className="space-y-3 flex-1 mb-6">
              {tier.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm",
                    feature.included ? "text-neutral-300" : "text-neutral-600"
                  )}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={tier.isPopular ? "secondary" : "outline"}
              className="w-full"
              size="md"
            >
              {tier.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
