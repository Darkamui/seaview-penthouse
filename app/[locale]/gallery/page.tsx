"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const getGalleryCategories = (t: (key: string) => string) => [
  {
    id: "inside-spaces",
    name: t("categories.insideSpaces"),
    images: [
      {
        src: "/images/living.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/living1.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/living2.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/living3.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/living4.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/living5.jpg",
        alt: "Spacious living room with panoramic sea views",
      },
      {
        src: "/images/kitchen.jpg",
        alt: "Modern kitchen with premium appliances",
      },
      {
        src: "/images/kitchen1.jpg",
        alt: "Modern kitchen with premium appliances",
      },
      {
        src: "/images/kitchen2.jpg",
        alt: "Modern kitchen with premium appliances",
      },
      {
        src: "/images/room.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room1.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room2.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room3.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room4.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room5.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/room6.jpg",
        alt: "Luxury bedroom with natural textures",
      },
      {
        src: "/images/bath.jpg",
        alt: "Spa-like bathroom with modern fixtures",
      },
      {
        src: "/images/bath1.jpg",
        alt: "Spa-like bathroom with modern fixtures",
      },
      {
        src: "/images/bath2.jpg",
        alt: "Spa-like bathroom with modern fixtures",
      },
      {
        src: "/images/bath3.jpg",
        alt: "Spa-like bathroom with modern fixtures",
      },
    ],
  },
  {
    id: "balcony-sea-view",
    name: t("categories.balconySeaView"),
    images: [
      {
        src: "/images/balcony.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony1.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony2.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony3.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony4.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony5.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony6.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony7.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony8.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony9.jpg",
        alt: "Balcony at sunset with sea views",
      },
      {
        src: "/images/balcony10.jpg",
        alt: "Balcony at sunset with sea views",
      },
    ],
  },
  {
    id: "events",
    name: t("categories.events"),
    images: [],
  },
  {
    id: "video",
    name: t("categories.video"),
    videos: [
      {
        thumbnail: "/penthouse-virtual-tour-thumbnail.png",
        title: t("videoItems.virtualTour.title"),
        description: t("videoItems.virtualTour.description"),
      },
      {
        thumbnail: "/sunset-timelapse-from-balcony.png",
        title: t("videoItems.sunsetTimelapse.title"),
        description: t("videoItems.sunsetTimelapse.description"),
      },
      {
        thumbnail: "/penthouse-amenities-showcase.png",
        title: t("videoItems.amenitiesShowcase.title"),
        description: t("videoItems.amenitiesShowcase.description"),
      },
    ],
  },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("inside-spaces");
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Set active category from URL parameter on component mount
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveCategory(tabParam);
    }
  }, [searchParams]);

  const galleryCategories = getGalleryCategories(t);
  const currentCategory = galleryCategories.find(
    (cat) => cat.id === activeCategory
  );
  const currentImages = currentCategory?.images || [];

  const openLightbox = (image: { src: string; alt: string }, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!currentImages.length) return;

    let newIndex = lightboxIndex;
    if (direction === "prev") {
      newIndex =
        lightboxIndex > 0 ? lightboxIndex - 1 : currentImages.length - 1;
    } else {
      newIndex =
        lightboxIndex < currentImages.length - 1 ? lightboxIndex + 1 : 0;
    }

    setLightboxIndex(newIndex);
    setLightboxImage(currentImages[newIndex]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative py-20 px-4 bg-gradient-to-b from-card to-background">
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
      </section> */}

      {/* Category Navigation */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "cursor-pointer border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {activeCategory === "video" ? (
            // Video Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCategory?.videos?.map((video, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-card border border-accent/20 hover:border-accent/40 transition-colors">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-sans text-lg font-semibold mb-2">
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Image Grid
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentImages.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-card border border-accent/20 hover:border-accent/40 transition-colors">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={lightboxImage.src || "/placeholder.svg"}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {currentImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {lightboxIndex + 1} / {currentImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
