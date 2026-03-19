"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/useT";
import { Button } from "@/components/ui/button";
import BookConsultationModal from "@/components/BookConsultationModal";
import { cn } from "@/lib/utils";

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

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    mega: true,
    megaTitle: "Pages",
    children: [
      { label: "Homepage 01", href: "/" },
      { label: "Homepage 02", href: "/home-02" },
      { label: "Homepage 03", href: "/home-03" },
      { label: "Homepage 04", href: "/home-04" },
      { label: "Home Slide Text Scroll", href: "/home-silde-text-scroll" },
    ],
  },
  {
    label: "Services",
    href: "/our-service",
    mega: true,
    megaTitle: "Counseling & Therapy Services",
    children: [
      {
        label: "Family Therapy",
        href: "/service-details",
        description:
          "Improve family relationships, resolve conflicts, and build a healthy living environment.",
      },
      {
        label: "Child & Adolescent Therapy",
        href: "/service-details",
        description:
          "Specialized support for children and teens, helping them navigate emotional challenges.",
      },
      {
        label: "Group Therapy",
        href: "/service-details",
        description:
          "Join others with similar challenges, sharing experiences and support in a guided group setting.",
      },
      {
        label: "Couples Therapy",
        href: "/service-details",
        description:
          "Enhance understanding and affection between couples, helping to strengthen the relationship.",
      },
      {
        label: "Trauma Counseling",
        href: "/service-details",
        description:
          "Focused therapy to help you heal from past trauma and regain control over your life.",
      },
      {
        label: "Individual Counseling",
        href: "/service-details",
        description:
          "Personal psychological support to help you overcome stress, anxiety, and regain confidence.",
      },
    ],
    whatsNew: [
      {
        label: "How Cognitive Behavioral Therap...",
        href: "/blog-details",
        date: "Oct 17, 2024",
        image: "/images/blog/blog-details-list-1.jpg",
      },
      {
        label: "Effective Strategies for Managing...",
        href: "/blog-details",
        date: "Oct 19, 2024",
        image: "/images/blog/blog-details-list-2.jpg",
      },
      {
        label: "Techniques for Everyday Stress...",
        href: "/blog-details",
        date: "Oct 26, 2024",
        image: "/images/blog/blog-details-list-4.jpg",
      },
    ],
  },
  {
    label: "Pages",
    href: "#",
    mega: true,
    megaTitle: "Pages",
    children: [
      { label: "About", href: "/about" },
      { label: "Therapists", href: "/our-therapists" },
      { label: "Appointment", href: "/book-appointment" },
    ],
  },
  {
    label: "Shop",
    href: "#",
    mega: true,
    megaTitle: "Shop",
    children: [
      { label: "Our Product", href: "/our-product" },
      { label: "Shop Cart", href: "/shop-cart" },
      { label: "Check Out", href: "/shop-check-out" },
      { label: "Shop Details", href: "/product-details" },
    ],
  },
  {
    label: "Blogs",
    href: "#",
    mega: true,
    megaTitle: "Blogs",
    children: [
      { label: "Blog Grid", href: "/blog-grid" },
      { label: "Blog Details 1", href: "/blog-details" },
      { label: "Blog Details 2", href: "/blog-details-2" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

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
function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.406 14.457c-.194.546-1.138 1.044-1.566 1.108-.407.06-.921.085-1.486-.093-.342-.107-.781-.25-1.342-.488-2.353-1.015-3.888-3.374-4.007-3.53-.12-.157-.975-1.296-.975-2.473s.617-1.756.836-1.995c.22-.24.48-.3.639-.3l.46.009c.148.006.346-.056.542.414.2.48.679 1.657.738 1.778.06.12.1.261.02.42-.08.16-.12.26-.238.4-.12.14-.252.313-.36.42-.12.12-.244.25-.105.49.14.24.621 1.024 1.333 1.658.916.816 1.689 1.07 1.929 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.397.66 1.637.78.24.12.4.18.46.28.06.1.06.58-.134 1.124z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function SkypeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.986 13.87A10.985 10.985 0 0012 2.014a10.982 10.982 0 00-6.318 2.005A6.47 6.47 0 002 10.5a6.5 6.5 0 006.5 6.5c.23 0 .459-.012.685-.036A10.98 10.98 0 0012 22a10.982 10.982 0 006.315-2.003A6.469 6.469 0 0022 13.5a6.494 6.494 0 00-1.014-3.63zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm2.5-4.5c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.15.674-.546.838-1.107.52l-3.067-2.26-1.48 1.424c-.163.163-.3.3-.616.3l.22-3.107 5.647-5.1c.246-.218-.053-.34-.38-.12L7.32 14.4l-2.99-.934c-.65-.204-.663-.65.135-.962l11.67-4.5c.54-.197 1.015.132.427.244z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: WhatsAppIcon, href: "#", label: "WhatsApp" },
  { icon: XIcon, href: "#", label: "X (Twitter)" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: SkypeIcon, href: "#", label: "Skype" },
  { icon: TelegramIcon, href: "#", label: "Telegram" },
];

// ─── MegaDropdown ─────────────────────────────────────────────────────────────

interface MegaDropdownProps {
  item: NavItem;
  onClose: () => void;
  isActive: (href: string) => boolean;
  navbarBottom: number;
}

function MegaDropdown({ item, onClose, isActive, navbarBottom }: MegaDropdownProps) {
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
        <div className="max-w-6xl mx-auto px-6">
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
                    What&apos;s New
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
  cartCount?: number;
  address?: string;
  email?: string;
  phone?: string;
  ctaLabel?: string;
  ctaHref?: string;
  logoSrc?: string;
  logoAlt?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SiteHeader({
  cartCount = 2,
  address = "101 E 129th St, East Chicago, IN 46312, US",
  email = "themesflat@gmail.com",
  phone = "1-555-678-8888",
  ctaLabel = "Get Your Consult!",
  logoSrc,
  logoAlt = "Healingy",
}: SiteHeaderProps) {
  const t = useT();
  const pathname = usePathname();

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
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-10">

            {/* Left: address + email */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <LocationIcon />
                <span className="text-[12.5px]">{address}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <EmailIcon />
                <span className="text-[12.5px]">{email}</span>
              </div>
            </div>

            {/* Right: phone + social icons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <PhoneIcon />
                <span className="text-[12.5px]">{phone}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
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
        <div className="max-w-6xl mx-auto px-6">
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

              {/* Cart (desktop only) */}
              <div className="relative hidden md:block">
                <Link
                  href="/shop-cart"
                  aria-label={`Cart, ${cartCount} items`}
                  className="flex p-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  <CartIcon />
                </Link>
                {cartCount > 0 && (
                  <span className="pointer-events-none absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* CTA (desktop) */}
              <BookConsultationModal
                trigger={
                  <Button
                    className="hidden md:inline-flex rounded-full px-5 py-2 h-auto text-[13.5px] font-medium whitespace-nowrap"
                  >
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
            <BookConsultationModal
              trigger={
                <Button className="w-full rounded-full py-3 h-auto text-[14px] font-medium">
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
