"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// 紫微斗數星曜類型
type StarType = "major" | "minor" | "evil" | "shenhua";

interface Star {
  name: string;
  type: StarType;
  shenhua?: string; // 四化：化祿、化權、化科、化忌
}

interface Palace {
  name: string;
  position: [number, number]; // grid position [row, col]
  stem: string; // 天干
  branch: string; // 地支
  mainStars: Star[];
  minorStars: Star[];
}

// Mock 命盤數據
const mockPalaces: Palace[] = [
  {
    name: "命宮", position: [1, 0], stem: "庚", branch: "辰",
    mainStars: [
      { name: "紫微", type: "major" },
      { name: "天府", type: "major" },
    ],
    minorStars: [{ name: "左輔", type: "minor" }],
  },
  {
    name: "兄弟", position: [1, 1], stem: "辛", branch: "巳",
    mainStars: [{ name: "太陰", type: "major" }],
    minorStars: [{ name: "文昌", type: "minor", shenhua: "化科" }],
  },
  {
    name: "夫妻", position: [1, 2], stem: "壬", branch: "午",
    mainStars: [{ name: "太陽", type: "major" }],
    minorStars: [],
  },
  {
    name: "子女", position: [1, 3], stem: "癸", branch: "未",
    mainStars: [{ name: "武曲", type: "major", shenhua: "化祿" }],
    minorStars: [{ name: "天相", type: "minor" }],
  },
  {
    name: "財帛", position: [0, 3], stem: "甲", branch: "申",
    mainStars: [
      { name: "天機", type: "major", shenhua: "化權" },
    ],
    minorStars: [],
  },
  {
    name: "疾厄", position: [0, 2], stem: "乙", branch: "酉",
    mainStars: [{ name: "天同", type: "major" }],
    minorStars: [{ name: "祿存", type: "minor" }],
  },
  {
    name: "遷移", position: [0, 1], stem: "丙", branch: "戌",
    mainStars: [],
    minorStars: [{ name: "紅鸞", type: "minor" }, { name: "天喜", type: "minor" }],
  },
  {
    name: "交友", position: [0, 0], stem: "丁", branch: "亥",
    mainStars: [{ name: "天梁", type: "major" }],
    minorStars: [{ name: "右弼", type: "minor" }],
  },
  {
    name: "官祿", position: [2, 0], stem: "戊", branch: "子",
    mainStars: [{ name: "天機", type: "major" }],
    minorStars: [{ name: "天鉞", type: "minor" }],
  },
  {
    name: "田宅", position: [2, 1], stem: "己", branch: "丑",
    mainStars: [],
    minorStars: [{ name: "天魁", type: "minor" }],
  },
  {
    name: "福德", position: [2, 2], stem: "庚", branch: "寅",
    mainStars: [{ name: "貪狼", type: "major", shenhua: "化忌" }],
    minorStars: [],
  },
  {
    name: "父母", position: [2, 3], stem: "辛", branch: "卯",
    mainStars: [{ name: "巨門", type: "major" }],
    minorStars: [],
  },
];

const shenhuaColors: Record<string, string> = {
  "化祿": "#4ade80",
  "化權": "#f97316",
  "化科": "#60a5fa",
  "化忌": "#ef4444",
};

const starTypeColors: Record<StarType, string> = {
  major: "#d4a853",     // 金色
  minor: "#60a5fa",     // 藍色
  evil: "#ef4444",      // 暗紅色
  shenhua: "#a78bfa",   // 紫色
};

interface ChartDisplayProps {
  palaces?: Palace[];
  className?: string;
}

