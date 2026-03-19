"use client";

import { useT } from "@/i18n/useT";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * HeroSection — full-width hero with decorative quote.
 * Demonstrates: font-heading, font-decorative, Button (default + outline), Badge,
 * all wired to the Sand theme via CSS variables.
 */
export default function HeroSection() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-background py-20 px-6">
      {/* Decorative background blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-[320px] rounded-full bg-accent/10 blur-2xl"
      />

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        {/* Eyebrow badge */}
        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
          ✦ Professional Care
        </Badge>

        {/* Main heading — Roboto Slab */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          {t.welcome}
        </h1>

        {/* Decorative tagline — Playfair Display italic */}
        <p className="font-decorative text-xl sm:text-2xl italic text-muted-foreground">
          &ldquo;{t.tagline}&rdquo;
        </p>

        {/* Body description — Inter */}
        <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button size="lg" className="font-semibold px-8">
            {t.bookSession}
          </Button>
          <Button size="lg" variant="outline" className="font-semibold px-8">
            {t.learnMore}
          </Button>
        </div>
      </div>
    </section>
  );
}
