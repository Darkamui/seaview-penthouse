"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface CTASectionProps {
  translationNamespace: string;
  className?: string;
}

export function CTASection({
  translationNamespace,
  className = "",
}: CTASectionProps) {
  const t = useTranslations(translationNamespace);

  const handleWhatsAppClick = () => {
    const phoneNumber = t("phoneNumber").replace(/[^0-9+]/g, "");
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
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
      url: "https://booking.com",
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
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8">
          {t("ctaTitle")}
        </h2>

        {/* WhatsApp Section */}
        <div
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg mb-8"
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/images/whatsapp.png"
              alt="WhatsApp"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-start">
            <div className="font-semibold text-lg">{t("whatsappText")}</div>
            <div className="text-sm opacity-95">{t("phoneNumber")}</div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 transition-transform duration-300 hover:scale-110"
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
