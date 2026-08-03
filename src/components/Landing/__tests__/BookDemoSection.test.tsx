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

  describe('Section 7 copy', () => {
    it('renders the closing CTA heading', () => {
      render(<BookDemoSection />)
      expect(
        screen.getByRole('heading', { level: 2, name: 'Bring us the process that keeps breaking.' })
      ).toBeInTheDocument()
    })

    it('renders the closing CTA paragraph', () => {
      render(<BookDemoSection />)
      expect(
        screen.getByText(
          /We're pre-launch, working with a handful of AI first teams who see this problem now\. Show us the one that breaks most and we'll build it for you\./
        )
      ).toBeInTheDocument()
    })

    it('renders the primary CTA button', () => {
      render(<BookDemoSection />)
      expect(
        screen.getByRole('button', { name: /Become a design partner/i })
      ).toBeInTheDocument()
    })

    it('renders the secondary CTA link', () => {
      render(<BookDemoSection />)
      expect(
        screen.getByRole('link', { name: /Read the thesis first →/i })
      ).toBeInTheDocument()
    })
  })

  it('renders all 4 benefit cards', () => {
    render(<BookDemoSection />)
    expect(screen.getByText('Your first workflow')).toBeInTheDocument()
    expect(screen.getByText('A team interface')).toBeInTheDocument()
    expect(screen.getByText('Built-in human review')).toBeInTheDocument()
    expect(screen.getByText('Connected to your tools')).toBeInTheDocument()
  })
})
