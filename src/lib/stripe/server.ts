/**
 * Stripe Server Configuration
 * 星運堂 XingYun Tang - Payment Integration
 */

import Stripe from "stripe";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Pricing configuration for Singapore (SGD)
export const PRICING = {
  ziwei: {
    name: "紫微斗數命盤分析",
    nameEn: "Zi Wei Dou Shu Analysis",
    price: 8800, // S$88.00 (in cents)
    description: "完整紫微斗數命盤解讀，包含命宮、財帛宮、事業宮等十二宮分析",
    descriptionEn: "Complete Zi Wei Dou Shu chart interpretation including all 12 palaces",
    duration: "60分鐘",
  },
  bazi: {
    name: "八字命理分析",
    nameEn: "Ba Zi Fortune Reading",
    price: 8800, // S$88.00
    description: "專業八字命格分析，十神、大運、流年全面解讀",
    descriptionEn: "Professional Ba Zi analysis with Ten Gods, Da Yun, and Liu Nian interpretation",
    duration: "60分鐘",
  },
  daliuren: {
    name: "大六壬占卜",
    nameEn: "Da Liu Ren Divination",
    price: 8800, // S$88.00
    description: "古老占卜術數，指點迷津，趨吉避凶",
    descriptionEn: "Ancient divination art for guidance and fortune navigation",
    duration: "45分鐘",
  },
  combined: {
    name: "三術合參",
    nameEn: "Combined Three Arts Reading",
    price: 18800, // S$188.00
    description: "紫微斗數、八字、大六壬三大術數合參，全方位命理分析",
    descriptionEn: "Comprehensive analysis combining all three arts for complete life guidance",
    duration: "90分鐘",
  },
  followup: {
    name: "命理追蹤諮詢",
    nameEn: "Follow-up Consultation",
    price: 5800, // S$58.00
    description: "後續追蹤服務，解答疑惑，深入探討特定課題",
    descriptionEn: "Follow-up session for questions and in-depth exploration of specific topics",
    duration: "30分鐘",
  },
} as const;

// Product IDs (create these in Stripe Dashboard)
export const STRIPE_PRICES = {
  ziwei: process.env.STRIPE_PRICE_ZIWEI || "price_ziwei_placeholder",
  bazi: process.env.STRIPE_PRICE_BAZI || "price_bazi_placeholder",
  daliuren: process.env.STRIPE_PRICE_DALIUREN || "price_daliuren_placeholder",
  combined: process.env.STRIPE_PRICE_COMBINED || "price_combined_placeholder",
  followup: process.env.STRIPE_PRICE_FOLLOWUP || "price_followup_placeholder",
} as const;

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession({
  priceId,
  locale,
  consultationData,
}: {
  priceId: string;
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
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuntang.sg";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: consultationData?.email,
    metadata: {
      locale,
      birthDate: consultationData?.birthDate || "",
      birthTime: consultationData?.birthTime || "",
      gender: consultationData?.gender || "",
      customerName: consultationData?.name || "",
      customerPhone: consultationData?.phone || "",
      note: consultationData?.note || "",
    },
    success_url: `${baseUrl}/${locale}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${locale}/booking?cancelled=true`,
    locale: locale === "zh" ? "zh" : "en",
    // Singapore-specific settings
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["SG"], // Singapore only
    },
    custom_text: {
      submit: {
        message: locale === "zh" 
          ? "完成支付後，我們的工作人員將在24小時內與您聯繫安排諮詢時間。" 
          : "After payment, our staff will contact you within 24 hours to arrange your consultation.",
      },
    },
  });

  return session;
}

/**
 * Retrieve Checkout Session with expanded details
 */
export async function retrieveCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer", "payment_intent"],
  });
}

/**
 * Create Stripe Webhook Event
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

/**
 * Format price from cents to SGD
 */
export function formatPriceSGD(cents: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(cents / 100);
}
