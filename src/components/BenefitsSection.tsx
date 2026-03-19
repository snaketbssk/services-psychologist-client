"use client";

const benefits = [
  {
    icon: "🏆",
    title: "Top Psychologists",
    description:
      "Our team consists of certified therapists with 10+ years of experience helping clients achieve lasting mental wellness.",
  },
  {
    icon: "🎯",
    title: "Effective Methods",
    description:
      "We use evidence-based therapeutic approaches tailored to your specific needs, goals, and personal circumstances.",
  },
  {
    icon: "🤝",
    title: "Ongoing Support",
    description:
      "Continuous support throughout your healing journey — we are here for you between sessions and whenever you need guidance.",
  },
];

/**
 * BenefitsSection — three-column "Why Choose Us" layout.
 */
export default function BenefitsSection() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Centered heading */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Why Choose Healingy?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
            We combine professional expertise with genuine compassion to deliver
            therapy that makes a real, lasting difference in your life.
          </p>
        </div>

        {/* Benefits columns */}
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="px-8 py-8 sm:py-0 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
