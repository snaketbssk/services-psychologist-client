"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useT } from "@/i18n/useT";
import { Button, buttonVariants } from "@/components/ui/button";
import BookConsultationDialog from "@/components/BookConsultationDialog";
import { cn } from "@/lib/utils";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";
import { SOCIAL_LINKS } from "@/lib/social-links";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  href: string;
  description?: string;
  image?: string;
  date?: string;
}

interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  megaTitle?: string;
  children?: NavChild[];
  whatsNew?: NavChild[];
}

// ─── Nav data ─────────────────────────────────────────────────────────────────
// (NAV_ITEMS is built inside the component using useTranslations)

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="9" cy="9" r="6" /><path d="M14 14l3 3" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2h2l2.5 9h9l2-6H6" />
      <circle cx="9" cy="17" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="17" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2 4.5l4.5 4.5 4.5-4.5" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4.5 2l4.5 4.5-4.5 4.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L13 11l4 1.5V16a1 1 0 01-1 1C7.163 17 3 12.837 3 4a1 1 0 011-1z" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" /><circle cx="10" cy="8" r="2" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="5" width="16" height="12" rx="2" /><path d="M2 7l8 5 8-5" />
    </svg>
  );
}

// ─── MegaDropdown ─────────────────────────────────────────────────────────────

interface MegaDropdownProps {
  item: NavItem;
  onClose: () => void;
  isActive: (href: string) => boolean;
  navbarBottom: number;
  whatsNewLabel: string;
}

