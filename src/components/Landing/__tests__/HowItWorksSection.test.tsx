import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import HowItWorksSection from '../HowItWorksSection'

describe('HowItWorksSection', () => {
  it('renders the section header', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText('How it works')).toBeInTheDocument()
  })

  it('renders all 4 steps', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText('Describe what you need')).toBeInTheDocument()
    expect(screen.getByText('Our agents build the workflow')).toBeInTheDocument()
    expect(screen.getByText('Review each output')).toBeInTheDocument()
    expect(screen.getByText('We create the connections')).toBeInTheDocument()
  })

  it('renders the chat mockup with user message', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText(/quote requests from email/i)).toBeInTheDocument()
  })

  describe('Layout', () => {
    it('uses a 12-column grid layout', () => {
      const { container } = render(<HowItWorksSection />)
      const grid = container.querySelector('[data-testid="how-it-works-grid"]')
      expect(grid).toBeInTheDocument()
    })

    it('visual spans 7 columns on desktop', () => {
      const { container } = render(<HowItWorksSection />)
      const visualCol = container.querySelector('[data-testid="how-it-works-visual-col"]')
      expect(visualCol).toBeInTheDocument()
    })

    it('text spans 5 columns on desktop', () => {
      const { container } = render(<HowItWorksSection />)
      const textCol = container.querySelector('[data-testid="how-it-works-text-col"]')
      expect(textCol).toBeInTheDocument()
    })
  })
})
