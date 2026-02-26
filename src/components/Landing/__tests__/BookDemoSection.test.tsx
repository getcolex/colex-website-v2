import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import BookDemoSection from '../BookDemoSection'

describe('BookDemoSection', () => {
  describe('Layout', () => {
    it('uses a 12-column grid layout', () => {
      const { container } = render(<BookDemoSection />)
      const grid = container.querySelector('[data-testid="benefits-grid"]')
      expect(grid).toBeInTheDocument()
    })

    it('content is centered in the grid', () => {
      const { container } = render(<BookDemoSection />)
      const content = container.querySelector('[data-testid="benefits-content"]')
      expect(content).toBeInTheDocument()
    })
  })

  it('renders the section header', () => {
    render(<BookDemoSection />)
    expect(screen.getByText('30 minutes. You walk away with:')).toBeInTheDocument()
  })

  it('renders all 4 benefit cards', () => {
    render(<BookDemoSection />)
    expect(screen.getByText('Your first workflow')).toBeInTheDocument()
    expect(screen.getByText('A team interface')).toBeInTheDocument()
    expect(screen.getByText('Built-in human review')).toBeInTheDocument()
    expect(screen.getByText('Connected to your tools')).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<BookDemoSection />)
    expect(screen.getByRole('button', { name: /let's talk/i })).toBeInTheDocument()
  })
})
