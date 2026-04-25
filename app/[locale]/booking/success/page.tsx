"use client";

/**
 * Booking Success Page
 * Displayed after successful Stripe checkout
 */

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function SuccessContent() {
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: string;
    amount: number;
    email?: string;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setIsVerifying(false);
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const response = await fetch(
        `/api/payment/retrieve-session?session_id=${sessionId}`
      );
      const data = await response.json();

      if (data.success) {
        setPaymentStatus({
          status: data.data.paymentStatus,
          amount: data.data.amountTotal || 0,
          email: data.data.customerEmail,
        });
      }
    } catch (error) {
      console.error("Failed to verify payment:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Success Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
            <svg
              className="w-12 h-12 text-yin-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h1 className="font-serif-tc text-3xl font-bold text-ivory">
            支付成功！
          </h1>
          <p className="text-xl text-gold font-english">
            Payment Successful
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-yin-black-light/50 rounded-xl border border-gold/20 p-6 space-y-4">
          {isVerifying ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-neutral-700/50 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-neutral-700/50 rounded w-1/2 mx-auto" />
            </div>
          ) : paymentStatus ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">狀態 Status</span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    paymentStatus.status === "paid"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  )}
                >
                  {paymentStatus.status === "paid" ? "已支付" : "處理中"}
                </span>
              </div>

              {paymentStatus.amount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">金額 Amount</span>
                  <span className="text-gold font-semibold">
                    S${(paymentStatus.amount / 100).toFixed(2)}
                  </span>
                </div>
              )}

              {paymentStatus.email && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">郵箱 Email</span>
                  <span className="text-ivory">{paymentStatus.email}</span>
                </div>
              )}
            </>
          ) : null}

          {/* Confirmation Note */}
          <div className="pt-4 border-t border-neutral-700/50">
            <p className="text-sm text-neutral-400 leading-relaxed">
              {sessionId ? (
                <>
                  感謝您的預訂！我們的工作人員將在{" "}
                  <span className="text-gold font-medium">24 小時內</span>{" "}
                  通過電子郵件聯繫您，確認諮詢時間。
                </>
              ) : (
                <>
                  感謝您的預訂！我們的工作人員將在{" "}
                  <span className="text-gold font-medium">24 小時內</span>{" "}
                  聯繫您安排諮詢。
                </>
              )}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h3 className="font-serif-tc text-lg text-ivory">下一步 Next Steps</h3>
          <ul className="text-left space-y-2 text-neutral-400">
            <li className="flex items-start gap-2">
              <span className="text-gold">1.</span>
              查收電子郵件確認預訂詳情
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">2.</span>
              準備您的出生年月日時分（農曆/陽曆）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">3.</span>
              選擇您偏好的諮詢方式（線上/線下）
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cinnabar-red text-ivory font-medium hover:bg-cinnabar-red-light transition-colors"
          >
            返回首頁
          </Link>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold/30 text-gold font-medium hover:bg-gold/10 transition-colors"
          >
            聯絡我們
          </Link>
        </div>

        {/* WhatsApp Contact */}
        <div className="pt-6">
          <p className="text-sm text-neutral-500 mb-3">
            需要即時協助？Contact us via WhatsApp
          </p>
          <a
            href="https://wa.me/6591234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20BA5A] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-neutral-400">載入中...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
