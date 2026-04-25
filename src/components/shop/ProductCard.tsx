"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, className, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group rounded-xl border border-neutral-700/50 bg-yin-black-light/50 overflow-hidden",
        "hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300",
        className
      )}
    >
      {/* 圖片區 */}
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
          {/* Placeholder 圖片 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="text-3xl text-gold/40">☯</span>
            </div>
          </div>

          {/* 標籤浮層 */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isBlessed && (
              <Badge variant="default" size="sm" className="flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" />
                開光
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="primary" size="sm">新品</Badge>
            )}
          </div>

          {/* 快捷購物車 */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              className="w-9 h-9 rounded-full bg-gold text-yin-black flex items-center justify-center shadow-lg hover:bg-gold-light transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* 信息區 */}
      <div className="p-4">
        {/* 分類 */}
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
          {product.categoryLabel}
        </p>

        {/* 名稱 */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-serif-tc font-semibold text-ivory mb-0.5 line-clamp-1 hover:text-gold transition-colors">
            {product.nameZh}
          </h3>
          <p className="text-[11px] text-neutral-500 font-english line-clamp-1 mb-2">
            {product.nameEn}
          </p>
        </Link>

        {/* 評分 */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-xs text-neutral-400">{product.rating}</span>
          <span className="text-[10px] text-neutral-600">({product.reviewCount})</span>
        </div>

        {/* 價格 */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* 描述 */}
        <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
          {product.shortDescription}
        </p>
      </div>
    </motion.div>
  );
}
