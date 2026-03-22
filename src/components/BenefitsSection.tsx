import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";

export default async function BenefitsSection() {
  const t = await getTranslations("BENEFITS_SECTION");

  const benefits = [
    { icon: "🏆", titleKey: "PSYCHOLOGISTS_TITLE", descKey: "PSYCHOLOGISTS_DESC" },
    { icon: "🎯", titleKey: "METHODS_TITLE",       descKey: "METHODS_DESC"       },
    { icon: "🤝", titleKey: "SUPPORT_TITLE",       descKey: "SUPPORT_DESC"       },
  ] as const;

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn variant="fade-up">
        <div className="text-center mb-12">
          <p className="text-subject text-sm font-medium tracking-widest uppercase mb-3">
            {t("EYEBROW")}
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {t("HEADING")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
            {t("DESCRIPTION")}
          </p>
        </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {benefits.map((benefit, i) => (
            <AnimateIn key={benefit.titleKey} variant="fade-up" delay={i * 100}>
            <div className="px-8 py-8 sm:py-0 text-center">
              <div className="w-14 h-14 bg-subject/10 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(benefit.descKey)}
              </p>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
