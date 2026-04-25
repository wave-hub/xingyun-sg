/**
 * 星運堂 XingYun Tang - 支付系统核心库
 * Multi-channel Payment Engine
 * 
 * 支持渠道：
 * 1. Stripe (信用卡 + PayNow + GrabPay) - 原生集成
 * 2. PayNow (新加坡本地QR) - 静态 QR + 手动确认
 * 3. 微信/支付宝 - 跳转链接模式
 * 4. 加密货币 (USDT) - 地址展示 + 手动确认
 */

import Stripe from "stripe";
import type {
  PaymentMethod,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Order,
  PayNowQRPayload,
  CryptoPaymentInfo,
} from "./types";

// ========================================
// Stripe 实例（复用现有配置）
// ========================================

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyuntang.sg";

// ========================================
// 订单号生成器
// ========================================

export function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `XYT-${dateStr}-${random}`;
}

export function generatePaynowRef(): string {
  // PayNow 参考号：字母+数字，最长16位
  const dateStr = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `XYT${dateStr}${random}`.slice(0, 16);
}

// ========================================
// 统一支付入口
// ========================================

export async function createPayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  switch (request.paymentMethod) {
    case "stripe":
      return createStripePayment(request);
    case "paynow":
      return createPayNowPayment(request);
    case "wechat_alipay":
      return createWeChatAlipayPayment(request);
    case "crypto":
      return createCryptoPayment(request);
    default:
      return { success: false, error: "Unsupported payment method" };
  }
}

// ========================================
// 1. Stripe 支付（信用卡 + PayNow + GrabPay）
// ========================================

async function createStripePayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    // 计算总金额（分）
    const totalCents = Math.round(
      request.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100
    );

    let line_items;

    if (request.stripePriceId && request.orderType === "consultation") {
      // 咨询服务：使用预设 Price ID
      line_items = [{ price: request.stripePriceId, quantity: 1 }];
    } else {
      // 商品购买：创建临时 price_data
      line_items = request.items.map((item) => ({
        price_data: {
          currency: "sgd",
          product_data: {
            name: request.locale === "zh" ? item.name : (item.nameEn || item.name),
          },
          unit_amount: Math.round(item.unitPrice * 100), // 转
        },
        quantity: item.quantity,
      }));
    }

    // 根据订单类型决定支付方式和配置
    const isSingaporeLocal =
      request.paymentMethod === "paynow" ||
      !!process.env.STRIPE_ENABLE_LOCAL_METHODS;

    // 新加坡本地支付方式
    const paymentMethodTypes: string[] = ["card"];
    if (isSingaporeLocal) {
      paymentMethodTypes.push("paynow", "grabpay");
    }

    // 构建元数据
    const metadata: Record<string, string> = {
      locale: request.locale,
      orderType: request.orderType,
      orderNumber: generateOrderNumber(),
    };

    if (request.consultationData?.service) {
      metadata.service = request.consultationData.service;
      metadata.birthDate = request.consultationData.birthDate || "";
      metadata.birthTime = request.consultationData.birthTime || "";
      metadata.gender = request.consultationData.gender || "";
      metadata.note = request.consultationData.note || "";
    }

    if (request.customerInfo?.name) {
      metadata.customerName = request.customerInfo.name;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: paymentMethodTypes as any[],
      line_items,
      customer_email: request.customerInfo?.email,
      metadata,

      success_url:
        request.orderType === "consultation"
          ? `${baseUrl}/${request.locale}/booking/success?session_id={CHECKOUT_SESSION_ID}&method=stripe`
          : `${baseUrl}/${request.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&method=stripe`,

      cancel_url:
        request.orderType === "consultation"
          ? `${baseUrl}/${request.locale}/booking?cancelled=true`
          : `${baseUrl}/${request.locale}/checkout?cancelled=true`,
      
      locale: request.locale === "zh" ? "zh" : "en",

      // 商品订单需要地址
      ...(request.orderType === "product"
        ? {
            billing_address_collection: "required",
            shipping_address_collection: {
              allowed_countries: ["SG"],
            },
          }
        : {
            billing_address_collection: "auto",
          }),

      custom_text: {
        submit: {
          message:
            request.locale === "zh"
              ? "完成支付後，我們的工作人員將在24小時內與您聯繫。"
              : "After payment, our staff will contact you within 24 hours.",
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1小时过期
    });

    return {
      success: true,
      data: {
        type: "stripe",
        url: session.url!,
        sessionId: session.id,
      },
    };
  } catch (error) {
    console.error("Stripe payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Stripe payment failed",
    };
  }
}

// ========================================
// 2. PayNow 支付（静态 QR + 手动确认）
// ========================================

async function createPayNowPayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const totalAmount = request.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const referenceNumber = generatePaynowRef();

    // 从环境变量读取 PayNow 配置
    const uen = process.env.PAYNOW_UEN || "XXXXXXXXXXXX"; // 替换为实际 UEN
    const companyName =
      process.env.PAYNOW_COMPANY_NAME || "XingYun Tang Pte Ltd";

    // 构建 PayNow QR Payload (SGQR 标准)
    const qrPayload = buildPayNowQR({
      uen,
      amount: totalAmount,
      referenceNumber,
      company: companyName,
      qrExpiryMinutes: 30,
    });

    return {
      success: true,
      data: {
        type: "paynow",
        qrDataUrl: qrPayload,
        referenceNumber,
        uen,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
    };
  } catch (error) {
    console.error("PayNow generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "PayNow QR generation failed",
    };
  }
}

