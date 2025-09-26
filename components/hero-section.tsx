"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("hero");

  const heroMedia = [
    {
      type: "image",
      src: "/images/balcony2.jpg",
      alt: t("altTexts.seaViewSunset"),
    },
    {
      type: "image",
      src: "/images/living1.jpg",
      alt: t("altTexts.spaciousLiving"),
    },
    {
      type: "image",
      src: "/images/balcony10.jpg",
      alt: t("altTexts.eveningBalcony"),
    },
  ];

  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
      setProgress(100);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroMedia.length, SLIDE_DURATION]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return newProgress <= 0 ? 100 : newProgress;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, currentMediaIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (isAutoPlaying) {
      setProgress(100);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentMediaIndex(index);
    setIsAutoPlaying(false);
    setProgress(100);
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

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
              onLoad={() => index === 0 && setIsLoaded(true)}
            />
          </div>
        ))}
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 " />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center text-white max-w-6xl mx-auto px-4 transition-all duration-1000`}
      >
        <div className="space-y-8 mb-32">
          {/* <h1 className="font-sans text-4xl sm:text-5xl lg:text-7xl xl:text-6xl font-bold text-balance leading-tight text-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-balance opacity-90 max-w-4xl mx-auto leading-relaxed text-shadow">
            {t("subtitle")}
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="https://airbnb.com/h/thepenthouseashdod"
              target="_blank"
            >
              <Button
                size="lg"
                className="cursor-pointer bg-accent/90 hover:bg-accent text-accent-foreground text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 btn-hover-lift"
              >
                {t("bookStay")}
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border-white/40 text-black bg-white/40 hover:bg-white/20 text-lg px-8 py-4 h-auto backdrop-blur-sm  shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t("virtualTour")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
