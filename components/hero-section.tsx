"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const SLIDE_DURATION = 3000; // 3 seconds
const HERO_IMAGES = [
  "/images/hero0.jpg",
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  const heroMedia = useMemo(
    () => [
      {
        type: "image" as const,
        src: HERO_IMAGES[0],
        alt: t("altTexts.seaViewSunset"),
      },
      {
        type: "image" as const,
        src: HERO_IMAGES[1],
        alt: t("altTexts.spaciousLiving"),
      },
      {
        type: "image" as const,
        src: HERO_IMAGES[2],
        alt: t("altTexts.eveningBalcony"),
      },
      {
        type: "image" as const,
        src: HERO_IMAGES[3],
        alt: t("altTexts.eveningBalcony"),
      },
    ],
    [t]
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(100);

  // Optimized single useEffect for carousel and progress using requestAnimationFrame
  useEffect(() => {
    if (!isAutoPlaying) return;

    const startTime = Date.now();
    let rafId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.max(0, 100 - (elapsed / SLIDE_DURATION) * 100);

      setProgress(newProgress);

      if (elapsed >= SLIDE_DURATION) {
        setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
        setProgress(100);
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying, currentMediaIndex, heroMedia.length]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
    setProgress(100);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentMediaIndex(index);
    setIsAutoPlaying(false);
    setProgress(100);
  }, []);

  const scrollToContent = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="relative h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] flex items-end justify-end overflow-hidden">
      {/* Background Media Carousel */}
      <div className="absolute inset-0 z-0">
        {heroMedia.map((media, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentMediaIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={media.src || "/placeholder.svg"}
              alt={media.alt}
              fill
              className="object-cover"
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              onLoad={() => index === 0 && setIsLoaded(true)}
            />
          </div>
        ))}
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 " />
      </div>

      {/* Hero Content */}
      {/* <div
        className={`relative z-10 text-center text-white max-w-6xl mx-auto px-4 transition-all duration-1000`}
      >
        <div className="space-y-8 mb-32">
          <div className="flex flex-col gap-4 justify-center items-center pt-4">
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer glass-luxury text-black hover:bg-white/90 text-lg px-8 py-4 h-auto shadow-luxury-medium hover:shadow-luxury-lg transition-all duration-500 hover:scale-105"
              >
                {t("virtualTour")}
              </Button>
            </Link>
            <Link href="https://wa.me/972546606233" target="_blank">
              <Button
                size="default"
                className="cursor-pointer bg-accent/90 hover:bg-accent text-accent-foreground text-md  h-auto font-semibold btn-luxury-subtle luxury-hover-subtle shadow-luxury-lg"
              >
                {t("bookStay")}
              </Button>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Media Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 glass rounded-full px-6 py-3 shadow-lg">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {heroMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-ring relative overflow-hidden ${
                  index === currentMediaIndex
                    ? "bg-accent/30 shadow-lg"
                    : "bg-white/50 hover:bg-white/70 w-2"
                }`}
                style={index === currentMediaIndex ? { width: "32px" } : {}}
                aria-label={t("goToSlide", { number: index + 1 })}
              >
                {index === currentMediaIndex && (
                  <div
                    className="absolute inset-0 bg-accent rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10 focus-ring"
            aria-label={
              isAutoPlaying ? t("pauseSlideshow") : t("playSlideshow")
            }
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-0 right-4 sm:right-16 z-20 group focus-ring"
        aria-label={t("scrollToContent")}
      >
        <div className="flex flex-col items-center text-white group-hover:text-white transition-all duration-300">
          <div className="w-px h-8 bg-white mb-2 group-hover:bg-white transition-colors" />
          <ChevronDown className="w-5 h-5 animate-bounce group-hover:animate-pulse" />
          <span className="text-xs font-medium tracking-wider rotate-90 origin-center whitespace-nowrap mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t("scroll")}
          </span>
        </div>
      </button>

      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">{t("loading")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
