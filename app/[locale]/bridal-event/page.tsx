import { CTASection } from "@/components/cta-section";
import { EventOverview } from "@/components/event-overview";
import { Card, CardContent } from "@/components/ui/card";
import { routing } from "@/i18n/routing";
import {
  Heart,
  Camera,
  Sparkles,
  Group,
  BedDouble,
  Armchair,
  Eye,
  Wine,
  Gem,
  Waves,
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BridalEventPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const bridalT = await getTranslations("bridalEvent");

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <EventOverview
        eventKey="bridalPrep"
        images={[
          "/images/events/bride.jpg",
          "/images/living.jpg",
          "/images/room.jpg",
          "/images/balcony4.jpg",
        ]}
        imageAlt="Bridal preparation and luxury penthouse spaces"
        reverse
      />

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Waves className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.makeupHairCorner.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.makeupHairCorner.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BedDouble className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.companionsStay.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.companionsStay.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Armchair className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.barChairs.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.barChairs.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.mirrors.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.mirrors.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wine className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.coffeeWineFruits.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.coffeeWineFruits.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gem className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.brideGroomMeeting.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.brideGroomMeeting.description")}
            </p>
          </CardContent>
        </Card>
      </div>

      <CTASection
        translationNamespace="events"
        primaryButtonText={t("requestEventQuote")}
        secondaryButtonText={t("scheduleViewing")}
      />
    </div>
  );
}
