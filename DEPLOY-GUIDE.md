# 星運堂 XingYun Tang — 上線配置指南
> **狀態**: ✅ 已部署至 Vercel | **URL**: https://xingyun-sg.vercel.app
> **GitHub**: https://github.com/wave-hub/xingyun-sg
> **最後更新**: 2026-04-25

---

## ✅ 已完成項目

| 步驟 | 狀態 |
|------|------|
| Git 倉庫初始化 + GitHub 推送 (wave-hub/xingyun-sg) | ✅ |
| Vercel 項目創建 + 生產部署 | ✅ |
| TypeScript 構建錯誤全部修復 | ✅ |
| 環境變量框架設置（佔位符） | ✅ |

## ⚠️ 待完成項目（需手動操作）

### 1. 切換 Vercel 區域為新加坡 sin1

當前部署在美東 iad1 區域（延遲較高）。切換步驟：

1. 開啟 [Vercel Dashboard](https://vercel.com/waves-projects-b0f82185/xingyun-sg/settings/general)
2. 找到 **Region** 設置
3. 從 `Washington, D.C., USA (iad1)` 改為 `Singapore (sin1)`
4. 保存後重新部署

```bash
# CLI 無法直接修改區域，請用 Dashboard 操作
# 或使用以下命令重新觸發部署：
cd xingyun-sg && vercel --prod
```

---

### 2. 配置 Stripe（支付核心）

#### 2a. 創建 Stripe 帳號（新加坡）

1. 前往 [Stripe Dashboard](https://dashboard.stripe.com/register)
2. 選擇國家/地區：**Singapore**
3. 完成帳號驗證

#### 2b. 創建產品和價格（SGD）

在 Stripe Dashboard > Products 中創建：

| # | 產品名稱 | 英文名 | 定價 (SGD) | Price ID 格式 |
|---|---------|--------|-----------|--------------|
| 1 | 紫微斗數命盤分析 | Zi Wei Dou Shu Analysis | S$88.00 | `price_xxx` |
| 2 | 八字命理分析 | Ba Zi Fortune Reading | S$88.00 | `price_xxx` |
| 3 | 大六壬占卜 | Da Liu Ren Divination | S$88.00 | `price_xxx` |
| 4 | 三術合參 | Combined Three Arts Reading | S$188.00 | `price_xxx` |
| 5 | 命理追蹤諮詢 | Follow-up Consultation | S$58.00 | `price_xxx` |

每個產品的設置：
- **Type**: One-time / 一次性付款
- **Currency**: SGD (新幣)
- **Price**: 如上表

#### 2c. 獲取 API Keys

從 [Stripe API Keys 頁面](https://dashboard.stripe.com/apikeys) 複製：

| 變量名 | 說明 | 示例 |
|--------|------|------|
| `STRIPE_SECRET_KEY` | Secret Key (測試用 test, 正式用 live) | `sk_test_...` / `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable Key | `pk_test_...` / `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook Signing Secret | `whsec_...` |

#### 2d. 配置 Webhook

1. 在 Stripe Dashboard > Developers > Webhooks
2. 添加端點: `https://xingyuntang.sg/api/payment/webhook`
3. 監聽事件:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. 複製 Webhook Secret (`whsec_...`)

#### 2e. 更新 Vercel 環境變量

```bash
cd /Users/zzq/WorkBuddy/20260423132339/xingyun-sg

# 替換為你的真實值
vercel env add STRIPE_SECRET_KEY production <<< "sk_live_你的真實key"
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production <<< "pk_live_你的真實key"
vercel env add STRIPE_WEBHOOK_SECRET production <<< "whsec_你的真實secret"

# 可選的 PayNow 和加密貨幣配置
vercel env add PAYNOW_UEN production <<< "你的新加坡UEN號碼"
vercel env add PAYNOW_COMPANY_NAME production <<< "星運堂 XingYun Tang"
vercel env add CRYPTO_WALLET_ADDRESS_TRC20 production <<< "你的TRC20錢包地址"
vercel env add USDT_SGD_RATE production <<< "1.35"

# 更新後重新部署
vercel --prod
```

**或者通過 Dashboard 操作**：
1. 打開 https://vercel.com/waves-projects-b0f82185/xingyun-sg/settings/environment-variables
2. 逐一編輯環境變量替換為真實值
3. 點擊 **Redeploy**

---

### 3. 綁定自訂域名 xingyuntang.sg

#### 3a. 購買域名

推薦域名註冊商：
- **Namecheap** — 性價比高
- **Cloudflare Registrar** — 成本價轉發
- **GoDaddy** — 新加坡常用

搜尋並購買 `xingyuntang.sg`（或 `.com.sg`, `.sg` 後綴）。

> ⚠️ `.sg` 域名需要新加坡實體/居民身份。如果沒有，可用 `.com` 或 `.asia`。

#### 3b. 在 Vercel 添加域名

```bash
cd /Users/zzq/WorkBuddy/20260423132339/xingyun-sg
vercel domains add xingyuntang.sg
```

或在 Dashboard > Settings > Domains 中添加。

#### 3c. 配置 DNS

在你的域名註冊商 DNS 設置中添加：

| 類型 | 名稱 | 值 | TTL |
|------|------|-----|-----|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |
| CNAME | `*` (wildcard) | `cname.vercel-dns.com` | 3600 |

> `76.76.21.21` 是 Vercel 的固定 IP。

#### 3d. 等待 SSL 證書

Vercel 會自動申請 Let's Encrypt SSL 證書，通常 5-10 分鐘內生效。
驗證: https://xingyuntang.sg （應顯示 🔒 HTTPS）

---

### 4. SEO & 推廣（上線後）

#### Google Search Console
1. 前往 https://search.google.com/search-console
2. 添加 `https://xingyuntang.sg`
3. 用 DNS TXT 驗證所有權
4. 提交 Sitemap: `https://xingyuntang.sg/sitemap.xml`

#### Google My Business（本地 SEO）
1. 創建商家頁面
2. 信息:
   - 名稱: 星運堂 XingYun Tang
   - 地址: 新加坡 Orchard Road 商業區
   - 類別: Fortune Telling Service / 命理服務
   - 營業時間: Mon-Sat 10:00-19:00

#### 必應 Webmaster Tools
1. 添加網站: https://bing.com/webmasters
2. 提交 sitemap

---

### 5. 測試清單（正式營運前必須完成）

- [ ] 訪問首頁確認正常渲染
- [ ] 中英文切換正常（zh ↔ en）
- [ ] 手機端響應式布局正常
- [ ] 預約流程三步完整走通（服務選擇 → 出生信息 → 確認）
- [ ] **支付流程測試**（先用 Stripe Test Mode）
  - [ ] 信用卡支付（Stripe Elements）
  - [ ] PayNow QR 碼生成 + 參考號提交
  - [ ] 加密貨幣地址顯示 + TxHash 提交
  - [ ] 微信/支付寶跳轉鏈接
- [ ] 商店頁面瀏覽 + 加入購物車
- [ ] 結帳頁面完整流程
- [ ] SSL 證書生效（HTTPS）
- [ ] Core Web Vitals 通過（Lighthouse > 90）

---

## 📊 當前部署信息

| 項目 | 值 |
|------|-----|
| **生產 URL** | https://xingyun-sg.vercel.app |
| **繁中首頁** | https://xingyun-sg.vercel.app/zh |
| **英文首頁** | https://xingyun-sg.vercel.app/en |
| **Vercel 項目** | waves-projects-b0f82185/xingyun-sg |
| **Git 倉庫** | https://github.com/wave-hub/xingyun-sg |
| **框架** | Next.js 16.2.4 (Turbopack) |
| **部署區域** | Washington D.C., USA (iad1) ⚠️ 建議改為 sin1 |
| **構建狀態** | ✅ 成功（零錯誤） |

---

## 🔗 快速連結

- **Vercel Dashboard**: https://vercel.com/waves-projects-b0f82185/xingyun-sg
- **GitHub Repo**: https://github.com/wave-hub/xingyun-sg
- **Stripe Dashboard**: https://dashboard.stripe.com
- **線上預覽**: https://xingyun-sg.vercel.app/zh
