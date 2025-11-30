"use client";

import React, { useState } from "react";
import { Briefcase, Camera, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Carousel } from "./ui/carousel";
import { ScrollAnimation } from "./scroll-animation";
import { ImageCarouselModal } from "@/components/image-carousel";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  camera: Camera,
  briefcase: Briefcase,
};

interface EventType {
  iconName: string;
  title: string;
  capacity: string;
  description: string;
  features: string[];
  images: Array<{ src: string; alt: string }>;
  color: string;
}

interface EventTypesClientProps {
  eventTypes: EventType[];
}

export function EventTypesClient({ eventTypes }: EventTypesClientProps) {
  const t = useTranslations("events");

  const [carouselModal, setCarouselModal] = useState<{
    isOpen: boolean;
    images: Array<{ src: string; alt: string }>;
    initialIndex: number;
    title: string;
  } | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="up" className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("eventTypesTitle")}
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => {
            const Icon = ICON_MAP[event.iconName] || Heart;

            return (
              <ScrollAnimation
                key={index}
                animation={index % 2 === 0 ? "left" : "right"}
                delay={index * 200}
              >
                <Card
                  className="border-accent/20 hover:border-accent/40 transition-colors overflow-hidden flex flex-col h-full cursor-pointer group"
                  onClick={() => {
                    setCarouselModal({
                      isOpen: true,
                      images: event.images,
                      initialIndex: 0,
                      title: event.title,
                    });
                  }}
                >
                  <Carousel
                    images={event.images.map((img) => img.src)}
                    alt={event.title}
                  />
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0 ${event.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg leading-tight mb-1 group-hover:text-accent transition-colors">
                        {event.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {event.capacity}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-3 mt-auto">
                    {event.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
            );
          })}
        </div>
      </div>

      {/* Carousel Modal */}
      {carouselModal && (
        <ImageCarouselModal
          isOpen={carouselModal.isOpen}
          onClose={() => setCarouselModal(null)}
          images={carouselModal.images}
          initialIndex={carouselModal.initialIndex}
          context="events"
          title={carouselModal.title}
        />
      )}
    </section>
  );
}
