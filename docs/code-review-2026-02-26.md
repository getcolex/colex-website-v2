# Code Review — 2026-02-26

Two-pass Gemini review with oracle-aware Claude verification.

---

## Code Defects (Proven)

### CRITICAL

- **`src/lib/gtag.ts:16` — Unsafe `window.gtag` call crashes primary CTA.** `event()` calls `window.gtag(...)` with no existence check. Google Analytics loads via `afterInteractive` and is blocked by ad-blockers. Clicking "Book a demo" throws `TypeError: window.gtag is not a function`, aborting execution before the WhatsApp link opens. Fix: guard with `if (typeof window.gtag === 'function')`.

- **`src/app/LayoutClient.tsx:8` — Two competing Lenis scroll instances cause jitter.** `LenisProvider` creates a `<ReactLenis root>` instance (duration: 1.2). `LayoutClient` calls `getLenis()` which creates a second independent instance (duration: 1.05) with its own RAF loop. Two scroll hijackers fight over `window.scrollTo`. Fix: remove `getLenis()` from LayoutClient, delete `src/lib/lenis.ts`, rely on `LenisProvider` only. **Note:** `getLenis()` is only used in `LayoutClient.tsx` — nothing else depends on it. Safe to delete.

### HIGH

- **`src/components/Landing/Footer.tsx:14` — Hydration mismatch.** Footer branches between `<VStack>` (mobile) and `<HStack>` (desktop) using `useBreakpointValue`. Server returns `undefined` → renders neither branch. Client renders one → DOM mismatch forces synchronous re-render. Fix: render both, toggle with CSS `display={{ base: "none", md: "flex" }}`.


- **`next.config.ts:4` — SVG loader conflict.** `@svgr/webpack` rule is pushed without excluding SVGs from Next's default asset loader. Both loaders match `.svg`, causing build errors or broken rendering. Fix: modify existing SVG rule to exclude `.svg`, or use `resourceQuery`.


- **`src/test/setup.ts:16` — `motion.div` undefined in test mock.** Mock only defines `motion.create`. Components using `<motion.div>` get `undefined`, crashing with "Element type is invalid". Fix: use a Proxy on the `motion` object that returns the component for any HTML element access.


- **`src/test/setup.ts:20` — `useTransform` mock returns primitive instead of MotionValue.** Returns `values?.[0] ?? 0`. Calling `.get()` throws `TypeError`. Fix: wrap in `createMotionValue()` helper already defined in the mock.

- **`src/test/setup.ts:28` — `useLenis` mock calls callback synchronously during render.** Components that `setState` inside the callback trigger "Too many re-renders". Fix: defer with `queueMicrotask` or store callback for explicit trigger.


- **`src/components/Landing/FeatureSection.tsx:216` — Deprecated `next/image` props.** Uses `layout="fill"` and `objectFit="cover"`, removed in Next.js 13+. Images may collapse or render incorrectly. Fix: replace with `fill` (boolean) and `style={{ objectFit: "cover" }}`.

### MEDIUM

- **`src/components/Landing/__tests__/WhySection.test.tsx:30` — Typo causes test failure.** Test asserts `"Vibe coding dosen't ship"` — misspelling of "doesn't". Guaranteed failure. Fix: correct to `"doesn't"`.

---

## Behavioral Mismatches (needs spec check)

### HIGH

- **`src/components/Landing/HowItWorksSection.tsx:501` — Step cross-fade ranges overlap.** Formula `stepStart = 0.15 + index * 0.15`, `stepEnd = stepStart + 0.17`. Step 1 ends at 0.47, step 2 starts at 0.45 — 0.02 overlap where both absolutely-positioned text blocks are visible simultaneously. Screenshots confirm steps 2/3 overlapping visually. Fix: increase step spacing or reduce `stepEnd`. **TODO: pick up in a manual run.**

- **`src/components/Landing/FeatureSection.tsx:39` — Feature click doesn't scroll window.** `handleFeatureClick` sets `activeIndex` and `sliceProgress` but doesn't call `window.scrollTo`. Next scroll event recalculates from `scrollY` and snaps back. The click is desktop-only and meant as a visual highlight (swaps image, fills progress bar), but any subsequent scroll immediately overwrites it. Fix: either scroll the window to the corresponding position on click, or make the scroll handler temporarily yield after a manual click.

- **`src/components/Landing/AnalysisToolsSection.tsx:100` — Card width exceeds mobile viewport.** Cards hardcoded to `w={{ base: "452px" }}`. Standard mobile viewports are 320–430px. Individual cards overflow. Fix: use `w={{ base: "85vw", sm: "350px", md: "auto" }}`.

---

## Code Observations (low confidence)

### MEDIUM

- **`src/hooks/useSectionScroll.ts:37` — Layout thrashing in scroll callback.** `getBoundingClientRect()` called inside `useLenis` callback on every scroll frame. Synchronous layout read at 60fps+ with no caching or throttling. Fix: use `ResizeObserver` or Framer Motion `useScroll`.

