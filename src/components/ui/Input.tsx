"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-yin-black/50 px-4 py-2 text-sm text-ivory placeholder:text-neutral-500 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-cinnabar-red focus:ring-cinnabar-red/50 focus:border-cinnabar-red"
              : "border-neutral-700 hover:border-neutral-600",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-cinnabar-red" : "text-neutral-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
