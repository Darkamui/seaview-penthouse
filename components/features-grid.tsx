import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  images: string[];
  galleryCategory: string;
}

interface FeaturesGridProps {
  translationNamespace: string;
  className?: string;
}

export function FeaturesGrid({
  translationNamespace,
  className = "",
}: FeaturesGridProps) {
  const t = useTranslations(translationNamespace);
  const locale = useLocale();

  const features: Feature[] = [
    {
      title: t("features.livingSpace.title"),
      description: t("features.livingSpace.description"),
      galleryCategory: "inside-spaces",
      images: [
        "/images/living.jpg",
        "/images/living1.jpg",
        "/images/living2.jpg",
        "/images/living3.jpg",
        "/images/living4.jpg",
        "/images/living5.jpg",
      ],
    },
    {
      title: t("features.bedroom.title"),
      description: t("features.bedroom.description"),
      galleryCategory: "inside-spaces",
      images: [
        "/images/room.jpg",
        "/images/room1.jpg",
        "/images/room2.jpg",
        "/images/room3.jpg",
        "/images/room4.jpg",
        "/images/room5.jpg",
        "/images/room6.jpg",
      ],
    },
    {
      title: t("features.balcony.title"),
      description: t("features.balcony.description"),
      galleryCategory: "balcony-sea-view",
      images: [
        "/images/balcony.jpg",
        "/images/balcony1.jpg",
        "/images/balcony2.jpg",
        "/images/balcony3.jpg",
        "/images/balcony4.jpg",
        "/images/balcony5.jpg",
        "/images/balcony6.jpg",
        "/images/balcony7.jpg",
        "/images/balcony8.jpg",
        "/images/balcony9.jpg",
        "/images/balcony10.jpg",
      ],
    },
    {
      title: t("features.location.title"),
      description: t("features.location.description"),
      galleryCategory: "inside-spaces",
      images: [
        "/images/kitchen.jpg",
        "/images/kitchen1.jpg",
        "/images/kitchen2.jpg",
        "/images/bath.jpg",
        "/images/bath1.jpg",
        "/images/bath2.jpg",
        "/images/bath3.jpg",
      ],
    },
  ];

  return (
    <section className={`py-16 px-4 bg-card/30 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("featuresTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={`/${locale}/gallery?tab=${feature.galleryCategory}`}
              className="group block"
            >
              <Card className="border-accent/20 hover:border-accent/40 transition-all hover:scale-[1.02] cursor-pointer overflow-hidden group-hover:shadow-lg">
                <Carousel
                  images={feature.images}
                  alt={feature.title}
                  autoplay
                  autoplayDelay={4000}
                />
                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
