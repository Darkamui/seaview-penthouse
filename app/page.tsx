import { HeroSection } from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Quick Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">
              Luxury Redefined
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover an extraordinary penthouse experience where modern
              elegance meets coastal serenity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/living1.jpg"
                    alt="Spacious living room with sea views"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  150m² Living Space
                </h3>
                <p className="text-muted-foreground">
                  Expansive kitchen and living room designed for comfort and
                  entertaining
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/balcony7.jpg"
                    alt="270 square meter balcony with sea view"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  270m² Balcony
                </h3>
                <p className="text-muted-foreground">
                  Stunning outdoor terrace perfect for events and relaxation
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/room.jpg"
                    alt="Luxury bedroom with modern amenities"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">
                  Premium Amenities
                </h3>
                <p className="text-muted-foreground">
                  Every detail crafted for the ultimate luxury experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Image
            src="/images/logo.png"
            alt="The Sea View Penthouse"
            width={240}
            height={240}
            className="mx-auto mb-2"
          />
          {/* <h3 className="font-sans text-xl font-semibold mb-2">
            The Sea View Penthouse
          </h3>
          <p className="text-muted-foreground mb-4">Ashdod, Israel</p> */}
          <p className="text-sm text-muted-foreground">
            © 2025 J-Web. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
