/**
 * Client-side layout wrapper
 * Contains client-only components like SEOProvider
 */

import { SEOProvider } from "@/components/SEOProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEOProvider />
      {children}
    </>
  );
}
