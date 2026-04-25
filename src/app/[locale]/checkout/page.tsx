"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Truck,
  ArrowRight,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PaymentFlow } from "@/components/payment/PaymentFlow";
import type { PaymentMethod } from "@/lib/payment/types";

// ─── Mock cart data (in production, this comes from cart context / store) ────
const MOCK_CART = [
  {
    id: "item-1",
    name: "紫微鎮宅琉璃塔",
    nameEn: "Ziwei Guardian Pagoda",
    priceCents: 26800, // S$268.00
    quantity: 1,
  },
  {
    id: "item-2",
    name: "八卦開運紅繩手鏈",
    nameEn: "Bagua Red String Bracelet",
    priceCents: 6800, // S$68.00
    quantity: 2,
  },
];

const SHIPPING_CENTS = 0; // Free shipping

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(cents / 100);
}

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tp = useTranslations("payment");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId] = useState(() => `XYT-${Date.now().toString(36).toUpperCase()}`);

  const subtotal = MOCK_CART.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_CENTS;

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="mb-2 font-serif-tc text-2xl font-bold text-ivory">
            {t("orderComplete")}
          </h1>
          <p className="mb-2 text-neutral-400">{t("orderCompleteMessage")}</p>
          <p className="mb-8 text-sm text-neutral-500">
            {t("orderNumber")}: {orderId}
          </p>
          {/* Taoist divider */}
          <div className="taoist-divider mb-6">
            <span className="taoist-divider-symbol">✦</span>
          </div>
          <p className="text-xs text-neutral-500">{t("blessedNote")}</p>

          <Button variant="secondary" size="md" className="mt-6" onClick={() => (window.location.href = "/")}>
            {tp("backToHome")}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="container-brand mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif-tc text-3xl font-bold text-ivory mb-3">
              {t("title")}
            </h1>
            <p className="text-neutral-400">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container-brand mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left: Order Summary + Shipping + Payment */}
            <div className="lg:col-span-3 space-y-6">
              {/* Order Summary */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-gold" />
                    {t("orderSummary")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_CART.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                            <span className="text-gold/40">☯</span>
                          </div>
                          <div>
                            <p className="text-sm text-ivory">{item.name}</p>
                            <p className="text-xs text-neutral-500">
                              ×{item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gold">
                          {formatPrice(item.priceCents * item.quantity)}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                      <span className="text-sm text-neutral-400">{t("subtotal")}</span>
                      <span className="text-sm text-ivory">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">{t("shipping")}</span>
                      <span className="text-emerald-400">{t("free")}</span>
                    </div>
                    <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                      <span className="text-base font-medium text-ivory">{tp("orderTotal")}</span>
                      <span className="text-xl font-bold text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gold" />
                    {t("shippingAddress")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-xs text-neutral-400">
                          {t("firstName")}
                        </label>
                        <input
                          type="text"
                          placeholder="Meiling"
                          className="w-full rounded-lg border border-neutral-700 bg-yin-black px-3 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-neutral-400">
                          {t("lastName")}
                        </label>
                        <input
                          type="text"
                          placeholder="Chen"
                          className="w-full rounded-lg border border-neutral-700 bg-yin-black px-3 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-neutral-400">
                        {t("phone")}
                      </label>
                      <input
                        type="tel"
                        placeholder="+65 9XXX XXXX"
                        className="w-full rounded-lg border border-neutral-700 bg-yin-black px-3 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-neutral-400">
                        {t("postalCode")}
                      </label>
                      <input
                        type="text"
                        placeholder="238889"
                        className="w-full rounded-lg border border-neutral-700 bg-yin-black px-3 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-neutral-400">
                        {t("address")}
                      </label>
                      <input
                        type="text"
                        placeholder="Blk 123, Orchard Road #05-67"
                        className="w-full rounded-lg border border-neutral-700 bg-yin-black px-3 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Flow — the real deal */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gold" />
                    {t("paymentMethod")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentFlow
                    amount={total}
                    description={`XingYun Tang Shop - ${MOCK_CART.map((i) => i.name).join(", ")}`}
                    orderId={orderId}
                    onSuccess={() => setOrderComplete(true)}
                    onConfirmSubmitted={() => setOrderComplete(true)}
                    onError={(err) => console.error("Payment error:", err)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right: Sticky order summary panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <Card variant="elevated" className="p-6">
                  <h2 className="mb-4 font-serif-tc text-lg font-semibold text-ivory">
                    {t("orderSummary")}
                  </h2>

                  <div className="mb-6 space-y-3">
                    {MOCK_CART.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-neutral-400">
                          {item.name} ×{item.quantity}
                        </span>
                        <span className="text-ivory">
                          {formatPrice(item.priceCents * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">{t("shipping")}</span>
                      <span className="text-emerald-400">{t("free")}</span>
                    </div>
                    <div className="border-t border-neutral-700/50 pt-3 flex justify-between">
                      <span className="text-base text-ivory">Total</span>
                      <span className="text-2xl font-bold text-gold">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5" />
                      {tp("secureCheckout")}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      {tp("sslEncrypted")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      {tp("deliveryTime")}
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
