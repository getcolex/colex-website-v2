import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/test/test-utils'
import VerticalsSection from '../VerticalsSection'

describe('VerticalsSection', () => {
  it('renders h2 and CTA link', () => {
    render(<VerticalsSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'For the teams that run a company day to day.'
    )
    const cta = screen.getByRole('link', { name: /Get a personalised live demo/i })
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

  it('shows pills for active tab and displays card content', () => {
    render(<VerticalsSection />)
    // Freight tab is default — should show its two cards as pill buttons
    expect(screen.getByRole('button', { name: /Booking a shipment/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Clearing an accessorial/i })).toBeInTheDocument()

    // First pill is selected by default — card should show its content
    expect(screen.getByRole('heading', { level: 3, name: /Booking a shipment/i })).toBeInTheDocument()
    expect(screen.getByText(/Quote to confirmed booking/)).toBeInTheDocument()
    expect(screen.getByText(/Shipment booked/)).toBeInTheDocument()
  })

  it('switches tabs and shows correct pills', () => {
    render(<VerticalsSection />)
    const procurementTab = screen.getByRole('tab', { name: /Procurement/i })
    fireEvent.click(procurementTab)

    expect(procurementTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: /Paying an invoice/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Raising a PO/i })).toBeInTheDocument()
  })

  it('remembers selected pill when switching tabs', () => {
    render(<VerticalsSection />)

    // In freight tab, select the second pill
    const accessorialPill = screen.getByRole('button', { name: /Clearing an accessorial/i })
    fireEvent.click(accessorialPill)
    expect(screen.getByRole('heading', { level: 3, name: /Clearing an accessorial/i })).toBeInTheDocument()

    // Switch to procurement
    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))
    // Select second pill in procurement
    fireEvent.click(screen.getByRole('button', { name: /Raising a PO/i }))
    expect(screen.getByRole('heading', { level: 3, name: /Raising a PO/i })).toBeInTheDocument()

    // Switch back to freight — should still show accessorial
    fireEvent.click(screen.getByRole('tab', { name: /Freight & shipping/i }))
    expect(screen.getByRole('heading', { level: 3, name: /Clearing an accessorial/i })).toBeInTheDocument()

    // Switch to procurement — should still show Raising a PO
    fireEvent.click(screen.getByRole('tab', { name: /Procurement/i }))
    expect(screen.getByRole('heading', { level: 3, name: /Raising a PO/i })).toBeInTheDocument()
  })

  it('survives a rerender with pill selection intact', () => {
    const { rerender } = render(<VerticalsSection />)
    // Select second pill
    fireEvent.click(screen.getByRole('button', { name: /Clearing an accessorial/i }))
    expect(screen.getByRole('heading', { level: 3, name: /Clearing an accessorial/i })).toBeInTheDocument()

    rerender(<VerticalsSection />)
    expect(screen.getByRole('heading', { level: 3, name: /Clearing an accessorial/i })).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<VerticalsSection />)
    const tablist = screen.getByRole('tablist')
    expect(tablist).toBeInTheDocument()

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(5)

    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeInTheDocument()

    // The selected tab's aria-controls matches the panel's id
    const selectedTab = screen.getByRole('tab', { selected: true })
    const panelId = panel.getAttribute('id')
    expect(selectedTab).toHaveAttribute('aria-controls', panelId)
    expect(panel).toHaveAttribute('aria-labelledby', selectedTab.getAttribute('id'))
  })

  it('supports arrow key navigation', () => {
    render(<VerticalsSection />)
    const freightTab = screen.getByRole('tab', { name: /Freight & shipping/i })
    freightTab.focus()

    fireEvent.keyDown(freightTab, { key: 'ArrowRight' })
    const procurementTab = screen.getByRole('tab', { name: /Procurement/i })
    expect(document.activeElement).toBe(procurementTab)

    fireEvent.keyDown(procurementTab, { key: 'ArrowRight' })
    const vendorTab = screen.getByRole('tab', { name: /Vendor management/i })
    expect(document.activeElement).toBe(vendorTab)

    // Left arrow back
    fireEvent.keyDown(vendorTab, { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(procurementTab)

    // Wrap around from first to last
    fireEvent.keyDown(freightTab, { key: 'ArrowLeft' })
    // After left from freight, should focus on freight first since vendorTab has focus
    // Let's reset: focus freight, then go left to wrap
    freightTab.focus()
    fireEvent.keyDown(freightTab, { key: 'ArrowLeft' })
    const financeTab = screen.getByRole('tab', { name: /Finance ops/i })
    expect(document.activeElement).toBe(financeTab)
  })
})
