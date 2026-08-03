import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/test-utils'
import PainSection from '../PainSection'

describe('PainSection', () => {
  it('renders the section heading', () => {
    render(<PainSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'You wrote the process. It still isn’t being followed.'
    )
  })

  it('renders the lede', () => {
    render(<PainSection />)
    expect(
      screen.getByText(/You documented the workflow/)
    ).toBeInTheDocument()
  })

  it('renders four pain cards', () => {
    render(<PainSection />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s).toHaveLength(4)
    expect(h3s[0]).toHaveTextContent('The automation only covered the easy path')
    expect(h3s[1]).toHaveTextContent('The document isn’t the process')
    expect(h3s[2]).toHaveTextContent('When something breaks, no one knows where')
    expect(h3s[3]).toHaveTextContent('Every change is expensive')
  })

  it('renders each card with two paragraphs', () => {
    render(<PainSection />)
    expect(screen.getByText(/Every exception came back to people/)).toBeInTheDocument()
    expect(screen.getByText(/Every rule change meant rewriting workflows/)).toBeInTheDocument()
    expect(screen.getByText(/It lives in a file written months ago/)).toBeInTheDocument()
    expect(screen.getByText(/The real process lives in dozens of decisions/)).toBeInTheDocument()
    expect(screen.getByText(/You can see the outcome was wrong/)).toBeInTheDocument()
    expect(screen.getByText(/Finding the answer means asking five people/)).toBeInTheDocument()
    expect(screen.getByText(/A new policy shouldn’t take months/)).toBeInTheDocument()
    expect(screen.getByText(/Instead it means updating documents/)).toBeInTheDocument()
  })

})
