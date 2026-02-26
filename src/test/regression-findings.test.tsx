/**
 * review-verify: Code review finding verification tests
 * Each test verifies one runtime_claim from the code review.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { render, act } from '@testing-library/react'

// ---------------------------------------------------------------------------
// Finding 1: gtag.ts:16 — Missing window.gtag check
// runtime_claim: calling window.gtag before the afterInteractive script loads
//   throws a TypeError
// ---------------------------------------------------------------------------
describe('review-verify: Finding 1 — gtag event() without window.gtag', () => {
  it('throws TypeError when window.gtag is not defined', async () => {
    // Ensure window.gtag is not defined
    const orig = (window as unknown as Record<string, unknown>).gtag
    delete (window as unknown as Record<string, unknown>).gtag

    const { event } = await import('@/lib/gtag')

    expect(() =>
      event({ action: 'test', category: 'cat', label: 'lbl' })
    ).toThrow(TypeError)

    // restore
    if (orig !== undefined) {
      (window as unknown as Record<string, unknown>).gtag = orig
    }
  })
})

// ---------------------------------------------------------------------------
// Finding 3: setup.ts:16 — motion mock breaks standard elements
// runtime_claim: motion.div is undefined in the mock, crashing components
// ---------------------------------------------------------------------------
describe('review-verify: Finding 3 — motion.div defined in mock', () => {
  it('motion.div is defined after mock is applied', async () => {
    const { motion } = await import('motion/react')
    // The mock exposes motion.create but NOT motion.div / motion.span etc.
    expect((motion as Record<string, unknown>).div).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Finding 4: setup.ts:28 — useLenis mock triggers state updates during render
// runtime_claim: calling a state-updating callback synchronously inside
//   useLenis mock triggers React warnings
// ---------------------------------------------------------------------------
describe('review-verify: Finding 4 — useLenis synchronous callback triggers React warning', () => {
  it('useLenis callback is called synchronously during render', async () => {
    const { useLenis } = await import('lenis/react')
    let callCount = 0
    // Simulate what the mock does: call the callback immediately
    useLenis(({ scroll }: { scroll: number }) => {
      callCount++
      void scroll
    })
    // If the mock calls synchronously, callCount is already 1 here
    expect(callCount).toBe(1)
  })

  it('state update inside useLenis callback during render causes infinite re-render loop (proven defect)', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { useLenis: useLenisImport } = await import('lenis/react')

    // The mock calls the callback synchronously during render.
    // setState during render → re-render → callback → setState again → infinite loop.
    const TestComponent = () => {
      const [scroll, setScroll] = React.useState(0)
      useLenisImport(({ scroll: s }: { scroll: number }) => {
        setScroll(s) // state update during render
      })
      return React.createElement('div', null, String(scroll))
    }

    // React throws "Too many re-renders" — which is a runtime crash, not just a warning
    let threwError = false
    try {
      await act(async () => {
        render(React.createElement(TestComponent))
      })
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes('Too many re-renders')) {
        threwError = true
      }
    }

    // The synchronous callback causes a crash — proven defect (worse than "React warning")
    expect(threwError).toBe(true)

    consoleError.mockRestore()
  })
})

// ---------------------------------------------------------------------------
// Finding 5: setup.ts:20 — useTransform mock breaks MotionValue contract
// runtime_claim: calling .get() on the result of useTransform throws
//   a TypeError because the mock returns a primitive
// ---------------------------------------------------------------------------
describe('review-verify: Finding 5 — useTransform returns primitive, .get() throws', () => {
  it('useTransform result is a primitive (not a MotionValue)', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null, [0, 1], [0, 100])
    // The mock returns values?.[0] ?? 0, which is a primitive number
    expect(typeof result).toBe('number')
  })

  it('calling .get() on useTransform result throws TypeError', async () => {
    const { useTransform } = await import('motion/react')
    const result = useTransform(null, [0, 1], [0, 100])
    expect(() => {
      // result is a primitive; accessing .get() on it won't throw,
      // but calling it as a function will
      ;(result as unknown as { get: () => unknown }).get()
    }).toThrow(TypeError)
  })
})