function MegaDropdown({ item, onClose, isActive, navbarBottom, whatsNewLabel }: MegaDropdownProps) {
  const hasWhatsNew = Boolean(item.whatsNew?.length);
  const hasDescriptions = item.children?.some((c) => c.description);

  return (
    <div
      style={{ top: navbarBottom }}
      className="fixed left-0 right-0 z-[1300]"
    >
      {/* Invisible bridge — prevents gap between nav and dropdown */}
      <div className="h-1 w-full" />

      {/* Dropdown panel */}
      <div className="bg-background border-y border-border shadow-[0_12px_40px_rgb(0_0_0/10%)]">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex gap-0 py-6">

            {/* Left: card grid or simple list */}
            <div className="flex-1 min-w-0">
              {item.megaTitle && (
                <p className="text-[13px] font-semibold text-muted-foreground tracking-[0.06em] uppercase mb-4">
                  {item.megaTitle}
                </p>
              )}

              {hasDescriptions ? (
                // Services-style: 2-col cards with description
                <div className={cn("grid grid-cols-2 gap-[10px]", hasWhatsNew && "pr-8")}>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="block p-[14px_16px] rounded-[10px] border border-border no-underline transition-[border-color,background] duration-200 hover:border-primary hover:bg-primary/[0.04] group"
                    >
                      <p className="text-[14px] font-semibold text-foreground mb-1 font-heading">
                        {child.label}
                      </p>
                      <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                        {child.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                // Simple list (Home, Pages, Shop, Blogs)
                <div className={cn("flex flex-col gap-0.5", hasWhatsNew && "pr-8")}>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-[14px] no-underline transition-[background,color] duration-150 hover:bg-primary/8 hover:text-foreground",
                        isActive(child.href)
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground font-normal"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right: What's New sidebar */}
            {hasWhatsNew && (
              <>
                <div className="w-px bg-border mx-0 self-stretch" />
                <div className="w-[280px] pl-8 shrink-0">
                  <p className="text-[13px] font-semibold text-muted-foreground tracking-[0.06em] uppercase mb-4">
                    {whatsNewLabel}
                  </p>
                  <div className="flex flex-col gap-4">
                    {item.whatsNew?.map((post) => (
                      <Link
                        key={post.label}
                        href={post.href}
                        onClick={onClose}
                        className="flex gap-3 no-underline group"
                      >
                        <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-muted shrink-0">
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.label}
                              fill
                              sizes="60px"
                              style={{ objectFit: "cover" }}
                            />
                          )}
                        </div>
                        <div>
                          {post.date && (
                            <p className="text-[11px] text-muted-foreground mb-0.5 tracking-[0.04em] uppercase">
                              {post.date}
                            </p>
                          )}
                          <p className="text-[13px] font-semibold text-foreground leading-snug transition-colors duration-200 group-hover:text-primary">
                            {post.label}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SiteHeaderProps {
  address?: string;
  ctaLabel?: string;
  ctaHref?: string;
  logoSrc?: string;
  logoAlt?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SiteHeader({
  address = "101 E 129th St, East Chicago, IN 46312, US",
  ctaLabel = "Get Your Consult!",
  logoSrc,
  logoAlt = "Healingy",
}: SiteHeaderProps) {
  const t = useT();
  const nav = useTranslations("NAV");
  const pathname = usePathname();

  const NAV_ITEMS: NavItem[] = [
    {
      label: nav("HOME"),
      href: "/",
      mega: true,
      megaTitle: nav("PAGES_MEGA_TITLE"),
      children: [
        { label: nav("HOMEPAGE_01"), href: "/" },
        { label: nav("HOMEPAGE_02"), href: "/home-02" },
        { label: nav("HOMEPAGE_03"), href: "/home-03" },
        { label: nav("HOMEPAGE_04"), href: "/home-04" },
        { label: nav("HOME_SLIDE"), href: "/home-slide-text-scroll" },
      ],
    },
    {
      label: nav("SERVICES"),
      href: "/our-service",
      mega: true,
      megaTitle: nav("SERVICES_MEGA_TITLE"),
      children: [
        { label: nav("FAMILY_THERAPY"),      href: "/service-details", description: nav("FAMILY_THERAPY_DESC")      },
        { label: nav("CHILD_THERAPY"),       href: "/service-details", description: nav("CHILD_THERAPY_DESC")       },
        { label: nav("GROUP_THERAPY"),       href: "/service-details", description: nav("GROUP_THERAPY_DESC")       },
        { label: nav("COUPLES_THERAPY"),     href: "/service-details", description: nav("COUPLES_THERAPY_DESC")     },
        { label: nav("TRAUMA_COUNSELING"),   href: "/service-details", description: nav("TRAUMA_COUNSELING_DESC")   },
        { label: nav("INDIVIDUAL_COUNSELING"), href: "/service-details", description: nav("INDIVIDUAL_COUNSELING_DESC") },
      ],
      whatsNew: [
        { label: "How Cognitive Behavioral Therap...", href: "/blog-details", date: "Oct 17, 2024", image: "/images/blog/blog-details-list-1.jpg" },
        { label: "Effective Strategies for Managing...", href: "/blog-details", date: "Oct 19, 2024", image: "/images/blog/blog-details-list-2.jpg" },
        { label: "Techniques for Everyday Stress...", href: "/blog-details", date: "Oct 26, 2024", image: "/images/blog/blog-details-list-4.jpg" },
      ],
    },
    {
      label: nav("PAGES"),
      href: "#",
      mega: true,
      megaTitle: nav("PAGES_MEGA_TITLE"),
      children: [
        { label: nav("ABOUT"),       href: "/about"            },
        { label: nav("THERAPISTS"),  href: "/our-therapists"   },
        { label: nav("APPOINTMENT"), href: "/book-appointment" },
      ],
    },
    {
      label: nav("SHOP"),
      href: "#",
      mega: true,
      megaTitle: nav("SHOP_MEGA_TITLE"),
      children: [
        { label: nav("OUR_PRODUCT"), href: "/our-product"       },
        { label: nav("SHOP_CART"),   href: "/shop-cart"         },
        { label: nav("CHECK_OUT"),   href: "/shop-check-out"    },
        { label: nav("SHOP_DETAILS"), href: "/product-details"  },
      ],
    },
    {
      label: nav("BLOGS"),
      href: "#",
      mega: true,
      megaTitle: nav("BLOGS_MEGA_TITLE"),
      children: [
        { label: nav("BLOG_GRID"),     href: "/blogs"          },
        { label: nav("BLOG_DETAILS_1"), href: "/blog-details"  },
        { label: nav("BLOG_DETAILS_2"), href: "/blog-details-2" },
      ],
    },
    { label: nav("CONTACT"), href: "/contact-us" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [navbarBottom, setNavbarBottom] = useState(112); // topbar(40) + navbar(72)

  const appBarRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll for shadow + navbar bottom position
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);
      if (appBarRef.current) {
        setNavbarBottom(appBarRef.current.getBoundingClientRect().bottom);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href) ?? false;

  // Delayed close — 80 ms matches original
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 80);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 80);
  }, []);

  return (
    <>
      {/* ── Top bar (desktop only) ───────────────────────────────────────── */}
      <div className="hidden md:block border-b border-border bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex items-center justify-between h-10">

            {/* Left: email */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <EmailIcon />
              <span className="text-[12.5px]">{EMAIL}</span>
            </div>

            {/* Right: phone + social icons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <PhoneIcon />
                <span className="text-[12.5px]">{PHONE_NUMBER}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground flex items-center transition-colors duration-200 hover:text-primary"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky nav bar ──────────────────────────────────────────────── */}
      <div
        ref={appBarRef}
        className={cn(
          "sticky top-0 z-50 bg-background border-b border-border transition-shadow duration-300",
          scrolled && "shadow-[0_2px_16px_rgb(0_0_0/7%)]"
        )}
        style={{ overflow: "visible" }}
      >
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="h-16 md:h-[72px] flex items-center gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 no-underline shrink-0 mr-0 md:mr-10"
            >
              {logoSrc ? (
                <div className="relative w-9 h-9">
                  <Image src={logoSrc} alt={logoAlt} fill style={{ objectFit: "contain" }} />
                </div>
              ) : null}
              <span className="text-[22px] font-heading font-normal text-foreground tracking-[-0.01em]">
                {logoAlt}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="static"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={item.children ? handleMouseLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 px-[10px] py-1.5 rounded-lg text-[14.5px] no-underline transition-[color,background] duration-200 whitespace-nowrap",
                      "border-b-2",
                      isActive(item.href)
                        ? "font-semibold text-foreground border-foreground"
                        : "font-normal text-muted-foreground border-transparent hover:text-foreground hover:bg-primary/[0.06]"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDownIcon />}
                  </Link>

                  {item.children && openDropdown === item.label && (
                    <div
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <MegaDropdown
                        item={item}
                        onClose={() => setOpenDropdown(null)}
                        isActive={isActive}
                        navbarBottom={navbarBottom}
                        whatsNewLabel={nav("WHATS_NEW")}
                      />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2 ml-auto md:ml-0">
              {/* Search */}
              <button
                aria-label="Search"
                className="p-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                <SearchIcon />
              </button>

{/* CTA (desktop) */}
              <BookConsultationDialog
                trigger={
                  <Button className="hidden md:inline-flex rounded-full px-5 py-2 h-auto text-[13.5px] font-medium whitespace-nowrap">
                    {ctaLabel || t.bookSession}
                  </Button>
                }
              />

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className="flex md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-[1400]",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-[300px] bg-background flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <span className="text-[20px] font-heading font-normal text-foreground">
              {logoAlt}
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-2 pt-2 pb-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {/* Parent row */}
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className={cn(
                      "flex-1 flex items-center px-3 py-2.5 rounded-xl text-[15px] no-underline transition-colors hover:bg-primary/8",
                      isActive(item.href)
                        ? "font-semibold text-foreground"
                        : "font-normal text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() =>
                        setMobileExpanded((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <div
                        className={cn(
                          "transition-transform duration-200",
                          mobileExpanded === item.label && "rotate-90"
                        )}
                      >
                        <ChevronRightIcon />
                      </div>
                    </button>
                  )}
                </div>

                {/* Children */}
                {item.children && mobileExpanded === item.label && (
                  <div className="pl-4 pb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-xl text-[13.5px] text-muted-foreground no-underline transition-colors hover:bg-primary/8 hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Drawer footer CTA */}
          <div className="px-5 pb-6 pt-2 shrink-0">
            <BookConsultationDialog
              trigger={
                <Button
                  className="w-full rounded-full py-3 h-auto text-[14px] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel || t.bookSession}
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
