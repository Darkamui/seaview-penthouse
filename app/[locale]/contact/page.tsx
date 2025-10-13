"use client";

import type React from "react";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollAnimation } from "@/components/scroll-animation";
import { CTASection } from "@/components/cta-section";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: "",
          eventType: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `New message from SeaviewPenthouse
    
Details:
- Name: ${formData.name || "Not provided"}
- Check-in: ${formData.checkIn || "Not specified"}
- Check-out: ${formData.checkOut || "Not specified"}
- Guests: ${formData.guests || "Not specified"}
- Event Type: ${formData.eventType || "Vacation rental"}
- Message: ${formData.message || "Please send me more information"}
`;

    const whatsappUrl = `https://wa.me/972546606233?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("contactInfo.phone.title"),
      details: ["972-546-606-233+", t("contactInfo.phone.availability")],
      action: "tel:+972546606233",
    },
    {
      icon: Mail,
      title: t("contactInfo.email.title"),
      details: ["rachel.yer@gmail.com", t("contactInfo.email.response")],
      action: "mailto:rachel.yer@gmail.com",
    },
    // {
    //   icon: MapPin,
    //   title: t("contactInfo.location.title"),
    //   details: [
    //     t("contactInfo.location.address"),
    //     t("contactInfo.location.distance"),
    //   ],
    //   action: null,
    // },
    {
      icon: Clock,
      title: t("contactInfo.checkInOut.title"),
      details: [
        t("contactInfo.checkInOut.checkIn"),
        t("contactInfo.checkInOut.checkOut"),
      ],
      action: null,
    },
  ];

  return (
    <div className="md:min-h-[75vh] grid grid-cols-1 items-center justify-center">
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
