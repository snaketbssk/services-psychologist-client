import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import AnimateIn from "@/components/AnimateIn";

export default async function TestimonialsSection() {
  const t = await getTranslations("TESTIMONIALS_SECTION");

  const testimonials = [
    { quoteKey: "T1_QUOTE", nameKey: "T1_NAME", roleKey: "T1_ROLE", initials: "S.M." },
    { quoteKey: "T2_QUOTE", nameKey: "T2_NAME", roleKey: "T2_ROLE", initials: "J.R." },
    { quoteKey: "T3_QUOTE", nameKey: "T3_NAME", roleKey: "T3_ROLE", initials: "A.K." },
  ] as const;

  return (
    <section className="bg-muted/30 py-16 px-6">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((item, i) => (
            <AnimateIn key={item.nameKey} variant="fade-up" delay={i * 100}>
            <Card className="h-full">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="text-subject text-lg">★★★★★</div>
                <p className="font-decorative italic text-foreground/90 leading-relaxed text-sm flex-1">
                  &ldquo;{t(item.quoteKey)}&rdquo;
                </p>
                <div className="border-t border-border" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-subject/20 flex items-center justify-center text-subject font-bold text-sm shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground text-sm">
                      {t(item.nameKey)}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t(item.roleKey)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
