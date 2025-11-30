"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ElevatedCard, CardContent } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { ScrollAnimation } from "./scroll-animation";
import { ImageCarouselModal } from "@/components/image-carousel";

interface Feature {
  title: string;
  description: string;
  images: string[];
  galleryCategory: string;
}

interface FeaturesGridProps {
  translationNamespace: string;
  className?: string;
  featureUrls: Record<string, string[]>;
}

export function FeaturesGrid({
  translationNamespace,
  className = "",
  featureUrls,
}: FeaturesGridProps) {
  const t = useTranslations(translationNamespace);

  const [carouselModal, setCarouselModal] = useState<{
    isOpen: boolean;
    images: Array<{ src: string; alt: string }>;
    initialIndex: number;
    title: string;
  } | null>(null);

  const features: Feature[] = [
    {
      title: t("features.livingSpace.title"),
      description: t("features.livingSpace.description"),
      galleryCategory: "livingRoom",
      images: featureUrls['livingSpace'] || [],
    },
    {
      title: t("features.bedroom.title"),
      description: t("features.bedroom.description"),
      galleryCategory: "bedrooms",
      images: featureUrls['bedroom'] || [],
    },
    {
      title: t("features.balcony.title"),
      description: t("features.balcony.description"),
      galleryCategory: "balcony",
      images: featureUrls['balcony'] || [],
    },
    {
      title: t("features.location.title"),
      description: t("features.location.description"),
      galleryCategory: "around",
      images: featureUrls['location'] || [],
    },
  ];

  return (
    <section className={`py-8 px-4 bg-card/30 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={index}
              animation={index % 2 === 0 ? "left" : "right"}
              delay={index * 200}
            >
              <ElevatedCard
                className="border-accent/20 cursor-pointer overflow-hidden h-full flex flex-col group"
                onClick={() => {
                  setCarouselModal({
                    isOpen: true,
                    images: feature.images.map((src) => ({
                      src,
                      alt: feature.title,
                    })),
                    initialIndex: 0,
                    title: feature.title,
                  });
                }}
              >
                <Carousel
                  images={feature.images}
                  alt={feature.title}
                  autoplay
                  autoplayDelay={4000}
                />
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-sans text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </CardContent>
              </ElevatedCard>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Carousel Modal */}
      {carouselModal && (
        <ImageCarouselModal
          isOpen={carouselModal.isOpen}
          onClose={() => setCarouselModal(null)}
          images={carouselModal.images}
          initialIndex={carouselModal.initialIndex}
          context="features"
          title={carouselModal.title}
        />
      )}
    </section>
  );
}
