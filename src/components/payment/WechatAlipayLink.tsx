"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Loader2 } from "lucide-react";

interface WechatAlipayLinkProps {
  amount: number;
  description: string;
  customerEmail?: string;
  orderId?: string;
}

/**
 * WeChat Pay / Alipay component.
 * Since these are China-specific redirect-based payments,
 * this component shows a summary and redirects via the API.
 * The actual redirect is handled by PaymentFlow's handleProceedToPay.
 */
export function WechatAlipayLink({
  amount,
  description,
  customerEmail,
  orderId,
}: WechatAlipayLinkProps) {
  const t = useTranslations("payment");
  const [redirecting, setRedirecting] = useState(false);

  const formatAmount = (cents: number) =>
    new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "CNY",
    }).format(cents / 100); // approximate CNY display

  return (
    <div className="space-y-4 rounded-xl border border-green-800/30 bg-gradient-to-br from-green-950/10 to-emerald-950/10 p-6 text-center">
      {/* WeChat & Alipay icons placeholder */}
      <div className="mx-auto mb-3 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#07C160]/10">
          <span className="text-2xl">💬</span>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1677FF]/10">
          <span className="text-2xl">💰</span>
        </div>
      </div>

      <h3 className="font-serif-tc text-lg font-semibold text-ivory">
        {t("methods.wechat_alipay")}
      </h3>

      <p className="text-sm leading-relaxed text-neutral-400">
        {t("methods.wechat_alipayDesc")}
      </p>

      <div className="my-3 rounded-lg bg-yin-black/40 py-2">
        <p className="text-sm text-neutral-500">金額（約）</p>
        <p className="font-serif-tc text-xl font-bold text-gold">
          {formatAmount(amount)}
        </p>
      </div>

      <p className="text-xs text-neutral-500">
        您將被跳轉到微信支付或支付寶頁面完成付款。完成後請返回此頁面確認。
      </p>

      {redirecting && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gold">
          <Loader2 className="h-4 w-4 animate-spin" />
          正在跳轉到支付頁面...
        </div>
      )}
    </div>
  );
}
