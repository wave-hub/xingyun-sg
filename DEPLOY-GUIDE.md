# 星運堂 XingYun Tang — 上線配置指南
> **狀態**: ✅ 已上線 | **URL**: https://xingyun-sg.vercel.app
> **GitHub**: https://github.com/wave-hub/xingyun-sg
> **最後更新**: 2026-04-27

---

## ✅ 上線狀態總覽

| 步驟 | 狀態 | 完成時間 |
|------|------|---------|
| 1. Vercel 區域切換至新加坡 sin1 | ✅ 完成 | 2026-04-25 |
| 2. Stripe 配置（產品/API Key/Webhook） | ✅ 完成 | 2026-04-25 |
| 3. 自訂域名 xingyuntang.sg | ⏸️ 暫時跳過（先用 Vercel 默認域名） | - |
| 4. SEO 優化（Sitemap/robots.txt/結構化數據） | ✅ 完成 | 2026-04-27 |
| 5. 最終驗證 | ✅ 通過 | 2026-04-27 |

---

## ✅ Step 1: Vercel 區域

- **部署區域**: Singapore (sin1) ✅
- 切換方式: Dashboard > Settings > General > Region → sin1

## ✅ Step 2: Stripe 支付配置

### 已創建的產品（SGD）

| # | 產品名稱 | 定價 (SGD) | 狀態 |
|---|---------|-----------|------|
| 1 | 紫微斗數命盤分析 | S$88.00 | ✅ |
| 2 | 八字命理分析 | S$88.00 | ✅ |
| 3 | 大六壬占卜 | S$88.00 | ✅ |
| 4 | 三術合參 | S$188.00 | ✅ |
| 5 | 命理追蹤諮詢 | S$58.00 | ✅ |

### API 配置
- **環境變量**: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET + 5 個 Price ID 變量
- **Webhook 端點**: `/api/payment/webhook`（已配置）
- **模式**: Test Mode（切換 Live 時需更新 key 和 Price ID）

> ⚠️ **正式上線前**: 將 Stripe 測試密鑰替換為 live 密鑰，並重新創建 live 模式下的產品

## ⏸️ Step 3: 自訂域名（暫時跳過）

用戶選擇暫時使用 Vercel 默認域名。後續綁定自訂域名時：

1. 購買 `xingyuntang.sg`
2. 在 Vercel Dashboard > Settings > Domains 添加域名
3. 配置 DNS: A 記錄指向 `76.76.21.21`
4. 更新 `NEXT_PUBLIC_SITE_URL` 環境變量
5. 重新運行 postbuild 生成 sitemap（URL 會自動更新）

## ✅ Step 4: SEO 優化

### 已完成的 SEO 項目

| 項目 | 文件/位置 | 狀態 |
|------|----------|------|
| robots.txt | public/robots.txt（靜態文件） | ✅ |
| sitemap.xml | public/sitemap.xml（postbuild 自動生成） | ✅ 18 URLs |
| JSON-LD 結構化數據 | SEOProvider 組件（LocalBusiness/ProfessionalService/Organization/FAQ） | ✅ 已引入 layout |
| Open Graph / Twitter Card | layout.tsx metadata | ✅ |
| hreflang 多語言支持 | sitemap.xml 中每頁面含 zh/en/x-default | ✅ |
| Meta description & keywords | layout.tsx metadata | ✅ |

### 待完成（需手動操作）

#### Google Search Console
1. 前往 https://search.google.com/search-console
2. 添加 `https://xingyun-sg.vercel.app`
3. 用 DNS TXT 或 meta tag 驗證
4. 提交 Sitemap: `https://xingyun-sg.vercel.app/sitemap.xml`

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

## ✅ Step 5: 最終驗證結果

### 自動化測試通過

| 測試項目 | URL | 狀態碼 |
|---------|-----|--------|
| 首頁 (繁中) | /zh | ✅ 200 |
| 首頁 (英文) | /en | ✅ 200 |
| robots.txt | /robots.txt | ✅ 200（靜態文本） |
| sitemap.xml | /sitemap.xml | ✅ 200（18 URLs） |
| 約定頁面 | /zh/booking | ✅ 200 |
| 商店頁面 | /zh/shop | ✅ 200 |
| 關於頁面 | /zh/about | ✅ 200 |

### 待手動測試

以下需要你在瀏覽器中手動驗證：
- [ ] 手機端響應式布局正常
- [ ] 預約流程三步完整走通
- [ ] **支付流程測試**（Stripe Test Mode）
  - [ ] 信用卡支付
  - [ ] PayNow QR 碼生成
  - [ ] 加密貨幣地址顯示
  - [ ] 微信/支付寶跳轉
- [ ] 商店頁面瀏覽 + 加入購物車
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
| **部署區域** | ✅ Singapore (sin1) |
| **構建狀態** | ✅ 成功（零錯誤） |
| **SEO 文件** | ✅ robots.txt + sitemap.xml (18 URLs) |
| **SSL** | ✅ HTTPS 自動生效 |

---

## 🔗 快速連結

- **🌐 線上站點（繁中）**: https://xingyun-sg.vercel.app/zh
- **🌐 線上站點（英文）**: https://xingyun-sg.vercel.app/en
- **Vercel Dashboard**: https://vercel.com/waves-projects-b0f82185/xingyun-sg/settings/general
- **GitHub Repo**: https://github.com/wave-hub/xingyun-sg
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Sitemap**: https://xingyun-sg.vercel.app/sitemap.xml
- **robots.txt**: https://xingyun-sg.vercel.app/robots.txt
