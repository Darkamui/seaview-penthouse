"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  aspectRatio?: string;
}

export function Carousel({
  images,
  alt,
  className,
  autoplay = false,
  autoplayDelay = 3000,
  aspectRatio
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const minSwipeDistance = 50;
  const maxSwipeTime = 300; // Phase 5: Fast swipes for momentum feeling

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    if (autoplay && !isPaused && images.length > 1) {
      intervalRef.current = setInterval(goToNext, autoplayDelay);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoplay, isPaused, autoplayDelay, images.length, goToNext]);

  const handleMouseEnter = () => {
    if (autoplay) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (autoplay) setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartTime.current = Date.now(); // Phase 5: Track swipe speed
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const swipeTime = Date.now() - touchStartTime.current;

    // Phase 5: Fast swipes require less distance (momentum feeling)
    const requiredDistance = swipeTime < maxSwipeTime ? minSwipeDistance * 0.6 : minSwipeDistance;

    const isLeftSwipe = distance > requiredDistance;
    const isRightSwipe = distance < -requiredDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={cn("aspect-video relative bg-muted", className)}>
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          No images available
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={cn(aspectRatio || "aspect-video", "relative", className)}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={cn(aspectRatio || "aspect-video", "relative group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={currentIndex === 0}
      />

      {/* Phase 5: Enhanced touch targets for navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity min-w-[44px] min-h-[44px] sm:min-w-[auto] sm:min-h-[auto] flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity min-w-[44px] min-h-[44px] sm:min-w-[auto] sm:min-h-[auto] flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>
      
      {/* Phase 5: Enhanced touch targets for indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "min-w-[44px] min-h-[44px] sm:min-w-[auto] sm:min-h-[auto] flex items-center justify-center p-2 sm:p-0 rounded-full transition-colors",
              index === currentIndex ? "bg-white/20 sm:bg-transparent" : ""
            )}
            aria-label={`Go to image ${index + 1}`}
          >
            <span className={cn(
              "w-2 h-2 rounded-full transition-colors block",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
}