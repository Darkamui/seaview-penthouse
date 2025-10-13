import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollAnimation } from "./scroll-animation";

export function Footer() {
  const t = useTranslations("footer");

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
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
