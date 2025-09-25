import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin } from "lucide-react";

export function LocationOverview() {
  const t = useTranslations("homepage");

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">
                {t("location")}
              </span>
            </div>
            <h2 className="font-sans text-3xl font-bold text-foreground mb-6">
              {t("locationTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="font-sans text-2xl font-bold text-accent mb-1">
                  570m²
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("totalSpace")}
                </div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="font-sans text-2xl font-bold text-accent mb-1">
                  12
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("maxGuests")}
                </div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="font-sans text-2xl font-bold text-accent mb-1">
                  30
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("totalGuests")}
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
  );
}