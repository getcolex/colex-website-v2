# Colex Agency Rebrand - Design Document

## Overview

Rebrand the Colex landing page from a legal tech tool to an **agency workflow automation platform**. This is a content rebrand, not a visual redesign.

## Positioning

**Tagline:** "AI Infrastructure for Agencies"

**Value proposition:** We partner with agencies to build custom AI workflows. You handle relationships. We handle automation.

**Business model:** Venture studio approach — deep partnerships with agencies, custom workflow development, equity + revenue share alignment.

## What Changes

### Content & Messaging
- Hero: Legal workspace → Agency automation platform
- Features: Legal-specific → Workflow automation, CRM, HITL, Custom dev
- Use cases: Lawyers → Multiple agency verticals
- Social proof: Legal testimonials → Case studies (Mellow, SC Lines)

### Data Structure
- Add `/src/data/verticals.ts` for configurable agency types
- Add `/src/data/caseStudies.ts` for outcome-focused case studies
- Add `/src/data/features.ts` for feature definitions

## What Stays

### Visual Foundation
- Open Sans font family
- Chakra UI components
- Burgundy accent (#49082D)
- Current layout patterns (hero, collapsible cards, sections)
- Lenis smooth scroll
- Motion animations

### Technical Stack
- Next.js 15
- Chakra UI 3
- TypeScript
- Existing component architecture

## Page Structure

```
Navbar
├── Logo (Colex)
└── CTA: "Book a Call"

Hero Section
├── Headline: "AI Infrastructure for Agencies"
├── Subheadline: "We partner with agencies to build custom AI workflows..."
└── CTA: "Book a Call"

Features Section
├── Headline: "One Platform. Fully Customized."
└── Cards:
    ├── Workflow Automation
    ├── Lead Capture & CRM
    ├── Human-in-the-Loop
    └── Custom Development (emphasized)

Verticals Section
├── Headline: "Built for Agencies Like Yours"
├── Cards (configurable, 4-6 visible):
│   ├── Branding & Creative
│   ├── Shipping & Logistics
│   ├── Recruitment
│   ├── Digital/Web
│   └── ... (expandable)
└── "See more use cases" toggle

Case Studies Section
├── Headline: "What We're Building"
├── Mellow (Branding)
│   ├── Problem
│   ├── Solution
│   └── Outcome
└── SC Lines (Shipping)
    ├── Problem
    ├── Solution
    └── Outcome

How It Works Section
├── Headline: "How We Partner"
└── Steps:
    ├── 1. Discovery Call
    ├── 2. Workflow Mapping
    ├── 3. Custom Build
    └── 4. Launch & Iterate

CTA Section
├── Headline: "Ready to automate your agency?"
├── Subtext: "Book a call. Tell us your workflows..."
└── CTA: "Book a Call"

Footer
├── Logo + tagline
└── Copyright
```

## Data Structures

### Verticals (`/src/data/verticals.ts`)

```typescript
export interface Vertical {
  id: string;
  name: string;
  icon: string;
  workflow: string;
  visible: boolean;
}

export const verticals: Vertical[] = [
  {
    id: 'branding',
    name: 'Branding & Creative',
    icon: 'palette',
    workflow: 'Brief intake → Asset generation → Client approval',
    visible: true,
  },
  {
    id: 'shipping',
    name: 'Shipping & Logistics',
    icon: 'truck',
    workflow: 'Quote requests → Rate matching → Booking confirmation',
    visible: true,
  },
  // ... more verticals
];
```

### Case Studies (`/src/data/caseStudies.ts`)

```typescript
export interface CaseStudy {
  id: string;
  company: string;
  type: string;
  problem: string;
  solution: string;
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'mellow',
    company: 'Mellow',
    type: 'Branding Agency',
    problem: 'Manual brief intake, scattered assets, slow client approvals',
    solution: 'AI-powered brief processing → automated asset organization → one-click client approval portal',
    outcome: 'From brief to delivery in hours, not days',
  },
  {
    id: 'sclines',
    company: 'SC Lines',
    type: 'Shipping Operations',
    problem: 'Quote requests via email, manual rate lookups, booking delays',
    solution: 'Automated quote intake → instant rate matching → streamlined booking workflow',
    outcome: 'Quotes that used to take hours, now take minutes',
  },
];
```

### Features (`/src/data/features.ts`)

```typescript
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  emphasized?: boolean;
}

export const features: Feature[] = [
  {
    id: 'workflow',
    title: 'Workflow Automation',
    description: 'Database-native orchestration. Not Zapier chains.',
    icon: 'workflow',
  },
  {
    id: 'crm',
    title: 'Lead Capture & CRM',
    description: 'Intake, qualify, and route leads automatically.',
    icon: 'users',
  },
  {
    id: 'hitl',
    title: 'Human-in-the-Loop',
    description: 'AI drafts. Humans approve. Nothing slips through.',
    icon: 'check-circle',
  },
  {
    id: 'custom',
    title: 'Custom Development',
    description: 'We build workflows specific to your agency.',
    icon: 'code',
    emphasized: true,
  },
];
```

## Implementation Notes

1. **Keep existing components** — Refactor content, not structure
2. **Data-driven** — All content comes from config files for easy updates
3. **Preserve animations** — Keep Lenis scroll and Motion transitions
4. **Single CTA** — "Book a Call" everywhere (links to booking page)
5. **Mobile responsive** — Maintain existing responsive behavior

## Files to Modify

- `/src/app/page.tsx` — Main page composition
- `/src/components/Landing/HeroSection.tsx` — New headline/CTA
- `/src/components/Landing/FeatureSection.tsx` — New features
- `/src/components/Landing/Navbar.tsx` — Update CTA
- `/src/components/Landing/Footer.tsx` — Update tagline

## Files to Create

- `/src/data/verticals.ts`
- `/src/data/caseStudies.ts`
- `/src/data/features.ts`
- `/src/components/Landing/VerticalsSection.tsx`
- `/src/components/Landing/CaseStudiesSection.tsx`
- `/src/components/Landing/HowItWorksSection.tsx`
- `/src/components/Landing/CTASection.tsx`

## Files to Remove/Rename

- `/src/components/Landing/AnalysisToolsSection.tsx` — Replace with new sections
- `/src/components/Landing/DataSecuritySection.tsx` — Replace with new sections
- `/src/components/Landing/TestimonialsSection.tsx` — Replace with CaseStudiesSection
