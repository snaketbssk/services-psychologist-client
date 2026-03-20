"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/AnimateIn";

export default function StatsSection() {
  const t = useTranslations("STATS_SECTION");

  const stats = [
    { value: "20+", labelKey: "YEARS_EXP"     },
    { value: "2K+", labelKey: "HAPPY_CLIENTS" },
    { value: "46",  labelKey: "PROJECTS"      },
    { value: "15",  labelKey: "AWARDS"        },
  ] as const;

  return (
    <section className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/20">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.labelKey} variant="fade-up" delay={i * 100}>
            <div className="text-center px-8 py-8 sm:py-0">
              <div className="font-heading text-5xl font-bold leading-tight">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm mt-1">
                {t(stat.labelKey)}
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
