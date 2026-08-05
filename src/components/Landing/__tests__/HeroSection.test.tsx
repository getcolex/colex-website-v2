import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders the main headline', () => {
    render(<HeroSection />)
    expect(screen.getByText('Give your teams')).toBeInTheDocument()
    expect(screen.getByText('extra hands')).toBeInTheDocument()
  })

  it('renders a non-empty lede under the headline', () => {
    const { container } = render(<HeroSection />)
    const textCol = container.querySelector('[data-testid="hero-text-col"]')!
    const paragraphs = textCol.querySelectorAll('p')
    expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the primary CTA', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /get a personalised demo/i })).toBeInTheDocument()
  })

  it('renders the secondary CTA link', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /why are we building this/i })).toBeInTheDocument()
  })

  describe('Layout', () => {
    it('uses a 12-column grid layout', () => {
      const { container } = render(<HeroSection />)
      const grid = container.querySelector('[data-testid="hero-grid"]')
      expect(grid).toBeInTheDocument()
    })

    it('text content spans 7 columns on desktop', () => {
      const { container } = render(<HeroSection />)
      const textCol = container.querySelector('[data-testid="hero-text-col"]')
      expect(textCol).toBeInTheDocument()
    })

    it('demo spans 5 columns on desktop', () => {
      const { container } = render(<HeroSection />)
      const demoCol = container.querySelector('[data-testid="hero-demo-col"]')
      expect(demoCol).toBeInTheDocument()
    })
  })
})
