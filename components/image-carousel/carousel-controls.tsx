"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import useKeypress from 'react-use-keypress';

export interface CarouselControlsProps {
  currentIndex: number;
  totalImages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPauseAutoplay: () => void;
}

export function CarouselControls({
  currentIndex,
  totalImages,
  onPrevious,
  onNext,
  onPauseAutoplay,
}: CarouselControlsProps) {
  const t = useTranslations('carousel');

  // Previous image (Arrow Left)
  useKeypress('ArrowLeft', () => {
    onPrevious();
    onPauseAutoplay();
  });

  // Next image (Arrow Right)
  useKeypress('ArrowRight', () => {
    onNext();
    onPauseAutoplay();
  });

  // Handle hover pause
  const handleMouseEnter = () => {
    onPauseAutoplay();
  };

  return (
    <>
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          onPrevious();
          onPauseAutoplay();
        }}
        onMouseEnter={handleMouseEnter}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full min-w-[48px] min-h-[48px] transition-all"
        aria-label={t('previous')}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          onNext();
          onPauseAutoplay();
        }}
        onMouseEnter={handleMouseEnter}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full min-w-[48px] min-h-[48px] transition-all"
        aria-label={t('next')}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Image Counter */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-4 py-2 rounded-full text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        {t('imageCounter', { current: currentIndex + 1, total: totalImages })}
      </div>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t('imageCounter', { current: currentIndex + 1, total: totalImages })}
      </div>
    </>
  );
}
