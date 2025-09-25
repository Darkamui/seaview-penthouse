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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
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
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Error submitting form:', error);
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
    <div className="min-h-screen">
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
                        className="bg-white/80"
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
                        className="bg-white/80"
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
                      className="bg-white/80"
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
                        className="bg-white/80"
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
                        className="bg-white/80"
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
                        <SelectTrigger className="bg-white/80">
                          <SelectValue placeholder={t("form.selectGuests")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {[...Array(12)].map((_, i) => {
                            const value = i + 1;
                            return (
                              <SelectItem key={value} value={String(value)}>
                                {value}{" "}
                                {t(value === 1 ? "form.guest" : "form.guests")}
                              </SelectItem>
                            );
                          })}
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
                        <SelectTrigger className="bg-white/80">
                          <SelectValue placeholder={t("form.selectPurpose")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
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
                      className="bg-white/80"
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder={t("form.specialRequestsPlaceholder")}
                      rows={4}
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <p className="font-medium">{t('form.successMessage')}</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <p className="font-medium">{t('form.errorMessage')}</p>
                      {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('form.sending') : t("form.sendInquiry")}
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
                {/* <h2 className="font-sans text-2xl font-bold text-foreground mb-6">
                  {t("getInTouch")}
                </h2> */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 px-4 bg-card/30">
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
