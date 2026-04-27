/**
 * Generate static sitemap.xml for deployment
 * Run as postbuild step
 */
import { writeFileSync } from "fs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xingyun-sg.vercel.app";

const locales = ["zh", "en"];

const pages = [
  { path: "", priority: "1.0", changeFreq: "weekly" },
  { path: "/ziwei", priority: "0.9", changeFreq: "monthly" },
  { path: "/bazi", priority: "0.9", changeFreq: "monthly" },
  { path: "/daliuren", priority: "0.9", changeFreq: "monthly" },
  { path: "/combined", priority: "0.85", changeFreq: "monthly" },
  { path: "/booking", priority: "0.95", changeFreq: "weekly" },
  { path: "/shop", priority: "0.8", changeFreq: "weekly" },
  { path: "/about", priority: "0.7", changeFreq: "monthly" },
  { path: "/contact", priority: "0.7", changeFreq: "monthly" },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const page of pages) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${page.path}`;
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(url)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changeFreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      // hreflang alternates
      for (const altLocale of locales) {
        const altUrl = `${BASE_URL}/${altLocale}${page.path}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${escapeXml(altUrl)}" />\n`;
      }
      // x-default to zh
      const defaultUrl = `${BASE_URL}/zh${page.path}`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultUrl)}" />\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;
  return xml;
}

const outputPath = process.argv[2] || "./public/sitemap.xml";
writeFileSync(outputPath, generateSitemap(), "utf-8");
console.log(`✅ Sitemap generated at ${outputPath} (${pages.length * locales.length} URLs)`);
