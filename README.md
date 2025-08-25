# Colex - AI-Powered Legal Workspace

Colex is an AI-powered legal workspace built specifically for in-house legal teams dealing with increasingly complex business challenges. The platform helps legal professionals cut through busywork and reclaim hours for strategic planning.

## 🌟 Overview

Colex provides a comprehensive solution for legal teams to manage contracts, analyze documents with AI assistance, handle intake processes, and collaborate effectively on legal matters. The platform serves as a centralized hub that consolidates various legal workflows into a single, intuitive interface.

## ✨ Key Features

### 1. Secure Knowledge-Base
- Centralize all contracts and policies to align your team
- Share securely with authorized stakeholders
- Maintain organized documentation with proper access controls

### 2. AI-Powered Analysis
- Platform remembers your cases and improves suggestions as you work
- Functions like a junior associate that never forgets
- Contextual AI assistance for legal document review

### 3. Seamless Intake Triage
- Consolidate requests from all channels in a single list
- Track requests and let AI deliver instant answers to queries
- Streamlined workflow for handling legal inquiries

### 4. Collaborative Contract Management
- Draft contracts faster with lawyer-verified templates
- Access comprehensive clause libraries
- Build custom approval flows tailored to your company

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with React 19
- **UI Library**: Chakra UI v3.20.0
- **Animations**: Motion (Framer Motion) v12.18.1
- **Styling**: Emotion React & Styled
- **Typography**: Open Sans Variable Font
- **Smooth Scrolling**: Lenis
- **Theme Management**: next-themes
- **Language**: TypeScript
- **Development Tools**: ESLint

## 📁 Project Structure

```
colex/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── LayoutClient.tsx   # Client-side layout
│   │   └── providers.tsx      # App providers
│   ├── components/
│   │   └── Landing/           # Landing page components
│   │       ├── Navbar.tsx     # Navigation component
│   │       ├── HeroSection.tsx
│   │       ├── FeatureSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── constants.ts       # App constants
│   │   ├── gtag.ts           # Google Analytics
│   │   ├── lenis.ts          # Smooth scrolling setup
│   │   └── hooks/
│   │       └── useHasMounted.ts
│   ├── assets/
│   │   └── icons/            # SVG icons
│   └── theme/
│       └── index.tsx         # Chakra UI theme
├── public/
│   └── images/               # Static images
├── next.config.ts            # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd colex
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 Features Implementation

### Responsive Design
The application is fully responsive with breakpoint-specific styling using Chakra UI's responsive utilities.

### Smooth Animations
- Custom scroll-based animations for the features section
- Progressive loading with Lenis smooth scrolling
- Motion components for enhanced user interactions

### Contact Integration
- WhatsApp integration for demo booking
- Google Analytics tracking for user engagement
- Phone contact: +91 9945 075 889

## 🔧 Configuration

### Next.js Configuration
- Custom webpack configuration for SVG handling with SVGR
- Optimized for production builds

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for `@/*` imports
- Modern ES2017 target with full type checking

## 📱 Contact & Demo

Ready to streamline your legal workflow? 

**Book a Demo**: Click the "Book a demo" button on the website to connect via WhatsApp and schedule a personalized demonstration.

**Phone**: +91 9945 075 889

## 🤝 Testimonials

> "I spend less time switching between tools and more time building strong arguments."  
> **Ananya** - Senior Associate at a Litigation Practice

> "Finally, something that understands in-house lawyers. I'd use this every day if it keeps improving."  
> **Lovesh** - Corporate Counsel

## 📈 Development Status

This project is actively being developed with a focus on:
- Enhanced AI capabilities for legal document analysis
- Improved collaboration features
- Extended integration capabilities
- Advanced security features for legal compliance

---

Built with ❤️ for legal professionals who value efficiency and precision.