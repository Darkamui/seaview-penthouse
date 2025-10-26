import { CTASection } from "@/components/cta-section";
import { EventOverview } from "@/components/event-overview";
import { ElevatedCard, CardContent } from "@/components/ui/card";
import { routing } from "@/i18n/routing";
import { BedDouble, Armchair, Eye, Wine, Gem, Waves } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
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
    title: t("bridalEvent.title"),
    description: t("bridalEvent.description"),
    openGraph: {
      title: t("bridalEvent.ogTitle"),
      description: t("bridalEvent.ogDescription"),
      url: `${siteUrl}/${locale}/bridal-event`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/events/bride.jpg`,
          width: 1200,
          height: 630,
          alt: "Bridal preparation venue with sea views",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("bridalEvent.ogTitle"),
      description: t("bridalEvent.ogDescription"),
      images: [`${siteUrl}/images/events/bride.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/bridal-event`,
      languages: {
        en: `${siteUrl}/en/bridal-event`,
        he: `${siteUrl}/he/bridal-event`,
        "x-default": `${siteUrl}/en/bridal-event`,
      },
    },
  };
}

export default async function BridalEventPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const bridalT = await getTranslations("bridalEvent");

  // Generate structured data
  const structuredData = generateEventVenueSchema(locale);

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollAnimation animation="up">
        <EventOverview
          eventKey="bridalPrep"
          images={[
            "/images/events/bride.jpg",
            "/images/events/bridalPrep2.jpg",
            "/images/events/bridalPrep3.jpg",
          ]}
          imageAlt="Bridal preparation and luxury penthouse spaces"
          reverse
        />
      </ScrollAnimation>
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
        <ScrollAnimation animation="stagger" delay={100}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" delay={200}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" delay={300}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" delay={400}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" delay={500}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" delay={600}>
          <ElevatedCard className="border-accent/20">
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
          </ElevatedCard>
        </ScrollAnimation>
      </div>
      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
