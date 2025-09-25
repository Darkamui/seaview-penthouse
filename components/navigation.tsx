"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const eventsT = useTranslations("events");

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("contact"), href: "/contact" },
  ];

  const eventsDropdownItems = [
    { name: eventsT("eventTypes.intimate.title"), href: "/vacation" },
    { name: eventsT("eventTypes.bridal.title"), href: "/bridal-event" },
    { name: eventsT("eventTypes.business.title"), href: "/events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setEventsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-events-dropdown]")) {
        setEventsDropdownOpen(false);
      }
    };

    if (eventsDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [eventsDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg border-b border-accent/20"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-accent/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/images/logo-clean.png"
                alt={t("siteTitle")}
                width={40}
                height={40}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                {t("siteTitle")}
              </span>
              <span className="font-sans font-semibold text-sm text-amber-600 text-center group-hover:text-accent transition-colors duration-300">
                {t("ashdod")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  pathname === item.href
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Events Dropdown */}
            <div className="relative" data-events-dropdown>
              <button
                onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${
                  pathname.startsWith("/events")
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {t("events")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    eventsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {eventsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-accent/20 rounded-lg shadow-lg z-50 backdrop-blur-sm">
                  {eventsDropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-foreground hover:text-accent hover:bg-accent/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setEventsDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="http://airbnb.com/h/thepenthouseashdod" target="_blank">
              <Button className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {t("bookStay")}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] md:hidden h-screen w-screen">
            {/* Solid background */}
            <div
              className="absolute inset-0 bg-white h-full w-full"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu content */}
            <div className="relative z-10 flex flex-col h-screen bg-white">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent/20 h-16 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/logo-crop.png"
                    alt={t("siteTitle")}
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                      {t("siteTitle")}
                    </span>
                    <span className="font-sans font-semibold text-sm text-amber-600 text-center group-hover:text-accent transition-colors duration-300">
                      {t("ashdod")}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-accent"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto bg-white">
                {/* Navigation links */}
                <div className="flex flex-col justify-center px-6 bg-white py-8">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block text-center py-4 text-lg font-medium transition-colors ${
                          pathname === item.href
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Events section in mobile */}
                    <div className="border-t border-accent/20 pt-4 mt-4">
                      <div className="text-center text-sm font-medium text-muted-foreground mb-2">
                        {t("events")}
                      </div>
                      {eventsDropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-center py-3 text-base font-medium transition-colors ${
                            pathname === item.href
                              ? "text-accent"
                              : "text-foreground hover:text-accent"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Bottom section */}
                <div className="px-6 py-8 bg-white border-t border-accent/20 space-y-4 mt-auto">
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <Link
                    href="http://airbnb.com/h/thepenthouseashdod"
                    target="_blank"
                  >
                    <Button
                      className="w-full py-4 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("bookStay")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
