"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollAnimation } from "@/components/scroll-animation";
import { CTASection } from "@/components/cta-section";

export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <div className="">
      {/* Map Section */}
      <section className=" py-8 md:py-16 px-4 bg-card/30 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
              {t("ourLocation")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("locationSubtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                {t("primeCoastalLocation")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {t("locationDetails.address")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("locationDetails.addressDescription")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {t("locationDetails.beach")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("locationDetails.beachDescription")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {t("locationDetails.airport")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("locationDetails.airportDescription")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {t("locationDetails.walkingDistance")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("locationDetails.walkingDistanceDescription")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <Card className="border-accent/20">
              <CardContent className="p-0">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8234567890123!2d34.6401!3d31.8048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b7c123456789%3A0x987654321abcdef0!2sKineret%20St%2017%2C%20Ashdod%2C%20Israel!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
