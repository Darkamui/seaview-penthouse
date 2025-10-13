"use client";

import { useEffect } from "react";

export function ScrollAnimationObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const animationClasses = [
      ".scroll-animation",
      ".scroll-animation-left",
      ".scroll-animation-right",
      ".scroll-animation-up",
      ".scroll-animation-down",
      ".scroll-animation-scale",
      ".scroll-animation-fade",
      ".scroll-animation-stagger"
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe existing elements
    const observeElements = () => {
      animationClasses.forEach((className) => {
        const elements = document.querySelectorAll(className);
        elements.forEach((element) => {
          if (!element.classList.contains("animate")) {
            observer.observe(element);
          }
        });
      });
    };

    // Initial observation
    observeElements();

    // Re-observe when DOM changes (for dynamic content)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}