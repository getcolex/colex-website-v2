import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import ControlSection from '../ControlSection'

describe('ControlSection', () => {
  describe('Layout', () => {
    it('uses a 12-column grid layout', () => {
      const { container } = render(<ControlSection />)
      const grid = container.querySelector('[data-testid="feature-grid"]')
      expect(grid).toBeInTheDocument()
    })

    it('content spans full width', () => {
      const { container } = render(<ControlSection />)
      const content = container.querySelector('[data-testid="feature-content"]')
      expect(content).toBeInTheDocument()
    })
  })

  it('renders the section header', () => {
    render(<ControlSection />)
    expect(screen.getByText('Colex gives the control back to you')).toBeInTheDocument()
  })

  it('renders all 3 feature cards', () => {
    render(<ControlSection />)
    expect(screen.getByText('Each task has an interface')).toBeInTheDocument()
    expect(screen.getByText('Reviews where needed')).toBeInTheDocument()
    expect(screen.getByText('Full Audit Trail')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<ControlSection />)
    expect(screen.getByText('No more fighting google sheets')).toBeInTheDocument()
    expect(screen.getByText('The system notifies for reviews automatically')).toBeInTheDocument()
    expect(screen.getByText('Every decision. Every approval. Logged.')).toBeInTheDocument()
  })
})
