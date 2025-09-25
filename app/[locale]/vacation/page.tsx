import { CTASection } from "@/components/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, Utensils, Bed, Wifi, Car } from "lucide-react";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VacationPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const vacationT = await getTranslations("vacation");
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <Image
              src="/images/room.jpg"
              alt="Luxury penthouse living space"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Waves className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {vacationT("hero.oceanfront.title")}
                </h3>
                <p className="text-muted-foreground">
                  {vacationT("hero.oceanfront.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Sun className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {vacationT("hero.allDaySunshine.title")}
                </h3>
                <p className="text-muted-foreground">
                  {vacationT("hero.allDaySunshine.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Utensils className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {vacationT("hero.gourmetKitchen.title")}
                </h3>
                <p className="text-muted-foreground">
                  {vacationT("hero.gourmetKitchen.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Bed className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  {vacationT("hero.luxuryAccommodations.title")}
                </h3>
                <p className="text-muted-foreground">
                  {vacationT("hero.luxuryAccommodations.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {vacationT("amenities.modernConnectivity.title")}
              </h3>
              <p className="text-muted-foreground">
                {vacationT("amenities.modernConnectivity.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {vacationT("amenities.convenientLocation.title")}
              </h3>
              <p className="text-muted-foreground">
                {vacationT("amenities.convenientLocation.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {vacationT("amenities.yearRoundComfort.title")}
              </h3>
              <p className="text-muted-foreground">
                {vacationT("amenities.yearRoundComfort.description")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Preview */}
        <div className="mb-16">
          <h3 className="font-sans text-3xl font-bold text-center mb-8">
            {vacationT("gallery.title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/balcony2.jpg"
                alt={vacationT("gallery.altTexts.eveningBalcony")}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/kitchen1.jpg"
                alt={vacationT("gallery.altTexts.modernKitchen")}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/balcony5.jpg"
                alt={vacationT("gallery.altTexts.luxuryBathroom")}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          translationNamespace="events"
          primaryButtonText={t("requestEventQuote")}
          secondaryButtonText={t("scheduleViewing")}
        />
      </div>
    </section>
  );
}
