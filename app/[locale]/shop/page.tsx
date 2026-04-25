"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest" | "rating";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.nameZh.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "newest": return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
        case "rating": return b.rating - a.rating;
        default: return b.reviewCount - a.reviewCount;
      }
    });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4">
        <div className="container-brand max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm">開光認證 · 品質保證</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              靈器商城
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto">
              精選開光認證靈器，為您的命理之路增添助力
            </p>
          </motion.div>
        </div>
      </section>

      {/* 分類 + 筛選 */}
      <section className="px-4 pb-20">
        <div className="container-brand max-w-6xl mx-auto">
          {/* 搜索與排序 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索靈器..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-yin-black-light border border-neutral-700 text-sm text-ivory placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 text-sm text-neutral-400 hover:border-gold/30 hover:text-gold transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              篩選排序
            </button>
          </div>

          {/* 篩選面板 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="rounded-xl border border-neutral-700/50 bg-yin-black-light/50 p-4">
                  <p className="text-xs text-neutral-500 mb-2">排序方式</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "popular" as SortOption, label: "最熱銷" },
                      { key: "newest" as SortOption, label: "最新上架" },
                      { key: "rating" as SortOption, label: "評分最高" },
                      { key: "price-asc" as SortOption, label: "價格低到高" },
                      { key: "price-desc" as SortOption, label: "價格高到低" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setSortBy(opt.key)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs transition-all",
                          sortBy === opt.key
                            ? "bg-gold/15 text-gold border border-gold/30"
                            : "text-neutral-400 hover:text-ivory border border-transparent hover:border-neutral-600"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 分類導航 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap",
                  activeCategory === cat.id
                    ? "bg-gold text-yin-black font-medium"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-ivory"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 商品數量 */}
          <p className="text-xs text-neutral-500 mb-4">
            共 {filteredProducts.length} 件商品
          </p>

          {/* 商品網格 */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-400 mb-2">找不到相關商品</p>
              <p className="text-sm text-neutral-500">試試其他關鍵詞或分類</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
