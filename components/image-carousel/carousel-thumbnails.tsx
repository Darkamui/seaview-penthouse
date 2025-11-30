"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface CarouselThumbnailsProps {
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
  onPauseAutoplay: () => void;
}

const THUMBNAIL_RANGE = 15; // Show ±15 images around current

export function CarouselThumbnails({
  images,
  currentIndex,
  onThumbnailClick,
  onPauseAutoplay,
}: CarouselThumbnailsProps) {
  const t = useTranslations("carousel");
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbnailRef.current && thumbnailsRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Calculate visible range (30 total: ±15 from current)
  const startIndex = Math.max(0, currentIndex - THUMBNAIL_RANGE);
  const endIndex = Math.min(images.length, currentIndex + THUMBNAIL_RANGE + 1);
  const visibleThumbnails = images.slice(startIndex, endIndex);

  if (images.length <= 1) return null;

  return (
    <div
      ref={thumbnailsRef}
      className="absolute bottom-28 md:bottom-8 left-0 right-0 z-20 flex justify-center px-4"
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full py-2">
        {visibleThumbnails.map((image, idx) => {
          const actualIndex = startIndex + idx;
          const isActive = actualIndex === currentIndex;

          return (
            <button
              key={actualIndex}
              ref={isActive ? activeThumbnailRef : null}
              onClick={() => {
                onThumbnailClick(actualIndex);
                onPauseAutoplay();
              }}
              className={cn(
                "relative flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300",
                "hover:opacity-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50",
                isActive
                  ? "w-20 h-20 border-white scale-110 ring-2 ring-white/50 opacity-100"
                  : "w-16 h-16 border-transparent opacity-60"
              )}
              aria-label={t("thumbnail", { index: actualIndex + 1 })}
              aria-current={isActive ? "true" : undefined}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
