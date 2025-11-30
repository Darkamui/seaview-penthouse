"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { CarouselContent } from "./carousel-content";
import { useCarouselState, type CarouselContext } from "./use-carousel-state";

export interface ImageCarouselModalProps {
  images: Array<{ src: string; alt: string }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  context?: CarouselContext;
  title?: string;
}

export function ImageCarouselModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  context = "gallery",
  title,
}: ImageCarouselModalProps) {
  const t = useTranslations("carousel");

  // Initialize carousel state
  const carouselState = useCarouselState({
    images,
    initialIndex,
    context,
  });

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      carouselState.pauseAutoplay();
    }
  }, [isOpen, carouselState]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="!max-w-none !w-screen !h-screen !p-0 !m-0 !border-none !translate-x-0 !translate-y-0 !top-0 !left-0 !right-0 !bottom-0 !rounded-none !block overflow-hidden [&>button]:!opacity-100 [&>button]:!bg-white/20 [&>button]:hover:!bg-white/30 [&>button]:!text-white [&>button]:!w-12 [&>button]:!h-12 [&>button]:!top-4 [&>button]:!right-4 [&>button]:!rounded-full [&>button]:!z-50 [&>button>svg]:!w-12 [&>button>svg]:!h-6"
        showCloseButton
        aria-describedby={undefined}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <DialogTitle className="sr-only">{title || t("close")}</DialogTitle>

        <div className="relative w-full h-full">
          <CarouselContent images={images} carouselState={carouselState} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
