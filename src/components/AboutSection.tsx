"use client";

import { Button } from "@/components/ui/button";
import BookConsultationModal from "@/components/BookConsultationModal";

const checklistItems = [
  "Licensed & certified therapists",
  "Evidence-based therapy methods",
  "Confidential & safe environment",
  "Flexible scheduling options",
];

/**
 * AboutSection — split layout with image placeholder and checklist.
 */
export default function AboutSection() {
  return (
    <section id="about" className="bg-muted/30 py-16 px-6">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Image placeholder with satisfaction badge */}
        <div className="relative mb-12 lg:mb-0">
          <div className="bg-muted rounded-3xl min-h-[420px] flex items-center justify-center text-muted-foreground text-4xl select-none">
            📷 About Image
          </div>

          {/* Satisfaction badge */}
          <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-md">
            <span className="font-heading font-bold text-3xl block leading-tight">
              98%
            </span>
            <span className="text-sm text-primary-foreground/90">
              Client Satisfaction
            </span>
          </div>
        </div>

        {/* RIGHT: Text content */}
        <div className="space-y-6">
          {/* Eyebrow */}
          <p className="text-primary text-sm font-medium tracking-widest uppercase">
            About Us
          </p>

          {/* Heading */}
          <h2 className="font-heading text-3xl font-bold text-foreground leading-snug">
            We Provide Professional, Dedicated, And Experienced Psychological
            Support
          </h2>

          {/* Paragraphs */}
          <p className="text-muted-foreground leading-relaxed">
            At Healingy, we believe that everyone deserves access to quality
            mental health care. Our team of licensed psychologists brings
            decades of combined experience across a full spectrum of therapeutic
            modalities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to creating a warm, non-judgmental space where you
            can explore your thoughts and feelings at your own pace. Your
            healing journey is unique, and we walk it with you every step of
            the way.
          </p>

          {/* Checklist */}
          <ul className="space-y-3">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-accent font-bold text-lg leading-none">
                  ✓
                </span>
                <span className="text-foreground text-sm">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-2">
            <BookConsultationModal
              trigger={
                <Button size="lg" className="font-semibold px-8">
                  Book a Session
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
