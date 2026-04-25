"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { PayNowConfirmData } from "@/lib/payment/types";

interface PayNowQRProps {
  amount: number; // in cents (SGD)
  description: string;
  customerEmail?: string;
  customerName?: string;
  orderId?: string;
  onConfirm: (data: PayNowConfirmData) => void;
  onError: (error: Error) => void;
}

export function PayNowQR({
  amount,
  description,
  customerEmail,
  customerName,
  orderId,
  onConfirm,
  onError,
}: PayNowQRProps) {
  const t = useTranslations("payment");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [expired, setExpired] = useState(false);
  const [expireMinutes] = useState(15);

  // Generate PayNow QR on mount
  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_method: "paynow",
            amount,
            currency: "sgd",
            description,
            customer_email: customerEmail,
            customer_name: customerName,
            order_id: orderId,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to generate QR code");
        setQrCodeUrl(data.qr_code_url);
        setPaymentId(data.payment_id);
        setReferenceId(data.reference_id);
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    generateQR();
  }, []);

  // Expire timer
  useEffect(() => {
    if (loading || expired) return;
    const timer = setTimeout(() => setExpired(true), expireMinutes * 60 * 1000);
    return () => clearTimeout(timer);
  }, [loading, expired, expireMinutes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setSubmitting(true);
    try {
      await onConfirm({
        paymentId,
        referenceId: referenceId.trim(),
      });
    } catch (err) {
      // Error already handled in parent
    } finally {
      setSubmitting(false);
    }
  };

  const formatAmount = (cents: number) =>
    new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
    }).format(cents / 100);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-sm text-neutral-400">{t("processing")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* QR Code Card */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-center text-base">
            {t("payNowTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Image */}
          <div className="mx-auto flex w-fit flex-col items-center gap-3 rounded-xl bg-white p-4">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="PayNow QR Code"
                className="h-48 w-48 rounded-lg"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-neutral-100">
                <span className="text-sm text-neutral-500">QR unavailable</span>
              </div>
            )}
          </div>

          <p className="text-center text-sm leading-relaxed text-neutral-300">
            {t("payNowInstructions")}
          </p>

          {/* Reference ID display */}
          <div className="rounded-lg bg-yin-black/50 p-3 text-center">
            <p className="text-xs text-neutral-500">{t("payNowRefLabel")}</p>
            <p className="mt-1 font-mono text-base font-bold tracking-wider text-gold">
              {referenceId}
            </p>
          </div>

          {/* Amount & Expiry */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">
              {t("payNowExpireIn", { minutes: String(expireMinutes) })}
            </span>
            <span className="font-semibold text-ivory">
              {formatAmount(amount)}
            </span>
          </div>

          {expired && (
            <div className="rounded-lg border border-yellow-900/50 bg-yellow-950/20 p-3 text-center text-sm text-yellow-400">
              QR code has expired. Please refresh or select another payment method.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Form */}
      {!expired && (
        <Card variant="default">
          <CardHeader>
            <CardTitle className="text-base">{t("payNowConfirmTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-neutral-400">
              {t("payNowConfirmHint")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder={t("transactionIdPlaceholder")}
                className="w-full rounded-lg border border-neutral-700 bg-yin-black/50 px-4 py-2.5 text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                required
              />
              <Button
                type="submit"
                size="md"
                className="w-full"
                disabled={submitting || !referenceId.trim()}
              >
                {submitting ? t("processing") : t("submitConfirmation")}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
