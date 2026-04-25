import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_TC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-serif-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "星運堂 XingYun Tang | 紫微斗數 · 八字 · 大六壬",
  description:
    "三術合一命理文化平台。新加坡專業紫微斗數、八字命理、大六壬諮詢服務。",
  keywords: [
    "紫微斗數",
    "八字命理",
    "大六壬",
    "新加坡命理",
    "算命",
    "命盤排盤",
    "風水",
    "開運",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} font-sans antialiased bg-yin-black text-ivory min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
