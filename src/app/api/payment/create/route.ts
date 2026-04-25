/**
 * POST /api/payment/create
 * Unified payment creation endpoint
 * Supports: stripe, paynow, wechat_adipay, crypto
 *
 * Accepts simplified frontend request format (PaymentCreateRequest)
 * and converts to backend CreatePaymentRequest for the payment engine.
 */

import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/payment";
import { generateOrderNumber } from "@/lib/payment";
import type { PaymentCreateRequest, PaymentMethod, CreatePaymentResponse } from "@/lib/payment/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      payment_method,
      amount,
      currency = "sgd",
      description,
      customer_email,
      customer_name,
      order_id,
    }: PaymentCreateRequest = body;

    // === Validation ===

    if (
      !payment_method ||
      !["stripe", "paynow", "wechat_alipay", "crypto"].includes(payment_method)
    ) {
      return NextResponse.json(
        { error: "Invalid payment method. Must be one of: stripe, paynow, wechat_alipay, crypto" },
        { status: 400 }
      );
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // === Build internal CreatePaymentRequest from simplified frontend request ===
    // Convert cents/smallest-unit to dollars for the engine (which expects SGD dollars)
    const amountInCurrency = currency.toLowerCase() === "sgd" ? amount / 100 : amount;

    const orderNumber = order_id || generateOrderNumber();

    const internalRequest = {
      orderType: description?.toLowerCase().includes("consult") ? "consultation" as const : "product" as const,
      paymentMethod: payment_method as PaymentMethod,
      items: [
        {
          id: order_id || "default",
          name: description || `Payment ${orderNumber}`,
          quantity: 1,
          unitPrice: amountInCurrency,
        },
      ],
      customerInfo: {
        name: customer_name || "",
        email: customer_email || "",
      },
      locale: "zh" as "zh" | "en", // Default locale; can be overridden by Accept-Language header
    };

    // === Call payment engine ===
    const result: CreatePaymentResponse = await createPayment(internalRequest);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Payment creation failed" },
        { status: 500 }
      );
    }

    // Return response in the format expected by each frontend component
    switch (payment_method) {
      case "stripe":
        // Stripe needs client_secret for CardElement confirmation, or url for redirect
        return NextResponse.json({
          success: true,
          payment_id: orderNumber,
          ...(result.data?.type === "stripe"
            ? {
                client_secret: result.data.sessionId || "",
                redirect_url: result.data.url || null,
              }
            : result.data),
        });

      case "paynow": {
        // PayNow returns QR data URL + reference number
        const paynowData = result.data;
        return NextResponse.json({
          success: true,
          payment_id: orderNumber,
          qr_code_url: paynowData?.type === "paynow" ? paynowData.qrDataUrl : "",
          reference_id: paynowData?.type === "paynow" ? paynowData.referenceNumber : orderNumber,
          uen: paynowData?.type === "paynow" ? paynowData.uen : "",
          expires_at: paynowData?.type === "paynow" ? paynowData.expiresAt : new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        });
      }

      case "wechat_alipay":
        // Returns redirect URL
        return NextResponse.json({
          success: true,
          payment_id: orderNumber,
          redirect_url:
            result.data?.type === "wechat_alipay"
              ? result.data.url
              : null,
        });

      case "crypto": {
        // Returns wallet address + conversion info
        const cryptoData = result.data;
        return NextResponse.json({
          success: true,
          payment_id: orderNumber,
          ...(cryptoData?.type === "crypto"
            ? {
                wallet_address: cryptoData.walletAddress,
                network: cryptoData.network,
                token: cryptoData.token,
                amount_usdt: cryptoData.amount,
                exchange_rate: cryptoData.exchangeRate,
                sgd_equivalent: cryptoData.sgdAmount,
                expires_at: cryptoData.expiresAt,
              }
            : {}),
        });
      }

      default:
        return NextResponse.json({ success: true, data: result.data });
    }
  } catch (error) {
    console.error("[Payment API] create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
