import { useState, useEffect, useCallback, useRef } from 'react';

export type CarouselContext = 'features' | 'events' | 'gallery';

export interface UseCarouselStateProps {
  images: Array<{ src: string; alt: string }>;
  initialIndex?: number;
  context: CarouselContext;
}

export interface UseCarouselStateReturn {
  currentIndex: number;
  direction: number;
  isAutoplayActive: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
}

const AUTOPLAY_CONFIG = {
  features: { enabled: true, delay: 4000 },
  events: { enabled: true, delay: 3000 },
  gallery: { enabled: false, delay: 0 },
};

export function useCarouselState({
  images,
  initialIndex = 0,
  context,
}: UseCarouselStateProps): UseCarouselStateReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const [isAutoplayActive, setIsAutoplayActive] = useState(
    AUTOPLAY_CONFIG[context].enabled
  );
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = AUTOPLAY_CONFIG[context];

  // Clear autoplay interval
  const clearAutoplayInterval = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  // Clear resume timeout
  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  // Navigate to next image
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Navigate to specific index
  const goToIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;

      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Pause autoplay
  const pauseAutoplay = useCallback(() => {
    clearAutoplayInterval();
    clearResumeTimeout();
    setIsAutoplayActive(false);
  }, [clearAutoplayInterval, clearResumeTimeout]);

  // Resume autoplay after delay
  const resumeAutoplay = useCallback(() => {
    if (!config.enabled) return;

    clearResumeTimeout();

    // Resume after 5 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoplayActive(true);
    }, 5000);
  }, [config.enabled, clearResumeTimeout]);

  // Autoplay effect
  useEffect(() => {
    if (!config.enabled || !isAutoplayActive || images.length <= 1) {
      clearAutoplayInterval();
      return;
    }

    autoplayIntervalRef.current = setInterval(() => {
      goToNext();
    }, config.delay);

    return () => {
      clearAutoplayInterval();
    };
  }, [
    config.enabled,
    config.delay,
    isAutoplayActive,
    images.length,
    goToNext,
    clearAutoplayInterval,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAutoplayInterval();
      clearResumeTimeout();
    };
  }, [clearAutoplayInterval, clearResumeTimeout]);

  return {
    currentIndex,
    direction,
    isAutoplayActive,
    goToNext,
    goToPrevious,
    goToIndex,
    pauseAutoplay,
    resumeAutoplay,
  };
}
