/**
 * SEO Structured Data Provider
 * Renders JSON-LD schema in document head
 */

"use client";

import {
  generateLocalBusinessSchema,
  generateProfessionalServiceSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from "@/lib/seo";

export function SEOProvider() {
  const schemas = [
    generateLocalBusinessSchema(),
    generateProfessionalServiceSchema(),
    generateOrganizationSchema(),
    generateFAQSchema(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