- **`src/components/Landing/FeatureSection.tsx:52` — Stale `offsetTop` on resize.** `startTop = phantom.offsetTop` computed once in `useEffect`. No `ResizeObserver` or resize listener. Layout shifts above the section desynchronize scroll animations. Fix: add `ResizeObserver` or recalculate dynamically. **TODO: manual fix later.**

- ~~**`src/components/Landing/HeroDemo.tsx:324` — Inline `@keyframes` may not work in Chakra v3.**~~ **FALSE POSITIVE — REMOVED.** Project uses Chakra v3 with Emotion runtime (`@emotion/react` + `ThemeProvider`), not Panda CSS static extraction. Emotion fully supports inline `@keyframes` in the `css` prop. The blinking cursor works fine.

### LOW

- **`src/components/Landing/FeatureSection.tsx:59` — Missing out-of-bounds state reset.** Scroll handler only updates `activeIndex` when inside the section (`y >= startTop && y < endTop`). There is no `else` branch. If you scroll down to feature #3 then scroll back up past the section entirely, feature #3 stays highlighted — wrong title emphasized, wrong description expanded, wrong image shown. Fix: add `else if (y < startTop) { setActiveIndex(0) }` to reset when leaving the section.
---

## UX / UI Issues

### CRITICAL



- **How It Works section overflows on small phones.** Sticky `100vh` + `overflow="hidden"` container cuts off step text on iPhone SE and shorter Androids. Visual mockup (400px+) and text (200px+) combined exceed viewport height. Users can't scroll to read it. Fix: disable sticky scroll-jacking on mobile, revert to natural vertical stacking.

### HIGH

- **Navbar hidden on initial desktop load.** `shouldShowNavbar = isMobile || scrollY > 580` hides the navbar until the user scrolls past 580px. No brand logo, no "Book a demo" CTA visible on first load. Breaks web conventions and removes immediate conversion for high-intent visitors. Fix: add a visible logo on first load (even if full navbar stays hidden until scroll).



### MEDIUM

- **Feature grid cramped on tablets.** Grid jumps to 3 columns at `md` (768px), forcing complex UI mockups into ~220px width. Text truncation and broken card layouts. Fix: use `templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}`.

- **Microscopic font sizes in UI mockups.** Cards in `FeatureGridSection` and `WhySection` use 8–9px text. Illegible on lower-resolution displays and inaccessible. Fix: minimum 12px font size, use `transform: scale(0.85)` to shrink proportionally if needed.

### LOW

- **Inconsistent CTA messaging.** Hero says "See it work in 30 minutes", navbar says "Book a demo", benefits says "Let's talk", CONTENT.md says "Let's build yours". Four different CTAs increases cognitive load. **TODO: decide on one unified CTA phrase.**

- **Barebones footer.** Footer has only logo + copyright. Missing Privacy Policy, Terms of Service, social links, contact info. Feels unfinished for a B2B product. Fix: add standard columns for Product, Legal, Social. **TODO: add placeholder footer links now.**

---

## Design & Creative Critique



### PARTIALLY VALID

- **Mockup fidelity in "Colex gives control back" section.** Cards have real data ($4,850 invoices, SIN→LAX routes, avatars, status badges, Approve/Reject/Escalate buttons) — not bare wireframes. But the gray base palette (`bg="gray.50"`, `bg="gray.100"`) and small font sizes make them feel schematic rather than premium. The data density is there but the visual polish could be elevated with stronger color differentiation, subtle inner shadows on inputs, and higher-contrast data values.

- **"You have tried this before" — four visual languages.** The four cards deliberately use different styles to represent competing tools (WhatsApp chat bubbles, n8n node graph, AI builder dark mode, Jira kanban). This is intentional, not accidental — they share a common card shell (`bg="white"`, `border="1px solid"`, `borderColor="gray.200"`, `boxShadow="sm"`). But the wildly different interiors (green WhatsApp colors, dark gray canvas, colorful nodes, yellow kanban) could benefit from a unifying visual filter — e.g., all rendered in monochrome with a single burgundy accent — to feel cohesive while still being distinct.

- **Integrations section is small.** Integrations appear as one quadrant of a 2x2 bento grid in `BenefitsSection` — 4 icons (Gmail, Sheets, Slack, WhatsApp) at 48px with scroll-triggered scale-in animation and "+ more" label. For an orchestration platform, integrations are a key selling point. A dedicated full-width section with more logos and a visual ecosystem representation would be more compelling.

- **Card styling — borders and shadows together.** Cards consistently use both `border="1px solid" borderColor="gray.200"` and `boxShadow="sm"` across `WhySection`, `FeatureGridSection`, and other areas. The combination is applied consistently (not accidental) but reads as uncommitted. Choosing one approach — either crisp borders without shadows, or floating cards with rich multi-layered shadows — would create a more intentional feel.
