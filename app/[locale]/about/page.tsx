import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Users, Wifi, Car, Utensils, Bath, Bed } from "lucide-react";

export default function AboutPage() {
  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Car, label: "Private Parking" },
    { icon: Utensils, label: "Fully Equipped Kitchen" },
    { icon: Bath, label: "Luxury Bathroom" },
    { icon: Bed, label: "Premium Bedding" },
    { icon: Users, label: "Up to 8 Guests" },
  ];

  const features = [
    {
      title: "150m² Living Space",
      description:
        "Expansive open-plan kitchen and living room with floor-to-ceiling windows showcasing panoramic sea views.",
      image: "/images/living-room.jpg",
    },
    {
      title: "270m² Private Balcony",
      description:
        "Stunning outdoor terrace with premium furniture, perfect for entertaining and watching Mediterranean sunsets.",
      image: "/images/balcony-evening.jpg",
    },
    {
      title: "Luxury Bedroom Suite",
      description:
        "Elegantly appointed bedroom with premium linens, natural textures, and direct access to the balcony.",
      image: "/images/bedroom.jpg",
    },
    {
      title: "Spa-Like Bathroom",
      description:
        "Modern bathroom featuring premium fixtures, glass block walls, and luxury amenities for ultimate relaxation.",
      image: "/images/bathroom.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              About Our Penthouse
            </Badge>
            <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
              Penthouse in Details
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Discover every exquisite detail of our luxury sea view penthouse,
              where modern sophistication meets coastal elegance in the heart of
              Ashdod.
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
                <span className="text-accent font-medium">Ashdod, Israel</span>
              </div>
              <h2 className="font-sans text-3xl font-bold text-foreground mb-6">
                Prime Coastal Location
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Perched high above the Mediterranean coastline, our penthouse
                offers unobstructed sea views and easy access to Ashdod&apos;s
                finest beaches, restaurants, and cultural attractions. The
                strategic location provides both tranquility and convenience.
              </p>
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
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/balcony-sunset.jpg"
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
              Exceptional Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every space has been thoughtfully designed to provide the ultimate
              luxury experience
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
              Premium Amenities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a perfect stay, from modern conveniences
              to luxury touches
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
