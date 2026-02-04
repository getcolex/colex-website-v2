import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock framer-motion globally
vi.mock('motion/react', () => ({
  motion: {
    create: (component: unknown) => component,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: (_: unknown, __: unknown, values: unknown[]) => values?.[0] ?? 0,
}))

// Mock SVG imports
vi.mock('@/assets/icons/arrow-right.svg', () => ({
  default: () => null,
}))

vi.mock('@/assets/icons/ColexBrandLogo.svg', () => ({
  default: () => null,
}))
