export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Track pageviews
export const pageview = (url: string) => {
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
  custom_parameters,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...custom_parameters,
  });
};

// Track landing page views with source detection
export const trackLandingPageView = (pageName: string) => {
  // Detect source from referrer or URL parameters
  const getReferrerSource = (): string => {
    const referrer = document.referrer.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    
    if (utmSource) return utmSource;
    
    if (referrer.includes('facebook')) return 'facebook';
    if (referrer.includes('google')) return 'google';
    if (referrer.includes('linkedin')) return 'linkedin';
    if (referrer.includes('reddit')) return 'reddit';
    if (referrer.includes('whatsapp') || referrer.includes('wa.me')) return 'whatsapp';
    if (referrer === '') return 'direct';
    
    return 'other';
  };

  event({
    action: 'landing_page_viewed',
    category: 'page_view',
    label: 'Landing page viewed',
    custom_parameters: {
      page_name: pageName,
      source: getReferrerSource(),
    },
  });
};

// Track button clicks with location context
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'button_clicked',
    category: 'engagement',
    label: 'Button clicked',
    custom_parameters: {
      button_name: buttonName,
      location: location,
    },
  });
};
