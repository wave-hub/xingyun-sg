"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { StripeCardForm } from "./StripeCardForm";
import { PayNowQR } from "./PayNowQR";
import { WechatAlipayLink } from "./WechatAlipayLink";
import { CryptoPayment } from "./CryptoPayment";
import type {
  PaymentMethod,
  PaymentCreateRequest,
  PaymentResult,
  PayNowConfirmData,
  CryptoConfirmData,
} from "@/lib/payment/types";

interface PaymentFlowProps {
  /** Order amount in SGD (smallest unit, i.e. cents) */
  amount: number;
  /** Human-readable order description */
  description?: string;
  /** Pre-filled customer info */
  customerEmail?: string;
  customerName?: string;
  /** Order metadata for tracking */
  orderId?: string;
  /** Called when payment is successfully completed (Stripe only) */
  onSuccess?: (result: PaymentResult) => void;
  /** Called when non-Stripe payment is submitted for confirmation */
  onConfirmSubmitted?: () => void;
  /** Called when any error occurs */
  onError?: (error: Error) => void;
  /** Additional CSS class name */
  className?: string;
}

type FlowStep = "select" | "paying" | "confirming_paynow" | "confirming_crypto" | "success";

export function PaymentFlow({
  amount,
  description,
  customerEmail,
  customerName,
  orderId,
  onSuccess,
  onConfirmSubmitted,
  onError,
  className,
}: PaymentFlowProps) {
  const t = useTranslations("payment");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<FlowStep>("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to selection when method changes
  const handleMethodSelect = useCallback((method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("select");
    setError(null);
  }, []);

  // Proceed to the paying step with the selected method
  const handleProceedToPay = async () => {
    if (!selectedMethod) return;
    setError(null);
    setLoading(true);
    setStep("paying");

    // For redirect-based methods, create payment session immediately
    if (selectedMethod === "wechat_alipay") {
      try {
        const body: PaymentCreateRequest = {
          payment_method: selectedMethod,
          amount,
          currency: "sgd",
          description: description || `Order ${orderId || "N/A"}`,
          customer_email: customerEmail,
          customer_name: customerName,
          order_id: orderId,
        };
        const res = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create payment");
        // Redirect to WeChat/Alipay
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        setStep("select");
        onError?.(new Error(message));
      } finally {
        setLoading(false);
      }
    }

    // For Stripe, PayNow, Crypto - just show their UI
    // They have their own internal submit handlers
    setLoading(false);
  };

  // Handle PayNow confirmation submission
  const handlePayNowConfirm = async (data: PayNowConfirmData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: data.paymentId,
          confirm_type: "paynow_reference" as const,
          paynow_reference: data.referenceId,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Confirmation failed");
      setStep("success");
      onConfirmSubmitted?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      onError?.(new Error(message));
    } finally {
      setLoading(false);
    }
  };

  // Handle Crypto confirmation submission
  const handleCryptoConfirm = async (data: CryptoConfirmData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: data.paymentId,
          confirm_type: "crypto_txhash" as const,
          crypto_tx_hash: data.txHash,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Confirmation failed");
      setStep("success");
      onConfirmSubmitted?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      onError?.(new Error(message));
    } finally {
      setLoading(false);
    }
  };

  // Handle Stripe success
  const handleStripeSuccess = (result: PaymentResult) => {
    setStep("success");
    onSuccess?.(result);
  };

  // Format amount display
  const formatAmount = (cents: number) =>
    new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
    }).format(cents / 100);

  return (
    <div className={className}>
      {/* Step indicator */}
      <div className="mb-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
        <span
          className={
            step === "select"
              ? "font-medium text-gold"
              : "line-through opacity-60"
          }
        >
          1. {t("selectMethod")}
        </span>
        <span>→</span>
        <span
          className={
            step !== "select" && step !== "success"
              ? "font-medium text-gold"
              : "opacity-40"
          }
        >
          2.{" "}
          {selectedMethod === "stripe"
            ? "Card Details"
            : selectedMethod === "paynow"
            ? t("payNowTitle")
            : selectedMethod === "crypto"
            ? t("cryptoTitle")
            : selectedMethod === "wechat_alipay"
            ? t("methods.wechat_alipay")
            : "Payment"}
        </span>
        {step === "success" && (
          <>
            <span>→</span>
            <span className="font-medium text-emerald-400">✓ Done</span>
          </>
        )}
      </div>

      {/* Success state */}
      {step === "success" && (
        <Card variant="glass" className="text-center py-8">
          <CardContent>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <svg
                className="h-8 w-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-serif-tc text-xl font-semibold text-ivory">
              {t("confirmSuccessTitle")}
            </h3>
            <p className="mx-auto max-w-sm text-sm text-neutral-400">
              {t("confirmSuccessMessage")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Method Selection */}
      {(step === "select" || step === "paying") && (
        <>
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onMethodSelect={handleMethodSelect}
            disabled={loading || step !== "select"}
          />

          {/* Amount display */}
          <div className="mt-4 rounded-lg border border-neutral-800 bg-yin-black/50 p-3 text-right">
            <span className="text-sm text-neutral-400">{t("orderTotal")}:</span>{" "}
            <span className="ml-2 font-serif-tc text-lg font-bold text-gold">
              {formatAmount(amount)}
            </span>
          </div>

          {/* Error display */}
          {error && (
            <div className="mt-3 rounded-lg border border-red-900/50 bg-red-950/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Selected method's UI or proceed button */}
          {step === "select" && selectedMethod ? (
            <Button
              className="mt-4 w-full"
              size="lg"
              onClick={handleProceedToPay}
              disabled={loading || !selectedMethod}
            >
              {loading ? t("processing") : `${t("confirmPayment")} — ${formatAmount(amount)}`}
            </Button>
          ) : null}

          {step === "paying" && selectedMethod === "stripe" && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <StripeCardForm
                amount={amount}
                description={description}
                customerEmail={customerEmail}
                customerName={customerName}
                orderId={orderId}
                onSuccess={handleStripeSuccess}
                onError={(err) => {
                  setError(err.message);
                  onError?.(err);
                }}
              />
            </div>
          )}

          {step === "paying" && selectedMethod === "paynow" && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <PayNowQR
                amount={amount}
                description={description || orderId || "Payment"}
                customerEmail={customerEmail}
                customerName={customerName}
                orderId={orderId}
                onConfirm={handlePayNowConfirm}
                onError={(err) => {
                  setError(err.message);
                  onError?.(err);
                }}
              />
            </div>
          )}

          {step === "paying" && selectedMethod === "crypto" && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CryptoPayment
                amountSgdCents={amount}
                description={description || orderId || "Crypto Payment"}
                customerEmail={customerEmail}
                orderId={orderId}
                onConfirm={handleCryptoConfirm}
                onError={(err) => {
                  setError(err.message);
                  onError?.(err);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
