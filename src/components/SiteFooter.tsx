"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const socialIcons = ["f", "in", "tw", "ig", "yt"];

export default function SiteFooter() {
  const t = useTranslations("FOOTER");

  const serviceLinks = [
    t("SERVICE_INDIVIDUAL"),
    t("SERVICE_FAMILY"),
    t("SERVICE_COUPLES"),
    t("SERVICE_GROUP"),
    t("SERVICE_CHILD"),
    t("SERVICE_TRAUMA"),
  ];

  const quickLinks = [
    { label: t("LINK_HOME"),    href: "#"        },
    { label: t("LINK_ABOUT"),   href: "#about"   },
    { label: t("LINK_BLOG"),    href: "#"        },
    { label: t("LINK_CONTACT"), href: "#contact" },
    { label: t("LINK_BOOK"),    href: "#"        },
  ];

  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <span className="font-heading text-xl font-bold text-primary">Healingy</span>
            <p className="text-background/70 text-sm mt-3 leading-relaxed">{t("DESCRIPTION")}</p>
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
            <h4 className="font-heading font-semibold text-background mb-4">{t("SERVICES_HEADING")}</h4>
            <ul className="space-y-1">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/70 hover:text-background text-sm py-1 block transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-4">{t("QUICK_LINKS_HEADING")}</h4>
            <ul className="space-y-1">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-background/70 hover:text-background text-sm py-1 block transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-4">{t("NEWSLETTER_HEADING")}</h4>
            <p className="text-background/70 text-sm leading-relaxed">{t("NEWSLETTER_DESCRIPTION")}</p>
            <input
              type="email"
              placeholder={t("EMAIL_PLACEHOLDER")}
              className="bg-background/10 border border-background/20 rounded-lg px-4 py-2 text-sm text-background placeholder:text-background/40 w-full mt-4 outline-none focus:border-primary transition-colors"
            />
            <Button className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
              {t("SUBSCRIBE")}
            </Button>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/50">
          <span>{t("COPYRIGHT")}</span>
          <span className="flex gap-3">
            <a href="#" className="hover:text-background/80 transition-colors">{t("PRIVACY_POLICY")}</a>
            <span>·</span>
            <a href="#" className="hover:text-background/80 transition-colors">{t("TERMS")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
