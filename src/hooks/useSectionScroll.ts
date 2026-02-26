"use client";

import { RefObject, useRef, useEffect } from "react";
import { useMotionValue, MotionValue } from "motion/react";
import { useLenis } from "lenis/react";

interface UseSectionScrollOptions {
  offset?: [string, string];
}

interface UseSectionScrollReturn {
  scrollYProgress: MotionValue<number>;
}

/**
 * Hook that provides scroll progress for a section, bridging Lenis smooth scroll
 * with Framer Motion's MotionValue system.
 *
 * Uses ResizeObserver to cache element geometry, avoiding getBoundingClientRect
 * on every scroll frame.
 */
export function useSectionScroll(
  targetRef: RefObject<HTMLElement | null>,
  options: UseSectionScrollOptions = {}
): UseSectionScrollReturn {
  const { offset = ["start start", "end end"] } = options;
  const scrollYProgress = useMotionValue(0);
  const geometryRef = useRef({ top: 0, height: 0 });

  // Cache element geometry, update on resize
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      geometryRef.current = {
        top: rect.top + window.scrollY,
        height: element.offsetHeight,
      };
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [targetRef]);

  useLenis(({ scroll }) => {
    const { top: elementTop, height: elementHeight } = geometryRef.current;
    if (elementHeight === 0) return;

    const windowHeight = window.innerHeight;

    const [startOffset, endOffset] = offset;
    const startPosition = parseOffset(startOffset, elementTop, elementHeight, windowHeight);
    const endPosition = parseOffset(endOffset, elementTop, elementHeight, windowHeight);

    const scrollRange = endPosition - startPosition;
    if (scrollRange === 0) {
      scrollYProgress.set(0);
      return;
    }

    const progress = (scroll - startPosition) / scrollRange;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    scrollYProgress.set(clampedProgress);
  });

  return { scrollYProgress };
}

/**
 * Parse offset string like "start start" or "end end"
 * First word is element position, second is viewport position
 */
function parseOffset(
  offsetStr: string,
  elementTop: number,
  elementHeight: number,
  windowHeight: number
): number {
  const [elementPos, viewportPos] = offsetStr.split(" ");

  let elementPoint = elementTop;
  if (elementPos === "center") {
    elementPoint = elementTop + elementHeight / 2;
  } else if (elementPos === "end") {
    elementPoint = elementTop + elementHeight;
  }

  let viewportOffset = 0;
  if (viewportPos === "start") {
    viewportOffset = 0;
  } else if (viewportPos === "center") {
    viewportOffset = windowHeight / 2;
  } else if (viewportPos === "end") {
    viewportOffset = windowHeight;
  }

  return elementPoint - viewportOffset;
}
