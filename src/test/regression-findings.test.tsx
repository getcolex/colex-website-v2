/**
 * Regression tests for code review findings.
 * These ensure the fixes remain in place.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ---------------------------------------------------------------------------
// Unit 2: design tokens exist and page.tsx uses them
// ---------------------------------------------------------------------------
describe('unit 2: one token system', () => {
  it('surface.page token resolves to #F8F7F4', async () => {
    const { system } = await import('@/theme/index')
    const resolved = system.token('colors.surface.page')
    expect(resolved).toBe('#F8F7F4')
  })

  it('page.tsx contains no raw hex literal', () => {
    const src = readFileSync(
      resolve(__dirname, '../app/page.tsx'),
      'utf-8'
    )
    expect(src).not.toMatch(/#[0-9A-Fa-f]{3,8}\b/)
  })
})

// ---------------------------------------------------------------------------
// Finding 1: gtag.ts:16 — window.gtag guard
// Ensures event() does NOT throw when window.gtag is missing (ad-blocker)
// ---------------------------------------------------------------------------
describe('regression: gtag safety guard', () => {
  it('event() does not throw when window.gtag is undefined', async () => {
    const orig = (window as unknown as Record<string, unknown>).gtag
    delete (window as unknown as Record<string, unknown>).gtag

    const { event } = await import('@/lib/gtag')

    expect(() =>
      event({ action: 'test', category: 'cat', label: 'lbl' })
    ).not.toThrow()

    if (orig !== undefined) {
      (window as unknown as Record<string, unknown>).gtag = orig
    }
  })
})

// ---------------------------------------------------------------------------
// Finding 3: setup.ts:16 — motion.div must be defined in mock
// ---------------------------------------------------------------------------
describe('regression: motion mock provides HTML element proxies', () => {
  it('motion.div is defined', async () => {
    const { motion } = await import('motion/react')
    expect((motion as unknown as Record<string, unknown>).div).toBeDefined()
  })

  it('motion.span is defined', async () => {
    const { motion } = await import('motion/react')
    expect((motion as unknown as Record<string, unknown>).span).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Finding 5: useTransform must return MotionValue-like object, not primitive
// ---------------------------------------------------------------------------
describe('regression: useTransform returns MotionValue-like object', () => {
  it('result has .get() method', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null as never, [0, 1], [0, 100])
    expect(typeof result).toBe('object')
    expect(typeof (result as { get: () => unknown }).get).toBe('function')
  })

  it('.get() does not throw', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null as never, [0, 1], [0, 100])
    expect(() => {
      (result as { get: () => unknown }).get()
    }).not.toThrow()
  })
})
