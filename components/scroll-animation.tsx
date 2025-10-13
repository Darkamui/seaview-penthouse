"use client";

import { forwardRef, ReactNode, ElementType, useCallback } from "react";
import { useScrollAnimation } from "@/lib/use-scroll-animation";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?:
    | "up"
    | "down"
    | "left"
    | "right"
    | "scale"
    | "fade"
    | "stagger";
  className?: string;
  as?: ElementType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ScrollAnimation = forwardRef<HTMLElement, ScrollAnimationProps>(
  ({
    children,
    animation = "up",
    className,
    as: Component = "div",
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
    onClick,
    style: customStyle,
    ...props
  }, forwardedRef) => {
    const internalRef = useScrollAnimation({ threshold, rootMargin, triggerOnce });

    // Merge both refs properly to avoid hydration issues
    const mergedRef = useCallback(
      (node: HTMLElement | null) => {
        // Assign to internal ref
        if (internalRef) {
          (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }

        // Assign to forwarded ref
        if (forwardedRef) {
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }
      },
      [forwardedRef, internalRef]
    );

    const animationClass = animation === "up"
      ? "scroll-animation"
      : `scroll-animation-${animation}`;

    const style = {
      ...customStyle,
      ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {})
    };

    return (
      <Component
        ref={mergedRef}
        className={cn(animationClass, className)}
        style={style}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ScrollAnimation.displayName = "ScrollAnimation";