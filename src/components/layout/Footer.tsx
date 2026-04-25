"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";

// Social media icons
const SocialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

// Payment method icons
const PaymentIcons = {
  visa: (
    <svg className="h-6" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text x="8" y="22" fontSize="14" fontWeight="bold" fill="white">VISA</text>
    </svg>
  ),
  mastercard: (
    <svg className="h-6" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#f5f5f5" />
      <circle cx="18" cy="16" r="10" fill="#EB001B" />
      <circle cx="30" cy="16" r="10" fill="#F79E1B" />
      <path d="M24 8.5a10 10 0 0 0 0 15" fill="#FF5F00" />
    </svg>
  ),
  paynow: (
    <svg className="h-6" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#00B900" />
      <text x="10" y="21" fontSize="10" fontWeight="bold" fill="white">PayNow</text>
    </svg>
  ),
};

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");

  const footerLinks = {
    services: [
      { href: "/destiny/ziwei", label: tNav("ziwei") },
      { href: "/destiny/bazi", label: tNav("bazi") },
      { href: "/destiny/liuren", label: tNav("daliuren") },
      { href: "/destiny", label: tNav("combined") },
    ],
    shop: [
      { href: "/shop", label: t("talismans") },
      { href: "/shop/crystals", label: t("crystals") },
      { href: "/shop/candles", label: t("candles") },
    ],
    company: [
      { href: "/about", label: tNav("about") },
      { href: "/community", label: tNav("community") },
      { href: "/contact", label: t("contact") },
    ],
    legal: [
      { href: "/privacy", label: t("privacy") },
      { href: "/terms", label: t("terms") },
      { href: "/refund", label: t("refund") },
    ],
  };

  const destinyMethods = [
    {
      name: t("ziweiTitle"),
      desc: t("ziweiDesc"),
    },
    {
      name: t("baziTitle"),
      desc: t("baziDesc"),
    },
    {
      name: t("daliurenTitle"),
      desc: t("daliurenDesc"),
    },
  ];

  return (
    <footer className="bg-yin-black-dark border-t border-neutral-800/50">
      <div className="container-brand py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 120 40"
                  className="h-12 w-auto"
                  fill="none"
                >
                  <path
                    d="M12 8L14.5 15.5L22 16.5L16 22L18 30L12 26L6 30L8 22L2 16.5L9.5 15.5L12 8Z"
                    fill="currentColor"
                    className="text-gold"
                  />
                  <text
                    x="28"
                    y="26"
                    fontFamily="'Noto Serif TC', serif"
                    fontSize="18"
                    fontWeight="600"
                    fill="currentColor"
                    className="text-ivory"
                  >
                    星運堂
                  </text>
                </svg>
              </div>
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {t("brandDesc")}
            </p>

            <p className="font-serif-tc text-lg text-gold mb-2">
              三術合一 · 指點迷津
            </p>
            <p className="text-xs text-neutral-500 font-english italic">
              Ancient Wisdom, Illuminated
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: SocialIcons.facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: SocialIcons.instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: SocialIcons.whatsapp, href: "https://wa.me/65", label: "WhatsApp" },
                { icon: SocialIcons.youtube, href: "https://youtube.com", label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg border border-neutral-700/50",
                    "text-neutral-400 hover:text-gold hover:border-gold/30",
                    "transition-colors duration-200"
                  )}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-serif-tc text-lg font-semibold text-ivory mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-serif-tc text-lg font-semibold text-ivory mb-4">
              {t("shop")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-serif-tc text-lg font-semibold text-ivory mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Three Arts Cards */}
        <Divider variant="ornate" symbol="✦" className="my-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {destinyMethods.map((method) => (
            <Card key={method.name} variant="glass">
              <CardContent className="pt-6">
                <h4 className="font-serif-tc text-base font-semibold text-gold mb-2">
                  {method.name}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {method.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-yin-black-light/50 rounded-xl p-6 mb-12 border border-neutral-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="text-neutral-500 block mb-1">{t("address")}</span>
              <span className="text-neutral-300">
                Blk 123 Orchard Road, #12-34<br />
                Singapore 238823
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">{t("phone")}</span>
              <span className="text-neutral-300">+65 9123 4567</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">{t("email")}</span>
              <span className="text-neutral-300">contact@xingyuntang.sg</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">{t("hours")}</span>
              <span className="text-neutral-300">
                Mon-Sat: 10:00 - 19:00<br />
                Sun: 12:00 - 17:00
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-xs text-neutral-500">{t("acceptedPayments")}</p>
          <div className="flex gap-4">
            {Object.values(PaymentIcons).map((icon, idx) => (
              <div key={idx} className="opacity-70 hover:opacity-100 transition-opacity">
                {icon}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} 星運堂 XingYun Tang. {t("rights")}</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
