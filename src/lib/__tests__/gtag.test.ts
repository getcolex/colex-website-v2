import { describe, test, expect, afterEach, vi } from 'vitest';
import { event, pageview } from '../gtag';

describe('gtag safety', () => {
  const originalGtag = globalThis.window?.gtag;

  afterEach(() => {
    if (originalGtag) {
      window.gtag = originalGtag;
    }
  });

  test('event() does not throw when window.gtag is undefined', () => {
    delete (window as unknown as Record<string, unknown>).gtag;

    expect(() => {
      event({
        action: 'button_clicked',
        category: 'engagement',
        label: 'test',
      });
    }).not.toThrow();
  });

  test('pageview() does not throw when window.gtag is undefined', () => {
    delete (window as unknown as Record<string, unknown>).gtag;

    expect(() => {
      pageview('/test');
    }).not.toThrow();
  });

  test('event() calls window.gtag when it exists', () => {
    const mockGtag = vi.fn();
    (window as unknown as Record<string, unknown>).gtag = mockGtag;

    event({
      action: 'button_clicked',
      category: 'engagement',
      label: 'test',
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'button_clicked', expect.objectContaining({
      event_category: 'engagement',
      event_label: 'test',
    }));
  });
});
