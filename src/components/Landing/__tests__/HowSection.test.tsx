import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import HowSection from '../HowSection'

describe('HowSection', () => {
  it('renders the section heading', () => {
    render(<HowSection />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'This is how Colex works for you' })
    ).toBeInTheDocument()
  })

  it('renders 4 cards with h3 headings', () => {
    render(<HowSection />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'Ask Colex to draft the rules for your process' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Review and get the rules how you want them' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Colex builds an auditable, human-first workflow' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'If things change, just update the rules and the workflow evolves' })
    ).toBeInTheDocument()
  })

  it('renders step labels for each card', () => {
    render(<HowSection />)
    expect(screen.getByText('STEP 1')).toBeInTheDocument()
    expect(screen.getByText('STEP 2')).toBeInTheDocument()
    expect(screen.getByText('STEP 3')).toBeInTheDocument()
    expect(screen.getByText('STEP 4')).toBeInTheDocument()
  })

  it('renders description paragraphs for each card', () => {
    render(<HowSection />)
    expect(
      screen.getByText('Describe the job in plain language. Colex turns it into rules over the evidence your process already produces.')
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Edit until they.re your standard\. Just ask the in-Colex AI or change the rules yourself\./)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/It does the work, then checks every result against your rules the same way every time\. And if you want to change anything, it.s editable inline\./)
    ).toBeInTheDocument()
    expect(
      screen.getByText('You edit a rule. The workflow gets updated automatically and the team has it in seconds.')
    ).toBeInTheDocument()
  })

  it('renders an image placeholder per card with correct aspect ratio', () => {
    const { container } = render(<HowSection />)
    const placeholders = container.querySelectorAll('[data-testid="how-card-image"]')
    expect(placeholders).toHaveLength(4)
  })

  it('renders a CTA link', () => {
    render(<HowSection />)
    expect(screen.getByText(/Get to a personalised demo/)).toBeInTheDocument()
  })
})
