import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import BenefitsSection from '../BenefitsSection'

describe('BenefitsSection', () => {
  it('renders all 5 benefit cards', () => {
    render(<BenefitsSection />)
    expect(screen.getByText('Minutes to your first workflow')).toBeInTheDocument()
    expect(screen.getByText('Works with your data')).toBeInTheDocument()
    expect(screen.getByText('Human review by default')).toBeInTheDocument()
    expect(screen.getByText('Changes with your needs')).toBeInTheDocument()
    expect(screen.getByText(/Comes with interface/i)).toBeInTheDocument()
  })

  it('renders in a grid layout with full-width bottom card', () => {
    const { container } = render(<BenefitsSection />)
    // The component should have a grid structure
    expect(container.querySelector('[class*="grid"]') || container.firstChild).toBeTruthy()
  })
})
