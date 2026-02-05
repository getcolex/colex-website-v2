import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock framer-motion globally
vi.mock('motion/react', () => {
  const createMotionValue = (initial: number) => {
    let value = initial;
    return {
      get: () => value,
      set: (v: number) => { value = v; },
      onChange: () => () => {},
    };
  };

  return {
    motion: {
      create: (component: unknown) => component,
    },
    useScroll: () => ({ scrollYProgress: createMotionValue(0) }),
    useTransform: (_: unknown, __: unknown, values: unknown[]) => values?.[0] ?? 0,
    useMotionValue: (initial: number) => createMotionValue(initial),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
})

// Mock lenis/react
vi.mock('lenis/react', () => ({
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
  useLenis: (callback: (params: { scroll: number }) => void) => {
    // Call the callback once with initial scroll value for testing
    if (callback) callback({ scroll: 0 });
  },
}))

// Mock SVG imports
vi.mock('@/assets/icons/arrow-right.svg', () => ({
  default: () => null,
}))

vi.mock('@/assets/icons/ColexBrandLogo.svg', () => ({
  default: () => null,
}))
