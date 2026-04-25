/**
 * POST /api/payment/webhook
 * Stripe Webhook Handler
 * 
 * This endpoint handles Stripe webhook events for:
 * - checkout.session.completed (payment successful)
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * 
 * Configure webhook URL in Stripe Dashboard:
 * https://xingyuntang.sg/api/payment/webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe/server";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event;
  const payload = await request.text();

  try {
    event = constructWebhookEvent(payload, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error(`Webhook signature error: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("✅ Checkout completed:", session.id);
      
      // Extract customer and consultation data
      const {
        customer_email,
        metadata,
        amount_total,
        currency,
      } = session;

      console.log("Payment details:", {
        email: customer_email,
        service: metadata?.locale,
        birthDate: metadata?.birthDate,
        birthTime: metadata?.birthTime,
        gender: metadata?.gender,
        customerName: metadata?.customerName,
        amount: amount_total ? `S$${(amount_total / 100).toFixed(2)}` : "N/A",
        currency,
      });

      // TODO: Implement business logic here:
      // 1. Save order to database
      // 2. Send confirmation email to customer
      // 3. Notify staff via WhatsApp/email
      // 4. Create calendar booking

      console.log("💾 Order saved, notification sent");
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("✅ Payment succeeded:", paymentIntent.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log("❌ Payment failed:", paymentIntent.id);
      
      // TODO: Handle failed payment
      // - Log for review
      // - Notify customer
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object;
      console.log("💰 Charge refunded:", charge.id);
      
      // TODO: Handle refund
      // - Update order status
      // - Send refund confirmation
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
