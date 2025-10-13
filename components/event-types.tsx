import { Baby, Briefcase, Camera, ChefHat, Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Carousel } from "./ui/carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import { ScrollAnimation } from "./scroll-animation";

export async function EventTypes() {
  const t = await getTranslations("events");
  const eventTypes = [
    {
      icon: Heart,
      title: t("eventTypes.intimate.title"),
      capacity: t("eventTypes.intimate.capacity"),
      description: t("eventTypes.intimate.description"),
      features: [
        t("eventTypes.intimate.feature1"),
        t("eventTypes.intimate.feature2"),
        t("eventTypes.intimate.feature3"),
      ],
      images: [
        "/images/room.jpg",
        "/images/room1.jpg",
        "/images/room2.jpg",
        "/images/room2.jpg",
        "/images/room3.jpg",
        "/images/room4.jpg",
        "/images/room5.jpg",
        "/images/room6.jpg",
      ],
      color: "text-red-500",
      href: "/vacation",
    },
    {
      icon: Camera,
      title: t("eventTypes.bridal.title"),
      capacity: t("eventTypes.bridal.capacity"),
      description: t("eventTypes.bridal.description"),
      features: [
        t("eventTypes.bridal.feature1"),
        t("eventTypes.bridal.feature2"),
        t("eventTypes.bridal.feature3"),
        t("eventTypes.bridal.feature4"),
      ],
      images: [
        "/images/events/bride.jpg",
        "/images/events/bridalPrep2.jpg",
        "/images/events/bridalPrep3.jpg",
      ],
      color: "text-pink-500",
      href: "/bridal-event",
    },
    {
      icon: Briefcase,
      title: t("eventTypes.business.title"),
      capacity: t("eventTypes.business.capacity"),
      description: t("eventTypes.business.description"),
      features: [
        t("eventTypes.business.feature1"),
        t("eventTypes.business.feature2"),
        t("eventTypes.business.feature3"),
        t("eventTypes.business.feature4"),
      ],
      images: [
        "/images/living3.jpg",
        "/images/living4.jpg",
        "/images/living5.jpg",
      ],
      color: "text-blue-500",
      href: "/events",
    },
  ];
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation animation="up" className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("eventTypesTitle")}
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => (
            <ScrollAnimation
              key={index}
              animation={index % 2 === 0 ? "left" : "right"}
              delay={index * 200}
            >
              <Card className="border-accent/20 hover:border-accent/40 transition-colors overflow-hidden flex flex-col h-full">
                <Carousel images={event.images} alt={event.title} />
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0 ${event.color}`}
                    >
                      <event.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg leading-tight mb-1">
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
                  <Link href={event.href} className="mx-auto">
                    <Button variant="default" className="mt-6 ">
                      {t("eventTypesCTA")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
