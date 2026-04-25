"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { PaymentMethod } from "@/lib/payment/types";
import {
  CreditCard,
  QrCode,
  Smartphone,
  Coins,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
  disabled?: boolean;
}

const methodConfig = [
  {
    id: "stripe" as PaymentMethod,
    translationKey: "stripe",
    descKey: "stripeDesc",
    icon: CreditCard,
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
  },
  {
    id: "paynow" as PaymentMethod,
    translationKey: "paynow",
    descKey: "paynowDesc",
    icon: QrCode,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
  },
  {
    id: "wechat_alipay" as PaymentMethod,
    translationKey: "wechat_alipay",
    descKey: "wechat_alipayDesc",
    icon: Smartphone,
    color: "from-green-500/20 to-lime-500/20",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30 hover:border-green-500/60",
  },
  {
    id: "crypto" as PaymentMethod,
    translationKey: "crypto",
    descKey: "cryptoDesc",
    icon: Coins,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30 hover:border-orange-500/60",
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
  disabled,
}: PaymentMethodSelectorProps) {
  const t = useTranslations("payment");

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-gold" />
        <span className="text-sm font-medium text-ivory">{t("selectMethod")}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methodConfig.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => !disabled && onMethodSelect(method.id)}
              disabled={disabled}
              className={cn(
                "relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300",
                method.borderColor,
                isSelected
                  ? `border-gold bg-gradient-to-br ${method.color} shadow-md shadow-gold/10`
                  : "bg-yin-black-light/30 border-neutral-700/50 hover:bg-yin-black-light/50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-gold" />
              )}

              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yin-black/50",
                  isSelected ? method.iconColor : "text-neutral-500"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={cn(
                    "font-medium text-sm leading-tight",
                    isSelected ? "text-ivory" : "text-neutral-300"
                  )}
                >
                  {t(`methods.${method.translationKey}`)}
                </p>
                <p className="mt-1 text-xs text-neutral-500 leading-tight">
                  {t(`methods.${method.descKey}`)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
