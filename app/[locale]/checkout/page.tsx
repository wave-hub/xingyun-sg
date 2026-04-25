"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, MapPin, CheckCircle, Truck, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock 訂單
  const orderItems = [
    { name: "紫微鎮宅琉璃塔", price: 268, quantity: 1 },
    { name: "八卦開運紅繩手鏈", price: 68, quantity: 2 },
  ];
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-serif-tc font-bold text-ivory mb-2">訂單確認成功！</h1>
          <p className="text-neutral-400 mb-2">感謝您的購買，我們將盡快為您安排發貨。</p>
          <p className="text-sm text-neutral-500 mb-8">訂單編號：XYT-20250423-001</p>
          <div className="taoist-divider mb-6">
            <span className="taoist-divider-symbol">✦</span>
          </div>
          <p className="text-xs text-neutral-500">
            開光靈器將由道觀大師在吉日加持後統一發出，預計 3-5 個工作日。
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-serif-tc font-bold text-ivory mb-3">結賬</h1>
            <p className="text-neutral-400">確認訂單並完成支付</p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-brand max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* 左側：訂單信息 */}
            <div className="lg:col-span-3 space-y-6">
              {/* 訂單摘要 */}
              <Card variant="glass" className="p-6">
                <h2 className="text-lg font-serif-tc font-semibold text-ivory mb-4">訂單摘要</h2>
                <div className="space-y-3">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center">
                          <span className="text-gold/40">☯</span>
                        </div>
                        <div>
                          <p className="text-sm text-ivory">{item.name}</p>
                          <p className="text-xs text-neutral-500">數量：{item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                    <span className="text-sm text-neutral-400">運費</span>
                    <span className="text-sm text-neutral-300">{shipping === 0 ? "免費" : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                    <span className="text-base text-ivory font-medium">合計</span>
                    <span className="text-xl font-bold text-gold">{formatPrice(total)}</span>
                  </div>
                </div>
              </Card>

              {/* 支付方式 */}
              <Card variant="glass" className="p-6">
                <h2 className="text-lg font-serif-tc font-semibold text-ivory mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  支付方式
                </h2>
                <div className="space-y-2">
                  {[
                    { key: "card", label: "信用卡 / Debit Card", icon: "💳", desc: "Visa, Mastercard" },
                    { key: "paynow", label: "PayNow", icon: "📱", desc: "新加坡 QR 支付" },
                    { key: "grabpay", label: "GrabPay", icon: "🟢", desc: "Grab 電子錢包" },
                    { key: "crypto", label: "加密貨幣", icon: "₿", desc: "USDT / ETH" },
                  ].map((method) => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all",
                        paymentMethod === method.key
                          ? "border-gold/30 bg-gold/5"
                          : "border-neutral-700/50 hover:border-neutral-600"
                      )}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-ivory">{method.label}</p>
                        <p className="text-xs text-neutral-500">{method.desc}</p>
                      </div>
                      {paymentMethod === method.key && (
                        <CheckCircle className="w-5 h-5 text-gold" />
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* 地址表單 */}
              <Card variant="glass" className="p-6">
                <h2 className="text-lg font-serif-tc font-semibold text-ivory mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  收貨地址
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">姓</label>
                      <input type="text" placeholder="陳" className="w-full px-3 py-2.5 rounded-lg bg-yin-black border border-neutral-700 text-sm text-ivory placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">名</label>
                      <input type="text" placeholder="美玲" className="w-full px-3 py-2.5 rounded-lg bg-yin-black border border-neutral-700 text-sm text-ivory placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">手機號碼</label>
                    <input type="tel" placeholder="+65 9XXX XXXX" className="w-full px-3 py-2.5 rounded-lg bg-yin-black border border-neutral-700 text-sm text-ivory placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">郵編</label>
                    <input type="text" placeholder="123456" className="w-full px-3 py-2.5 rounded-lg bg-yin-black border border-neutral-700 text-sm text-ivory placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">地址</label>
                    <input type="text" placeholder="Blk 123, Orchard Road #05-67" className="w-full px-3 py-2.5 rounded-lg bg-yin-black border border-neutral-700 text-sm text-ivory placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />
                  </div>
                </div>
              </Card>
            </div>

            {/* 右側：結算面板 */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <Card variant="elevated" className="p-6">
                  <h2 className="text-lg font-serif-tc font-semibold text-ivory mb-4">訂單總計</h2>

                  <div className="space-y-3 mb-6">
                    {orderItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-neutral-400">{item.name} x{item.quantity}</span>
                        <span className="text-ivory">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">運費</span>
                      <span className="text-emerald-400">免費</span>
                    </div>
                    <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                      <span className="text-base text-ivory">合計</span>
                      <span className="text-2xl font-bold text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        處理中...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        確認支付
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  {/* 安全提示 */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      SSL 加密
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      3-5 天到貨
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
