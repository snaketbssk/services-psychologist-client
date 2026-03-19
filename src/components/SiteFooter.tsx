"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const serviceLinks = [
  "Individual Counseling",
  "Family Therapy",
  "Couples Therapy",
  "Group Therapy",
  "Child Therapy",
  "Trauma Counseling",
];

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#contact" },
  { label: "Book Appointment", href: "#" },
];

const socialIcons = ["f", "in", "tw", "ig", "yt"];

/**
 * SiteFooter — 4-column dark footer with newsletter signup.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <span className="font-heading text-xl font-bold text-primary">
              Healingy
            </span>
            <p className="text-background/70 text-sm mt-3 leading-relaxed">
              Professional psychological support for individuals, couples, and
              families. Your healing journey starts here.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {socialIcons.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  className="w-8 h-8 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center text-xs text-background font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-4">
              Services
            </h4>
            <ul className="space-y-1">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-background/70 hover:text-background text-sm py-1 block transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-background/70 hover:text-background text-sm py-1 block transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-4">
              Newsletter
            </h4>
            <p className="text-background/70 text-sm leading-relaxed">
              Stay updated with our latest articles, tips, and resources on
              mental health and well-being.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              className="bg-background/10 border border-background/20 rounded-lg px-4 py-2 text-sm text-background placeholder:text-background/40 w-full mt-4 outline-none focus:border-primary transition-colors"
            />
            <Button
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/50">
          <span>© 2026 Healingy. All rights reserved.</span>
          <span className="flex gap-3">
            <a href="#" className="hover:text-background/80 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-background/80 transition-colors">
              Terms of Service
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
