# Colex - Workflow Automation for Teams

Colex is a workflow automation platform that gives your teams extra hands. Purpose-built to automate team workflows reliably with human-in-the-loop review and approval.

## Overview

Colex helps teams automate repetitive workflows without the complexity of no-code tools or the cost of custom development. Describe what you need in plain English, and our agents build and connect everything automatically.

## How It Works

1. **Describe what you need** - Tell us your workflow in plain English
2. **Our agents build the workflow** - Don't like something? Just say so.
3. **Review each output** - Each task asks for approval when done
4. **We create the connections** - All tasks connect to your data automatically

## Key Features

### Task Interfaces
Each workflow task gets its own interface - no more fighting with spreadsheets.

### Human Review by Default
The system notifies you for reviews automatically. AI drafts, you approve.

### Full Audit Trail
Every decision. Every approval. Logged.

### Works with Your Data
Connects to Gmail, Sheets, Slack, and more.

### Changes with Your Needs
Configure auto-approvals, notifications, and approval workflows.

## Why Colex?

Traditional solutions have their drawbacks:
- **SaaS is too rigid** - Teams end up back on WhatsApp
- **No-code is a lot of code** - You become the maintenance person
- **Vibe coding doesn't ship** - Cool demos that never get shared
- **Devs are expensive** - Three months later, "almost done"

Colex gives control back to you with:
- Minutes to your first workflow
- Human review built in
- Interfaces that come ready to use

## Industries

Built for logistics, insurance, legal, and more - anywhere teams need reliable workflow automation with human oversight.

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **UI Library**: Chakra UI v3
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd colex-website-v2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
colex-website-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   └── Landing/           # Landing page sections
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── WhySection.tsx
│   │       ├── FeatureGridSection.tsx
│   │       ├── BenefitsSection.tsx
│   │       ├── FeatureSection.tsx
│   │       ├── ResultsSection.tsx
│   │       ├── TrustSection.tsx
│   │       ├── VerticalsSection.tsx
│   │       ├── CTASection.tsx
│   │       └── Footer.tsx
│   ├── lib/                   # Utilities and constants
│   ├── hooks/                 # Custom React hooks
│   ├── assets/               # Icons and images
│   └── theme/                # Chakra UI theme
├── public/                   # Static assets
└── CONTENT.md               # Website copy (editable)
```

## Content Management

All website copy is maintained in `CONTENT.md` for easy editing.

---

Trusted by teams at Mellow Designs and SC Lines.
