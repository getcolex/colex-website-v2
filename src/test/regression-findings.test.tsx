/**
 * Regression tests for code review findings.
 * These ensure the fixes remain in place.
 */
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render, act } from '@testing-library/react'

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
    expect((motion as Record<string, unknown>).div).toBeDefined()
  })

  it('motion.span is defined', async () => {
    const { motion } = await import('motion/react')
    expect((motion as Record<string, unknown>).span).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Finding 4: useLenis mock must NOT call callback synchronously
// ---------------------------------------------------------------------------
describe('regression: useLenis mock defers callback', () => {
  it('callback is not called synchronously', async () => {
    const { useLenis } = await import('lenis/react')
    let callCount = 0
    useLenis(({ scroll }: { scroll: number }) => {
      callCount++
      void scroll
    })
    // Should NOT be called yet (deferred via queueMicrotask)
    expect(callCount).toBe(0)
  })

  it('component with setState in useLenis callback does not crash', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { useLenis: useLenisImport } = await import('lenis/react')

    const TestComponent = () => {
      const [scroll, setScroll] = React.useState(0)
      useLenisImport(({ scroll: s }: { scroll: number }) => {
        setScroll(s)
      })
      return React.createElement('div', null, String(scroll))
    }

    // Should NOT throw "Too many re-renders"
    let threwError = false
    try {
      await act(async () => {
        render(React.createElement(TestComponent))
      })
    } catch {
      threwError = true
    }

    expect(threwError).toBe(false)
    consoleError.mockRestore()
  })
})

// ---------------------------------------------------------------------------
// Finding 5: useTransform must return MotionValue-like object, not primitive
// ---------------------------------------------------------------------------
describe('regression: useTransform returns MotionValue-like object', () => {
  it('result has .get() method', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null, [0, 1], [0, 100])
    expect(typeof result).toBe('object')
    expect(typeof (result as { get: () => unknown }).get).toBe('function')
  })

  it('.get() does not throw', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null, [0, 1], [0, 100])
    expect(() => {
      (result as { get: () => unknown }).get()
    }).not.toThrow()
  })
})
