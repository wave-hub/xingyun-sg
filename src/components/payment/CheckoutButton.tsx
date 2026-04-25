"use client";

/**
 * Multi-channel Payment Checkout Button Component
 * Supports: Stripe (card + PayNow + GrabPay), PayNow QR, WeChat/Alipay, Crypto
 * Used for consulting service bookings and shop checkout.
 */

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentFlow } from "@/components/payment/PaymentFlow";
import type { PaymentMethod } from "@/lib/payment/types";

// ─── Service Pricing (in SGD cents) ────
const SERVICE_PRICES: Record<string, number> = {
  ziwei: 8800,      // S$88.00
  bazi: 8800,       // S$88.00
  daliuren: 8800,   // S$88.00
  combined: 18800,  // S$188.00
  followup: 5800,   // S$58.00
};

const SERVICE_NAMES: Record<string, Record<string, string>> = {
  zh: {
    ziwei: "紫微斗數命盤分析",
    bazi: "八字命理分析",
    daliuren: "大六壬占卜",
    combined: "三術合參",
    followup: "命理追蹤諮詢",
  },
  en: {
    ziwei: "Zi Wei Dou Shu Analysis",
    bazi: "Ba Zi Fortune Reading",
    daliuren: "Da Liu Ren Divination",
    combined: "Combined Three Arts Reading",
    followup: "Follow-up Consultation",
  },
};

interface CheckoutButtonProps {
  service: "ziwei" | "bazi" | "daliuren" | "combined" | "followup";
  locale: "zh" | "en";
  consultationData?: {
    birthDate?: string;
    birthTime?: string;
    gender?: string;
    name?: string;
    phone?: string;
    email?: string;
    note?: string;
  };
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;

  /** If true, clicking opens a dialog with PaymentFlow instead of direct Stripe redirect */
  useMultiPayment?: boolean;
}

const BUTTON_CLASSES = {
  primary:
    "bg-cinnabar-red text-ivory hover:bg-cinnabar-red-light active:bg-cinnabar-red-dark shadow-md hover:shadow-lg",
  secondary:
    "bg-gold text-yin-black hover:bg-gold-light active:bg-gold-dark shadow-md hover:shadow-lg",
  outline:
    "border-2 border-gold text-gold hover:bg-gold hover:text-yin-black bg-transparent",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Legacy direct-redirect button (Stripe only)
 * Kept for backward compatibility when `useMultiPayment` is not set.
 */
export function CheckoutButton({
  service,
  locale,
  consultationData,
  className,
  variant = "primary",
  size = "md",
  children,
  useMultiPayment = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const label =
    children ||
    (locale === "zh"
      ? SERVICE_NAMES.zh[service] || "立即預訂"
      : SERVICE_NAMES.en[service] || "Book Now");

  const priceCents = SERVICE_PRICES[service] || 8800;
  const serviceName =
    locale === "zh" ? SERVICE_NAMES.zh[service] : SERVICE_NAMES.en[service];

  // ─── Direct Stripe redirect mode ────
  const handleDirectCheckout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payment/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, locale, consultationData }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error
          ? err.message
          : locale === "zh"
          ? "支付服務暫時不可用，請稍後再試"
          : "Payment service temporarily unavailable"
      );
    } finally {
      setIsLoading(false);
    }
  }, [service, locale, consultationData]);

  // ─── Multi-payment dialog content ────
  const paymentDialogContent = (
    <div className="max-h-[85vh] overflow-y-auto">
      <PaymentFlow
        amount={priceCents}
        description={`星運堂 — ${serviceName}`}
        customerEmail={consultationData?.email}
        customerName={consultationData?.name}
        orderId={`booking-${service}-${Date.now().toString(36).slice(-6)}`}
        onSuccess={(result) => {
          console.log("Payment success:", result);
          window.location.reload(); // or redirect to a success page
        }}
        onConfirmSubmitted={() => {
          window.location.reload();
        }}
        onError={(err) => {
          console.error("Payment flow error:", err);
        }}
      />
    </div>
  );

  // ─── Multi-payment dialog mode (default now) ────
  if (useMultiPayment !== false) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            disabled={isLoading}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-yin-black",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              BUTTON_CLASSES[variant],
              SIZE_CLASSES[size],
              className
            )}
          >
            {label}
            {!isLoading && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg bg-yin-black-light border-neutral-800 max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-serif-tc text-xl text-ivory text-center">
              {locale === "zh" ? "選擇付款方式" : "Select Payment Method"}
            </DialogTitle>
          </DialogHeader>
          {paymentDialogContent}
        </DialogContent>
      </Dialog>
    );
  }

  // ─── Legacy direct button fallback ────
  return (
    <div className="space-y-2">
      <button
        onClick={handleDirectCheckout}
        disabled={isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-yin-black",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          BUTTON_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {locale === "zh" ? "處理中..." : "Processing..."}
          </>
        ) : (
          <>
            {label}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-cinnabar-red animate-fade-in">{error}</p>
      )}
    </div>
  );
}

// ─── Price Display Component ────

type ServiceType = "ziwei" | "bazi" | "daliuren" | "combined" | "followup";

interface PriceDisplayProps {
  service: ServiceType;
  locale: "zh" | "en";
  className?: string;
}

export function PriceDisplay({ service, locale, className }: PriceDisplayProps) {
  const price = SERVICE_PRICES[service] / 100; // Convert cents to dollars
  const formattedPrice = new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const label = locale === "zh" ? "起" : "from";

  return (
    <div className={cn("flex items-baseline gap-1", className)}>
      <span className="text-2xl font-bold text-gold">{formattedPrice}</span>
      <span className="text-sm text-neutral-400">
        {locale === "zh" ? "SGD 起" : "SGD " + label}
      </span>
    </div>
  );
}
