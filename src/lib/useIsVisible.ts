"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns whether the ref'd element is (roughly) on-screen. Uses
 * IntersectionObserver with a generous rootMargin so demos start a
 * little before the section enters the viewport — no visible startup
 * flash when the user scrolls in.
 *
 * Defaults to `true` on first render so SSR + test envs (no IO) behave
 * like nothing changed. On mount the observer takes over and switches
 * to the real value.
 *
 * Purpose: gate demo phase-machine timers on visibility, so their
 * setState/re-render churn doesn't run on hidden sections and starve
 * the main thread mid-scroll on mobile.
 */
export function useIsVisible(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "200px",
): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver !== "function") return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(e.isIntersecting);
      },
      { rootMargin, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return visible;
}
