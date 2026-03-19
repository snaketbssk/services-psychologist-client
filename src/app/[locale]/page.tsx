"use client";

import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import BookConsultation from "@/components/BookConsultation";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <BenefitsSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogSection />
        <div className="px-6 py-16">
          <BookConsultation />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
