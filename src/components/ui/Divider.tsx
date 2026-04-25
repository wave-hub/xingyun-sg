"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  variant?: "default" | "ornate" | "dotted";
  symbol?: "☰" | "✦" | "❋" | "八卦" | "☯" | "◈";
  className?: string;
}

export function Divider({ variant = "default", symbol, className }: DividerProps) {
  if (variant === "ornate") {
    return (
      <div className={cn("taoist-divider", className)}>
        {symbol && <span className="taoist-divider-symbol">{symbol}</span>}
      </div>
    );
  }

  if (variant === "dotted") {
    return (
      <hr
        className={cn(
          "border-none h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-6",
          className
        )}
      />
    );
  }

  return (
    <hr
      className={cn(
        "border-none h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent my-8",
        className
      )}
    />
  );
}
