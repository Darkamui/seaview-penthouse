import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, Briefcase, ChefHat, Camera, Baby } from "lucide-react";

export default function EventsPage() {
  const eventTypes = [
    {
      icon: Heart,
      title: "Intimate Events",
      capacity: "Up to 30 guests",
      description:
        "Perfect for wedding proposals, anniversary celebrations, and romantic chef dinners",
      features: [
        "Private chef service",
        "Romantic setup",
        "Sunset views",
        "Premium sound system",
      ],
      image: "/wedding-proposal-setup-with-sea-view.png",
      color: "text-red-500",
    },
    {
      icon: Camera,
      title: "Bridal Preparation",
      capacity: "Bridal party of 8-12",
      description:
        "Elegant space for getting ready with natural light and luxury amenities",
      features: [
        "Professional lighting",
        "Spacious bedroom",
        "Luxury bathroom",
        "Balcony photo ops",
      ],
      image: "/images/bedroom.jpg",
      color: "text-pink-500",
    },
    {
      icon: Briefcase,
      title: "Business Events",
      capacity: "Up to 25 professionals",
      description:
        "Sophisticated venue for corporate meetings, product launches, and networking",
      features: [
        "High-speed WiFi",
        "Presentation setup",
        "Catering space",
        "Professional ambiance",
      ],
      image: "/business-meeting-in-luxury-penthouse.png",
      color: "text-blue-500",
    },
    {
      icon: Baby,
      title: "Family Vacations",
      capacity: "Up to 8 family members",
      description:
        "Spacious accommodation for multi-generational family gatherings",
      features: [
        "Multiple sleeping areas",
        "Family-friendly amenities",
        "Safe balcony",
        "Kitchen facilities",
      ],
      image: "/family-celebration-in-penthouse-living-room.png",
      color: "text-green-500",
    },
    {
      icon: ChefHat,
      title: "Culinary Experiences",
      capacity: "Up to 20 guests",
      description:
        "Premium kitchen space for cooking classes and gourmet dining experiences",
      features: [
        "Professional kitchen",
        "Dining for 20",
        "Sea view dining",
        "Chef workspace",
      ],
      image: "/elegant-dinner-party-setup-on-penthouse-balcony.png",
      color: "text-orange-500",
    },
  ];

  const spaces = [
    {
      title: "150m² Kitchen & Living Room",
      description:
        "Expansive open-plan space perfect for entertaining and events",
      features: [
        "Floor-to-ceiling windows with sea views",
        "Modern fully-equipped kitchen",
        "Comfortable seating for 20+ guests",
        "Premium sound and lighting systems",
        "Direct access to balcony",
      ],
      image: "/images/living-room.jpg",
    },
    {
      title: "270m² Private Balcony",
      description: "Stunning outdoor venue with panoramic Mediterranean views",
      features: [
        "Unobstructed sea views",
        "Premium outdoor furniture",
        "Multiple seating areas",
        "Perfect for sunset events",
        "Weather-protected sections",
      ],
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
              Event Hosting
            </Badge>
            <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
              Unforgettable Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Host your most important moments in our luxury penthouse, where
              every celebration becomes extraordinary against the backdrop of
              the Mediterranean Sea.
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
              Event Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate gatherings to business meetings, our penthouse
              adapts to your vision
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
              Event Spaces
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two distinct areas that can be used together or separately for
              your perfect event
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
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Let us help you create an unforgettable experience in our luxury
            penthouse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Request Event Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent/20 hover:border-accent/40 bg-transparent"
            >
              Schedule Viewing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
