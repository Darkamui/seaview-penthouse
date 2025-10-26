import { useTranslations } from "next-intl";
import Image from "next/image";

interface Space {
  title: string;
  description: string;
  features: string[];
  image: string;
}

export function EventSpaces() {
  const t = useTranslations("events");

  const spaces: Space[] = [
    {
      title: t("spaces.livingRoom.title"),
      description: t("spaces.livingRoom.description"),
      features: [
        t("spaces.livingRoom.feature1"),
        t("spaces.livingRoom.feature2"),
        t("spaces.livingRoom.feature3"),
        t("spaces.livingRoom.feature4"),
        t("spaces.livingRoom.feature5"),
      ],
      image: "/images/living4.jpg",
    },
    {
      title: t("spaces.balcony.title"),
      description: t("spaces.balcony.description"),
      features: [
        t("spaces.balcony.feature1"),
        t("spaces.balcony.feature2"),
        t("spaces.balcony.feature3"),
        t("spaces.balcony.feature4"),
        t("spaces.balcony.feature5"),
      ],
      image: "/images/balcony7.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("eventSpacesTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("eventSpacesSubtitle")}
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
                    <div key={featureIndex} className="flex items-center gap-3">
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
  );
}
