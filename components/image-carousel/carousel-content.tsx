"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { CarouselControls } from "./carousel-controls";
import { CarouselThumbnails } from "./carousel-thumbnails";
import type { UseCarouselStateReturn } from "./use-carousel-state";

export interface CarouselContentProps {
  images: Array<{ src: string; alt: string }>;
  carouselState: UseCarouselStateReturn;
}

// Framer Motion animation variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Check for reduced motion preference
const getTransition = () => {
  if (typeof window !== "undefined") {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return shouldReduceMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 300, damping: 30 };
  }

  return { type: "spring" as const, stiffness: 300, damping: 30 };
};

export function CarouselContent({
  images,
  carouselState,
}: CarouselContentProps) {
  const {
    currentIndex,
    direction,
    goToNext,
    goToPrevious,
    goToIndex,
    pauseAutoplay,
  } = carouselState;

  // Swipe gesture handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      goToNext();
      pauseAutoplay();
    },
    onSwipedRight: () => {
      goToPrevious();
      pauseAutoplay();
    },
    trackMouse: true, // Enable mouse swipe on desktop
    preventScrollOnSwipe: true,
    delta: 50, // Minimum swipe distance
  });

  const transition = getTransition();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Main Image with Framer Motion */}
      <div className="absolute inset-0 pb-32">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            {...swipeHandlers}
            className="absolute inset-0 flex items-center justify-center px-4 pt-4 pb-4"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload adjacent images */}
      {currentIndex > 0 && (
        <link rel="preload" as="image" href={images[currentIndex - 1].src} />
      )}
      {currentIndex < images.length - 1 && (
        <link rel="preload" as="image" href={images[currentIndex + 1].src} />
      )}

      {/* Navigation Controls */}
      <CarouselControls
        currentIndex={currentIndex}
        totalImages={images.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onPauseAutoplay={pauseAutoplay}
      />

      {/* Thumbnail Navigation */}
      <CarouselThumbnails
        images={images}
        currentIndex={currentIndex}
        onThumbnailClick={goToIndex}
        onPauseAutoplay={pauseAutoplay}
      />
    </div>
  );
}
