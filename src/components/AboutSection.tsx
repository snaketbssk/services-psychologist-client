"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import BookConsultationModal from "@/components/BookConsultationModal";
import AnimateIn from "@/components/AnimateIn";

export default function AboutSection() {
  const t = useTranslations("ABOUT_SECTION");

  const checklistKeys = ["CHECK_1", "CHECK_2", "CHECK_3", "CHECK_4"] as const;

  return (
    <section id="about" className="bg-muted/30 py-16 px-6">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Image placeholder with satisfaction badge */}
        <AnimateIn variant="fade-right" duration={700}>
        <div className="relative mb-12 lg:mb-0">
          <div className="bg-muted rounded-3xl min-h-[420px] flex items-center justify-center text-muted-foreground text-4xl select-none">
            📷 About Image
          </div>
          <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-md">
            <span className="font-heading font-bold text-3xl block leading-tight">98%</span>
            <span className="text-sm text-primary-foreground/90">{t("SATISFACTION_LABEL")}</span>
          </div>
        </div>
        </AnimateIn>

        {/* RIGHT: Text content */}
        <AnimateIn variant="fade-left" duration={700} delay={150}>
        <div className="space-y-6">
          <p className="text-primary text-sm font-medium tracking-widest uppercase">
            {t("EYEBROW")}
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground leading-snug">
            {t("HEADING")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t("PARA1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("PARA2")}</p>
          <ul className="space-y-3">
            {checklistKeys.map((key) => (
              <li key={key} className="flex items-center gap-3">
                <span className="text-accent font-bold text-lg leading-none">✓</span>
                <span className="text-foreground text-sm">{t(key)}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <BookConsultationModal
              trigger={
                <Button size="lg" className="font-semibold px-8">
                  {t("CTA")}
                </Button>
              }
            />
          </div>
        </div>
        </AnimateIn>
      </div>
    </section>
  );
}
