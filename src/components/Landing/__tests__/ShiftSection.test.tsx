import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/test/test-utils'
import ShiftSection from '../ShiftSection'

describe('ShiftSection', () => {
  it('renders h2 and lede', () => {
    render(<ShiftSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Stop writing the steps. Just write the rules you care about.'
    )
    expect(
      screen.getByText(/You own what .done. means/)
    ).toBeInTheDocument()
  })

  it('renders 3 picker buttons', () => {
    render(<ShiftSection />)
    expect(screen.getByRole('tab', { name: /Booking a shipment/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Paying an invoice/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Starting a new hire/i })).toBeInTheDocument()
  })

  it('has "Starting a new hire" selected by default', () => {
    render(<ShiftSection />)
    const hireTab = screen.getByRole('tab', { name: /Starting a new hire/i })
    expect(hireTab).toHaveAttribute('aria-selected', 'true')
  })

  it('shows default hire case content', () => {
    render(<ShiftSection />)
    // Steps from CASES.hire
    expect(screen.getByText(/Chase the signed contract/)).toBeInTheDocument()
    expect(screen.getByText(/Check right-to-work documents/)).toBeInTheDocument()
    expect(screen.getByText(/Raise an IT ticket for the laptop/)).toBeInTheDocument()
    expect(screen.getByText(/Ask each system owner for an account/)).toBeInTheDocument()
    expect(screen.getByText(/Follow up on whatever is missing/)).toBeInTheDocument()
    expect(screen.getByText(/Repeat the day before they start/)).toBeInTheDocument()
    // Condition
    expect(
      screen.getByText(/Don.t let anyone start until the contract is signed/)
    ).toBeInTheDocument()
  })

  it('switches content when clicking "Booking a shipment"', () => {
    render(<ShiftSection />)
    const freightTab = screen.getByRole('tab', { name: /Booking a shipment/i })
    fireEvent.click(freightTab)

    expect(freightTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Open the carrier portal/)).toBeInTheDocument()
    expect(screen.getByText(/Get me three quotes from different carriers/)).toBeInTheDocument()

    // Hire content should be gone
    expect(screen.queryByText(/Chase the signed contract/)).not.toBeInTheDocument()
  })

  it('round-trips: hire → freight → hire', () => {
    render(<ShiftSection />)
    const freightTab = screen.getByRole('tab', { name: /Booking a shipment/i })
    const hireTab = screen.getByRole('tab', { name: /Starting a new hire/i })

    fireEvent.click(freightTab)
    expect(screen.getByText(/Open the carrier portal/)).toBeInTheDocument()

    fireEvent.click(hireTab)
    expect(screen.getByText(/Chase the signed contract/)).toBeInTheDocument()
    expect(hireTab).toHaveAttribute('aria-selected', 'true')
  })

  it('has correct accessibility attributes', () => {
    render(<ShiftSection />)
    const tablist = screen.getByRole('tablist')
    expect(tablist).toBeInTheDocument()

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)

    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeInTheDocument()

    // The selected tab's aria-controls matches the panel's id
    const selectedTab = screen.getByRole('tab', { selected: true })
    const panelId = panel.getAttribute('id')
    expect(selectedTab).toHaveAttribute('aria-controls', panelId)
    expect(panel).toHaveAttribute('aria-labelledby', selectedTab.getAttribute('id'))
  })

  it('supports arrow key navigation', () => {
    render(<ShiftSection />)
    const hireTab = screen.getByRole('tab', { name: /Starting a new hire/i })
    hireTab.focus()

    // Right arrow should move focus to the next tab (wraps)
    fireEvent.keyDown(hireTab, { key: 'ArrowRight' })
    const freightTab = screen.getByRole('tab', { name: /Booking a shipment/i })
    expect(document.activeElement).toBe(freightTab)

    // Right arrow again
    fireEvent.keyDown(freightTab, { key: 'ArrowRight' })
    const invoiceTab = screen.getByRole('tab', { name: /Paying an invoice/i })
    expect(document.activeElement).toBe(invoiceTab)

    // Right arrow wraps back to hire
    fireEvent.keyDown(invoiceTab, { key: 'ArrowRight' })
    expect(document.activeElement).toBe(hireTab)

    // Left arrow goes back to invoice
    fireEvent.keyDown(hireTab, { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(invoiceTab)
  })
})
