import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-card py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <Image
          src="/images/logo-crop.png"
          alt={t("logoAlt")}
          width={240}
          height={240}
          className="mx-auto mb-4"
        />
        <p className="text-sm text-muted-foreground">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
