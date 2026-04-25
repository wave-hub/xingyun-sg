"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 五行顏色
const wuxingColors: Record<string, { color: string; bg: string; label: string; labelEn: string }> = {
  "木": { color: "#4ade80", bg: "#4ade8020", label: "木", labelEn: "Wood" },
  "火": { color: "#ef4444", bg: "#ef444420", label: "火", labelEn: "Fire" },
  "土": { color: "#eab308", bg: "#eab30820", label: "土", labelEn: "Earth" },
  "金": { color: "#e2e8f0", bg: "#e2e8f020", label: "金", labelEn: "Metal" },
  "水": { color: "#60a5fa", bg: "#60a5fa20", label: "水", labelEn: "Water" },
};

// 十神
interface ShiShen {
  name: string;
  element: string;
}

interface Pillar {
  label: string;
  labelEn: string;
  heavenlyStem: string;
  earthlyBranch: string;
  stemElement: string;
  branchElement: string;
  shiShen: ShiShen;
}

// Mock 四柱數據
const mockPillars: Pillar[] = [
  {
    label: "年柱", labelEn: "Year",
    heavenlyStem: "己", earthlyBranch: "未",
    stemElement: "土", branchElement: "土",
    shiShen: { name: "劫財", element: "土" },
  },
  {
    label: "月柱", labelEn: "Month",
    heavenlyStem: "庚", earthlyBranch: "午",
    stemElement: "金", branchElement: "火",
    shiShen: { name: "食神", element: "金" },
  },
  {
    label: "日柱", labelEn: "Day",
    heavenlyStem: "甲", earthlyBranch: "子",
    stemElement: "木", branchElement: "水",
    shiShen: { name: "日主", element: "木" },
  },
  {
    label: "時柱", labelEn: "Hour",
    heavenlyStem: "丙", earthlyBranch: "寅",
    stemElement: "火", branchElement: "木",
    shiShen: { name: "傷官", element: "火" },
  },
];

// 五行分佈（百分比）
const wuxingDistribution = [
  { element: "木", count: 2 },
  { element: "火", count: 1 },
  { element: "土", count: 2 },
  { element: "金", count: 1 },
  { element: "水", count: 2 },
];

// Mock 大運
const mockDaYun = [
  { startAge: 4, endAge: 13, stem: "辛", branch: "巳", element: "金" },
  { startAge: 14, endAge: 23, stem: "壬", branch: "辰", element: "水" },
  { startAge: 24, endAge: 33, stem: "癸", branch: "卯", element: "水" },
  { startAge: 34, endAge: 43, stem: "甲", branch: "寅", element: "木" },
  { startAge: 44, endAge: 53, stem: "乙", branch: "丑", element: "木" },
  { startAge: 54, endAge: 63, stem: "丙", branch: "子", element: "火" },
];

interface BaziChartProps {
  pillars?: Pillar[];
  className?: string;
}

