"use client";

import { motion } from "framer-motion";
import { Star, Compass, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type DestinyMethod = "ziwei" | "bazi" | "liuren";

interface MethodOption {
  id: DestinyMethod;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ReactNode;
  color: string;
}

const methods: MethodOption[] = [
  {
    id: "ziwei",
    name: "紫微斗數",
    nameEn: "Zi Wei Dou Shu",
    description: "人生地圖 — 十二宮全景解讀",
    descriptionEn: "Life Map — Complete 12 Palace Reading",
    icon: <Star className="w-6 h-6" />,
    color: "from-purple-900/40 to-indigo-900/40",
  },
  {
    id: "bazi",
    name: "八字命理",
    nameEn: "Ba Zi",
    description: "能量底色 — 五行氣勢趨勢分析",
    descriptionEn: "Energy Blueprint — Five Elements Trend Analysis",
    icon: <Compass className="w-6 h-6" />,
    color: "from-amber-900/40 to-orange-900/40",
  },
  {
    id: "liuren",
    name: "大六壬",
    nameEn: "Da Liu Ren",
    description: "事態預測 — 精準斷課決策輔助",
    descriptionEn: "Event Forecast — Precise Divination Guidance",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-teal-900/40 to-cyan-900/40",
  },
];

interface MethodSelectorProps {
  selected?: DestinyMethod;
  onSelect?: (method: DestinyMethod) => void;
  variant?: "card" | "tab";
  showCombined?: boolean;
  className?: string;
}

export default function MethodSelector({
  selected,
  onSelect,
  variant = "card",
  showCombined = true,
  className,
}: MethodSelectorProps) {
  if (variant === "tab") {
    return (
      <div className={cn("flex gap-1 p-1 rounded-xl bg-yin-black-light/80 border border-neutral-700/50", className)}>
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect?.(method.id)}
            className={cn(
              "flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300 text-center",
              selected === method.id
                ? "bg-gold/15 text-gold shadow-md"
                : "text-neutral-400 hover:text-ivory hover:bg-neutral-700/30"
            )}
          >
            <span className="hidden sm:inline">{method.name}</span>
            <span className="sm:hidden text-xs">{method.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {methods.map((method, index) => (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect?.(method.id)}
            className={cn(
              "relative group p-6 rounded-xl border text-left transition-all duration-300 overflow-hidden",
              "bg-gradient-to-br " + method.color,
              selected === method.id
                ? "border-gold shadow-lg shadow-gold/10"
                : "border-neutral-700/50 hover:border-gold/30"
            )}
          >
            {/* 選中指示器 */}
            {selected === method.id && (
              <motion.div
                layoutId="method-indicator"
                className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}

            {/* 圖標 */}
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300",
              selected === method.id ? "bg-gold/20 text-gold" : "bg-neutral-700/50 text-neutral-400 group-hover:text-gold"
            )}>
              {method.icon}
            </div>

            {/* 名稱 */}
            <h3 className={cn(
              "text-lg font-serif-tc font-semibold mb-1 transition-colors",
              selected === method.id ? "text-gold" : "text-ivory"
            )}>
              {method.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-2 font-english">{method.nameEn}</p>

            {/* 描述 */}
            <p className="text-sm text-neutral-400 leading-relaxed">
              {method.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* 三術合參 */}
      {showCombined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cinnabar-red/20 via-gold/20 to-cinnabar-red/20 rounded-xl blur-xl opacity-50" />
          <div className={cn(
            "relative p-6 md:p-8 rounded-xl border text-center",
            "bg-gradient-to-r from-yin-black-light via-yin-black to-yin-black-light",
            "border-gold/30 hover:border-gold/50 transition-all duration-300",
            "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-gold/5"
          )}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-medium">旗艦服務</span>
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-2xl font-serif-tc font-bold gradient-text-gold mb-2">
              三術合參
            </h3>
            <p className="text-sm text-neutral-400 mb-1 font-english">
              Three-Method Combined Analysis
            </p>
            <p className="text-neutral-300 text-sm max-w-md mx-auto">
              三大術數同時分析，交叉印證，全方位解讀命運格局。最權威、最完整的命理服務。
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
