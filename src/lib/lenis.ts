import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({
    smoothWheel: true,
    duration: 1.05, // tweak feel
  });

  function raf(time: number) {
    lenis!.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}
