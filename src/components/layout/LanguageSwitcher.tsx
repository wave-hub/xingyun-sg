"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "zh", label: "繁體中文", shortLabel: "中" },
    { code: "en", label: "English", shortLabel: "EN" },
  ] as const;

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleSwitch = (newLocale: "zh" | "en") => {
    // Replace the current locale in the pathname with the new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg",
          "text-sm font-medium text-neutral-300",
          "hover:text-gold hover:bg-neutral-800/50",
          "transition-colors duration-200"
        )}
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentLang.code === "zh" ? "中" : "EN"}</span>
        <svg
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-36 py-2 bg-yin-black-light border border-gold/20 rounded-lg shadow-xl z-50 animate-scale-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSwitch(lang.code)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm",
                  "flex items-center justify-between gap-2",
                  "hover:bg-neutral-800/50 transition-colors",
                  locale === lang.code
                    ? "text-gold font-medium"
                    : "text-neutral-300"
                )}
              >
                <span>{lang.shortLabel}</span>
                <span className="text-xs text-neutral-500">{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
