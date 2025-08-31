import { HeroSection } from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("homepage");
  const tFooter = await getTranslations("footer");
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Quick Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">
              {t("luxuryRedefined")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/living1.jpg"
                    alt={t("livingSpace.alt")}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {t("livingSpace.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("livingSpace.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/balcony7.jpg"
                    alt={t("balcony.alt")}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {t("balcony.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("balcony.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/room.jpg"
                    alt={t("amenities.alt")}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {t("amenities.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("amenities.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Image
            src="/images/logo.png"
            alt={tFooter("logoAlt")}
            width={240}
            height={240}
            className="mx-auto mb-2"
          />
          <p className="text-sm text-muted-foreground">
            {tFooter("copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
