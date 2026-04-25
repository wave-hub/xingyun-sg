"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const destinyServices = [
    { href: "/destiny/ziwei", label: t("ziwei") },
    { href: "/destiny/bazi", label: t("bazi") },
    { href: "/destiny/liuren", label: t("daliuren") },
    { href: "/destiny", label: t("combined") },
  ];

  const navItems = [
    { href: "/", label: t("home") },
    {
      key: "destiny",
      label: t("destiny"),
      children: destinyServices,
    },
    { href: "/shop", label: t("shop") },
    { href: "/community", label: t("community") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-yin-black/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="container-brand">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {/* SVG Logo */}
            <svg
              viewBox="0 0 120 40"
              className="h-10 w-auto md:h-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Star symbol */}
              <path
                d="M12 8L14.5 15.5L22 16.5L16 22L18 30L12 26L6 30L8 22L2 16.5L9.5 15.5L12 8Z"
                fill="currentColor"
                className="text-gold group-hover:text-gold-light transition-colors"
              />
              {/* Chinese text */}
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
              {/* English subtitle */}
              <text
                x="90"
                y="26"
                fontFamily="'Cormorant Garamond', serif"
                fontSize="10"
                fontWeight="400"
                fill="currentColor"
                className="text-gold/80"
              >
                XingYun Tang
              </text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.key!)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium",
                      "text-neutral-300 hover:text-gold",
                      "transition-colors duration-200"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === item.key && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.key && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <div className="bg-yin-black-light border border-gold/20 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-3 text-sm",
                              "text-neutral-300 hover:text-ivory hover:bg-neutral-800/50",
                              "transition-colors duration-150",
                              "border-b border-neutral-800/50 last:border-b-0"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "text-neutral-300 hover:text-gold",
                    "transition-colors duration-200"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* CTA Button */}
            <Link
              href="/booking"
              className={cn(
                "hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg",
                "bg-cinnabar-red text-ivory text-sm font-medium",
                "hover:bg-cinnabar-red-light active:bg-cinnabar-red-dark",
                "shadow-md hover:shadow-lg shadow-cinnabar-red/20",
                "transition-all duration-300"
              )}
            >
              {t("cta")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-ivory hover:bg-neutral-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800/50 py-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.key}>
                    <div className="px-4 py-2 text-xs font-semibold text-gold/60 uppercase tracking-wider">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-6 py-3 text-sm",
                          "text-neutral-300 hover:text-ivory",
                          "transition-colors"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={cn(
                      "block px-4 py-3 text-sm",
                      "text-neutral-300 hover:text-ivory",
                      "transition-colors"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile CTA */}
              <div className="pt-4 px-4 border-t border-neutral-800/50 mt-4">
                <Link
                  href="/booking"
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-3 rounded-lg",
                    "bg-cinnabar-red text-ivory text-sm font-medium",
                    "hover:bg-cinnabar-red-light",
                    "transition-colors"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("cta")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
