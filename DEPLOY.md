# 星運堂 XingYun Tang - Deployment Guide
# 新加坡區域部署指南

## 🚀 部署到 Vercel (新加坡區域 sin1)

### 步驟 1: 准備 Stripe 產品

在 Stripe Dashboard 創建以下產品 (定價以 SGD 計算):

1. **紫微斗數命盤分析** - S$88.00
   - Name: 紫微斗數命盤分析 / Zi Wei Dou Shu Analysis
   - Price: S$88.00 (one-time)
   - 獲取 Price ID: `price_xxxxxxxxxxxxx`

2. **八字命理分析** - S$88.00
   - Name: 八字命理分析 / Ba Zi Fortune Reading
   - Price: S$88.00 (one-time)

3. **大六壬占卜** - S$88.00
   - Name: 大六壬占卜 / Da Liu Ren Divination
   - Price: S$88.00 (one-time)

4. **三術合參** - S$188.00
   - Name: 三術合參 / Combined Three Arts Reading
   - Price: S$188.00 (one-time)

5. **命理追蹤諮詢** - S$58.00
   - Name: 命理追蹤諮詢 / Follow-up Consultation
   - Price: S$58.00 (one-time)

### 步驟 2: 配置環境變量

在 Vercel Project Settings > Environment Variables 添加:

```
NEXT_PUBLIC_SITE_URL=https://xingyuntang.sg
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ZIWEI=price_xxxxx
STRIPE_PRICE_BAZI=price_xxxxx
STRIPE_PRICE_DALIUREN=price_xxxxx
STRIPE_PRICE_COMBINED=price_xxxxx
STRIPE_PRICE_FOLLOWUP=price_xxxxx
```

### 步驟 3: 部署

#### 方式 A: Vercel CLI
```bash
npm i -g vercel
vercel login
cd xingyun-sg
vercel --prod --region sin1
```

#### 方式 B: Git 部署
1. 推送代碼到 GitHub/GitLab
2. 在 Vercel Dashboard 導入項目
3. 選擇 `main` 分支
4. 選擇 Framework: Next.js
5. 選擇 Region: Singapore (sin1)
6. 添加環境變量
7. 點擊 Deploy

### 步驟 4: 配置 Stripe Webhook

1. 在 Stripe Dashboard > Webhooks 添加端點:
   - URL: `https://xingyuntang.sg/api/payment/webhook`
   - Events to listen:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`

2. 複製 Webhook Signing Secret 到 Vercel:
   `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

### 步驟 5: 配置域名

1. 在 Vercel 添加域名: `xingyuntang.sg`
2. 在域名註冊商配置 DNS:
   - A Record: `@` → Vercel IP
   - CNAME: `www` → `cname.vercel-dns.com`
3. 等待 SSL 證書自動配置

## 🌍 SEO 優化 (新加坡市場)

### 結構化數據
網站已配置以下 Schema:
- LocalBusiness (新加坡本地商家)
- ProfessionalService
- FAQPage
- Organization
- BreadcrumbList

### hreflang 標籤
自動生成:
- `<link rel="alternate" hreflang="zh" href=".../zh/...">`
- `<link rel="alternate" hreflang="en" href=".../en/...">`
- `<link rel="alternate" hreflang="x-default" href=".../zh/...">`

### 搜索控制台
1. 登錄 Google Search Console
2. 添加域名: `xingyuntang.sg`
3. 驗證所有權
4. 提交 Sitemap: `https://xingyuntang.sg/sitemap.xml`

### 必應 Webmaster
1. 添加網站: `https://xingyuntang.sg`
2. 驗證所有權
3. 提交 Sitemap

## 📱 新加坡本地化

### Google My Business
創建商家信息:
- 業務名稱: 星運堂 XingYun Tang
- 地址: Blk 123 Orchard Road, #12-34, Singapore 238823
- 電話: +65 9123 4567
- 營業時間: Mon-Sat 10:00-19:00, Sun 12:00-17:00
- 類別: 命理諮詢服務 / Metaphysical Service

### 社交媒體
- Facebook Page: https://facebook.com/xingyuntangsg
- Instagram: https://instagram.com/xingyuntangsg
- WhatsApp Business: +65 9123 4567

## 🧪 測試清單

- [ ] 支付流程測試 (使用 Stripe Test Mode)
- [ ] 中英文切換測試
- [ ] 響應式設計測試 (Mobile/Tablet/Desktop)
- [ ] 表單驗證測試
- [ ] SEO 結構化數據測試 (Rich Results Test)
- [ ] Core Web Vitals 測試
- [ ] SSL 證書生效確認
- [ ] 聯繫方式顯示正確

## 🔧 調試支付接口

### 本地測試 Webhook
```bash
# 使用 Stripe CLI
stripe listen --forward-to localhost:3000/api/payment/webhook

# 測試支付
stripe trigger checkout.session.completed
```

### 常見問題

**Q: 支付頁面空白**
A: 檢查 `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` 是否正確

**Q: Webhook 不觸發**
A: 確認 `STRIPE_WEBHOOK_SECRET` 正確，且 URL 可公開訪問

**Q: 貨幣顯示為 USD**
A: 確保 Stripe Dashboard 中產品定價為 SGD

## 📊 監控

### Vercel Analytics
- 開啟 Vercel Analytics 監控訪問量
- 追蹤 Core Web Vitals

### Stripe Dashboard
- 定期檢查支付成功率
- 監控退款和爭議

---
最後更新: 2026-04-23
