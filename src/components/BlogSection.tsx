"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    date: "15 Mar",
    category: "Therapy",
    title: "How Cognitive Behavioral Therapy Can Help Manage Anxiety",
    excerpt:
      "Discover how CBT techniques empower you to identify and reframe negative thought patterns, reducing anxiety in everyday situations.",
  },
  {
    date: "10 Mar",
    category: "Wellness",
    title: "Understanding the Connection Between Sleep and Mental Health",
    excerpt:
      "Explore the powerful two-way relationship between quality sleep and emotional resilience, and learn practical steps to improve both.",
  },
  {
    date: "05 Mar",
    category: "Mindfulness",
    title: "5 Mindfulness Practices for Daily Stress Relief",
    excerpt:
      "Simple, evidence-backed mindfulness exercises you can integrate into your daily routine to reduce stress and improve overall well-being.",
  },
];

/**
 * BlogSection — three blog/resource cards with date badges.
 */
export default function BlogSection() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
              Blog &amp; Resources
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Healingy Blog &amp; Resources
            </h2>
          </div>
          <Link
            href="#"
            className="text-primary text-sm font-medium hover:underline shrink-0 hidden sm:block"
          >
            View All Articles →
          </Link>
        </div>

        {/* Blog cards grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.title} className="overflow-hidden p-0">
              {/* Image area */}
              <div className="relative aspect-video bg-muted flex items-center justify-center text-muted-foreground text-3xl select-none">
                📷 Blog Image
                {/* Date badge */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg px-3 py-1 text-sm font-bold leading-tight">
                  {article.date}
                </div>
              </div>

              {/* Card content */}
              <CardContent className="pt-4">
                <Badge variant="secondary">{article.category}</Badge>
                <h3 className="font-heading font-semibold text-lg text-foreground mt-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  {article.excerpt}
                </p>
                <Link
                  href="#"
                  className="text-primary text-sm font-medium mt-3 block hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile: View all link */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="#" className="text-primary text-sm font-medium hover:underline">
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
