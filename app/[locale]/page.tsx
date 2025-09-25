import { HeroSection } from "@/components/hero-section";
import { EventTypes } from "@/components/event-types";
import { AmenitiesSection } from "@/components/amenities-section";
import { LocationOverview } from "@/components/location-overview";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { FeaturesGrid } from "@/components/features-grid";

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

  return (
    <div className="min-h-screen">
      <HeroSection />
      <EventTypes />
      <AmenitiesSection />
      <FeaturesGrid translationNamespace="about" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <LocationOverview />
        </div>
      </section>
    </div>
  );
}
