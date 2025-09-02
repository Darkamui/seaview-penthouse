"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("events"), href: "/events" },
    { name: t("faq"), href: "/faq" },
    { name: t("contact"), href: "/contact" },
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
  }, [pathname]);

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
            <span className="font-sans font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
              {t("siteTitle")}
            </span>
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
            <Button className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              {t("bookStay")}
            </Button>
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
            <div className="relative z-10 flex flex-col h-screen bg-white overflow-y-auto">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent/20 h-16">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/logo-crop.png"
                    alt={t("siteTitle")}
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="font-sans font-semibold text-lg text-foreground">
                    {t("siteTitle")}
                  </span>
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
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              {/* Navigation links */}
              <div className="flex-1 flex flex-col justify-center px-6 bg-white">
                <nav className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block text-center py-4 text-2xl font-medium transition-colors ${
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Bottom section */}
              <div className="px-6 py-8 bg-white border-t border-accent/20 space-y-4">
                <Button
                  className="w-full py-4 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {t("bookStay")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
