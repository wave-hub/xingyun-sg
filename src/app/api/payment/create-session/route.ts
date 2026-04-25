/**
 * POST /api/payment/create-session
 * Create Stripe Checkout Session
 */

import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, PRICING, STRIPE_PRICES } from "@/lib/stripe/server";

export interface CreateSessionRequest {
  service: keyof typeof PRICING;
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
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json();
    const { service, locale, consultationData } = body;

    // Validate service type
    if (!service || !PRICING[service]) {
      return NextResponse.json(
        {
          success: false,
          error:
            locale === "zh"
              ? "無效的服務類型"
              : "Invalid service type",
        },
        { status: 400 }
      );
    }

    // Get the price ID for the service
    const priceId = STRIPE_PRICES[service];
    if (!priceId || priceId.includes("placeholder")) {
      return NextResponse.json(
        {
          success: false,
          error:
            locale === "zh"
              ? "支付服務尚未配置，請稍後再試"
              : "Payment service not configured, please try again later",
        },
        { status: 500 }
      );
    }

    // Create checkout session
    const session = await createCheckoutSession({
      priceId,
      locale,
      consultationData,
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Payment session creation failed";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
