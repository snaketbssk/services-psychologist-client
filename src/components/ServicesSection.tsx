import { getTranslations } from "next-intl/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AnimateIn from "@/components/AnimateIn";

export default async function ServicesSection() {
  const t = await getTranslations("SERVICES_SECTION");

  const services = [
    { icon: "🧠", titleKey: "INDIVIDUAL_TITLE", descKey: "INDIVIDUAL_DESC" },
    { icon: "👨‍👩‍👧", titleKey: "FAMILY_TITLE",    descKey: "FAMILY_DESC"    },
    { icon: "💑", titleKey: "COUPLES_TITLE",  descKey: "COUPLES_DESC"  },
    { icon: "🤝", titleKey: "GROUP_TITLE",    descKey: "GROUP_DESC"    },
    { icon: "🌱", titleKey: "CHILD_TITLE",    descKey: "CHILD_DESC"    },
    { icon: "🕊️", titleKey: "TRAUMA_TITLE",  descKey: "TRAUMA_DESC"   },
  ];

  return (
    <section id="services" className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn variant="fade-up">
        <div className="text-center">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {services.map((service, i) => (
            <AnimateIn key={service.titleKey} variant="fade-up" delay={i * 80}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-subject/10 rounded-xl flex items-center justify-center text-2xl mb-3">
                  {service.icon}
                </div>
                <CardTitle className="text-base font-semibold">
                  {t(service.titleKey as Parameters<typeof t>[0])}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(service.descKey as Parameters<typeof t>[0])}
                </p>
              </CardContent>
              <CardFooter>
                <a href="#" className="text-subject text-sm font-medium hover:underline">
                  {t("READ_MORE")}
                </a>
              </CardFooter>
            </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
