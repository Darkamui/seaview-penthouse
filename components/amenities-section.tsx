import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AmenitiesModal } from "@/components/amenities-modal";
import { Wifi, Car, Utensils, Waves, Bath, Wind, Eye, Home } from "lucide-react";

export function AmenitiesSection() {
  const t = useTranslations("homepage");

  const featuredAmenities = [
    { icon: Wifi, label: t("amenitiesItems.highSpeedWifi") },
    { icon: Car, label: t("amenitiesItems.privateParking") },
    { icon: Utensils, label: t("amenitiesItems.fullyEquippedKitchen") },
    { icon: Waves, label: t("amenitiesItems.seaView") },
    { icon: Bath, label: t("amenitiesItems.privateHotTub") },
    { icon: Wind, label: t("amenitiesItems.airConditioning") },
    { icon: Eye, label: t("amenitiesItems.privateBalcony") },
    { icon: Home, label: t("amenitiesItems.washerDryer") },
  ];

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("amenitiesTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("amenitiesSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-card rounded-lg border border-accent/20 hover:border-accent/40 transition-colors"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <amenity.icon className="w-6 h-6 text-accent" />
              </div>
              <span className="font-medium text-foreground">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <AmenitiesModal>
            <Button variant="outline" size="lg">
              {t("amenitiesItems.viewAllAmenities")}
            </Button>
          </AmenitiesModal>
        </div>
      </div>
    </section>
  );
}