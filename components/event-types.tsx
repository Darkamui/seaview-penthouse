import { Briefcase, Camera, Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Carousel } from "./ui/carousel";
import { ScrollAnimation } from "./scroll-animation";
import { getAllEventTypeImages, groupImagesByEventType } from "@/lib/sanity.fetch";
import { urlFor } from "@/lib/sanity.image";

export async function EventTypes() {
  const t = await getTranslations("events");

  // Fetch images from Sanity
  const eventImages = await getAllEventTypeImages();
  const groupedImages = groupImagesByEventType(eventImages);

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
      images: groupedImages['intimate']?.map(img =>
        urlFor(img.image).width(800).url()
      ) || [],
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
      images: groupedImages['bridal']?.map(img =>
        urlFor(img.image).width(800).url()
      ) || [],
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
      images: groupedImages['business']?.map(img =>
        urlFor(img.image).width(800).url()
      ) || [],
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
                  {/* <Link href={event.href} className="mx-auto">
                    <Button variant="default" className="mt-6 ">
                      {t("eventTypesCTA")}
                    </Button>
                  </Link> */}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
