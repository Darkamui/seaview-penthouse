"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface CTASectionProps {
  translationNamespace: string;
  className?: string;
  variant?: "default" | "compact";
}

export function CTASection({
  translationNamespace,
  className = "",
  variant = "default",
}: CTASectionProps) {
  const t = useTranslations(translationNamespace);
  const isCompact = variant === "compact";

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/972546606233", "_blank");
  };

  const socialLinks = [
    {
      name: "Instagram",
      image: "/images/instagram.webp",
      url: "https://www.instagram.com/penthouse.ashdod/",
    },
    {
      name: "Facebook",
      image: "/images/facebook.png",
      url: "https://www.facebook.com/profile.php?id=61576001641765",
    },
    {
      name: "Booking.com",
      image: "/images/booking.png",
      url: "https://booking.com/Share-6bNqJtR",
    },
    {
      name: "Airbnb",
      image: "/images/airbnb.png",
      url: "http://airbnb.com/h/thepenthouseashdod",
    },
  ];

  return (
    <section className={`py-12 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2
          className={`font-sans font-bold text-foreground ${
            isCompact ? "text-lg mb-4" : "text-3xl md:text-4xl mb-8"
          }`}
        >
          {t("ctaTitle")}
        </h2>

        {/* WhatsApp Section */}
        <div
          onClick={handleWhatsAppClick}
          className={`inline-flex items-center bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
            isCompact ? "gap-2 px-4 py-2.5 mb-4" : "gap-3 px-6 py-4 mb-8"
          }`}
        >
          <div
            className={`relative flex-shrink-0 ${
              isCompact ? "w-7 h-7" : "w-10 h-10"
            }`}
          >
            <Image
              src="/images/whatsapp.png"
              alt="WhatsApp"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-start">
            <div
              className={`font-semibold ${isCompact ? "text-sm" : "text-lg"}`}
            >
              {t("whatsappText")}
            </div>
            <div className={`opacity-95 ${isCompact ? "text-xs" : "text-sm"}`}>
              {t("phoneNumber")}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div
          className={`flex items-center justify-center flex-wrap ${
            isCompact ? "gap-3" : "gap-6"
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative transition-transform duration-300 hover:scale-110 ${
                isCompact ? "w-8 h-8" : "w-12 h-12"
              }`}
              aria-label={link.name}
            >
              <Image
                src={link.image}
                alt={link.name}
                fill
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
