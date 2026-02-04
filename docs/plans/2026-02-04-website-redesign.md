# Website Redesign Plan

**Date**: 2026-02-04
**Goal**: Match Agenforce template quality while keeping warm/light brand identity

---

## Page Structure (top to bottom)

1. Navbar (keep existing)
2. Hero (redesign)
3. Trust (new)
4. Feature Bento Grid (new)
5. HowSection (keep existing)
6. WhySection (keep existing)
7. CTA Section (keep existing)
8. Footer (keep existing)

---

## Section Specifications

### 1. Hero Section (redesign)

**Copy:**
- Headline: "Give your team extra hands."
- Subtitle: "Agents that do the work. Approvals that keep you safe."
- CTA: "Book a demo" (primary button)

**Visual:**
- Approval view screenshot (the inbox/review screen with Approve/Reject/Escalate)
- Angled with CSS perspective transform (like Agenforce)
- Screenshot positioned to the right, text to the left
- Remove scroll-driven animations from current hero

**Layout:**
- Two-column on desktop (text left, image right)
- Stacked on mobile (text top, image bottom)

**Assets needed:**
- `/public/images/product/approval-view.png` - the approval screenshot

---

### 2. Trust Section (new)

**Copy:**
- Headline: "Trusted by operations teams"
- Company names: Mellow, SC Lines (text only, no logos)

**Testimonials (2 placeholders):**

Card 1:
- Quote: "Colex cut our quote turnaround from days to hours. The approval flow means nothing goes out without review."
- Name: "[Name]"
- Title: "[Title], Mellow"

Card 2:
- Quote: "We finally have visibility into what's happening. Every decision is logged, every output is reviewed."
- Name: "[Name]"
- Title: "[Title], SC Lines"

**Layout:**
- Company names centered at top
- Two testimonial cards side by side below
- Cards have subtle border, author info at bottom

---

### 3. Feature Bento Grid (new)

**Layout:** 3 cards in a row (stacked on mobile)

**Card 1 - Constrained UI:**
- Headline: "Constrained UI"
- Subtext: "Fixed components. Predictable output."
- Visual: Tabled checklist mockup
  - Simple table with checkboxes
  - Items like: "Extract inquiry details ✓", "Match to rate sheet ✓", "Generate quote ✓"

**Card 2 - Mandatory Review:**
- Headline: "Mandatory Review"
- Subtext: "AI drafts. You approve."
- Visual: Approval buttons mockup
  - "WHY THIS NEEDS REVIEW" banner (yellow/amber)
  - Three buttons: Approve (green), Reject (red outline), Escalate (gray)

**Card 3 - Full Audit Trail:**
- Headline: "Full Audit Trail"
- Subtext: "Every decision. Every approval. Logged."
- Visual: History/activity feed mockup
  - List of entries with timestamps
  - "Quote #127 approved by Sarah - 2m ago"
  - "Supplier list generated - 5m ago"
  - "Inquiry captured from email - 8m ago"

**Card styling:**
- Dark background (brand.primary or near-black) to contrast with warm page
- Rounded corners
- Visual mockup in top 60%, text in bottom 40%

---

## Assets To Create

1. `/public/images/product/approval-view.png` - Hero screenshot
2. Card mockups will be built as React components (not images)

---

## Files To Modify/Create

| File | Action |
|------|--------|
| `src/components/Landing/HeroSection.tsx` | Rewrite - new layout, remove scroll animations |
| `src/components/Landing/TrustSection.tsx` | Create - company names + testimonials |
| `src/components/Landing/FeatureGridSection.tsx` | Create - 3 bento cards with mockups |
| `src/app/page.tsx` | Update section order |

---

## Atomic Tasks

### Task 1: Save product screenshot
- Save approval view screenshot to `/public/images/product/approval-view.png`

### Task 2: Rewrite HeroSection
- Remove scroll-driven animations
- Two-column layout (text left, image right)
- Update copy to new headline/subtitle
- Add product screenshot with perspective transform
- Keep "Book a demo" CTA

### Task 3: Create TrustSection
- "Trusted by operations teams" headline
- Company names: Mellow, SC Lines
- Two testimonial cards with placeholder content
- Responsive: side by side on desktop, stacked on mobile

### Task 4: Create FeatureGridSection
- Three cards in a row
- Each card has: headline, subtext, visual mockup
- Build mockups as React components
- Responsive: row on desktop, stacked on mobile

### Task 5: Update page.tsx
- New section order: Navbar → Hero → Trust → FeatureGrid → How → Why → CTA → Footer
- Remove AsciiBackground (using clean cream)

### Task 6: Test and polish
- Check responsive behavior at all breakpoints
- Verify all links/CTAs work
- Test scroll performance

---

## Verification Checklist

- [ ] Hero shows new copy and product screenshot
- [ ] Screenshot has perspective transform (angled)
- [ ] Trust section shows company names and 2 testimonials
- [ ] Feature grid shows 3 cards with mockups
- [ ] Page loads without errors
- [ ] Responsive: mobile layout works
- [ ] CTAs trigger correct actions
- [ ] Existing sections (How, Why, CTA, Footer) still work
