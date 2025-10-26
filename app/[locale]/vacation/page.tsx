import { CTASection } from "@/components/cta-section";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EventOverview } from "@/components/event-overview";
import { ScrollAnimation } from "@/components/scroll-animation";
import Image from "next/image";
import type { Metadata } from "next";
import { generateLodgingBusinessSchema } from "@/lib/structured-data";

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
    title: t("vacation.title"),
    description: t("vacation.description"),
    openGraph: {
      title: t("vacation.ogTitle"),
      description: t("vacation.ogDescription"),
      url: `${siteUrl}/${locale}/vacation`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/events/family.jpg`,
          width: 1200,
          height: 630,
          alt: "Family vacation at luxury penthouse",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("vacation.ogTitle"),
      description: t("vacation.ogDescription"),
      images: [`${siteUrl}/images/events/family.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/vacation`,
      languages: {
        en: `${siteUrl}/en/vacation`,
        he: `${siteUrl}/he/vacation`,
        "x-default": `${siteUrl}/en/vacation`,
      },
    },
  };
}

export default async function VacationPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const tVacation = await getTranslations("vacation");

  // Generate structured data
  const structuredData = generateLodgingBusinessSchema(locale);

  return (
    <div className="min-h-[75vh] max-w-7xl mx-auto">
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollAnimation animation="up">
        <EventOverview
          eventKey="vacationSpace"
          images={[
            "/images/events/family.jpg",
            "/images/events/family2.jpg",
            "/images/events/family3.jpg",
            "/images/events/family4.jpg",
          ]}
          imageAlt="Family enjoying their vacation"
        />
      </ScrollAnimation>

      {/* Location Block */}
      <ScrollAnimation animation="up">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-card rounded-lg p-6 shadow-lg">
            <div className="relative w-full md:w-1/3 h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/ashdod.jpg"
                alt={tVacation("locationBlock.title")}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-start">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {tVacation("locationBlock.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {tVacation("locationBlock.description")}
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
