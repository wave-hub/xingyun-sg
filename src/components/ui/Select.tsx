"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-11 w-full appearance-none rounded-lg border bg-yin-black/50 px-4 py-2 pr-10 text-sm text-ivory transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-cinnabar-red focus:ring-cinnabar-red/50 focus:border-cinnabar-red"
              : "border-neutral-700 hover:border-neutral-600",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
