# Landing Page Redesign Plan

## Overview
Complete redesign of the Colex landing page based on reference images 1-10.

---

## Section 1: HeroSection (Images 1-2)

**Scroll behavior:** Sticky section with content fade-in

### Frame 1 (Initial)
- Centered headline: "Give your teams extra hands"
- Subtitle: "Colex is purpose built to automate your team reliably"

### Frame 2 (After scroll)
- Same headline + subtitle
- CTA button fades in: "Let's build yours" (burgundy background, white text)
- Trust signals fade in: "Trusted by teams at" + "Mellow Designs | SC Lines"

---

## Section 2: HowItWorksSection (Images 3-4)

**Scroll behavior:** Sticky section with header shrink + content fade-in

### Frame 1 (Initial)
- Big centered headline: "How it works"

### Frame 2 (After scroll)
- Header shrinks and moves to **top center**
- Content fades in below:
  - **Left side:** Chat mockup showing conversation
    - User message: "I need a workflow that takes quote requests from email, matches them to our rate sheet, and sends proposals"
    - Typing indicator (3 dots)
  - **Right side:** Step indicator + text
    - Step number badge
    - "Describe what you need"
    - Subtitle explaining the step

### Steps (cycle through on continued scroll):
1. "Describe what you need" - Tell us your workflow in plain English
2. "We build the workflow" - Just talk to tweak. Don't like something? Just say so.
3. "Your team reviews" - Nothing ships without approval
4. "Colex handles the rest" - We handle the engineering. You just use it.

---

## Section 3: WhySection (Images 5-6)

**Scroll behavior:** Sticky section with header shrink + content fade-in

### Frame 1 (Initial)
- Big centered headline: "You have tried this before"

### Frame 2 (After scroll)
- Header shrinks and moves to **top center**
- 2x2 grid of failure cards fades in below

### Card Content:
Each card has:
- UI mockup area (same style as FeatureGridSection cards - clean, functional UI)
- Text below the mockup

| Card | Text | Mockup |
|------|------|--------|
| 1 | "Tried SaaS - team is still on whatsapp" | Chat bubble UI showing "did you update the CRM?" / "where's the doc?" style messages |
| 2 | "Tried no-code. Became the maintenance guy." | Tangled flowchart nodes with error badges, broken connections |
| 3 | "Tried vibe coding. Cool demo. Never shipped." | Code editor mockup with "DEMO" badge, or deploy button stuck on "pending" |
| 4 | "Hired devs. Three months later, 'almost done.'" | Jira-style board with tickets piling up, or timeline showing延期 |

---

## Section 4: FeatureGridSection (Images 7-8)

**Scroll behavior:** Sticky section with header shrink + content fade-in

### Frame 1 (Initial)
- Big centered headline: "Colex gives the control back to you"

### Frame 2 (After scroll)
- Header shrinks and moves to **top center**
- 3 feature cards in a row fade in below

### Card Content:
| Card | Title | Description | Mockup |
|------|-------|-------------|--------|
| 1 | Simple UI | We generate UI for all your tasks | Checklist mockup showing task states |
| 2 | Automated Reviews | The system asks for reviews when needed | Approval buttons (Approve/Reject/Escalate) with "Why this needs review" banner |
| 3 | Full Audit Trail | Every decision. Every approval. Logged. | Activity feed showing history entries |

---

## Section 5: BenefitsSection (Image 9)

**Scroll behavior:** Static (no scroll animation)

### Layout:
- 2x2 grid (4 cards)
- 1 full-width card below

### Card Content:
Same visual style as FeatureGridSection - clean UI mockups, not illustrations.

| Position | Title | Mockup |
|----------|-------|--------|
| Top-left | "Minutes to your first workflow" | Progress stepper UI showing 3 steps, all checked, with "5 min" timestamp |
| Top-right | "Works with your data" | Integration row showing connected services (Gmail, Sheets, Slack icons) with green "Connected" badges |
| Bottom-left | "Human review by default" | Approval queue UI with "Pending review" items and reviewer avatars |
| Bottom-right | "Changes with your needs" | Settings panel with toggles/sliders, showing configurable options |
| Full-width | "Comes with interface to use the workflow, no plumbing needed" | Dashboard mockup showing workflow list with status indicators, run counts, last activity |

---

## Section 6: CTASection (Image 10)

**Scroll behavior:** Static

### Layout:
- Burgundy background (brand.primary)
- Two-column layout:
  - **Left:** Headline + subtitle
  - **Right:** CTA button

### Content:
- Headline: "Describe your workflows once. They run forever."
- Subtitle: "No devs, no consultants, no waiting"
- Button: "Try colex today" (white background, dark text)

---

## Technical Notes

### Scroll Animation Pattern
All sticky sections follow the same pattern:
1. Container has `height: 300vh` (or similar) to create scroll distance
2. Inner content has `position: sticky; top: 0; height: 100vh`
3. Use `useScroll` + `useTransform` from framer-motion
4. Header: transforms `top` from 50% to ~10%, `scale` from 1 to ~0.4
5. Content: `opacity` from 0 to 1, `y` from 30 to 0

### File Structure
```
src/components/Landing/
├── HeroSection.tsx
├── HowItWorksSection.tsx (rename from HowSection.tsx)
├── WhySection.tsx
├── FeatureGridSection.tsx
├── BenefitsSection.tsx (new)
├── CTASection.tsx
├── Navbar.tsx
└── Footer.tsx
```

### Colors
- Primary (burgundy): `brand.primary`
- Text: `text.primary`, `text.muted`
- Background: white/transparent with ASCII background overlay

---

## Implementation Order

1. [ ] HeroSection - simplest, good to verify pattern works
2. [ ] HowItWorksSection - header shrink + complex content
3. [ ] WhySection - header shrink + grid
4. [ ] FeatureGridSection - header shrink + 3 cards
5. [ ] BenefitsSection - static bento grid
6. [ ] CTASection - static, simple
7. [ ] Integration + polish
