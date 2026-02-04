import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders the main headline', () => {
    render(<HeroSection />)
    expect(screen.getByText('Give your teams extra hands')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<HeroSection />)
    expect(screen.getByText('Colex is purpose built to automate your team reliably')).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /let's build yours/i })).toBeInTheDocument()
  })

  it('renders trust signals', () => {
    render(<HeroSection />)
    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument()
    expect(screen.getByText('Mellow Designs')).toBeInTheDocument()
    expect(screen.getByText('SC Lines')).toBeInTheDocument()
  })
})
