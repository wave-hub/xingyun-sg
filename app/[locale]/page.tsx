"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Star, Compass, BookOpen, ArrowRight } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen bg-yin-black">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bagua-pattern opacity-20" />

        {/* Decorative glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cinnabar-red/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold/30 bg-gold/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-english text-gold tracking-wide">
              Singapore&apos;s Premier Metaphysics Platform
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-tc text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-tight mb-6"
          >
            三術合一 · 指點迷津
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="font-english text-lg md:text-xl text-gold mb-4 font-light tracking-wide"
          >
            Ancient Wisdom, Illuminated by AI
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            紫微斗數 · 八字命理 · 大六壬
            <br />
            傳承千年智慧，為您揭示命運真相
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-cinnabar-red to-cinnabar-red-light text-ivory font-semibold text-base hover:shadow-xl hover:shadow-cinnabar-red/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("heroCta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/destiny"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-gold/40 text-gold font-medium text-base hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
            >
              {tCommon("learnMore")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-yin-black-light relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yin-black pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif-tc text-3xl md:text-4xl font-bold text-ivory mb-3">
              {t("featuresTitle")}
            </h2>
            <p className="text-neutral-500 font-english text-sm tracking-wide uppercase">
              Why Choose XingYun Tang
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <Star className="w-7 h-7" />,
                title: t("feature1Title"),
                desc: t("feature1Desc"),
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "hover:border-purple-500/30",
              },
              {
                icon: <Compass className="w-7 h-7" />,
                title: t("feature2Title"),
                desc: t("feature2Desc"),
                color: "text-gold",
                bg: "bg-gold/10",
                border: "hover:border-gold/30",
              },
              {
                icon: <BookOpen className="w-7 h-7" />,
                title: t("feature3Title"),
                desc: t("feature3Desc"),
                color: "text-teal-400",
                bg: "bg-teal-500/10",
                border: "hover:border-teal-500/30",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`group p-8 lg:p-10 rounded-2xl bg-yin-black/60 border border-neutral-800/50 ${feature.border} hover:bg-yin-black/80 transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-serif-tc text-xl font-semibold text-ivory mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destiny Methods Section */}
      <section className="py-24 px-4 bg-yin-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif-tc text-3xl md:text-4xl font-bold text-ivory mb-3">
              {t("destinyTitle")}
            </h2>
            <p className="text-gold font-english text-sm tracking-wide">
              {t("destinySubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                emoji: "🌟",
                title: "紫微斗數",
                titleEn: "Zi Wei Dou Shu",
                desc: "以星宿為核心的命理體系，透過命盤揭示人生各階段的命運走向，堪稱帝王之學。",
                href: "/destiny/ziwei",
                color: "from-purple-500/10 to-transparent",
                borderColor: "hover:border-purple-500/40",
                accentColor: "text-purple-400",
              },
              {
                emoji: "📊",
                title: "八字命理",
                titleEn: "Ba Zi (Four Pillars)",
                desc: "根據出生時間推算命格，精準分析事業、感情、財運等各方面的人生課題。",
                href: "/destiny/bazi",
                color: "from-amber-500/10 to-transparent",
                borderColor: "hover:border-amber-500/40",
                accentColor: "text-amber-400",
              },
              {
                emoji: "☯",
                title: "大六壬",
                titleEn: "Da Liu Ren",
                desc: "古老的占卜術數，以天地人三才之道，趨吉避凶，指點迷津，位列三式之首。",
                href: "/destiny/liuren",
                color: "from-teal-500/10 to-transparent",
                borderColor: "hover:border-teal-500/40",
                accentColor: "text-teal-400",
              },
            ].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={method.href}
                  className={`group block p-8 lg:p-10 rounded-2xl border border-gold/15 bg-gradient-to-b ${method.color} to-yin-black ${method.borderColor} hover:shadow-lg hover:shadow-gold/5 transition-all duration-300`}
                >
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {method.emoji}
                  </div>
                  <h3 className="font-serif-tc text-2xl font-semibold text-ivory mb-1 group-hover:text-gold transition-colors">
                    {method.title}
                  </h3>
                  <p className={`text-xs font-english mb-4 ${method.accentColor}`}>
                    {method.titleEn}
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {method.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-gold/70 text-sm group-hover:text-gold transition-colors">
                    <span>了解更多</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="py-24 px-4 bg-yin-black-light relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif-tc text-3xl md:text-4xl font-bold text-ivory mb-3">
              {t("shopTitle")}
            </h2>
            <p className="text-neutral-400 font-english text-sm tracking-wide">
              {t("shopSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href="/shop"
              className="group block max-w-2xl mx-auto p-10 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.03] to-yin-black hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 text-center"
            >
              <div className="text-6xl mb-6">🏮</div>
              <h3 className="font-serif-tc text-2xl font-semibold text-ivory mb-3 group-hover:text-gold transition-colors">
                探索靈器商城
              </h3>
              <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
                開運吉祥物、風水靈器、能量水晶——精選靈器，為您帶來好運與庇護。
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                瀏覽商城 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black via-yin-black-dark to-yin-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/[0.04] rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <div className="mb-8">
            <span className="text-5xl">☯</span>
          </div>
          <h2 className="font-serif-tc text-3xl md:text-4xl lg:text-5xl font-bold text-ivory mb-4 leading-tight">
            {t("ctaTitle")}
          </h2>
          <p className="text-neutral-400 mb-12 font-english text-base">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 px-12 py-4.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-yin-black font-bold text-base hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              開始命理諮詢
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4.5 rounded-xl border border-neutral-700 text-neutral-300 font-medium text-base hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              加入社群
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
