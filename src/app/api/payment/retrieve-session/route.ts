/**
 * GET /api/payment/retrieve-session?session_id=xxx
 * Retrieve Stripe Checkout Session status
 */

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { retrieveCheckoutSession } from "@/lib/stripe/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing session_id parameter",
        },
        { status: 400 }
      );
    }

    const session = await retrieveCheckoutSession(sessionId);

    // Extract relevant information
    const result = {
      success: true,
      data: {
        id: session.id,
        paymentStatus: session.payment_status,
        status: session.status,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        amountTotal: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
        lineItems: session.line_items?.data.map((item: Stripe.LineItem) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price?.unit_amount,
        })),
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Retrieve session error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to retrieve session";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
