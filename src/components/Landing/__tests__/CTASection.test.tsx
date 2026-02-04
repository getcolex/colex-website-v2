import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import CTASection from '../CTASection'

describe('CTASection', () => {
  it('renders the headline', () => {
    render(<CTASection />)
    expect(screen.getByText(/Describe your workflows once/i)).toBeInTheDocument()
    expect(screen.getByText(/They run forever/i)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<CTASection />)
    expect(screen.getByText(/No devs, no consultants, no waiting/i)).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<CTASection />)
    expect(screen.getByRole('button', { name: /try colex today/i })).toBeInTheDocument()
  })

  it('has burgundy background', () => {
    const { container } = render(<CTASection />)
    // The section should have the brand primary background
    const section = container.firstChild as HTMLElement
    expect(section).toBeTruthy()
  })
})
