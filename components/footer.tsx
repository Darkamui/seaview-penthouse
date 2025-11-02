import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollAnimation } from "./scroll-animation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollAnimation animation="up" className="flex flex-col items-center">
          <Image
            src="/images/logo-crop.png"
            alt={t("logoAlt")}
            width={240}
            height={240}
            className="mx-auto mb-6"
          />
          <p className="text-sm text-muted-foreground">
            {t("madeWith")} ❤️ {t("by")}{" "}
            <a
              href="https://j-web.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              J-Web
            </a>
            . {t("allRightsReserved")} © {currentYear}
          </p>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
