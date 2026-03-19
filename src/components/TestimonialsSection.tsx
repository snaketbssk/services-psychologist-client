"use client";

import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    stars: "★★★★★",
    quote:
      "Working with my therapist at Healingy has been truly life-changing. I came in feeling overwhelmed and lost, and over the course of a few months I have developed real tools to manage my anxiety. I feel more like myself than I have in years.",
    initials: "S.M.",
    name: "Sarah Mitchell",
    role: "Individual Therapy Client",
  },
  {
    stars: "★★★★★",
    quote:
      "My husband and I were on the brink of separation when we started couples therapy here. The sessions gave us a safe space to really hear each other for the first time. We are stronger today because of this experience and couldn't be more grateful.",
    initials: "J.R.",
    name: "James & Rachel Torres",
    role: "Couples Therapy Clients",
  },
  {
    stars: "★★★★★",
    quote:
      "After struggling for years with childhood trauma, I finally found a therapist who made me feel seen and understood. The trauma counseling program at Healingy gave me my confidence back. I highly recommend this practice to anyone seeking real healing.",
    initials: "A.K.",
    name: "Amara Kowalski",
    role: "Trauma Counseling Client",
  },
];

/**
 * TestimonialsSection — three client testimonial cards.
 */
export default function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Centered heading */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            What Our Clients Are Saying
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
            Real stories from real people who have experienced the Healingy
            difference in their mental health journey.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="pt-6 flex flex-col gap-4">
                {/* Stars */}
                <div className="text-primary text-lg">{t.stars}</div>

                {/* Quote */}
                <p className="font-decorative italic text-foreground/90 leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
