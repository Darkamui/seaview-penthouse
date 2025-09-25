import { CTASection } from "@/components/cta-section";
import { EventOverview } from "@/components/event-overview";
import { Card, CardContent } from "@/components/ui/card";
import { routing } from "@/i18n/routing";
import { Heart, Camera, Sparkles } from "lucide-react";
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
        imageSrc="/images/events/bride.jpg"
        imageAlt="Bridal preparation with bride getting ready for wedding"
        reverse
      />

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.romanticAtmosphere.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.romanticAtmosphere.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.professionalPhotography.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.professionalPhotography.description")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:border-accent/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">
              {bridalT("features.premiumService.title")}
            </h3>
            <p className="text-muted-foreground">
              {bridalT("features.premiumService.description")}
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
