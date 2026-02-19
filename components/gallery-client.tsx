"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import type { GalleryImage, GalleryVideo } from "@/lib/sanity.types";
import { ImageCarouselModal } from "@/components/image-carousel";
import { urlFor } from "@/lib/sanity.image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Phase 5: Code splitting for below-fold components
const CTASection = dynamic(
  () =>
    import("@/components/cta-section").then((mod) => ({
      default: mod.CTASection,
    })),
  {
    loading: () => <div className="h-96" />,
  },
);

interface GalleryCategory {
  id: string;
  name: string;
  images?: GalleryImage[];
  videos?: GalleryVideo[];
}

interface GalleryClientProps {
  categories: GalleryCategory[];
  initialTab?: string;
}

export function GalleryClient({ categories, initialTab }: GalleryClientProps) {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState(
    initialTab || categories[0]?.id || "livingRoom",
  );
  const [carouselModal, setCarouselModal] = useState<{
    isOpen: boolean;
    initialIndex: number;
  } | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

  // Phase 5: Progressive loading state
  const [visibleImageCount, setVisibleImageCount] = useState(8);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Tab switching loading state
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  const currentCategory = useMemo(
    () => categories.find((cat) => cat.id === activeCategory),
    [categories, activeCategory],
  );

  const currentImages = useMemo(
    () => currentCategory?.images || [],
    [currentCategory],
  );

  // Transform Sanity images to carousel format
  const carouselImages = useMemo(() => {
    return currentImages.map((image) => ({
      src: urlFor(image.image).url(),
      alt: image.alt[locale as keyof typeof image.alt] || image.alt.en || "",
    }));
  }, [currentImages, locale]);

  // Phase 5: Reset visible count and manage loading state when category changes
  useEffect(() => {
    setVisibleImageCount(8);

    // Clear loading state after brief delay for smooth transition
    if (isLoadingTab) {
      const timer = setTimeout(() => {
        setIsLoadingTab(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, isLoadingTab]);

  // Phase 5: Progressive loading with IntersectionObserver
  useEffect(() => {
    // Don't observe while loading tab
    if (isLoadingTab) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleImageCount < currentImages.length
        ) {
          setVisibleImageCount((prev) =>
            Math.min(prev + 6, currentImages.length),
          );
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current && visibleImageCount < currentImages.length) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [currentImages.length, visibleImageCount, activeCategory, isLoadingTab]);

  // Skeleton loader component
  const SkeletonGrid = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-accent/10 animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Category Navigation */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation
            animation="up"
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <ScrollAnimation
                key={category.id}
                animation="stagger"
                delay={index * 100}
                as="div"
              >
                <Button
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => {
                    if (category.id !== activeCategory) {
                      setIsLoadingTab(true);
                      setActiveCategory(category.id);
                    }
                  }}
                  className={
                    activeCategory === category.id
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "cursor-pointer border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                  }
                >
                  {category.name}
                </Button>
              </ScrollAnimation>
            ))}
          </ScrollAnimation>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoadingTab ? (
            // Skeleton loader during tab switching
            <SkeletonGrid />
          ) : activeCategory === "video" ? (
            // Video Grid
            <div
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentCategory?.videos?.map((video, index) => {
                const title =
                  video.title[locale as keyof typeof video.title] ||
                  video.title.en ||
                  "";
                const description =
                  video.description?.[
                    locale as keyof typeof video.description
                  ] ||
                  video.description?.en ||
                  "";
                const thumbnailSrc = video.thumbnail
                  ? urlFor(video.thumbnail).width(600).url()
                  : null;

                return (
                  <ScrollAnimation
                    key={video._id}
                    animation="stagger"
                    delay={index * 150}
                    className="group cursor-pointer"
                  >
                    <button
                      className="w-full text-start"
                      onClick={() => setActiveVideo(video)}
                      aria-label={`Play video: ${title}`}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-card border border-accent/20 hover:border-accent/40 transition-colors">
                        {thumbnailSrc ? (
                          <Image
                            src={thumbnailSrc}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted" />
                        )}
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-6 h-6 text-primary ml-1" />
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-4">
                        <h3 className="font-sans text-lg font-semibold mb-2">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-muted-foreground text-sm">
                            {description}
                          </p>
                        )}
                      </div> */}
                    </button>
                  </ScrollAnimation>
                );
              })}
            </div>
          ) : (
            // Image Grid
            <>
              <div
                key={activeCategory}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentImages
                  .slice(0, visibleImageCount)
                  .map((image, index) => (
                    <ScrollAnimation
                      key={index}
                      animation="stagger"
                      delay={index < 8 ? index * 50 : 0}
                      className="group cursor-pointer"
                    >
                      <div
                        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-card border border-accent/20 hover:border-accent/40 transition-colors"
                        onClick={() =>
                          setCarouselModal({
                            isOpen: true,
                            initialIndex: index,
                          })
                        }
                      >
                        <Image
                          src={urlFor(image.image).url() || "/placeholder.svg"}
                          alt={
                            image.alt[locale as keyof typeof image.alt] ||
                            image.alt.en ||
                            ""
                          }
                          fill
                          quality={85}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading={index < 6 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                      </div>
                    </ScrollAnimation>
                  ))}
              </div>
              {/* Phase 5: Intersection observer target for progressive loading */}
              {visibleImageCount < currentImages.length && (
                <div
                  ref={observerTarget}
                  className="h-20 flex items-center justify-center mt-8"
                >
                  <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Carousel Modal */}
      {carouselModal && (
        <ImageCarouselModal
          isOpen={carouselModal.isOpen}
          onClose={() => setCarouselModal(null)}
          images={carouselImages}
          initialIndex={carouselModal.initialIndex}
          context="gallery"
        />
      )}

      {/* Video Player Modal */}
      <Dialog
        open={activeVideo !== null}
        onOpenChange={(open) => {
          if (!open) setActiveVideo(null);
        }}
      >
        <DialogContent
          className="max-w-4xl w-full p-0 overflow-hidden bg-black border-0"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            {activeVideo
              ? activeVideo.title[locale as keyof typeof activeVideo.title] ||
                activeVideo.title.en ||
                "Video"
              : "Video"}
          </DialogTitle>
          {activeVideo && (
            <video
              key={activeVideo._id}
              className="w-full aspect-video"
              controls
              autoPlay
              playsInline
              src={activeVideo.videoUrl}
            />
          )}
        </DialogContent>
      </Dialog>

      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
