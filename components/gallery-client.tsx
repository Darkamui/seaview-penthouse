"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";
import dynamic from "next/dynamic";
import type { GalleryImage } from "@/lib/get-gallery-images";

// Phase 5: Code splitting for below-fold components
const CTASection = dynamic(
  () => import("@/components/cta-section").then((mod) => ({ default: mod.CTASection })),
  {
    loading: () => <div className="h-96" />,
  }
);

interface VideoItem {
  thumbnail: string;
  title: string;
  description: string;
}

interface GalleryCategory {
  id: string;
  name: string;
  images?: GalleryImage[];
  videos?: VideoItem[];
}

interface GalleryClientProps {
  categories: GalleryCategory[];
  initialTab?: string;
}

export function GalleryClient({ categories, initialTab }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState(
    initialTab || categories[0]?.id || "livingRoom"
  );
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Phase 5: Progressive loading state
  const [visibleImageCount, setVisibleImageCount] = useState(8);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Tab switching loading state
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  // Phase 5: Touch gesture state for lightbox
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);

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

  const currentCategory = categories.find((cat) => cat.id === activeCategory);
  const currentImages = currentCategory?.images || [];

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
            Math.min(prev + 6, currentImages.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current && visibleImageCount < currentImages.length) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [currentImages.length, visibleImageCount, activeCategory, isLoadingTab]);

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

  // Phase 5: Touch gesture handlers for lightbox
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleLightboxTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    // Horizontal swipe (navigate images)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        navigateLightbox("next"); // Swipe left
      } else {
        navigateLightbox("prev"); // Swipe right
      }
    }
    // Vertical swipe down (close lightbox)
    else if (diffY < -minSwipeDistance && Math.abs(diffY) > Math.abs(diffX)) {
      closeLightbox();
    }
  };

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
              {currentCategory?.videos?.map((video, index) => (
                <ScrollAnimation
                  key={index}
                  animation="stagger"
                  delay={index * 150}
                  className="group cursor-pointer"
                >
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
                </ScrollAnimation>
              ))}
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
                        onClick={() => openLightbox(image, index)}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
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

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={lightboxImage.src || "/placeholder.svg"}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority
              sizes="100vw"
            />

            {/* Close Button - Phase 5: Enhanced touch target */}
            <Button
              variant="ghost"
              size="lg"
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20 min-w-[44px] min-h-[44px] p-3"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons - Phase 5: Enhanced touch targets */}
            {currentImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 min-w-[44px] min-h-[44px] p-3"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 min-w-[44px] min-h-[44px] p-3"
                  aria-label="Next image"
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
      <ScrollAnimation animation="up">
        <CTASection translationNamespace="events" />
      </ScrollAnimation>
    </div>
  );
}