export default function BaziChart({ pillars = mockPillars, className }: BaziChartProps) {
  const total = wuxingDistribution.reduce((s, w) => s + w.count, 0);

  // 五行餅圖 SVG
  const renderPieChart = () => {
    let cumulativePercent = 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {wuxingDistribution.map((item, i) => {
            const percent = (item.count / total) * 100;
            const dashLength = (percent / 100) * circumference;
            const dashOffset = -cumulativePercent * (circumference / 100);
            cumulativePercent += percent;

            return (
              <circle
                key={i}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={wuxingColors[item.element].color}
                strokeWidth="16"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                opacity={0.85}
              />
            );
          })}
          {/* 中心文字 */}
          <text x="60" y="56" textAnchor="middle" fill="#d4a853" fontSize="14" fontWeight="bold">
            五行
          </text>
          <text x="60" y="72" textAnchor="middle" fill="#999" fontSize="9">
            分布
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      {/* 標題 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-serif-tc font-bold text-gold">八字命盤</h3>
        <p className="text-xs text-neutral-500">己未年 庚午月 甲子日 丙寅時</p>
      </div>

      {/* 四柱 */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-xl border p-4 text-center",
              "bg-yin-black-light/80 border-neutral-700/50"
            )}
          >
            {/* 柱名 */}
            <p className="text-xs text-neutral-500 mb-3">{pillar.label}</p>
            <p className="text-[9px] text-neutral-600 -mt-2 mb-3 font-english">{pillar.labelEn}</p>

            {/* 天干 */}
            <div className="mb-2">
              <div
                className="text-3xl font-serif-tc font-bold"
                style={{ color: wuxingColors[pillar.stemElement].color }}
              >
                {pillar.heavenlyStem}
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: wuxingColors[pillar.stemElement].color + "99" }}
              >
                {wuxingColors[pillar.stemElement].label}
              </div>
            </div>

            {/* 分隔線 */}
            <div className="border-t border-neutral-700/50 my-2" />

            {/* 地支 */}
            <div className="mb-2">
              <div
                className="text-3xl font-serif-tc font-bold"
                style={{ color: wuxingColors[pillar.branchElement].color }}
              >
                {pillar.earthlyBranch}
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: wuxingColors[pillar.branchElement].color + "99" }}
              >
                {wuxingColors[pillar.branchElement].label}
              </div>
            </div>

            {/* 十神 */}
            <div className="mt-3 pt-2 border-t border-neutral-700/30">
              <p className="text-[10px] text-neutral-500 mb-0.5">十神</p>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: wuxingColors[pillar.shiShen.element].color,
                  backgroundColor: wuxingColors[pillar.shiShen.element].bg,
                }}
              >
                {pillar.shiShen.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 日主信息 */}
      <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 mb-8 text-center">
        <p className="text-sm text-neutral-400 mb-1">日主 Day Master</p>
        <span
          className="text-4xl font-serif-tc font-bold"
          style={{ color: wuxingColors["木"].color }}
        >
          甲
        </span>
        <span className="text-lg text-neutral-400 ml-2">木</span>
        <p className="text-xs text-neutral-500 mt-1">參天大树 — 陽木之氣，正直堅韌</p>
      </div>

      {/* 五行分佈 */}
      <div className="rounded-xl border border-neutral-700/50 bg-yin-black-light/50 p-5 mb-8">
        <h4 className="text-sm font-medium text-ivory mb-4 text-center">五行分佈 Distribution</h4>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {renderPieChart()}
          <div className="flex-1 grid grid-cols-5 gap-2">
            {wuxingDistribution.map((item) => {
              const info = wuxingColors[item.element];
              const percent = Math.round((item.count / total) * 100);
              return (
                <div key={item.element} className="text-center">
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-1.5 flex items-center justify-center text-lg font-serif-tc font-bold"
                    style={{ backgroundColor: info.bg, color: info.color }}
                  >
                    {item.element}
                  </div>
                  <p className="text-xs text-neutral-400">{info.labelEn}</p>
                  <p className="text-sm font-bold" style={{ color: info.color }}>
                    {item.count}
                  </p>
                  <p className="text-[10px] text-neutral-500">{percent}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 大運時間線 */}
      <div className="rounded-xl border border-neutral-700/50 bg-yin-black-light/50 p-5">
        <h4 className="text-sm font-medium text-ivory mb-4 text-center">大運時間線 Major Luck Cycles</h4>
        <div className="relative">
          {/* 時間線軸 */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-700" />
          <div className="flex overflow-x-auto pb-2 gap-1">
            {mockDaYun.map((daYun, index) => {
              const isCurrent =
                new Date().getFullYear() >= 1979 + daYun.startAge &&
                new Date().getFullYear() <= 1979 + daYun.endAge;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex-shrink-0 w-20 text-center relative pt-8",
                    isCurrent && "scale-105"
                  )}
                >
                  {/* 節點 */}
                  <div
                    className={cn(
                      "absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10",
                      isCurrent
                        ? "bg-gold border-gold shadow-gold"
                        : "bg-yin-black border-neutral-500"
                    )}
                  />
                  {/* 內容 */}
                  <div
                    className={cn(
                      "text-lg font-serif-tc font-bold",
                      isCurrent ? "text-gold" : "text-ivory"
                    )}
                    style={{ color: isCurrent ? undefined : wuxingColors[daYun.element].color }}
                  >
                    {daYun.stem}{daYun.branch}
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    {daYun.startAge}-{daYun.endAge}歲
                  </p>
                  {isCurrent && (
                    <span className="text-[9px] text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">
                      現運
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