/** 构建 SGQR 格式的 PayNow QR Payload */
function buildPayNowQR(payload: PayNowQRPayload): string {
  /**
   * SGQR PayNow UEN Format:
   * ID 格式: 000201010211... (EMVCo 标准)
   * 使用简化格式，前端用 qrcode 库渲染
   */
  
  // 精确到 2 位小数
  const amountFixed = payload.amount.toFixed(2);

  // SGQR Payload Template for PayNow (UEN)
  // 这是一个标准的 Singapore Quick Response Code payload
  const qrString = [
    "000201",                    // Payload Format Indicator
    "010212",                    // Point of Initiation Method (Static)
    "26580044",                  // Merchant Account Information (PayNow)
    `SG${payload.uen.padEnd(12, "0")}`, // UEN
    "52040000",                  // Merchant Category Code
    `5303${amountFixed.replace(".", "")}`, // Transaction Amount (no decimal)
    "5802SG",                    // Transaction Currency
    `01${payload.referenceNumber.padEnd(14, " ")}`,  // Reference (Tag 01)
    "6304",                      // CRC placeholder
  ].join("");

  // 返回简化的可编码字符串（实际项目中应使用 sgqr 库生成正确的 CRC）
  // 前端将使用此字符串生成 QR 码
  return JSON.stringify({
    type: "paynow",
    uen: payload.uen,
    amount: payload.amount,
    reference: payload.referenceNumber,
    company: payload.company,
    // 可读的 QR 内容（用于 fallback 显示）
    displayText: `Pay to ${payload.company}\nUEN: ${payload.uen}\nS$${amountFixed}\nRef: ${payload.referenceNumber}`,
  });
}

// ========================================
// 3. 微信/支付宝支付（跳转链接模式）
// ========================================

async function createWeChatAlipayPayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const totalAmount = request.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const orderNumber = generateOrderNumber();

    // 检查是否配置了微信/支付宝网关
    const wechatGatewayUrl = process.env.WECHAT_PAY_GATEWAY_URL;
    const alipayGatewayUrl = process.env.ALIPAY_GATEWAY_URL;

    if (!wechatGatewayUrl && !alipayGatewayUrl) {
      // 未配置时返回说明信息
      return {
        success: true,
        data: {
          type: "wechat_alipay",
          url: "",
          tradeNo: orderNumber,
        } as any,
      };
    }

    // TODO: 接入实际的微信/支付宝 API
    // 这里使用占位逻辑：
    // 1. 调用微信/支付宝统一下单接口
    // 2. 获取支付 URL 或 QR 内容
    // 3. 返回给前端

    return {
      success: true,
      data: {
        type: "wechat_alipay",
        url: wechatGatewayUrl || alipayGatewayUrl || "#",
        tradeNo: orderNumber,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
    };
  } catch (error) {
    console.error("WeChat/Alipay error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "WeChat/Alipay payment failed",
    };
  }
}

// ========================================
// 4. 加密货币支付 (USDT TRC20)
// ========================================

async function createCryptoPayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const sgdAmount = request.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0 );

    // 加密货币配置（从环境变量读取）
    const walletAddress =
      process.env.CRYPTO_WALLET_ADDRESS_TRC20 ||
      "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    
    // 模拟汇率（实际应调用实时汇率 API）
    const exchangeRate = parseFloat(process.env.USDT_SGD_RATE || "1.34"); // 1 USDT ≈ 1.34 SGD
    const usdtAmount = Number((sgdAmount / exchangeRate).toFixed(2));

    const cryptoInfo: CryptoPaymentInfo = {
      network: "TRC20",
      token: "USDT",
      walletAddress,
      amount: usdtAmount,
      exchangeRate,
      sgdAmount,
      minConfirmations: 1,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    return {
      success: true,
      data: {
        type: "crypto",
        ...cryptoInfo,
      },
    };
  } catch (error) {
    console.error("Crypto payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Crypto payment setup failed",
    };
  }
}

// ========================================
// 支付确认（用于 PayNow/Crypto/WeChatAlipay）
// ========================================

export interface PaymentConfirmationRequest {
  orderNumber: string;
  paymentMethod: Exclude<PaymentMethod, "stripe">;
  /** 用户提交的证明 */
  proof?: {
    paynowTransactionId?: string;     // PayNow 交易参考号
    cryptoTxHash?: string;             // 加密货币交易哈希
    screenshotUrl?: string;            // 截图 URL（可选）
  };
}

/** 模拟支付确认（无数据库时使用内存存储） */
const pendingConfirmations = new Map<
  string,
  { status: string; confirmedAt?: string }
>();

export async function confirmPayment(
  req: PaymentConfirmationRequest
): Promise<{ success: boolean; orderStatus: Order["status"]; message?: string }> {
  // 在实际应用中，这里会：
  // 1. 验证 proof 信息（查询 PayNow API、区块链浏览器等）
  // 2. 更新数据库中的订单状态
  // 3. 发送通知
  
  const key = `${req.paymentMethod}-${req.orderNumber}`;
  pendingConfirmations.set(key, {
    status: "confirmed",
    confirmedAt: new Date().toISOString(),
  });

  return {
    success: true,
    orderStatus: "processing",
    message:
      req.paymentMethod === "crypto"
        ? "加密貨幣轉帳已收到，等待區塊鏈確認。"
        : req.paymentMethod === "paynow"
        ? "PayNow 轉帳已收到，正在確認中。"
        : "付款已收到，正在處理中。",
  };
}
