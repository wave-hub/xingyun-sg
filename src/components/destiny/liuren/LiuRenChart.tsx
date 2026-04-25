"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 六壬課式 Mock 數據

interface SiKeLesson {
  first: { stem: string; branch: string; label: string };
  second: { stem: string; branch: string; label: string };
  third: { stem: string; branch: string; label: string };
  fourth: { stem: string; branch: string; label: string };
}

interface SanChuan {
  chu: { stem: string; branch: string; label: string; element: string };
  zhong: { stem: string; branch: string; label: string; element: string };
  mo: { stem: string; branch: string; label: string; element: string };
}

interface LiuRenData {
  question: string;
  time: string;
  tianPan: string[][];    // 天盤
  diPan: string[][];       // 地盤
  siKe: SiKeLesson;
  sanChuan: SanChuan;
  jiangShen: string;
  keTiName: string;
  keTiDesc: string;
}

const elementColors: Record<string, string> = {
  "木": "#4ade80",
  "火": "#ef4444",
  "土": "#eab308",
  "金": "#e2e8f0",
  "水": "#60a5fa",
};

// Mock 六壬課式
const mockLiuRenData: LiuRenData = {
  question: "問：近期事業運勢如何？",
  time: "甲辰年 己巳月 丙寅日 午時",
  tianPan: [
    ["丑", "寅", "卯", "辰"],
    ["子", "", "", "巳"],
    ["亥", "", "", "午"],
    ["戌", "酉", "申", "未"],
  ],
  diPan: [
    ["丑", "寅", "卯", "辰"],
    ["子", "丑", "寅", "卯"],
    ["亥", "子", "丑", "寅"],
    ["戌", "亥", "子", "丑"],
  ],
  siKe: {
    first: { stem: "丙", branch: "午", label: "第一課" },
    second: { stem: "午", branch: "寅", label: "第二課" },
    third: { stem: "寅", branch: "午", label: "第三課" },
    fourth: { stem: "午", branch: "寅", label: "第四課" },
  },
  sanChuan: {
    chu: { stem: "寅", branch: "午", label: "初傳", element: "木" },
    zhong: { stem: "午", branch: "寅", label: "中傳", element: "火" },
    mo: { stem: "寅", branch: "午", label: "末傳", element: "木" },
  },
  jiangShen: "天將：貴人",
  keTiName: "涉害課",
  keTiDesc: "涉害課者，四課中俱有克賊，取初傳之法為涉害。此課主事有阻礙，需經過一番波折方能達成目標。初傳見木，中傳見火，末傳見木，木火相生，最終結果為吉。",
};

interface LiuRenChartProps {
  data?: LiuRenData;
  className?: string;
}

export default function LiuRenChart({ data = mockLiuRenData, className }: LiuRenChartProps) {
  const [activeLayer, setActiveLayer] = useState<"tianpan" | "dipan" | "siKe">("tianpan");

  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      {/* 標題 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-serif-tc font-bold text-gold">大六壬課盤</h3>
        <p className="text-xs text-neutral-500">{data.time}</p>
        <p className="text-sm text-ivory mt-2">{data.question}</p>
      </div>

      {/* 課體名稱 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 border border-gold/20">
          <span className="text-xs text-gold">課體</span>
          <span className="text-lg font-serif-tc font-bold text-gold">{data.keTiName}</span>
        </div>
      </div>

      {/* 層級切換 */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[
          { key: "tianpan" as const, label: "天盤" },
          { key: "dipan" as const, label: "地盤" },
          { key: "siKe" as const, label: "四課" },
        ].map((layer) => (
          <button
            key={layer.key}
            onClick={() => setActiveLayer(layer.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-all duration-300",
              activeLayer === layer.key
                ? "bg-gold/15 text-gold border border-gold/30"
                : "text-neutral-400 hover:text-ivory border border-transparent hover:border-neutral-700"
            )}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* 方格盤 */}
      <div className="grid grid-cols-4 gap-[2px] max-w-sm mx-auto mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="contents"
          >
            {(activeLayer === "tianpan" ? data.tianPan : activeLayer === "dipan" ? data.diPan : null)
              ?.map((row, r) =>
                row.map((cell, c) => (
                  <div
                    key={`${r}-${c}`}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-lg font-serif-tc font-bold",
                      "bg-yin-black-light border border-neutral-700/30",
                      activeLayer === "tianpan"
                        ? "text-gold"
                        : activeLayer === "dipan"
                        ? "text-neutral-300"
                        : "text-cinnabar-red"
                    )}
                  >
                    {cell || (
                      <span className="text-neutral-700 text-xs">—</span>
                    )}
                  </div>
                ))
              )}

            {/* 四課視圖 */}
            {activeLayer === "siKe" && (
              <>
                {[data.siKe.first, data.siKe.second, data.siKe.third, data.siKe.fourth].map(
                  (ke, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-yin-black-light border border-cinnabar-red/30 p-1.5 flex flex-col items-center justify-center"
                    >
                      <span className="text-[8px] text-neutral-500 mb-1">{ke.label}</span>
                      <span className="text-xl font-serif-tc font-bold text-cinnabar-red">
                        {ke.stem}{ke.branch}
                      </span>
                    </div>
                  )
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 三傳 */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-ivory mb-3 text-center">三傳 Three Transmissions</h4>
        <div className="flex items-center justify-center gap-4">
          {/* 連接線 */}
          <div className="flex items-center gap-0">
            {[data.sanChuan.chu, data.sanChuan.zhong, data.sanChuan.mo].map((chuan, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="w-24 p-3 rounded-xl border text-center"
                  style={{
                    borderColor: elementColors[chuan.element] + "40",
                    backgroundColor: elementColors[chuan.element] + "10",
                  }}
                >
                  <p className="text-xs text-neutral-500 mb-1">{chuan.label}</p>
                  <p
                    className="text-2xl font-serif-tc font-bold"
                    style={{ color: elementColors[chuan.element] }}
                  >
                    {chuan.stem}{chuan.branch}
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{chuan.element}</p>
                </motion.div>
                {i < 2 && (
                  <div className="flex-shrink-0 px-2">
                    <svg width="20" height="2" className="text-gold/50">
                      <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 將神 */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yin-black-light border border-gold/20">
          <span className="text-sm text-neutral-400">將神</span>
          <span className="text-gold font-serif-tc font-medium">{data.jiangShen}</span>
        </div>
      </div>

      {/* 課體解析 */}
      <div className="rounded-xl border border-neutral-700/50 bg-yin-black-light/50 p-5">
        <h4 className="text-sm font-medium text-ivory mb-3">課體解析 Interpretation</h4>
        <p className="text-sm text-neutral-300 leading-relaxed">
          {data.keTiDesc}
        </p>
      </div>

      {/* 道教裝飾 */}
      <div className="taoist-divider mt-8">
        <span className="taoist-divider-symbol">☲</span>
      </div>
    </div>
  );
}
