import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, skip static/SEO files
  matcher: ["/", "/(zh|en)/:path*", "/((?!robots\\.txt|sitemap\\.xml|favicon\\.ico|_next|api).*)"],
};
