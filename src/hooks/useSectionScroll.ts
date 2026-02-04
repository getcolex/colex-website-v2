"use client";

import { RefObject } from "react";
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
 * This replaces Framer Motion's useScroll() when using Lenis for smooth scrolling.
 *
 * @param targetRef - Reference to the section element
 * @param options - Configuration options
 * @param options.offset - Scroll offset config, e.g., ["start start", "end end"]
 * @returns Object containing scrollYProgress MotionValue (0-1)
 */
export function useSectionScroll(
  targetRef: RefObject<HTMLElement | null>,
  options: UseSectionScrollOptions = {}
): UseSectionScrollReturn {
  const { offset = ["start start", "end end"] } = options;
  const scrollYProgress = useMotionValue(0);

  useLenis(({ scroll }) => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scroll;
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    // Parse offset strings
    const [startOffset, endOffset] = offset;
    const startPosition = parseOffset(startOffset, elementTop, elementHeight, windowHeight);
    const endPosition = parseOffset(endOffset, elementTop, elementHeight, windowHeight);

    // Calculate progress (0-1) based on current scroll position
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
 *
 * Example: "start start" means animation starts when element's top reaches viewport's top
 * Example: "end end" means animation ends when element's bottom reaches viewport's bottom
 */
function parseOffset(
  offsetStr: string,
  elementTop: number,
  elementHeight: number,
  windowHeight: number
): number {
  const [elementPos, viewportPos] = offsetStr.split(" ");

  // Element position relative to document top
  let elementPoint = elementTop;
  if (elementPos === "center") {
    elementPoint = elementTop + elementHeight / 2;
  } else if (elementPos === "end") {
    elementPoint = elementTop + elementHeight;
  }

  // Viewport offset (subtracted from element point to get scroll position)
  let viewportOffset = 0;
  if (viewportPos === "start") {
    viewportOffset = 0;
  } else if (viewportPos === "center") {
    viewportOffset = windowHeight / 2;
  } else if (viewportPos === "end") {
    viewportOffset = windowHeight;
  }

  // Return the scroll position where this condition is met
  return elementPoint - viewportOffset;
}
