import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notoSerifTC, notoSansTC, cormorantGaramond, inter } from "@/lib/fonts";
import { Navbar } from "@/components/layout";
import { SEOProvider } from "@/components/SEOProvider";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "星運堂 XingYun Tang | 紫微斗數 · 八字 · 大六壬",
    template: "%s | 星運堂 XingYun Tang",
  },
  description:
    "三術合一命理文化平台，提供紫微斗數、八字命理、大六壬三大術數預測服務。Singapore's premier destination for Zi Wei Dou Shu, Ba Zi, and Da Liu Ren consultations.",
  keywords: [
    "紫微斗數",
    "八字",
    "大六壬",
    "命理預測",
    "新加坡算命",
    "Zi Wei Dou Shu",
    "Ba Zi",
    "Da Liu Ren",
    "Fortune Telling Singapore",
  ],
  authors: [{ name: "XingYun Tang" }],
  creator: "XingYun Tang",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "en_US",
    siteName: "星運堂 XingYun Tang",
    title: "星運堂 XingYun Tang | 三術合一 · 指點迷津",
    description:
      "三術合一命理文化平台，提供紫微斗數、八字命理、大六壬三大術數預測服務。Ancient Wisdom, Illuminated.",
  },
  twitter: {
    card: "summary_large_image",
    title: "星運堂 XingYun Tang",
    description:
      "三術合一命理文化平台，提供紫微斗數、八字命理、大六壬三大術數預測服務。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${notoSerifTC.variable} ${notoSansTC.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-yin-black text-ivory antialiased">
        <NextIntlClientProvider messages={messages}>
          <SEOProvider />
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          {/* Footer will be rendered per-page or in layout as needed */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
