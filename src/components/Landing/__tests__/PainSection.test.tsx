import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import PainSection from '../PainSection'

// Structural assertions only: copy changes freely, structure is the contract.
describe('PainSection', () => {
  it('renders a non-empty section heading', () => {
    render(<PainSection />)
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2.textContent?.trim().length).toBeGreaterThan(0)
  })

  it('anchors the why-colex nav target', () => {
    const { container } = render(<PainSection />)
    expect(container.querySelector('#why-colex')).toBeInTheDocument()
  })

  it('renders four pain cards, each with a title and two body lines', () => {
    render(<PainSection />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s).toHaveLength(4)
    for (const h3 of h3s) {
      expect(h3.textContent?.trim().length).toBeGreaterThan(0)
      const card = h3.parentElement!
      const bodyLines = Array.from(card.querySelectorAll('p')).filter(
        (p) => !h3.contains(p)
      )
      expect(bodyLines.length).toBeGreaterThanOrEqual(2)
    }
  })
})
