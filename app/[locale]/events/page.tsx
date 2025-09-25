import { CTASection } from "@/components/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EventOverview } from "@/components/event-overview";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const eventPageT = await getTranslations("eventPage");
  return (
    <section className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <EventOverview
          eventKey="meetingSpace"
          images={[
            "/images/events/business.jpg",
            "/images/living3.jpg",
            "/images/balcony.jpg",
            "/images/kitchen2.jpg",
          ]}
          imageAlt="Business meeting space and professional venues"
        />

        {/* Features */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/room6.jpg"
                  alt={eventPageT("altTexts.elegantInterior")}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {eventPageT("features.interior.title")}
              </h3>
              <p className="text-muted-foreground">
                {eventPageT("features.interior.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/balcony4.jpg"
                  alt={eventPageT("altTexts.outdoorTerrace")}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {eventPageT("features.terrace.title")}
              </h3>
              <p className="text-muted-foreground">
                {eventPageT("features.terrace.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/kitchen2.jpg"
                  alt={eventPageT("altTexts.cateringKitchen")}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">
                {eventPageT("features.cateringReady.title")}
              </h3>
              <p className="text-muted-foreground">
                {eventPageT("features.cateringReady.description")}
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Capacity & Services */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">
                {eventPageT("capacity.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {eventPageT("capacity.seatedDinner")}</li>
                <li>• {eventPageT("capacity.cocktailReception")}</li>
                <li>• {eventPageT("capacity.businessMeeting")}</li>
                <li>• {eventPageT("capacity.presentationSetup")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">
                {eventPageT("services.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {eventPageT("services.eventPlanning")}</li>
                <li>• {eventPageT("services.cateringCoordination")}</li>
                <li>• {eventPageT("services.avEquipment")}</li>
                <li>• {eventPageT("services.eventSupport")}</li>
              </ul>
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
