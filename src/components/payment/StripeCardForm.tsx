"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

// Lazy-load Stripe with the publishable key
const stripePromise = typeof window !== "undefined"
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
  : null;

interface StripeCardFormProps {
  amount: number; // in cents
  description?: string;
  customerEmail?: string;
  customerName?: string;
  orderId?: string;
  onSuccess: (result: { payment_intent_id: string }) => void;
  onError: (error: Error) => void;
}

function CardFormInner({
  amount,
  description,
  customerEmail,
  orderId,
  onSuccess,
  onError,
}: StripeCardFormProps) {
  const t = useTranslations("payment");
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create PaymentIntent on our server
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method: "stripe",
          amount,
          currency: "sgd",
          description,
          customer_email: customerEmail,
          order_id: orderId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment");

      // Confirm card payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });

      if (confirmError) {
        setError(confirmError.message ?? "Payment failed");
        onError(new Error(confirmError.message ?? "Payment failed"));
      } else if (paymentIntent?.status === "succeeded") {
        onSuccess({ payment_intent_id: paymentIntent.id });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      onError(new Error(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Element */}
      <div className="rounded-lg border border-neutral-700 bg-yin-black/50 p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#f5f5f4",
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                "::placeholder": { color: "#737373" },
              },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>

      {/* Card error / local error */}
      {(error) && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={loading || !stripe}>
        {loading ? t("processing") : `${t("confirmPayment")} — S$${(amount / 100).toFixed(2)}`}
      </Button>

      {/* Security note */}
      <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-500">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        SSL encrypted · PCI DSS compliant · Powered by Stripe
      </p>
    </form>
  );
}

export function StripeCardForm(props: StripeCardFormProps) {
  if (!stripePromise) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6 text-center text-sm text-red-400">
        Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CardFormInner {...props} />
    </Elements>
  );
}
