import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import WhySection from '../WhySection'

describe('WhySection', () => {
  it('renders the section header', () => {
    render(<WhySection />)
    expect(screen.getByText('You have tried this before')).toBeInTheDocument()
  })

  it('renders all 4 failure cards', () => {
    render(<WhySection />)
    expect(screen.getByText(/Tried SaaS/i)).toBeInTheDocument()
    expect(screen.getByText(/Tried no-code/i)).toBeInTheDocument()
    expect(screen.getByText(/Tried vibe coding/i)).toBeInTheDocument()
    expect(screen.getByText(/Hired devs/i)).toBeInTheDocument()
  })

  it('renders failure descriptions', () => {
    render(<WhySection />)
    expect(screen.getByText(/team is still on whatsapp/i)).toBeInTheDocument()
    expect(screen.getByText(/maintenance guy/i)).toBeInTheDocument()
    expect(screen.getByText(/Never shipped/i)).toBeInTheDocument()
    expect(screen.getByText(/almost done/i)).toBeInTheDocument()
  })
})
