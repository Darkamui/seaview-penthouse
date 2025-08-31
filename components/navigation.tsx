"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
                src="/images/logo.png"
                alt="The Sea View Penthouse"
                width={40}
                height={40}
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="font-sans font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
              The Sea View Penthouse
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
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            ))}
            <Button className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Book Your Stay
            </Button>
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card/80 backdrop-blur-md rounded-lg mt-2 border border-accent/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "text-accent bg-accent/10 border-l-2 border-accent"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 py-3">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
