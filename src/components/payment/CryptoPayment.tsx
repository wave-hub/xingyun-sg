"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Copy, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import type { CryptoConfirmData } from "@/lib/payment/types";

/** Approximate USDT/SGD rate — in production, fetch from a price oracle */
const APPROX_USDT_SGD_RATE = 1.34;

interface CryptoPaymentProps {
  amountSgdCents: number; // SGD amount in smallest unit
  description: string;
  customerEmail?: string;
  orderId?: string;
  onConfirm: (data: CryptoConfirmData) => void;
  onError: (error: Error) => void;
}

export function CryptoPayment({
  amountSgdCents,
  description,
  customerEmail,
  orderId,
  onConfirm,
  onError,
}: CryptoPaymentProps) {
  const t = useTranslations("payment");
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  // Derived values
  const sgdAmount = amountSgdCents / 100;
  const usdtAmount = (sgdAmount / APPROX_USDT_SGD_RATE).toFixed(2);

  // Wallet address (in production, generate unique per-payment address)
  const walletAddress =
    process.env.NEXT_PUBLIC_CRYPTO_USDT_ADDRESS ||
    "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  // Generate crypto payment session on mount
  useEffect(() => {
    const createCryptoSession = async () => {
      try {
        const res = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_method: "crypto",
            amount: amountSgdCents,
            currency: "sgd",
            description,
            customer_email: customerEmail,
            order_id: orderId,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create crypto payment");
        setPaymentId(data.payment_id);
        if (data.wallet_address) {
          // Use server-provided address if available
          (walletAddress as unknown) = data.wallet_address;
        }
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    };
    createCryptoSession();
  }, []);

  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      console.warn("Clipboard API not available");
    }
  }, [walletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) return;

    setSubmitting(true);
    try {
      await onConfirm({
        paymentId,
        txHash: txHash.trim(),
      });
    } catch {
      // handled in parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Crypto info card */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <CardTitle className="text-base">{t("cryptoTitle")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-neutral-300">
            {t("cryptoInstructions")}
          </p>

          {/* Details table */}
          <div className="overflow-hidden rounded-lg border border-neutral-800">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-neutral-800">
                  <td className="bg-yin-black/30 px-3 py-2.5 text-neutral-500">
                    {t("cryptoToken")}
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium text-ivory">
                    USDT (Tether USD)
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="bg-yin-black/30 px-3 py-2.5 text-neutral-500">
                    {t("cryptoNetwork")}
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium text-amber-400">
                    TRON (TRC20)
                  </td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="bg-yin-black/30 px-3 py-2.5 text-neutral-500">
                    {t("cryptoAmount")}
                  </td>
                  <td className="px-3 py-2.5 text-right font-bold text-gold">
                    {usdtAmount} USDT{" "}
                    <span className="font-normal text-neutral-500">
                      {t("cryptoSgdEquiv", { amount: sgdAmount.toFixed(2) })}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-yin-black/30 px-3 py-2.5 align-top text-neutral-500">
                    {t("cryptoRate")}
                  </td>
                  <td className="px-3 py-2.5 text-right text-xs text-neutral-500">
                    ~1 USDT ≈ S${APPROX_USDT_SGD_RATE.toFixed(2)} (estimate)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              {t("cryptoAddress")}
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 overflow-x-auto rounded-lg border border-neutral-700 bg-yin-black/50 px-3 py-2.5 font-mono text-xs text-ivory whitespace-nowrap scrollbar-thin">
                {walletAddress}
              </code>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyAddress}
                title={t("cryptoCopyAddress")}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-orange-400/80">
              ⚠️ Only send USDT on TRC20 network. Other networks/tokens may be lost.
            </p>
          </div>

          {/* Confirmation requirement */}
          <div className="flex items-start gap-2 rounded-lg border border-amber-900/30 bg-amber-950/10 p-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-xs leading-relaxed text-amber-200/70">
              {t("cryptoMinConfirms", { n: "1" })}. After sending, paste the TxID below.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Hash submission form */}
      <Card variant="default">
        <CardHeader>
          <CardTitle className="text-base">{t("payNowConfirmTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-neutral-400">
                {t("cryptoTxHashLabel")}
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder={t("txHashPlaceholder")}
                className="w-full rounded-lg border border-neutral-700 bg-yin-black/50 px-4 py-2.5 font-mono text-sm text-ivory placeholder:text-neutral-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                required
              />
            </div>
            <Button
              type="submit"
              size="md"
              className="w-full"
              disabled={submitting || !txHash.trim()}
            >
              {submitting ? t("processing") : t("submitConfirmation")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
