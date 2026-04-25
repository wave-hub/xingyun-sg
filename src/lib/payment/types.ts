/**
 * 星運堂 XingYun Tang - 支付系统统一类型定义
 * Multi-channel Payment Types
 */

// ========================================
// 支付渠道枚举
// ========================================

/** 支付方式类型 */
export type PaymentMethod =
  | "stripe"           // Stripe (信用卡/Debit Card)
  | "paynow"           // PayNow (新加坡QR支付)
  | "wechat_alipay"    // 微信/支付宝
  | "crypto";          // 加密货币 (USDT/ETH)

export const PAYMENT_METHODS: { key: PaymentMethod; label: { zh: string; en: string }; icon: string }[] = [
  {
    key: "stripe",
    label: { zh: "信用卡 / Debit Card", en: "Credit / Debit Card" },
    icon: "💳",
  },
  {
    key: "paynow",
    label: { zh: "PayNow", en: "PayNow (SG QR)" },
    icon: "📱",
  },
  {
    key: "wechat_alipay",
    label: { zh: "微信 / 支付宝", en: "WeChat / Alipay" },
    icon: "🟢",
  },
  {
    key: "crypto",
    label: { zh: "加密貨幣", en: "Cryptocurrency (USDT)" },
    icon: "₿",
  },
];

// ========================================
// 订单类型
// ========================================

/** 订单状态 */
export type OrderStatus =
  | "pending"       // 待支付
  | "processing"    // 处理中（PayNow/Crypto等待确认）
  | "paid"          // 已支付
  | "failed"        // 支付失败
  | "refunded";     // 已退款

/** 订单类型 */
export type OrderType = "consultation" | "product";

/** 订单项目 */
export interface OrderItem {
  id: string;
  name: string;
  nameEn?: string;
  quantity: number;
  unitPrice: number; // SGD, 元（非分）
}

/** 订单 */
export interface Order {
  id: string;
  orderNumber: string;      // XYT-YYYYMMDD-XXXXX
  type: OrderType;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;         // "SGD"
  
  // 客户信息
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  // 收货地址（商品订单）
  shippingAddress?: ShippingAddress;

  // 咨询数据
  consultationData?: ConsultationMetadata;

  // 支付信息
  paymentInfo?: PaymentSessionInfo;
  
  // 时间戳
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
}

/** 收货地址 */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  address: string;
  country?: string;        // 默认 SG
}

/** 咨询元数据 */
export interface ConsultationMetadata {
  service: string;          // ziwei, bazi, etc.
  birthDate?: string;
  birthTime?: string;
  gender?: string;
  note?: string;
}

/** 支付会话信息 */
export interface PaymentSessionInfo {
  /** Stripe Session ID */
  stripeSessionId?: string;
  /** PayNow 参考号 */
  paynowReference?: string;
  /** 加密货币交易哈希 */
  cryptoTxHash?: string;
  /** 微信/支付宝交易号 */
  wechatAlipayTradeNo?: string;
  /** 支付过期时间 */
  expiresAt: string;
}

// ========================================
// PayNow 类型
// ========================================

export interface PayNowQRPayload {
  uen: string;               // UEN 号码
  amount: number;            // 金额 SGD
  referenceNumber: string;   // 参考号（订单号）
  company: string;           // 公司名
  qrExpiryMinutes: number;   // QR 过期时间
}

// ========================================
// Crypto 类型
// ========================================

export interface CryptoPaymentInfo {
  network: string;           // TRC20 / ERC20
  token: string;             // USDT
  walletAddress: string;     // 收款地址
  amount: number;            // USDT 数量
  exchangeRate: number;      // SGD -> USDT 汇率
  sgdAmount: number;         // 原 SGD 金额
  minConfirmations: number;  // 最小确认数
  expiresAt: string;         // 报价过期时间
}

// ========================================
// 微信/支付宝 类型
// ========================================

export interface WeChatAlipayInfo {
  provider: "wechat" | "alipay";
  paymentUrl: string;        // 跳转 URL 或 QR 内容
  tradeNo: string;
  expiresAt?: string;       // 可选过期时间
}

// ========================================
// API Request/Response 类型
// ========================================

/** 创建支付会话请求 */
export interface CreatePaymentRequest {
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  items: Array<{
    id: string;
    name: string;
    nameEn?: string;
    quantity: number;
    unitPrice: number;
  }>;
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress?: ShippingAddress;
  consultationData?: ConsultationMetadata;
  locale: "zh" | "en";
  /** Stripe Price ID（咨询服务用） */
  stripePriceId?: string;
}

/** 创建支付会话响应 */
export interface CreatePaymentResponse {
  success: boolean;
  data?:
    | { type: "stripe"; url: string; sessionId: string }
    | { type: "paynow"; qrDataUrl: string; referenceNumber: string; uen: string; expiresAt: string }
    | { type: "wechat_alipay"; url: string; tradeNo: string; expiresAt?: string }
    | (CryptoPaymentInfo & { type: "crypto" });
  error?: string;
}

// ========================================
// Frontend-only types (used by UI components)
// ========================================

/** 前端创建支付请求（简化版，用于 API 调用） */
export interface PaymentCreateRequest {
  payment_method: PaymentMethod;
  amount: number; // in smallest unit (cents for SGD)
  currency: string;
  description?: string;
  customer_email?: string;
  customer_name?: string;
  order_id?: string;
}

/** Stripe 支付结果 */
export interface PaymentResult {
  payment_intent_id: string;
}

/** PayNow 确认数据 */
export interface PayNowConfirmData {
  paymentId: string;
  referenceId: string;
}

/** 加密货币确认数据 */
export interface CryptoConfirmData {
  paymentId: string;
  txHash: string;
}
