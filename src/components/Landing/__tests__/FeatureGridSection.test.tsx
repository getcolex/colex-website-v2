import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import FeatureGridSection from '../FeatureGridSection'

describe('FeatureGridSection', () => {
  it('renders the section header', () => {
    render(<FeatureGridSection />)
    expect(screen.getByText('Colex gives the control back to you')).toBeInTheDocument()
  })

  it('renders all 3 feature cards', () => {
    render(<FeatureGridSection />)
    expect(screen.getByText('Simple UI')).toBeInTheDocument()
    expect(screen.getByText('Automated Reviews')).toBeInTheDocument()
    expect(screen.getByText('Full Audit Trail')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<FeatureGridSection />)
    expect(screen.getByText(/generate UI for all your tasks/i)).toBeInTheDocument()
    expect(screen.getByText(/asks for reviews when needed/i)).toBeInTheDocument()
    expect(screen.getByText(/Every decision.*Logged/i)).toBeInTheDocument()
  })
})
