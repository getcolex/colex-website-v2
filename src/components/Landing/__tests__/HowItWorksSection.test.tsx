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
    expect(screen.getByText(/We build the workflow/i)).toBeInTheDocument()
    expect(screen.getByText(/Your team reviews/i)).toBeInTheDocument()
    expect(screen.getByText(/Colex handles the rest/i)).toBeInTheDocument()
  })

  it('renders the chat mockup with user message', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText(/quote requests from email/i)).toBeInTheDocument()
  })
})
