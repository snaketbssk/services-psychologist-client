"use client";

import { useT } from "@/i18n/useT";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";

export default function HomePage() {
  const t = useT();

  const services = [
    {
      icon: "🧠",
      title: "Individual Therapy",
      description: t.description,
      badge: "Popular",
      ctaLabel: t.learnMore,
    },
    {
      icon: "👫",
      title: "Couples Counseling",
      description: t.description,
      ctaLabel: t.learnMore,
    },
    {
      icon: "🌿",
      title: "Mindfulness & Stress",
      description: t.description,
      badge: "New",
      ctaLabel: t.learnMore,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />

        <Separator className="max-w-6xl mx-auto" />

        {/* Services grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-2">
            {t.getStarted}
          </h2>
          <p className="text-muted-foreground mb-10">{t.description}</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard key={svc.title} {...svc} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-heading font-medium text-foreground">
            Healingy
          </span>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">{t.home}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.about}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.contact}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
