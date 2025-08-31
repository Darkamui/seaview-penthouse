import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, Briefcase, ChefHat, Camera, Baby } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("events");
  // Get nested translations for event types
  const getEventFeatures = (type: string): string[] => {
    try {
      const features = t(`eventTypes.${type}.features`);
      // Handle case where features might be returned as a single string or array
      if (Array.isArray(features)) {
        return features;
      }
      // Try to parse if it's a JSON string
      if (typeof features === 'string') {
        try {
          const parsed = JSON.parse(features);
          return Array.isArray(parsed) ? parsed : [features];
        } catch {
          return [features];
        }
      }
      return [];
    } catch {
      return [];
    }
  };

  const eventTypes = [
    {
      icon: Heart,
      title: t("eventTypes.intimate.title"),
      capacity: t("eventTypes.intimate.capacity"),
      description: t("eventTypes.intimate.description"),
      features: getEventFeatures("intimate"),
      image: "/wedding-proposal-setup-with-sea-view.png",
      color: "text-red-500",
    },
    {
      icon: Camera,
      title: t("eventTypes.bridal.title"),
      capacity: t("eventTypes.bridal.capacity"),
      description: t("eventTypes.bridal.description"),
      features: getEventFeatures("bridal"),
      image: "/images/bedroom.jpg",
      color: "text-pink-500",
    },
    {
      icon: Briefcase,
      title: t("eventTypes.business.title"),
      capacity: t("eventTypes.business.capacity"),
      description: t("eventTypes.business.description"),
      features: getEventFeatures("business"),
      image: "/business-meeting-in-luxury-penthouse.png",
      color: "text-blue-500",
    },
    {
      icon: Baby,
      title: t("eventTypes.family.title"),
      capacity: t("eventTypes.family.capacity"),
      description: t("eventTypes.family.description"),
      features: getEventFeatures("family"),
      image: "/family-celebration-in-penthouse-living-room.png",
      color: "text-green-500",
    },
    {
      icon: ChefHat,
      title: t("eventTypes.culinary.title"),
      capacity: t("eventTypes.culinary.capacity"),
      description: t("eventTypes.culinary.description"),
      features: getEventFeatures("culinary"),
      image: "/elegant-dinner-party-setup-on-penthouse-balcony.png",
      color: "text-orange-500",
    },
  ];

  // Get nested translations for spaces
  const getSpaceFeatures = (type: string): string[] => {
    try {
      const features = t(`spaces.${type}.features`);
      // Handle case where features might be returned as a single string or array
      if (Array.isArray(features)) {
        return features;
      }
      // Try to parse if it's a JSON string
      if (typeof features === 'string') {
        try {
          const parsed = JSON.parse(features);
          return Array.isArray(parsed) ? parsed : [features];
        } catch {
          return [features];
        }
      }
      return [];
    } catch {
      return [];
    }
  };

  const spaces = [
    {
      title: t("spaces.livingRoom.title"),
      description: t("spaces.livingRoom.description"),
      features: getSpaceFeatures("livingRoom"),
      image: "/images/living-room.jpg",
    },
    {
      title: t("spaces.balcony.title"),
      description: t("spaces.balcony.description"),
      features: getSpaceFeatures("balcony"),
      image: "/images/balcony-evening.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              {t("badge")}
            </Badge>
            <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
              {t("eventTypesTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("eventTypesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <Card
                key={index}
                className="border-accent/20 hover:border-accent/40 transition-colors overflow-hidden"
              >
                <div className="aspect-video relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center ${event.color}`}
                    >
                      <event.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {event.capacity}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-2">
                    {event.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
              {t("eventSpacesTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("eventSpacesSubtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {spaces.map((space, index) => (
              <div key={index} className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={space.image || "/placeholder.svg"}
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-sans text-2xl font-bold text-foreground mb-3">
                    {space.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {space.description}
                  </p>
                  <div className="space-y-3">
                    {space.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("readyToPlan")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            {t("readyToPlanSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {t("requestEventQuote")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent/20 hover:border-accent/40 bg-transparent"
            >
              {t("scheduleViewing")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
