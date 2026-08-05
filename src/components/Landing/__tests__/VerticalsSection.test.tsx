import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, act, within } from '@testing-library/react'
import { render } from '@/test/test-utils'
import VerticalsSection from '../VerticalsSection'

// The mobile flat carousel and the desktop list both render prompt text
// into the DOM (they are swapped by CSS display, not by mount). All
// prompt-related assertions therefore scope their queries to the desktop
// list via this testid so lookups stay unique.
const desktopList = () => screen.getByTestId('verticals-desktop-list')

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
    const cta = screen.getByRole('button', { name: /Get a personalised demo/i })
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

  it('renders human-written prompts for the active vertical in the desktop list', () => {
    render(<VerticalsSection />)
    expect(within(desktopList()).getByText(/Book me a shipment with three valid quotes/)).toBeInTheDocument()
    expect(within(desktopList()).getByText(/Flag any accessorial charge we didn.t authorize/)).toBeInTheDocument()
  })

  it('renders the vertical demo tab panel', () => {
    render(<VerticalsSection />)
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('clicking a desktop prompt highlights it', () => {
    render(<VerticalsSection />)
    const secondPrompt = within(desktopList()).getByText(/Flag any accessorial charge/)
    fireEvent.click(secondPrompt)
    expect(secondPrompt.closest('[role="option"]')).toHaveAttribute('aria-selected', 'true')
  })

  it('switches tabs and shows correct prompts', () => {
    render(<VerticalsSection />)
    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))

    expect(within(desktopList()).getByText(/Only pay this invoice if it matches the PO/)).toBeInTheDocument()
    expect(within(desktopList()).getByText(/Raise a PO but make sure the budget has room/)).toBeInTheDocument()
  })

  it('tab click resets to first prompt', () => {
    render(<VerticalsSection />)
    fireEvent.click(within(desktopList()).getByText(/Flag any accessorial charge/))
    const secondOption = within(desktopList()).getByText(/Flag any accessorial charge/).closest('[role="option"]')
    expect(secondOption).toHaveAttribute('aria-selected', 'true')

    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))
    fireEvent.click(screen.getByRole('tab', { name: /Freight & shipping/i }))

    const firstOption = within(desktopList()).getByText(/Book me a shipment/).closest('[role="option"]')
    expect(firstOption).toHaveAttribute('aria-selected', 'true')
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

    // Both the mobile flat carousel and the desktop list expose role=listbox.
    const listboxes = screen.getAllByRole('listbox')
    expect(listboxes.length).toBeGreaterThanOrEqual(1)
    const options = desktopList().querySelectorAll('[role="option"]')
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

  // Auto-cycling tests (desktop behavior; useMatchMedia in jsdom defaults
  // to non-matching, so the component treats itself as desktop here).

  it('auto-advances to next prompt after interval', () => {
    render(<VerticalsSection />)
    const firstOption = within(desktopList()).getByText(/Book me a shipment/).closest('[role="option"]')
    expect(firstOption).toHaveAttribute('aria-selected', 'true')

    act(() => { vi.advanceTimersByTime(4000) })
    const secondOption = within(desktopList()).getByText(/Flag any accessorial charge/).closest('[role="option"]')
    expect(secondOption).toHaveAttribute('aria-selected', 'true')
  })

  it('auto-advances to next vertical when prompts exhausted', () => {
    render(<VerticalsSection />)
    act(() => { vi.advanceTimersByTime(4000) }) // freight prompt 1
    act(() => { vi.advanceTimersByTime(4000) }) // procurement prompt 0

    expect(screen.getByRole('tab', { name: /Procurement/i })).toHaveAttribute('aria-selected', 'true')
    expect(within(desktopList()).getByText(/Only pay this invoice/)).toBeInTheDocument()
  })

  it('stops auto-cycling on user click and resumes after idle', () => {
    render(<VerticalsSection />)

    fireEvent.click(within(desktopList()).getByText(/Flag any accessorial charge/))
    const secondOption = within(desktopList()).getByText(/Flag any accessorial charge/).closest('[role="option"]')
    expect(secondOption).toHaveAttribute('aria-selected', 'true')

    // Should NOT auto-advance while paused
    act(() => { vi.advanceTimersByTime(4000) })
    expect(secondOption).toHaveAttribute('aria-selected', 'true')

    // After 8s idle, cycling resumes; advance one more interval
    act(() => { vi.advanceTimersByTime(8000) })
    act(() => { vi.advanceTimersByTime(4000) })
    expect(screen.getByRole('tab', { name: /Procurement/i })).toHaveAttribute('aria-selected', 'true')
  })
})
