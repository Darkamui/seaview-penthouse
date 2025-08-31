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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in booking The Sea View Penthouse. 
    
Details:
- Name: ${formData.name || "Not provided"}
- Check-in: ${formData.checkIn || "Not specified"}
- Check-out: ${formData.checkOut || "Not specified"}
- Guests: ${formData.guests || "Not specified"}
- Event Type: ${formData.eventType || "Vacation rental"}
- Message: ${formData.message || "Please send me more information"}
    
Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/972546606233?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("contactInfo.phone.title"),
      details: [
        t("contactInfo.phone.number"),
        t("contactInfo.phone.availability"),
      ],
      action: "tel:+972546606233",
    },
    {
      icon: Mail,
      title: t("contactInfo.email.title"),
      details: [
        t("contactInfo.email.address"),
        t("contactInfo.email.response"),
      ],
      action: "mailto:rachel.yer@gmail.com",
    },
    {
      icon: MapPin,
      title: t("contactInfo.location.title"),
      details: [
        t("contactInfo.location.address"),
        t("contactInfo.location.distance"),
      ],
      action: null,
    },
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

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  {t("bookingInquiry")}
                </CardTitle>
                <p className="text-muted-foreground">
                  {t("bookingInquirySubtitle")}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("form.fullName")} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder={t("form.fullNamePlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("form.email")} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder={t("form.emailPlaceholder")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("form.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">{t("form.checkInDate")} *</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) =>
                          handleInputChange("checkIn", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">
                        {t("form.checkOutDate")} *
                      </Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) =>
                          handleInputChange("checkOut", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">{t("form.numberOfGuests")}</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("guests", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.selectGuests")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 {t("form.guest")}</SelectItem>
                          <SelectItem value="2">
                            2 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="3">
                            3 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="4">
                            4 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="5">
                            5 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="6">
                            6 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="7">
                            7 {t("form.guests")}
                          </SelectItem>
                          <SelectItem value="8">
                            8 {t("form.guests")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">
                        {t("form.purposeOfStay")}
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("eventType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.selectPurpose")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">
                            {t("form.purposes.vacation")}
                          </SelectItem>
                          <SelectItem value="business">
                            {t("form.purposes.business")}
                          </SelectItem>
                          <SelectItem value="wedding">
                            {t("form.purposes.wedding")}
                          </SelectItem>
                          <SelectItem value="family">
                            {t("form.purposes.family")}
                          </SelectItem>
                          <SelectItem value="event">
                            {t("form.purposes.event")}
                          </SelectItem>
                          <SelectItem value="other">
                            {t("form.purposes.other")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("form.specialRequests")}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder={t("form.specialRequestsPlaceholder")}
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {t("form.sendInquiry")}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t("form.whatsappUs")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-sans text-2xl font-bold text-foreground mb-6">
                  {t("getInTouch")}
                </h2>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="border-accent/20 hover:border-accent/40 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {info.title}
                            </h3>
                            {info.details.map((detail, detailIndex) => (
                              <p
                                key={detailIndex}
                                className="text-muted-foreground text-sm"
                              >
                                {detail}
                              </p>
                            ))}
                            {info.action && (
                              <Button
                                variant="link"
                                className="p-0 h-auto text-accent hover:text-accent/80 mt-2"
                                onClick={() =>
                                  window.open(info.action!, "_blank")
                                }
                              >
                                {t("contactNow")}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    {t("quickFacts")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        420m²
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFactsItems.totalSpace")}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        8
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFactsItems.maxGuests")}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        200m
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFactsItems.toBeach")}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFactsItems.support")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-card/30">
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
    </div>
  );
}
