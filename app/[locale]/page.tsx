import { HeroSection } from "@/components/hero-section";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ScrollAnimation } from "@/components/scroll-animation";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateLodgingBusinessSchema } from "@/lib/structured-data";

// Phase 5: Code splitting for below-fold components
const EventTypes = dynamic(
  () =>
    import("@/components/event-types").then((mod) => ({
      default: mod.EventTypes,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);

const AmenitiesSection = dynamic(
  () =>
    import("@/components/amenities-section").then((mod) => ({
      default: mod.AmenitiesSection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);

const LocationOverview = dynamic(
  () =>
    import("@/components/location-overview").then((mod) => ({
      default: mod.LocationOverview,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);

const FeaturesGrid = dynamic(
  () =>
    import("@/components/features-grid").then((mod) => ({
      default: mod.FeaturesGrid,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);

const CTASection = dynamic(
  () =>
    import("@/components/cta-section").then((mod) => ({
      default: mod.CTASection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);

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
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
      url: `${siteUrl}/${locale}`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/balcony/20250715_193651.jpg`,
          width: 1200,
          height: 630,
          alt: "Luxury sea view penthouse balcony overlooking Mediterranean in Ashdod",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
      images: [`${siteUrl}/images/balcony/20250715_193651.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        he: `${siteUrl}/he`,
        "x-default": `${siteUrl}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate structured data
  const structuredData = generateLodgingBusinessSchema(locale);

  return (
    <div className="min-h-screen">
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <EventTypes />
      <AmenitiesSection />
      <FeaturesGrid translationNamespace="about" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <LocationOverview />
        </div>
      </section>
      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
