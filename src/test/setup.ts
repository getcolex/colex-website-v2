import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Polyfill ResizeObserver for jsdom
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

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

  const motionProxy = new Proxy(
    { create: (component: unknown) => component },
    { get: (target, prop) => (prop in target ? (target as Record<string | symbol, unknown>)[prop] : (props: Record<string, unknown>) => {
        const { children, ...rest } = props || {};
        return React.createElement(prop as string, rest, children as React.ReactNode);
      })
    }
  );

  return {
    motion: motionProxy,
    useScroll: () => ({ scrollYProgress: createMotionValue(0) }),
    useTransform: (_: unknown, __: unknown, values: unknown[]) => createMotionValue(typeof values?.[0] === 'number' ? values[0] : 0),
    useMotionValue: (initial: number) => createMotionValue(initial),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
})

// Mock SVG imports
vi.mock('@/assets/icons/arrow-right.svg', () => ({
  default: () => null,
}))

vi.mock('@/assets/icons/ColexBrandLogo.svg', () => ({
  default: () => null,
}))
