"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { type Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function CartDrawer({ isOpen, onClose, className }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 從 localStorage 載入購物車
  useEffect(() => {
    try {
      const stored = localStorage.getItem("xingyun-cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem("xingyun-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* 側欄 */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-full max-w-md bg-yin-black-light border-l border-neutral-700/50 z-50",
              "flex flex-col shadow-2xl",
              className
            )}
          >
            {/* 頭部 */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-700/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="text-lg font-serif-tc font-semibold text-ivory">
                  購物車
                </h2>
                {totalItems > 0 && (
                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full font-medium">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-ivory transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 商品列表 */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-neutral-600" />
                  </div>
                  <p className="text-neutral-400 mb-2">購物車是空的</p>
                  <p className="text-sm text-neutral-600 mb-6">
                    去看看開光靈器，找到適合你的法寶
                  </p>
                  <Button variant="outline" size="sm" onClick={onClose}>
                    瀏覽商城
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-3 p-3 rounded-lg bg-yin-black/50 border border-neutral-700/30"
                    >
                      {/* 縮略圖 */}
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-gold/30">☯</span>
                      </div>

                      {/* 信息 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-ivory truncate">
                          {item.product.nameZh}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* 數量調整 */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm text-ivory w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-neutral-600 hover:text-cinnabar-red transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* 底部結算 */}
            {items.length > 0 && (
              <div className="border-t border-neutral-700/50 p-5 space-y-4">
                {/* 小計 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">小計</span>
                  <span className="text-xl font-bold text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  運費將在結賬時計算 · 免費開光祈福
                </p>

                {/* 結賬按鈕 */}
                <Link href="/checkout" onClick={onClose}>
                  <Button variant="secondary" size="lg" className="w-full">
                    前往結賬
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