export default function ChartDisplay({ palaces = mockPalaces, className }: ChartDisplayProps) {
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);

  // 4x4 網格布局 (中心 2x2 為中宮信息)
  const renderGrid = () => {
    const grid: (Palace | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));

    // 上排：交友(0,0) 遷移(0,1) 疾厄(0,2) 財帛(0,3)
    // 中排：命宮(1,0) 兄弟(1,1) 夫妻(1,2) 子女(1,3)
    // 下排：官祿(2,0) 田宅(2,1) 福德(2,2) 父母(2,3)
    palaces.forEach((p) => {
      const [r, c] = p.position;
      if (r >= 0 && r < 4 && c >= 0 && c < 4) {
        grid[r][c] = p;
      }
    });

    return grid;
  };

  const grid = renderGrid();
  const cellSize = "w-full aspect-square";

  const isCenterCell = (row: number, col: number) =>
    row === 3 || (row === 2 && col >= 0 && col <= 1) || col >= 2;

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      {/* 命盤標題 */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-serif-tc font-bold text-gold">紫微命盤</h3>
        <p className="text-xs text-neutral-500">庚辰年生 · 男命 · 辰時</p>
      </div>

      {/* 圖例 */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: starTypeColors.major }} />
          <span className="text-neutral-400">主星</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: starTypeColors.minor }} />
          <span className="text-neutral-400">輔星</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: shenhuaColors["化祿"] }} />
          <span className="text-neutral-400">祿</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: shenhuaColors["化權"] }} />
          <span className="text-neutral-400">權</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: shenhuaColors["化科"] }} />
          <span className="text-neutral-400">科</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: shenhuaColors["化忌"] }} />
          <span className="text-neutral-400">忌</span>
        </div>
      </div>

      {/* 命盤網格 */}
      <div className="grid grid-cols-4 grid-rows-4 gap-[2px] bg-gold/20 rounded-xl overflow-hidden border border-gold/20">
        {grid.map((row, r) =>
          row.map((palace, c) => {
            if (isCenterCell(r, c)) {
              // 中心區域：顯示命盤信息
              return (
                <div
                  key={`${r}-${c}`}
                  className="bg-yin-black/90 flex items-center justify-center p-1"
                >
                  {r === 3 && c === 0 && (
                    <div className="text-center">
                      <div className="text-gold text-lg font-serif-tc">星運堂</div>
                      <div className="text-[9px] text-neutral-500">XingYun Tang</div>
                    </div>
                  )}
                  {r === 3 && c === 1 && (
                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400">三術合一</div>
                      <div className="text-[9px] text-neutral-500">☯</div>
                    </div>
                  )}
                  {r === 3 && c === 2 && (
                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400">指點迷津</div>
                    </div>
                  )}
                  {r === 3 && c === 3 && (
                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400">排盤結果</div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => palace && setSelectedPalace(palace)}
                className={cn(
                  "bg-yin-black-light/80 hover:bg-yin-black-light p-1.5 transition-colors duration-200",
                  "flex flex-col items-center justify-center text-center min-h-[80px]",
                  palace && selectedPalace?.name === palace.name && "bg-gold/5 ring-1 ring-gold/30"
                )}
              >
                {palace ? (
                  <>
                    {/* 宮位名稱 */}
                    <div className="text-[10px] font-bold text-ivory mb-0.5">{palace.name}</div>
                    {/* 天干地支 */}
                    <div className="text-[8px] text-neutral-500 mb-1">
                      {palace.stem}{palace.branch}
                    </div>
                    {/* 主星 */}
                    <div className="flex flex-wrap gap-0.5 justify-center">
                      {palace.mainStars.map((star, si) => (
                        <span
                          key={si}
                          className="text-[10px] font-medium px-1 py-0.5 rounded"
                          style={{
                            color: starTypeColors[star.type],
                            backgroundColor: starTypeColors[star.type] + "15",
                          }}
                        >
                          {star.name}
                          {star.shenhua && (
                            <span
                              className="ml-0.5 text-[8px]"
                              style={{ color: shenhuaColors[star.shenhua] }}
                            >
                              {star.shenhua.replace("化", "")}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                    {/* 輔星 */}
                    {palace.minorStars.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 justify-center mt-0.5">
                        {palace.minorStars.slice(0, 3).map((star, si) => (
                          <span
                            key={si}
                            className="text-[8px] px-0.5 rounded"
                            style={{
                              color: starTypeColors[star.type],
                            }}
                          >
                            {star.name}
                            {star.shenhua && (
                              <span style={{ color: shenhuaColors[star.shenhua] }}>
                                {star.shenhua.replace("化", "")}
                              </span>
                            )}
                          </span>
                        ))}
                        {palace.minorStars.length > 3 && (
                          <span className="text-[8px] text-neutral-500">
                            +{palace.minorStars.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-[10px] text-neutral-700">空宮</div>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* 宮位詳情彈窗 */}
      <AnimatePresence>
        {selectedPalace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPalace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-yin-black-light border border-gold/20 rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif-tc font-bold text-gold">
                  {selectedPalace.stem}{selectedPalace.branch} · {selectedPalace.name}
                </h3>
                <button
                  onClick={() => setSelectedPalace(null)}
                  className="text-neutral-400 hover:text-ivory transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 主星 */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-500 mb-2">主星 Major Stars</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPalace.mainStars.map((star, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          color: starTypeColors[star.type],
                          backgroundColor: starTypeColors[star.type] + "20",
                          border: `1px solid ${starTypeColors[star.type]}40`,
                        }}
                      >
                        {star.name}
                        {star.shenhua && (
                          <span
                            className="ml-1.5 font-bold"
                            style={{ color: shenhuaColors[star.shenhua] }}
                          >
                            {star.shenhua}
                          </span>
                        )}
                      </span>
                    ))}
                    {selectedPalace.mainStars.length === 0 && (
                      <span className="text-sm text-neutral-500">無主星入宮</span>
                    )}
                  </div>
                </div>

                {/* 輔星 */}
                {selectedPalace.minorStars.length > 0 && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">輔星 Minor Stars</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPalace.minorStars.map((star, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs"
                          style={{
                            color: starTypeColors[star.type],
                            backgroundColor: starTypeColors[star.type] + "15",
                          }}
                        >
                          {star.name}
                          {star.shenhua && (
                            <span
                              className="ml-1 font-bold"
                              style={{ color: shenhuaColors[star.shenhua] }}
                            >
                              {star.shenhua}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
