import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import { render } from '@/test/test-utils'
import VerticalsSection from '../VerticalsSection'

describe('VerticalsSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders h2 and CTA button', () => {
    render(<VerticalsSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'For the teams that run a company day to day.'
    )
    const cta = screen.getByRole('button', { name: /Get a personalised live demo/i })
    expect(cta).toBeInTheDocument()
  })

  it('renders 5 tabs', () => {
    render(<VerticalsSection />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(5)
    expect(tabs[0]).toHaveTextContent('Freight & shipping')
    expect(tabs[1]).toHaveTextContent('Procurement')
    expect(tabs[2]).toHaveTextContent('Vendor management')
    expect(tabs[3]).toHaveTextContent('HR & onboarding')
    expect(tabs[4]).toHaveTextContent('Finance ops')
  })

  it('defaults to "Freight & shipping" tab', () => {
    render(<VerticalsSection />)
    const freightTab = screen.getByRole('tab', { name: /Freight & shipping/i })
    expect(freightTab).toHaveAttribute('aria-selected', 'true')
  })

  it('renders human-written prompts for the active vertical', () => {
    render(<VerticalsSection />)
    // Freight prompts rendered as quoted text
    expect(screen.getByText(/Book me a shipment with three valid quotes/)).toBeInTheDocument()
    expect(screen.getByText(/Flag any accessorial charge we didn.t authorize/)).toBeInTheDocument()
  })

  it('shows checklist for the selected prompt', () => {
    render(<VerticalsSection />)
    // Default: first prompt selected → Booking a shipment rules
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Shipment booked')
    expect(screen.getByText(/three quotes, distinct carriers/)).toBeInTheDocument()
    expect(screen.getByText(/HS code accepted at customs entry/)).toBeInTheDocument()
    expect(screen.getByText(/The last rule resolves days later/)).toBeInTheDocument()
  })

  it('selecting a different prompt shows its rules', () => {
    render(<VerticalsSection />)
    // Click second freight prompt
    const secondPrompt = screen.getByText(/Flag any accessorial charge/)
    fireEvent.click(secondPrompt)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')
    expect(screen.getByText(/charge type appears on the signed rate agreement/)).toBeInTheDocument()
    expect(screen.getByText(/A person makes the call/)).toBeInTheDocument()
  })

  it('switches tabs and shows correct prompts', () => {
    render(<VerticalsSection />)
    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))

    expect(screen.getByText(/Only pay this invoice if it matches the PO/)).toBeInTheDocument()
    expect(screen.getByText(/Raise a PO but make sure the budget has room/)).toBeInTheDocument()
    // Default first prompt → Paying an invoice rules
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Invoice cleared for payment')
  })

  it('tab click resets to first prompt', () => {
    render(<VerticalsSection />)
    // Select second prompt in freight
    fireEvent.click(screen.getByText(/Flag any accessorial charge/))
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')

    // Switch to procurement and back
    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))
    fireEvent.click(screen.getByRole('tab', { name: /Freight & shipping/i }))

    // Should reset to first prompt
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Shipment booked')
  })

  it('has correct accessibility attributes', () => {
    render(<VerticalsSection />)
    const tablist = screen.getByRole('tablist')
    expect(tablist).toBeInTheDocument()

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(5)

    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeInTheDocument()

    const selectedTab = screen.getByRole('tab', { selected: true })
    const panelId = panel.getAttribute('id')
    expect(selectedTab).toHaveAttribute('aria-controls', panelId)
    expect(panel).toHaveAttribute('aria-labelledby', selectedTab.getAttribute('id'))

    // Prompts have listbox/option roles
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeInTheDocument()
    const options = screen.getAllByRole('option')
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('supports arrow key navigation on tabs', () => {
    render(<VerticalsSection />)
    const freightTab = screen.getByRole('tab', { name: /Freight & shipping/i })
    freightTab.focus()

    fireEvent.keyDown(freightTab, { key: 'ArrowRight' })
    const procurementTab = screen.getByRole('tab', { name: /Procurement/i })
    expect(document.activeElement).toBe(procurementTab)

    fireEvent.keyDown(procurementTab, { key: 'ArrowRight' })
    const vendorTab = screen.getByRole('tab', { name: /Vendor management/i })
    expect(document.activeElement).toBe(vendorTab)

    fireEvent.keyDown(vendorTab, { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(procurementTab)

    freightTab.focus()
    fireEvent.keyDown(freightTab, { key: 'ArrowLeft' })
    const financeTab = screen.getByRole('tab', { name: /Finance ops/i })
    expect(document.activeElement).toBe(financeTab)
  })

  // Auto-cycling tests

  it('auto-advances to next prompt after interval', () => {
    render(<VerticalsSection />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Shipment booked')

    act(() => { vi.advanceTimersByTime(4000) })
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')
  })

  it('auto-advances to next vertical when prompts exhausted', () => {
    render(<VerticalsSection />)
    act(() => { vi.advanceTimersByTime(4000) }) // freight prompt 1
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')

    act(() => { vi.advanceTimersByTime(4000) }) // procurement prompt 0
    expect(screen.getByRole('tab', { name: /Procurement/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Invoice cleared for payment')
  })

  it('stops auto-cycling on user click and resumes after idle', () => {
    render(<VerticalsSection />)

    // Click second prompt to stop cycling
    fireEvent.click(screen.getByText(/Flag any accessorial charge/))
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')

    // Advance 4 seconds — should NOT auto-advance
    act(() => { vi.advanceTimersByTime(4000) })
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Accessorial charge cleared')

    // After 8 seconds idle, cycling resumes
    act(() => { vi.advanceTimersByTime(8000) })
    // Now advance one more interval
    act(() => { vi.advanceTimersByTime(4000) })
    // Should have advanced from freight prompt 1 to procurement prompt 0
    expect(screen.getByRole('tab', { name: /Procurement/i })).toHaveAttribute('aria-selected', 'true')
  })

  it('renders status marks with correct symbols', () => {
    render(<VerticalsSection />)
    // Default freight prompt 0: has ok (✓) and late (◷) marks
    expect(screen.getAllByText('✓').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('◷').length).toBeGreaterThanOrEqual(1)
  })
})
