#!/usr/bin/env python3
"""
星運堂 Stripe 產品初始化腳本
自動創建 5 個命理服務產品（SGD）並輸出 Price IDs
"""

import stripe
import json
import os

# =============================================
# 配置 - 使用你的 Test Secret Key
# =============================================

# 從 Dashboard > 開發人員 > API 密鑰 > 秘鑰 中複製
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "sk_test_Your_Key_Here")

stripe.api_key = STRIPE_SECRET_KEY

# =============================================
# 產品定義（SGD 新幣）
# =============================================

PRODUCTS = [
    {
        "id": "ziwei_doushu",
        "name": "紫微斗數命盤分析",
        "description": "Zi Wei Dou Shu (Purple Star Astrology) Complete Birth Chart Analysis with detailed palace readings, star interpretations, and life path insights.",
        "price_cents": 8800,  # S$88.00 in cents
    },
    {
        "id": "bazi_mingli",
        "name": "八字命理分析",
        "description": "Ba Zi (Four Pillars of Destiny) Fortune Reading covering five elements balance, ten gods analysis, luck pillars, and career/wealth predictions.",
        "price_cents": 8800,  # S$88.00 in cents
    },
    {
        "id": "daliuren_zhanbu",
        "name": "大六壬占卜",
        "description": "Da Liu Ren (Great Six Ren) Divination for specific questions — relationships, career decisions, major life events. Ancient Chinese divination method.",
        "price_cents": 8800,  # S$88.00 in cents
    },
    {
        "id": "san_shu_he_can",
        "name": "三術合參",
        "description": "Combined Three Arts Reading: Zi Wei Dou Shu + Ba Zi + Da Liu Ren comprehensive analysis. The ultimate destiny reading experience.",
        "price_cents": 18800,  # S$188.00 in cents
    },
    {
        "id": "mingli_zuizong",
        "name": "命理追蹤諮詢",
        "description": "Follow-up Consultation: Deep dive into specific areas of your chart — annual luck, relationship compatibility, wealth timing, or health indicators.",
        "price_cents": 5800,  # S$58.00 in cents
    },
]


def create_products():
    """創建所有產品和價格，返回 price_id 映射"""
    results = {}
    
    print("=" * 60)
    print("星運堂 XingYun Tang — Stripe 產品初始化")
    print("=" * 60)
    
    for product in PRODUCTS:
        try:
            # 檢查產品是否已存在
            existing = None
            try:
                existing = stripe.Product.search(query=f'name:"{product["name"]}')
                if existing.data:
                    p = existing.data[0]
                    print(f"\n✅ 產品已存在: {product['name']} (ID: {p.id})")
                    
                    # 獲取已有的 price
                    prices = stripe.Price.list(product=p.id, active=True)
                    if prices.data:
                        price_id = prices.data[0].id
                        print(f"   已有 Price ID: {price_id}")
                        results[product["id"]] = {
                            "product_id": p.id,
                            "product_name": product["name"],
                            "price_id": price_id,
                            "price_sgd": f"S${product['price_cents']/100:.2f}",
                        }
                        continue
            except Exception as e:
                print(f"   (搜索時出錯，將嘗試創建新產品: {e})")
            
            # 創建新產品
            p = stripe.Product.create(
                name=product["name"],
                description=product["description"],
                metadata={
                    "service_type": "fortune_telling",
                    "locale": "zh",
                },
            )
            
            # 創建 SGD 價格
            price = stripe.Price.create(
                product=p.id,
                unit_amount=product["price_cents"],
                currency="sgd",
                metadata={
                    "service_id": product["id"],
                },
            )
            
            results[product["id"]] = {
                "product_id": p.id,
                "product_name": product["name"],
                "price_id": price.id,
                "price_sgd": f"S${product['price_cents']/100:.2f}",
            }
            
            print(f"\n✅ 創建成功: {product['name']}")
            print(f"   Product ID : {p.id}")
            print(f"   Price ID   : {price.id}")
            print(f"   定價       : S${product['price_cents']/100:.2f} SGD")
            
        except stripe.error.StripeError as e:
            print(f"\n❌ 創建失敗 [{product['name']}]: {e.user_message or str(e)}")
            results[product["id"]] = {"error": str(e)}
    
    # 輸出摘要
    print("\n" + "=" * 60)
    print("📋 產品 & Price ID 一覽表")
    print("=" * 60)
    
    env_output = {}
    for key, val in results.items():
        if "error" not in val:
            print(f"{val['product_name']:<20s} | {val['price_sgd']:<8s} | {val['price_id']}")
            # 生成環境變量名稱映射
            env_key = f"STRIPE_PRICE_{key.upper()}"
            env_output[env_key] = val["price_id"]
    
    print("\n--- Vercel 環境變量配置 ---")
    for key, val in env_output.items():
        print(f'{key}={val}')
    
    # 保存到 JSON 文件
    output_path = "/Users/zzq/WorkBuddy/20260423132339/xingyun-sg/stripe-products.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "products": results,
            "env_variables": env_output,
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 已保存至: {output_path}")
    
    return results


if __name__ == "__main__":
    # 先驗證 API Key 是否有效
    try:
        account = stripe.Account.retrieve()
        print(f"✅ Stripe 連接成功！")
        print(f"   帳號 ID: {account.id}")
        print(f"   國家/地區: {account.country}")
        print(f"   貨幣: {account.default_currency}\n")
    except stripe.error.AuthenticationError:
        print("❌ API Key 無效！請檢查 STRIPE_SECRET_KEY")
        exit(1)
    except Exception as e:
        print(f"⚠️ 連接時出錯: {e}")
        exit(1)
    
    create_products()
