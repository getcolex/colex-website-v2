import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import HowSection from '../HowSection'

// Structural assertions only: copy changes freely, structure is the contract.
describe('HowSection', () => {
  it('renders a non-empty section heading', () => {
    render(<HowSection />)
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2.textContent?.trim().length).toBeGreaterThan(0)
  })

  it('renders three steps, each with a title and a description', () => {
    render(<HowSection />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s).toHaveLength(3)
    for (const h3 of h3s) {
      expect(h3.textContent?.trim().length).toBeGreaterThan(0)
      const step = h3.parentElement!
      expect(step.querySelectorAll('p').length).toBeGreaterThanOrEqual(1)
    }
  })

  it('renders the Create / View / Run step labels', () => {
    render(<HowSection />)
    expect(screen.getByText('Create')).toBeInTheDocument()
    expect(screen.getByText('View')).toBeInTheDocument()
    expect(screen.getByText('Run')).toBeInTheDocument()
  })

  it('renders a demo card per step', () => {
    const { container } = render(<HowSection />)
    const placeholders = container.querySelectorAll('[data-testid="how-card-image"]')
    expect(placeholders).toHaveLength(3)
  })

  it('renders a demo CTA button', () => {
    render(<HowSection />)
    expect(
      screen.getByRole('button', { name: /get a personalised demo/i })
    ).toBeInTheDocument()
  })
})
