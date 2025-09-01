import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Users, Wifi, Car, Utensils, Bath, Bed } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const amenities = [
    { icon: Wifi, label: t("amenitiesItems.highSpeedWifi") },
    { icon: Car, label: t("amenitiesItems.privateParking") },
    { icon: Utensils, label: t("amenitiesItems.fullyEquippedKitchen") },
    { icon: Bath, label: t("amenitiesItems.luxuryBathroom") },
    { icon: Bed, label: t("amenitiesItems.premiumBedding") },
    { icon: Users, label: t("amenitiesItems.upToEightGuests") },
  ];

  const features = [
    {
      title: t("features.livingSpace.title"),
      description: t("features.livingSpace.description"),
      image: "/images/living.jpg",
    },
    {
      title: t("features.balcony.title"),
      description: t("features.balcony.description"),
      image: "/images/balcony.jpg",
    },
    {
      title: t("features.bedroom.title"),
      description: t("features.bedroom.description"),
      image: "/images/room.jpg",
    },
    {
      title: t("features.bathroom.title"),
      description: t("features.bathroom.description"),
      image: "/images/bath.jpg",
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

      {/* Location & Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium">{t("location")}</span>
              </div>
              <h2 className="font-sans text-3xl font-bold text-foreground mb-6">
                {t("locationTitle")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("locationDescription")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg">
                  <div className="font-sans text-2xl font-bold text-accent mb-1">
                    420m²
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("totalSpace")}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <div className="font-sans text-2xl font-bold text-accent mb-1">
                    8
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("maxGuests")}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/balcony9.jpg"
                alt="Penthouse balcony with stunning sea views"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-card/30">
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
              <Card
                key={index}
                className="border-accent/20 hover:border-accent/40 transition-colors overflow-hidden"
              >
                <div className="aspect-video relative">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
              {t("amenitiesTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("amenitiesSubtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-card rounded-lg border border-accent/20"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <amenity.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="font-medium text-foreground">
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
