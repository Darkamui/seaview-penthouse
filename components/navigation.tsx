"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CTASection } from "@/components/cta-section";
import { Link, usePathname } from "@/i18n/navigation";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const eventsT = useTranslations("events");

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("gallery"), href: "/gallery" },
    { name: eventsT("eventTypes.intimate.title"), href: "/vacation" },
    { name: eventsT("eventTypes.bridal.title"), href: "/bridal-event" },
    { name: eventsT("eventTypes.business.title"), href: "/events" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll with multiple techniques for cross-browser compatibility
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-md border-b border-border"
            : "bg-background/90 backdrop-blur-sm border-b border-border/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Mobile: Logo only (left side) */}
            <Link href="/" className="flex items-center gap-2 group lg:hidden">
              <Image
                src="/images/logo-clean.png"
                alt="The Seaview Penthouse"
                width={32}
                height={32}
                className="w-8 h-8 transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Mobile: Centered Title */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">
              <div className="flex flex-col -space-y-1 text-center">
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  The Seaview Penthouse
                </span>
                <span className="text-xs font-medium text-blue-800/80">
                  Ashdod
                </span>
              </div>
            </div>

            {/* Desktop Layout - Respects RTL/LTR */}
            <div className="hidden lg:flex items-center flex-1 w-full">
              <Link
                href="/"
                className="flex items-center gap-2 group flex-shrink-0"
              >
                <Image
                  src="/images/logo-clean.png"
                  alt="The Seaview Penthouse"
                  width={32}
                  height={32}
                  className="w-8 h-8 transition-transform group-hover:scale-105"
                />
                <div className="flex flex-col -space-y-1">
                  <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
                    The Seaview Penthouse
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors text-center">
                    Ashdod
                  </span>
                </div>
              </Link>

              {/* LTR: Navigation Links (center) */}
              <div className="flex items-center gap-1 flex-1 justify-center">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* LTR: Language Switcher (right) */}
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Right side - Menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-14" />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />
          <div
            className="fixed top-14 left-0 right-0 bottom-0 bg-background border-t border-border overflow-y-auto overscroll-contain"
            style={{ touchAction: "pan-y" }}
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <LanguageSwitcher />
              </div>

              {/* CTA Section in Mobile Menu */}
              <div className="pt-6 mt-6 border-t border-border">
                <CTASection
                  translationNamespace="events"
                  className="py-0"
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
