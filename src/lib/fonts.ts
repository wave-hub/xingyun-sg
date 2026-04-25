import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";

// Noto Serif TC - for headings (Traditional Chinese serif)
export const notoSerifTC = localFont({
  src: [
    {
      path: "../node_modules/@next/font/google/target/stylesheet.css",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});

// Simplified: Use Google Fonts via CSS @import
// In production, use next/font/google with proper font files
export const notoSansTC = localFont({
  src: [
    {
      path: "../node_modules/@next/font/google/target/stylesheet.css",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

// Cormorant Garamond - elegant English serif
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

// Inter - modern English sans-serif
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
