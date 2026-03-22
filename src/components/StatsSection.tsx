import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";
import { STATS } from "@/lib/constants";

export default async function StatsSection() {
  const t = await getTranslations("STATS_SECTION");

  return (
    <section className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/20">
          {STATS.map((stat, i) => (
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
