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
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Calendar,
} from "lucide-react";

export default function ContactPage() {
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

    const whatsappUrl = `https://wa.me/972501234567?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+972 50-123-4567", "Available 24/7"],
      action: "tel:+972501234567",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@seaviewpenthouse.com", "Response within 2 hours"],
      action: "mailto:info@seaviewpenthouse.com",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Kineret 17, Ashdod", "200m from the beach"],
      action: null,
    },
    {
      icon: Clock,
      title: "Check-in/out",
      details: ["Check-in: 3:00 PM", "Check-out: 11:00 AM"],
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
              Get In Touch
            </Badge>
            <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Ready to experience luxury? Contact us to book your stay or plan
              your perfect event at our sea view penthouse.
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
                  Booking Inquiry
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within
                  2 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in Date *</Label>
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
                      <Label htmlFor="checkOut">Check-out Date *</Label>
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
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("guests", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5 Guests</SelectItem>
                          <SelectItem value="6">6 Guests</SelectItem>
                          <SelectItem value="7">7 Guests</SelectItem>
                          <SelectItem value="8">8 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Purpose of Stay</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("eventType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">
                            Vacation Rental
                          </SelectItem>
                          <SelectItem value="business">
                            Business Trip
                          </SelectItem>
                          <SelectItem value="wedding">
                            Wedding/Proposal
                          </SelectItem>
                          <SelectItem value="family">
                            Family Gathering
                          </SelectItem>
                          <SelectItem value="event">Private Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Special Requests or Questions
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about any special requirements, questions, or how we can make your stay perfect..."
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Send Inquiry
                    </Button>
                    <Button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-sans text-2xl font-bold text-foreground mb-6">
                  Get In Touch
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
                                Contact Now
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
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        420m²
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Space
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        8
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Max Guests
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        200m
                      </div>
                      <div className="text-sm text-muted-foreground">
                        To Beach
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <div className="font-sans text-2xl font-bold text-accent mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Support
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
              Our Location
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Perfectly positioned in Ashdod with stunning sea views and easy
              access to the city&apos;s best attractions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                Prime Coastal Location
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      Kineret 17, Ashdod, Israel
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Premium residential area with sea access
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">200m to Beach</p>
                    <p className="text-sm text-muted-foreground">
                      Direct access to Ashdod&apos;s beautiful coastline
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      45 min from Ben Gurion Airport
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Easy access via highway or public transport
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      Walking distance to amenities
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Restaurants, shopping, and cultural sites nearby
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
