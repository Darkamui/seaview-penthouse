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
  const minSwipeDistance = 50;

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
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

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
      />
      
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}