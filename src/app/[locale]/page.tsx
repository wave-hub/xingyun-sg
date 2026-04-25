"use client";

import { motion } from "framer-motion";
import {
  Star,
  Compass,
  BookOpen,
  Sparkles,
  Send,
  Users,
  ChevronRight,
  Shield,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ProductCard from "@/components/shop/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { getTopTestimonials, testimonials } from "@/data/testimonials";
import { articles } from "@/data/articles";
import { Link } from "@/i18n/routing";

// 星象動畫背景組件
function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 三術數據
const threeMethods = [
  {
    icon: <Star className="w-8 h-8" />,
    name: "紫微斗數",
    nameEn: "Zi Wei Dou Shu",
    description: "人生地圖 — 十二宮全景解讀",
    descriptionEn: "Life Map — Complete 12 Palace Reading",
    href: "/destiny/ziwei",
    color: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: <Compass className="w-8 h-8" />,
    name: "八字命理",
    nameEn: "Ba Zi",
    description: "能量底色 — 五行氣勢趨勢分析",
    descriptionEn: "Energy Blueprint — Five Elements Trend Analysis",
    href: "/destiny/bazi",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: "大六壬",
    nameEn: "Da Liu Ren",
    description: "事態預測 — 精準斷課決策輔助",
    descriptionEn: "Event Forecast — Precise Divination Guidance",
    href: "/destiny/liuren",
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400",
  },
];

const featuredProducts = getFeaturedProducts();
const topTestimonials = getTopTestimonials(3);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ========== Hero 區域 ========== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 背景漸變 */}
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black-light" />

        {/* 星象動畫 */}
        <StarField />

        {/* 徑向光暈 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />

        {/* 內容 */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gold/70 font-english tracking-[0.3em] mb-4"
            >
              ANCIENT WISDOM, ILLUMINATED
            </motion.p>

            {/* 大標題 */}
            <h1 className="text-5xl md:text-7xl font-serif-tc font-bold mb-4 gradient-text-gold">
              星運堂
            </h1>

            {/* 副標題 */}
            <p className="text-lg md:text-xl text-ivory/80 mb-2 font-serif-tc text-chinese">
              新加坡首創 · 三術合一命理平台
            </p>
            <p className="text-sm text-neutral-400 font-english mb-8">
              Singapore&apos;s Premier Three-Method Destiny Platform
            </p>

            {/* CTA 按鈕 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/destiny/ziwei/chart">
                <Button variant="primary" size="lg" className="min-w-[160px]">
                  免費排盤
                  <Sparkles className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/destiny">
                <Button variant="outline" size="lg" className="min-w-[160px]">
                  預約大師
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 向下滾動提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-neutral-500"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== 三術介紹區 ========== */}
      <section className="py-20 px-4">
        <div className="container-brand">
          {/* 標題 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="taoist-divider mb-6">
              <span className="taoist-divider-symbol">☯</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              三術合一 · 指點迷津
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              融合紫微斗數、八字命理、大六壬三大術數，全方位解讀命運格局
            </p>
          </motion.div>

          {/* 三術卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {threeMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={method.href}>
                  <Card variant="glass" className="p-6 h-full group cursor-pointer hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
                    <CardContent>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 ${method.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-serif-tc font-bold text-ivory mb-1">
                        {method.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-english mb-3">
                        {method.nameEn}
                      </p>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {method.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 三術合參旗艦卡 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 max-w-5xl mx-auto"
          >
            <Link href="/destiny">
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-r from-yin-black-light via-yin-black to-yin-black-light p-8 md:p-12 group cursor-pointer hover:border-gold/40 transition-all duration-500">
                {/* 光暈 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/5 rounded-full blur-[80px]" />

                <div className="relative text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-gold" />
                    <span className="text-gold text-sm font-medium">旗艦服務</span>
                    <Sparkles className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif-tc font-bold gradient-text-gold mb-3">
                    三術合參
                  </h3>
                  <p className="text-neutral-400 mb-2 font-english">Three-Method Combined Analysis</p>
                  <p className="text-neutral-300 max-w-xl mx-auto mb-6">
                    三大術數同時分析，交叉印證，全方位解讀命運格局。最權威、最完整的命理服務，為您的人生決策提供最可靠的參考。
                  </p>
                  <div className="inline-flex items-center gap-2 text-gold group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">了解更多</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== 靈器精選區 ========== */}
      <section className="py-20 px-4 bg-yin-black-light/30">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="taoist-divider mb-6">
              <span className="taoist-divider-symbol">✦</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              開光靈器精選
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              精選開光認證靈器，由道教大師親自加持，為您的命理之路增添助力
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" size="md">
                瀏覽全部靈器
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 客戶見證區 ========== */}
      <section className="py-20 px-4">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="taoist-divider mb-6">
              <span className="taoist-divider-symbol">❝</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              客戶見證
            </h2>
            <p className="text-neutral-400">來自真實客戶的好評與反饋</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {topTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card variant="glass" className="p-6 h-full flex flex-col">
                  {/* 評分 */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  {/* 內容 */}
                  <blockquote className="flex-1 text-sm text-neutral-300 leading-relaxed mb-4">
                    <Quote className="w-4 h-4 text-gold/30 mb-2 inline-block" />
                    &ldquo;{testimonial.content.slice(0, 80)}...&rdquo;
                  </blockquote>

                  {/* 用戶信息 */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-700/30">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar-red/20 flex items-center justify-center text-gold font-serif-tc font-bold text-sm">
                      {testimonial.avatarInitial}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">{testimonial.name}</p>
                      <p className="text-[11px] text-neutral-500">{testimonial.location}</p>
                    </div>
                    {testimonial.isVerified && (
                      <Badge variant="success" size="sm" className="ml-auto">
                        已認證
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 社群入口區 ========== */}
      <section className="py-20 px-4 bg-gradient-to-b from-yin-black to-yin-black-dark">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif-tc font-bold text-ivory mb-3">
              加入星運堂社群
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              與同好交流命理心得，獲取每日運勢推播與獨家活動資訊
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Telegram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className="p-6 text-center group cursor-pointer hover:border-gold/30">
                <CardContent>
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Send className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-serif-tc font-bold text-ivory mb-1">
                    Telegram 社群
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    加入我們的 Telegram 群組，與上千位命理愛好者交流
                  </p>
                  <Button variant="outline" size="sm">
                    立即加入
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 每日運勢 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/community">
                <Card variant="glass" className="p-6 text-center group cursor-pointer hover:border-gold/30">
                  <CardContent>
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-lg font-serif-tc font-bold text-ivory mb-1">
                      每日運勢
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4">
                      訂閱每日運勢推送，掌握每日最佳行動時機
                    </p>
                    <Button variant="outline" size="sm">
                      查看詳情
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SEO 底部文章預覽 ========== */}
      <section className="py-16 px-4">
        <div className="container-brand">
          <h2 className="text-2xl font-serif-tc font-bold text-ivory mb-8 text-center">
            命理知識
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="default" className="p-5 h-full group cursor-pointer hover:border-gold/20">
                  <Badge variant="secondary" size="sm" className="mb-3">
                    {article.categoryLabel}
                  </Badge>
                  <h3 className="text-base font-serif-tc font-semibold text-ivory mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                    {article.excerpt.slice(0, 60)}...
                  </p>
                  <p className="text-xs text-neutral-600">
                    {article.author} · {article.readTime} 分鐘閱讀
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
