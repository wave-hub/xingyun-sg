/**
 * SEO Configuration for Singapore Market
 * 星運堂 XingYun Tang - Singapore Local SEO
 */

export const siteConfig = {
  name: "星運堂 XingYun Tang",
  description: {
    zh: "三術合一命理文化平台，提供紫微斗數、八字命理、大六壬三大術數預測服務。新加坡專業命理諮詢。",
    en: "Singapore's premier metaphysical platform offering Zi Wei Dou Shu, Ba Zi, and Da Liu Ren consultations. Ancient Wisdom, Illuminated.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://xingyun-sg.vercel.app",
  locale: "zh_SG",
  alternateLocale: "en_SG",
  address: {
    streetAddress: "Blk 123 Orchard Road, #12-34",
    addressLocality: "Singapore",
    postalCode: "238823",
    addressCountry: "SG",
  },
  geo: {
    latitude: "1.3048",
    longitude: "103.8318",
  },
  contact: {
    phone: "+65-9123-4567",
    email: "contact@xingyuntang.sg",
  },
  businessHours: {
    monday: "10:00-19:00",
    tuesday: "10:00-19:00",
    wednesday: "10:00-19:00",
    thursday: "10:00-19:00",
    friday: "10:00-19:00",
    saturday: "10:00-19:00",
    sunday: "12:00-17:00",
  },
  social: {
    facebook: "https://facebook.com/xingyuntangsg",
    instagram: "https://instagram.com/xingyuntangsg",
    whatsapp: "https://wa.me/6591234567",
    youtube: "https://youtube.com/@xingyuntang",
  },
  priceRange: "$$",
};

/**
 * Generate LocalBusiness Schema for Singapore
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description.zh,
    url: siteConfig.url,
    image: `${siteConfig.url}/icons/xingyun-logo.svg`,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icons/xingyun-logo.svg`,
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "17:00",
      },
    ],
    priceRange: siteConfig.priceRange,
    sameAs: Object.values(siteConfig.social),
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    serviceType: ["命理諮詢", "Fortune Telling", "紫微斗數", "八字命理", "大六壬"],
  };
}

/**
 * Generate ProfessionalService Schema
 */
export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description.zh,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    priceRange: siteConfig.priceRange,
    openingHours: "Mo-Sa 10:00-19:00, Su 12:00-17:00",
    areaServed: "Singapore",
    serviceType: [
      "Zi Wei Dou Shu (紫微斗數)",
      "Ba Zi Fortune Telling (八字命理)",
      "Da Liu Ren Divination (大六壬)",
      "命理諮詢",
      "Metaphysical Consultation",
    ],
  };
}

/**
 * Generate FAQ Schema for SEO
 */
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "新加坡哪有算命服務？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "星運堂 XingYun Tang 是新加坡專業命理文化平台，提供紫微斗數、八字命理、大六壬三大術數的命理諮詢服務。地址：烏節路，地鐵直達。",
        },
      },
      {
        "@type": "Question",
        name: "紫微斗數是什麼？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "紫微斗數是中國傳統命理學三大體系之一，以星宿為核心，透過命盤揭示人生各階段的命運走向，堪稱帝王之學。",
        },
      },
      {
        "@type": "Question",
        name: "可以網上排盤嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以的。星運堂提供線上排盤服務，您可以直接在我們的網站輸入出生年月日時，系统自動為您計算命盤，並安排專業命理師為您解讀。",
        },
      },
      {
        "@type": "Question",
        name: "收費標準是多少？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "服務收費根據項目和深度而定。單項命盤解讀從 S$88 起，三術合參從 S$188 起。具體請查看服務頁面或聯絡我們查詢。",
        },
      },
    ],
  };
}

/**
 * Generate Organization Schema with Hreflang support
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "XingYun Tang",
    description: siteConfig.description.zh,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icons/xingyun-logo.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      availableLanguage: ["Chinese", "English", "zh", "en"],
      areaServed: "SG",
    },
    sameAs: Object.values(siteConfig.social),
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Product Schema for Shop Items
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || `${siteConfig.url}/icons/xingyun-logo.svg`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "SGD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    category: product.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}

/**
 * Generate Service Schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price: number;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: "Singapore",
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "SGD",
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "命理服務",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
          },
          price: service.price,
          priceCurrency: "SGD",
        },
      ],
    },
  };
}
