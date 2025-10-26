import { CTASection } from "@/components/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EventOverview } from "@/components/event-overview";
import { ScrollAnimation } from "@/components/scroll-animation";
import type { Metadata } from "next";
import { generateEventVenueSchema } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://seaview.j-web.ca";

  return {
    title: t("events.title"),
    description: t("events.description"),
    openGraph: {
      title: t("events.ogTitle"),
      description: t("events.ogDescription"),
      url: `${siteUrl}/${locale}/events`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/events/business.jpg`,
          width: 1200,
          height: 630,
          alt: "Event venue and business meeting space",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("events.ogTitle"),
      description: t("events.ogDescription"),
      images: [`${siteUrl}/images/events/business.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/events`,
      languages: {
        en: `${siteUrl}/en/events`,
        he: `${siteUrl}/he/events`,
        "x-default": `${siteUrl}/en/events`,
      },
    },
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const eventPageT = await getTranslations("eventPage");

  // Generate structured data
  const structuredData = generateEventVenueSchema(locale);

  return (
    <section className="py-4 px-4">
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="up">
          <EventOverview
            eventKey="meetingSpace"
            images={[
              "/images/events/business.jpg",
              "/images/events/business2.jpg",
              "/images/events/business3.jpg",
              "/images/events/business4.jpg",
            ]}
            imageAlt="Business meeting space and professional venues"
          />
        </ScrollAnimation>

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
        <ScrollAnimation
          animation="scale"
          className="bg-primary/5 rounded-2xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollAnimation animation="left" delay={200}>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">
                {eventPageT("capacity.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {eventPageT("capacity.seatedDinner")}</li>
                <li>• {eventPageT("capacity.cocktailReception")}</li>
                <li>• {eventPageT("capacity.businessMeeting")}</li>
                <li>• {eventPageT("capacity.presentationSetup")}</li>
              </ul>
            </ScrollAnimation>
            <ScrollAnimation animation="right" delay={400}>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">
                {eventPageT("services.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {eventPageT("services.eventPlanning")}</li>
                <li>• {eventPageT("services.cateringCoordination")}</li>
                <li>• {eventPageT("services.avEquipment")}</li>
                <li>• {eventPageT("services.eventSupport")}</li>
              </ul>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation animation="up">
          <CTASection translationNamespace="events" />
        </ScrollAnimation>
      </div>
    </section>
  );
}
