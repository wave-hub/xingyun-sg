/**
 * POST /api/payment/confirm
 * Non-Stripe payment confirmation endpoint (PayNow / Crypto)
 *
 * Accepts confirmations from users who completed offline/blockchain payment.
 */

import { NextRequest, NextResponse } from "next/server";
import { confirmPayment, generateOrderNumber } from "@/lib/payment";
import type { PaymentMethod } from "@/lib/payment/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Frontend confirmation request shape */
interface ConfirmRequestBody {
  payment_id: string;
  confirm_type: "paynow_reference" | "crypto_txhash";
  paynow_reference?: string;
  crypto_tx_hash?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmRequestBody = await request.json();
    const { payment_id, confirm_type, paynow_reference, crypto_tx_hash } = body;

    // === Validation ===

    if (!payment_id) {
      return NextResponse.json(
        { error: "Missing payment_id" },
        { status: 400 }
      );
    }

    if (!confirm_type || !["paynow_reference", "crypto_txhash"].includes(confirm_type)) {
      return NextResponse.json(
        { error: "Invalid confirm_type. Must be: paynow_reference or crypto_txhash" },
        { status: 400 }
      );
    }

    // Validate proof based on type
    let orderNumber: string;
    let paymentMethod: Exclude<PaymentMethod, "stripe">;

    if (confirm_type === "paynow_reference") {
      if (!paynow_reference?.trim()) {
        return NextResponse.json(
          { error: "Please provide your PayNow transaction reference ID" },
          { status: 400 }
        );
      }
      orderNumber = payment_id;
      paymentMethod = "paynow";
    }

    else if (confirm_type === "crypto_txhash") {
      if (!crypto_tx_hash?.trim()) {
        return NextResponse.json(
          { error: "Please provide the blockchain transaction hash (TxID)" },
          { status: 400 }
        );
      }
      // Basic tx hash format validation
      if (!/^0x[a-fA-F0-]{64}$/.test(crypto_tx_hash)) {
        return NextResponse.json(
          { error: "Invalid transaction hash format. Expected 66-character hex string starting with 0x" },
          { status: 400 }
        );
      }
      orderNumber = payment_id;
      paymentMethod = "crypto";
    }

    else {
      return NextResponse.json(
        { error: "Unsupported confirmation type" },
        { status: 400 }
      );
    }

    // === Process confirmation via payment engine ===
    const result = await confirmPayment({
      orderNumber,
      paymentMethod,
      proof:
        confirm_type === "paynow_reference"
          ? { paynowTransactionId: paynow_reference }
          : { cryptoTxHash: crypto_tx_hash! },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Payment API] confirm error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Confirmation failed" },
      { status: 500 }
    );
  }
}
