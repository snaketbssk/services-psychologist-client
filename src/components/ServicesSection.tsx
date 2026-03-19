"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const services = [
  {
    icon: "🧠",
    title: "Individual Counseling",
    description:
      "One-on-one therapy sessions tailored to your unique needs, helping you work through personal challenges and achieve emotional well-being.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Therapy",
    description:
      "Strengthen family relationships, improve communication, and resolve conflicts with guidance from our experienced family therapists.",
  },
  {
    icon: "💑",
    title: "Couples Therapy",
    description:
      "Rebuild trust, deepen connection, and develop healthier communication patterns with your partner in a safe, neutral environment.",
  },
  {
    icon: "🤝",
    title: "Group Therapy",
    description:
      "Find community and shared healing in facilitated group sessions that foster empathy, support, and personal growth.",
  },
  {
    icon: "🌱",
    title: "Child & Adolescent Therapy",
    description:
      "Specialized support for children and teenagers navigating anxiety, behavioral challenges, academic stress, and developmental changes.",
  },
  {
    icon: "🕊️",
    title: "Trauma Counseling",
    description:
      "Compassionate, evidence-based trauma therapy to help you process difficult experiences and reclaim your sense of safety and self.",
  },
];

/**
 * ServicesSection — 3-column grid of 6 therapy service cards.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Centered header */}
        <div className="text-center">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Comprehensive Therapy Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
            We offer a wide range of therapeutic services to support your mental
            health journey at every stage of life.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {services.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-3">
                  {service.icon}
                </div>
                <CardTitle className="text-base font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href="#"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Read More →
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
