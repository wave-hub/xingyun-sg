"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Compass,
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  MessageCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type BookingStep = "select" | "form" | "confirm";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  birthTime: string;
  gender: "" | "male" | "female";
  note: string;
}

const services = [
  {
    id: "ziwei",
    icon: <Star className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
    duration: "60-90 分鐘",
    price: "S$128 起",
  },
  {
    id: "bazi",
    icon: <Compass className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    hoverBg: "hover:bg-amber-500/10",
    duration: "45-60 分鐘",
    price: "S$98 起",
  },
  {
    id: "daliuren",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-teal-400",
    bg: "bg-teal-5/10",
    border: "border-teal-500/30",
    hoverBg: "hover:bg-teal-500/10",
    duration: "45-60 分鐘",
    price: "S$108 起",
  },
  {
    id: "combined",
    icon: <Sparkles className="w-6 h-6" />,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/30",
    hoverBg: "hover:bg-gold/10",
    duration: "120-150 分鐘",
    price: "S$268 起",
  },
  {
    id: "followup",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    hoverBg: "hover:bg-emerald-500/10",
    duration: "30 分鐘",
    price: "S$58 起",
  },
];

export default function BookingPage() {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const [step, setStep] = useState<BookingStep>("select");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    gender: "",
    note: "",
  });

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "form") {
      setStep("select");
      setSelectedService(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirm");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yin-black-dark via-yin-black to-yin-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />

        <div className="relative z-10 container-brand max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif-tc font-bold text-ivory mb-4 gradient-text-gold">
              {t("title")}
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="px-4 pb-8">
        <div className="container-brand max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {(["select", "form", "confirm"] as BookingStep[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step === s
                      ? "bg-gold text-yin-black"
                      : i <
                        ["select", "form", "confirm"].indexOf(step)
                      ? "bg-gold/20 text-gold"
                      : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {i < ["select", "form", "confirm"].indexOf(step) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 ${
                      i < ["select", "form", "confirm"].indexOf(step)
                        ? "bg-gold"
                        : "bg-neutral-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="pb-24 px-4">
        <div className="container-brand max-w-3xl mx-auto">

          {/* Step 1: Select Service */}
          {step === "select" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card
                      variant="glass"
                      className={`p-5 cursor-pointer transition-all duration-200 ${service.hoverBg} ${
                        selectedService === service.id
                          ? `${service.border} border`
                          : "border-transparent"
                      }`}
                      onClick={() => handleSelectService(service.id)}
                    >
                      <CardContent className="!p-0">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center shrink-0`}
                          >
                            {service.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h3 className="font-serif-tc font-semibold text-ivory">
                                {t(`services.${service.id}` as any)}
                              </h3>
                              <span className="text-gold font-bold text-lg shrink-0">
                                {service.price}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-400 mb-3">
                              {t(`services.${service.id}Desc` as any)}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {service.duration}
                              </span>
                              <Badge variant="secondary" size="sm">
                                線上 / 線下
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-neutral-600 shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <p className="text-sm text-neutral-500">{t("paymentNote")}</p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="glass" className="p-6 md:p-8">
                <CardContent className="!p-0 space-y-6">
                  {/* Selected Service Summary */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        services.find((s) => s.id === selectedService)?.bg
                      } ${
                        services.find((s) => s.id === selectedService)?.color
                      } flex items-center justify-center`}
                    >
                      {services.find((s) => s.id === selectedService)?.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif-tc font-semibold text-ivory text-sm">
                        {selectedService &&
                          t(`services.${selectedService}` as any)}
                      </p>
                      <p className="text-xs text-gold">
                        {services.find((s) => s.id === selectedService)?.price}
                      </p>
                    </div>
                    <button
                      onClick={handleBack}
                      className="text-xs text-neutral-500 hover:text-gold underline"
                    >
                      {tCommon("back")}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t("form.name")}
                        placeholder={t("form.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Input
                        label={t("form.email")}
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t("form.phone")}
                        type="tel"
                        placeholder={t("form.phonePlaceholder")}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                          {t("form.gender")}
                        </label>
                        <div className="flex gap-3">
                          {([
                            { value: "male", label: t("form.male") },
                            { value: "female", label: t("form.female") },
                          ] as const).map((g) => (
                            <button
                              key={g.value}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  gender: g.value,
                                })
                              }
                              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                formData.gender === g.value
                                  ? "bg-gold/20 text-gold border border-gold/40"
                                  : "bg-neutral-800/50 text-neutral-400 border border-neutral-700 hover:border-neutral-600"
                              }`}
                            >
                              {g.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t("form.birthDate")}
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            birthDate: e.target.value,
                          })
                        }
                        required
                      />
                      <Input
                        label={t("form.birthTime")}
                        type="time"
                        value={formData.birthTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            birthTime: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                        {t("form.note")}
                      </label>
                      <textarea
                        placeholder={t("form.notePlaceholder")}
                        value={formData.note}
                        onChange={(e) =>
                          setFormData({ ...formData, note: e.target.value })
                        }
                        rows={3}
                        className="w-full rounded-lg bg-yin-black-light/50 border border-neutral-700 text-ivory placeholder:text-neutral-600 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none resize-none transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {tCommon("confirm")} ·{" "}
                      {services.find((s) => s.id === selectedService)?.price}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === "confirm" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="max-w-md mx-auto space-y-8">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping" />
                  <div className="relative w-full h-full bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
                    <Calendar className="w-12 h-12 text-yin-black" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="font-serif-tc text-2xl font-bold text-ivory">
                    預訂請求已提交！
                  </h2>
                  <p className="text-neutral-400">
                    我們將在 <span className="text-gold">24 小時內</span>{" "}
                    通過電子郵件確認您的預訂詳情。
                  </p>
                </div>

                <Card variant="glass" className="p-6 text-left">
                  <CardContent className="!p-0 space-y-3">
                    <h3 className="font-serif-tc font-semibold text-ivory mb-3">
                      預訂摘要
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">服務</span>
                        <span className="text-ivory">
                          {selectedService &&
                            t(`services.${selectedService}` as any)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">姓名</span>
                        <span className="text-ivory">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">郵箱</span>
                        <span className="text-ivory">{formData.email}</span>
                      </div>
                      {formData.phone && (
                        <div className="flex justify-between">
                          <span className="text-neutral-400">電話</span>
                          <span className="text-ivory">{formData.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-neutral-400">出生時間</span>
                        <span className="text-ivory">
                          {formData.birthDate} {formData.birthTime}
                        </span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-neutral-700">
                        <div className="flex justify-between">
                          <span className="text-gold font-medium">費用</span>
                          <span className="text-gold font-bold text-lg">
                            {services.find((s) => s.id === selectedService)
                              ?.price || ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cinnabar-red text-ivory font-medium hover:bg-cinnabar-red-light transition-colors"
                  >
                    前往支付
                  </Link>
                  <Link
                    href="/"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold/30 text-gold font-medium hover:bg-gold/10 transition-colors"
                  >
                    返回首頁
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
