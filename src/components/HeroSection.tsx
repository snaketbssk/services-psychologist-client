import AnimateIn from "@/components/AnimateIn";
import BookConsultationDialog from "@/components/BookConsultationDialog";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { STATS } from "@/lib/constants";

export default async function HeroSection() {
  const t = await getTranslations("HERO");

  return (
    <section className="bg-background py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text content */}
        <AnimateIn variant="fade-right" duration={700}>
          <div className="space-y-6">
            <p className="text-subject text-sm font-medium tracking-widest uppercase mb-4">
              {t("EYEBROW")}
            </p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              {t("HEADING")}
            </h1>
            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              {t("DESCRIPTION")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <BookConsultationDialog
                trigger={
                  <Button size="lg" className="font-semibold px-8">
                    {t("CTA_PRIMARY")}
                  </Button>
                }
              />
            </div>
          </div>
        </AnimateIn>

        {/* RIGHT: Placeholder image with floating stat badges */}
        <AnimateIn variant="fade-left" duration={700} delay={150}>
          <div className="relative mt-12 lg:mt-0">
            <div className="bg-muted rounded-3xl aspect-[4/3] flex items-center justify-center text-muted-foreground text-4xl select-none">
              📷 Hero Image
            </div>

            <div className="absolute -bottom-4 left-6 bg-background rounded-xl shadow-sm px-4 py-2 flex flex-col items-center">
              <span className="font-heading font-bold text-subject text-lg leading-tight">
                {STATS[0].value}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("YEARS")}
              </span>
            </div>

            <div className="absolute -top-4 right-6 bg-background rounded-xl shadow-sm px-4 py-2 flex flex-col items-center">
              <span className="font-heading font-bold text-subject text-lg leading-tight">
                {STATS[1].value}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("CLIENTS")}
              </span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
