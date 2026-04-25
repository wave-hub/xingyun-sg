"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, User, Clock, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface BirthInfo {
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // 時辰 key
  preciseTime?: string; // HH:mm 精確時間
  gender: "male" | "female";
  calendarType: "solar" | "lunar";
  birthPlace: string;
}

interface BirthFormProps {
  onSubmit: (info: BirthInfo) => void;
  submitLabel?: string;
  isLoading?: boolean;
  className?: string;
  initialData?: Partial<BirthInfo>;
}

const timeZodiac = [
  { key: "zi", label: "子時", time: "23:00 - 01:00", en: "Zi (11PM-1AM)" },
  { key: "chou", label: "丑時", time: "01:00 - 03:00", en: "Chou (1AM-3AM)" },
  { key: "yin", label: "寅時", time: "03:00 - 05:00", en: "Yin (3AM-5AM)" },
  { key: "mao", label: "卯時", time: "05:00 - 07:00", en: "Mao (5AM-7AM)" },
  { key: "chen", label: "辰時", time: "07:00 - 09:00", en: "Chen (7AM-9AM)" },
  { key: "si", label: "巳時", time: "09:00 - 11:00", en: "Si (9AM-11AM)" },
  { key: "wu", label: "午時", time: "11:00 - 13:00", en: "Wu (11AM-1PM)" },
  { key: "wei", label: "未時", time: "13:00 - 15:00", en: "Wei (1PM-3PM)" },
  { key: "shen", label: "申時", time: "15:00 - 17:00", en: "Shen (3PM-5PM)" },
  { key: "you", label: "酉時", time: "17:00 - 19:00", en: "You (5PM-7PM)" },
  { key: "xu", label: "戌時", time: "19:00 - 21:00", en: "Xu (7PM-9PM)" },
  { key: "hai", label: "亥時", time: "21:00 - 23:00", en: "Hai (9PM-11PM)" },
];

const cities = [
  { label: "新加坡", value: "singapore" },
  { label: "吉隆坡", value: "kuala-lumpur" },
  { label: "檳城", value: "penang" },
  { label: "新山", value: "johor-bahru" },
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "廣州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "台北", value: "taipei" },
  { label: "香港", value: "hong-kong" },
  { label: "其他", value: "other" },
];

export default function BirthForm({
  onSubmit,
  submitLabel = "開始排盤",
  isLoading = false,
  className,
  initialData,
}: BirthFormProps) {
  const [formData, setFormData] = useState<BirthInfo>({
    birthDate: "",
    birthTime: "",
    gender: "male",
    calendarType: "solar",
    birthPlace: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BirthInfo, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BirthInfo, string>> = {};
    if (!formData.birthDate) newErrors.birthDate = "請選擇出生日期";
    if (!formData.birthTime) newErrors.birthTime = "請選擇出生時辰";
    if (!formData.birthPlace) newErrors.birthPlace = "請選擇出生地點";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof BirthInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-lg mx-auto space-y-6", className)}>
      {/* 日曆類型切換 */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn(
          "text-sm flex items-center gap-1.5 transition-colors",
          formData.calendarType === "solar" ? "text-gold" : "text-neutral-400"
        )}>
          <Sun className="w-4 h-4" />
          陽曆
        </span>
        <button
          type="button"
          onClick={() => updateField("calendarType", formData.calendarType === "solar" ? "lunar" : "solar")}
          className="relative w-14 h-7 rounded-full bg-neutral-700 transition-colors duration-300"
          aria-label="切換日曆類型"
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full bg-gold shadow-md"
            animate={{ left: formData.calendarType === "solar" ? "2px" : "calc(100% - 26px)" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={cn(
          "text-sm flex items-center gap-1.5 transition-colors",
          formData.calendarType === "lunar" ? "text-gold" : "text-neutral-400"
        )}>
          <Moon className="w-4 h-4" />
          農曆
        </span>
      </div>

      {/* 出生日期 */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-ivory">
          <Calendar className="w-4 h-4 text-gold" />
          出生日期
        </label>
        <input
          type="date"
          value={formData.birthDate}
          onChange={(e) => updateField("birthDate", e.target.value)}
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-yin-black-light border transition-all duration-300",
            "text-ivory placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold/50",
            errors.birthDate ? "border-cinnabar-red" : "border-neutral-700 focus:border-gold"
          )}
          max={new Date().toISOString().split("T")[0]}
        />
        <AnimatePresence>
          {errors.birthDate && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-cinnabar-red text-xs"
            >
              {errors.birthDate}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 出生時辰 */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-ivory">
          <Clock className="w-4 h-4 text-gold" />
          出生時辰
        </label>
        <div className="relative">
          <select
            value={formData.birthTime}
            onChange={(e) => updateField("birthTime", e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-yin-black-light border appearance-none transition-all duration-300",
              "text-ivory focus:outline-none focus:ring-2 focus:ring-gold/50",
              errors.birthTime ? "border-cinnabar-red" : "border-neutral-700 focus:border-gold"
            )}
          >
            <option value="" className="bg-yin-black">請選擇時辰</option>
            {timeZodiac.map((t) => (
              <option key={t.key} value={t.key} className="bg-yin-black">
                {t.label}（{t.time}）
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
        <AnimatePresence>
          {errors.birthTime && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-cinnabar-red text-xs"
            >
              {errors.birthTime}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 性別選擇 */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-ivory">
          <User className="w-4 h-4 text-gold" />
          性別
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "male" as const, label: "男", labelEn: "Male" },
            { value: "female" as const, label: "女", labelEn: "Female" },
          ].map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => updateField("gender", g.value)}
              className={cn(
                "py-3 rounded-lg border transition-all duration-300 text-center",
                formData.gender === g.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-neutral-700 bg-yin-black-light text-neutral-400 hover:border-neutral-600"
              )}
            >
              <span className="text-lg font-serif-tc">{g.label}</span>
              <span className="text-xs ml-1 text-neutral-500">{g.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 出生地點 */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-ivory">
          <MapPin className="w-4 h-4 text-gold" />
          出生地點
        </label>
        <div className="relative">
          <select
            value={formData.birthPlace}
            onChange={(e) => updateField("birthPlace", e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-yin-black-light border appearance-none transition-all duration-300",
              "text-ivory focus:outline-none focus:ring-2 focus:ring-gold/50",
              errors.birthPlace ? "border-cinnabar-red" : "border-neutral-700 focus:border-gold"
            )}
          >
            <option value="" className="bg-yin-black">請選擇出生城市</option>
            {cities.map((c) => (
              <option key={c.value} value={c.value} className="bg-yin-black">
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
        <AnimatePresence>
          {errors.birthPlace && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-cinnabar-red text-xs"
            >
              {errors.birthPlace}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 提交按鈕 */}
      <Button
        type="submit"
        size="lg"
        className="w-full mt-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            排盤中...
          </span>
        ) : (
          submitLabel
        )}
      </Button>

      {/* 道教風格裝飾 */}
      <div className="taoist-divider my-4">
        <span className="taoist-divider-symbol">☯</span>
      </div>
      <p className="text-center text-xs text-neutral-500">
        星運堂承諾：您的個人資訊僅用於命理排盤，絕不外洩
      </p>
    </form>
  );
}
