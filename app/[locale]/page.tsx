import { HeroSection } from "@/components/hero-section";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ScrollAnimation } from "@/components/scroll-animation";
import dynamic from "next/dynamic";

// Phase 5: Code splitting for below-fold components
const EventTypes = dynamic(() => import("@/components/event-types").then(mod => ({ default: mod.EventTypes })), {
  loading: () => <div className="h-96" />
});

const AmenitiesSection = dynamic(() => import("@/components/amenities-section").then(mod => ({ default: mod.AmenitiesSection })), {
  loading: () => <div className="h-96" />
});

const LocationOverview = dynamic(() => import("@/components/location-overview").then(mod => ({ default: mod.LocationOverview })), {
  loading: () => <div className="h-96" />
});

const FeaturesGrid = dynamic(() => import("@/components/features-grid").then(mod => ({ default: mod.FeaturesGrid })), {
  loading: () => <div className="h-96" />
});

const CTASection = dynamic(() => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-96" />
});

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
      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
