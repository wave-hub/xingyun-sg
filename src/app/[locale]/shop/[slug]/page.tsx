"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ProductCard from "@/components/shop/ProductCard";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface ProductDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // In a real app, we'd use the slug from params. For demo, use mock
  const product = products[0]; // Default to first product
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "cert" | "reviews">("desc");

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* 麵包屑 */}
      <section className="px-4 pt-6">
        <div className="container-brand max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gold transition-colors">靈器商城</Link>
            <span>/</span>
            <span className="text-neutral-300">{product.nameZh}</span>
          </nav>
        </div>
      </section>

      {/* 商品詳情 */}
      <section className="px-4 py-8">
        <div className="container-brand max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* 圖片區 */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/50 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl text-gold/40">☯</span>
                  </div>
                  <p className="text-sm text-neutral-500">商品圖片</p>
                </div>
              </div>

              {/* 縮略圖列表 */}
              <div className="flex items-center gap-3 mt-4">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-20 h-20 rounded-lg border flex items-center justify-center transition-all",
                      i === 1 ? "border-gold/50 bg-gold/5" : "border-neutral-700 hover:border-neutral-500"
                    )}
                  >
                    <span className="text-lg text-gold/30">☯</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 信息區 */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* 標籤 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isBlessed && (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> 開光認證
                  </Badge>
                )}
                {product.isNew && <Badge variant="primary">新品</Badge>}
                {product.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" size="sm">{tag}</Badge>
                ))}
              </div>

              {/* 名稱 */}
              <h1 className="text-2xl md:text-3xl font-serif-tc font-bold text-ivory mb-1">
                {product.nameZh}
              </h1>
              <p className="text-sm text-neutral-500 font-english mb-4">{product.nameEn}</p>

              {/* 評分 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-neutral-600"}`} />
                  ))}
                </div>
                <span className="text-sm text-gold">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviewCount} 評價)</span>
              </div>

              {/* 價格 */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="primary" size="sm">
                    省 {formatPrice(product.originalPrice - product.price, false)}
                  </Badge>
                )}
              </div>

              {/* 開光資訊 */}
              <Card variant="glass" className="p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-ivory mb-1">開光認證資訊</p>
                    <p className="text-xs text-neutral-400">{product.certificate}</p>
                  </div>
                </div>
              </Card>

              {/* 數量選擇 */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-neutral-400">數量</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-ivory font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 rounded-lg border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-neutral-500">庫存：{product.stock}</span>
              </div>

              {/* 操作按鈕 */}
              <div className="flex gap-3 mb-6">
                <Button variant="primary" size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4" />
                  加入購物車
                </Button>
                <Button variant="secondary" size="lg" className="flex-1">
                  立即購買
                </Button>
              </div>

              {/* 其他操作 */}
              <div className="flex items-center gap-4 text-neutral-400">
                <button className="flex items-center gap-1.5 text-sm hover:text-gold transition-colors">
                  <Heart className="w-4 h-4" />
                  收藏
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-gold transition-colors">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>
            </motion.div>
          </div>

          {/* 詳情標籤頁 */}
          <div className="mt-12">
            <div className="flex items-center gap-0 border-b border-neutral-700/50 mb-6">
              {[
                { key: "desc" as const, label: "商品詳情" },
                { key: "cert" as const, label: "開光證書" },
                { key: "reviews" as const, label: `用戶評價 (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "px-6 py-3 text-sm transition-colors relative",
                    activeTab === tab.key ? "text-gold" : "text-neutral-400 hover:text-ivory"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div layoutId="product-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              {activeTab === "desc" && (
                <div className="text-sm text-neutral-300 leading-relaxed space-y-4">
                  <p>{product.description}</p>
                  <div className="taoist-divider">
                    <span className="taoist-divider-symbol">✦</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
                    <div><span className="text-neutral-500">分類：</span>{product.categoryLabel}</div>
                    <div><span className="text-neutral-500">庫存：</span>{product.stock} 件</div>
                    <div><span className="text-neutral-500">評分：</span>⭐ {product.rating}/5.0</div>
                    <div><span className="text-neutral-500">開光：</span>{product.isBlessed ? "已開光" : "未開光"}</div>
                  </div>
                </div>
              )}

              {activeTab === "cert" && (
                <div className="text-center py-10">
                  <div className="w-60 h-80 mx-auto rounded-xl border border-gold/20 bg-gradient-to-b from-gold/5 to-yin-black-light flex items-center justify-center">
                    <div>
                      <Award className="w-12 h-12 text-gold mx-auto mb-3" />
                      <p className="text-gold font-serif-tc font-bold text-lg mb-1">開光認證證書</p>
                      <p className="text-xs text-neutral-500">{product.certificate}</p>
                      <FileText className="w-6 h-6 text-neutral-600 mx-auto mt-3" />
                      <p className="text-[10px] text-neutral-600 mt-1">證書預覽</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="text-sm text-neutral-400 text-center py-6">
                    用戶評價功能即將上線
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* 相關商品 */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-serif-tc font-bold text-ivory mb-6">相關商品</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
