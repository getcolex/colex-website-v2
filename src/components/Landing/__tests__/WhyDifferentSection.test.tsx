import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import WhyDifferentSection from '../WhyDifferentSection'

describe('WhyDifferentSection', () => {
  describe('Layout', () => {
    it('uses a 12-column grid layout', () => {
      const { container } = render(<WhyDifferentSection />)
      const grid = container.querySelector('[data-testid="why-grid"]')
      expect(grid).toBeInTheDocument()
    })

    it('content is centered in the grid', () => {
      const { container } = render(<WhyDifferentSection />)
      const content = container.querySelector('[data-testid="why-content"]')
      expect(content).toBeInTheDocument()
    })
  })

  it('renders the section header', () => {
    render(<WhyDifferentSection />)
    expect(screen.getByText('You have tried to solve this before')).toBeInTheDocument()
  })

  it('renders all 4 failure cards', () => {
    render(<WhyDifferentSection />)
    expect(screen.getByText('SaaS is too rigid')).toBeInTheDocument()
    expect(screen.getByText('No-code is a lot of code')).toBeInTheDocument()
    expect(screen.getByText("Vibe coding doesn't ship")).toBeInTheDocument()
    expect(screen.getByText('Devs are expensive')).toBeInTheDocument()
  })

  it('renders failure subtitles', () => {
    render(<WhyDifferentSection />)
    expect(screen.getByText('The team is still on WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('Became the maintenance guy.')).toBeInTheDocument()
    expect(screen.getByText('Cool demo. Never shared.')).toBeInTheDocument()
    expect(screen.getByText("Three months later, 'almost done.'")).toBeInTheDocument()
  })
})
