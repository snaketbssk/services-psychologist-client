"use client";

import { Button } from "@/components/ui/button";
import BookConsultationModal from "@/components/BookConsultationModal";

/**
 * HeroSection — full-width split hero with decorative stat badges.
 */
export default function HeroSection() {
  return (
    <section className="bg-background py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text content */}
        <div className="space-y-6">
          {/* Eyebrow */}
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Professional Therapy Services
          </p>

          {/* Main heading */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
            Take The First Step Towards A Balanced &amp; Fulfilling Life
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
            Our team of licensed psychologists and therapists is here to support
            you through life&apos;s challenges. We offer evidence-based therapy
            in a safe, confidential, and compassionate environment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <BookConsultationModal
              trigger={
                <Button size="lg" className="font-semibold px-8">
                  Book a Consultation
                </Button>
              }
            />
            <Button size="lg" variant="outline" className="font-semibold px-8">
              Or Call: 1-555-678-8888
            </Button>
          </div>
        </div>

        {/* RIGHT: Placeholder image with floating stat badges */}
        <div className="relative mt-12 lg:mt-0">
          <div className="bg-muted rounded-3xl aspect-[4/3] flex items-center justify-center text-muted-foreground text-4xl select-none">
            📷 Hero Image
          </div>

          {/* Floating stat badge: Years */}
          <div className="absolute -bottom-4 left-6 bg-background rounded-xl shadow-sm px-4 py-2 flex flex-col items-center">
            <span className="font-heading font-bold text-primary text-lg leading-tight">
              20+
            </span>
            <span className="text-xs text-muted-foreground">Years</span>
          </div>

          {/* Floating stat badge: Clients */}
          <div className="absolute -top-4 right-6 bg-background rounded-xl shadow-sm px-4 py-2 flex flex-col items-center">
            <span className="font-heading font-bold text-primary text-lg leading-tight">
              2K+
            </span>
            <span className="text-xs text-muted-foreground">Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
