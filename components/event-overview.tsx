"use client";

import { useTranslations } from "next-intl";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";

interface EventOverviewProps {
  eventKey: string;
  imageSrc?: string;
  imageAlt?: string;
  images?: string[];
  reverse?: boolean;
}

export function EventOverview({
  eventKey,
  imageSrc,
  imageAlt,
  images,
  reverse = false
}: EventOverviewProps) {
  const t = useTranslations("eventOverviews");
  
  const title = t(`${eventKey}.title`);
  const description = t(`${eventKey}.description`);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          reverse ? "lg:grid-flow-col-dense" : ""
        }`}>
          {/* Text Content */}
          <div className={`space-y-6 ${reverse ? "lg:col-start-2" : ""}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight whitespace-pre-line">
              {title}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* Image/Carousel */}
          <div className={`relative ${reverse ? "lg:col-start-1" : ""}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {images && images.length > 1 ? (
                <Carousel
                  images={images}
                  alt={imageAlt || "Event space"}
                  aspectRatio="aspect-[4/3]"
                  autoplay
                  autoplayDelay={5000}
                />
              ) : (
                <Image
                  src={imageSrc || images?.[0] || ""}
                  alt={imageAlt || "Event space"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}