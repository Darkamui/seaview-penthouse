import { CTASection } from "@/components/cta-section";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EventOverview } from "@/components/event-overview";
import { ScrollAnimation } from "@/components/scroll-animation";
import Image from "next/image";

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
  const tVacation = await getTranslations("vacation");
  return (
    <div className="min-h-[75vh] max-w-7xl mx-auto">
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
