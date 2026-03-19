"use client";

import Link from "next/link";
import { useT } from "@/i18n/useT";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * SiteHeader — top navigation bar.
 * Demonstrates: Button variants, Separator, font-heading, Sand theme colors.
 */
export default function SiteHeader() {
  const t = useT();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo / brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-heading font-semibold text-primary">
            Healingy
          </span>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Psychologist Services
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: t.home, href: "#" },
            { label: t.about, href: "#" },
            { label: t.contact, href: "#" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex h-7 items-center rounded-md px-2.5 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Separator orientation="vertical" className="h-5" />
          <Button size="sm">{t.bookSession}</Button>
        </div>
      </div>
    </header>
  );
}
