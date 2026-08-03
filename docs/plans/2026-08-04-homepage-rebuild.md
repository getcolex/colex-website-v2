---
title: Homepage rebuild — unify design tokens, then rebuild sections from the wireframe
branch: feature/homepage-rebuild
cell: /Users/parijat/dev/colex-homepage-rebuild
mode: standalone-plan
verify:
  - npm run test:run
  - npx tsc --noEmit
  - npx next lint
effort:
  orchestrator: opus
  executors: sonnet   # owner ruling: opus orchestrates + verifies, sonnet does RED and GREEN
revision: 2   # rev 1 stopped on advisory review; findings verified against code and folded in
---

# Homepage rebuild

Rebuild the Colex homepage from the approved wireframe, on one Chakra token system.

**North Star:** the published artifact
`https://claude.ai/code/artifact/bd0376e6-3387-44c3-8194-d5b88697c7eb`.
Where this plan and the artifact disagree, **the artifact wins** — report the discrepancy.

**Inputs (already in this cell):**
- `docs/wireframe-copy.txt` — every heading/paragraph/list item, per section, verbatim
- `src/components/Landing/data/wireframe.ts` — `CASES` and `VERTICALS`, typed and importable

Copy is **verbatim**. Never rewrite, tighten, or "improve" a line: the owner edited each one
directly. The two known transcription typos were fixed in the artifact before this revision, so
any remaining oddity is intentional. If a line still looks wrong → STOP and report.

## Wireframe section numbering (authoritative — rev 1 had these wrong)

| § | Wireframe section | Becomes |
|---|---|---|
| 1 | HERO | `HeroSection` (copy only this pass) |
| 2 | THE PAIN | `PainSection` (new) |
| 3 | THE SHIFT | `ShiftSection` (new) |
| 4 | WHO IT'S FOR | `VerticalsSection` (new) |
| 5 | HOW IT RUNS | `HowSection` (replaces `HowItWorksSection`) |
| 6 | WHAT YOU GET | `GetSection` (replaces `WhyDifferentSection`) |
| 7 | CLOSING CTA | `BookDemoSection` (copy only) |
| 8 | THESIS TEASER | footer-adjacent; **not in scope this pass** |

The moments table ("Six months in, you own something") lives in §6's tail as the `after`
content in the artifact. Take its exact position from the artifact, not from memory.

## Preconditions (standalone-plan mode — no cell certificate)

1. `git branch --show-current` is `feature/homepage-rebuild`.
2. `npm run test:run` → 42 passed, 8 files. Baseline; no pre-existing reds.
3. `npx tsc --noEmit` → exit 0.
4. `npx next lint` → exit 0 (deprecation + lockfile warnings are expected, not failures).
5. `docs/screenshots/00-baseline-{1440,768,390}.png` exist.
6. Dev server reachable at `http://localhost:3000/`.

Any mismatch → STOP and report.

## Scope wall

Touch only:
`src/theme/`, `src/components/Landing/`, `src/app/page.tsx`, `src/app/layout.tsx`,
`src/hooks/useSectionScroll.ts`, `src/lib/contexts/LenisProvider.tsx`, `src/test/`,
`scripts/`, `package.json`, `package-lock.json`, `docs/screenshots/`.

Do **not** touch `src/app/blog/**` — the blog ships and is not part of this work.

## Two patterns every unit follows

**RED for a new component.** A test importing a file that does not exist fails on module
resolution, which is the WRONG reason. So: first commit a minimal shell that exports a
component rendering nothing meaningful (`export default function PainSection() { return null }`),
then write tests that fail on **missing behaviour**. Confirm each red names absent content, not
an import error.

**Atomic commits.** A section's component, its wiring into `src/app/page.tsx`, and the deletion
of any component it replaces (plus that component's test file) land in ONE commit. A commit
that adds a component without wiring it is green but shows nothing; a commit that deletes a
component while its test survives reds on a missing import.

## Screenshot proof (every unit that changes a render path)

```
node scripts/shot.mjs <unit-label>
```

Writes `docs/screenshots/<unit-label>-{1440,768,390}.png`. The script drives a real browser and
scrolls, because the current page uses Lenis + scroll-linked motion transforms: a plain headless
`--screenshot` leaves every section at its start state and captures a blank page.

Screenshots prove **layout and copy**. They cannot prove scroll behaviour, focus, or keyboard
interaction — assert those in tests. A render-path change with no screenshot is recorded PARTIAL
with the reason.

---

## Unit 1 — Delete dead components

Seven Landing components are imported by nothing (`CTASection` only by its own test).

Delete: `TrustSection.tsx`, `CTASection.tsx`, `HowSection.tsx`, `AnalysisToolsSection.tsx`,
`FeatureSection.tsx`, `TestimonialsSection.tsx`, `DataSecuritySection.tsx`,
`__tests__/CTASection.test.tsx`.

> Note: the new §5 component is also called `HowSection`. The dead `HowSection.tsx` deleted here
> is unrelated legacy. Delete it in this unit; unit 5 creates a new file at the same path.

**Checklist-first** (deletion has no honest RED — do not fabricate one):
1. For each: `grep -rn '<name>' src` shows no importer outside itself and its own test.
2. Delete.
3. `npm run test:run` → 38 passed (42 − CTASection's 4), 7 files.
4. `npx tsc --noEmit` → 0; `npx next lint` → 0.
5. `node scripts/shot.mjs 01-dead-code` → visually identical to `00-baseline`.

STOP if any file has a real importer.

## Unit 2 — One token system

The theme is stale in four measured ways:
- `page.tsx` hardcodes the ground `#F8F7F4`; `ui.background` claims `#FFFFFF`.
- Chakra's cool `gray.*` (123 refs) outvotes the warm theme tokens ~3:1.
- `brand.secondary` (`#722F37`) is unused; `#A41752`, `#5a0a38` float as literals.
- Three greens mean "success": `status.success`, `green.500`, `#38A169`.

Add to `src/theme/index.tsx` — **exactly these**, no more:

```
surface.page      #F8F7F4   the real page ground
surface.raised    #FFFFFF   cards sitting on the ground
border.default    the wireframe's --line
border.subtle     the wireframe's --line-2
ink.primary       the wireframe's --ink
ink.muted         the wireframe's --ink-2
```

Take the four wireframe values from the artifact's CSS custom properties — do not invent them.
Keep `status.success|warning|error|info` as the single source for status colour.

**Legacy aliases stay.** `text.*`, `ui.*`, `button.*`, `brand.*` are still referenced by
surviving components; removing them is unit 11's job, not this one.

**RED:** assert `system.token('colors.surface.page')` resolves to `#F8F7F4`, and that
`src/app/page.tsx` contains no raw hex literal.

Do **not** migrate existing components here — units 5–7 delete three of them.

Verify + `node scripts/shot.mjs 02-tokens`. The page must look **unchanged**; this unit adds
vocabulary. Any visible diff vs `01-dead-code` is a defect.

## Unit 3 — Hero copy only

Keep `HeroSection` and `HeroDemo` structurally as they are. The three-pane product wireframe is
separate later work.

Apply §1 copy: the h1 ("Give your teams extra hands" — already live, confirm rather than change)
and the lede. **The artifact's hero has two CTAs; the current component has one plus microcopy.**
Adding the second is a structural change — if §1 requires it, do it and say so in the bundle;
if the artifact's hero CTAs are still in flux, apply the lede only and report.

**RED:** extend `__tests__/HeroSection.test.tsx` with the new lede text.
Verify + `node scripts/shot.mjs 03-hero-copy`.

## Units 4–7 — Sections, in page order

One unit each: shell → RED → GREEN → verify → screenshot → atomic commit. Every new component is
styled **only** from unit 2's tokens: no raw hex, no `gray.*`. All are static — no animation.

**Responsive:** every 2×2 grid collapses to one column below `md` (768px). The artifact stacks
at 390px; match it.

**Unit 4 — `PainSection`** (§2). Heading, lede, 2×2 of four cards (`h3` + two `<p>` each),
closing pull quote.

**Unit 5 — `HowSection`** (§5). 2×2 of `h3` + `p` + an image placeholder holding `aspect-ratio:
1 / 1.64`. Replaces `HowItWorksSection`; delete it and `__tests__/HowItWorksSection.test.tsx` in
the same commit.

**Unit 6 — `GetSection`** (§6). Same 2×2 + placeholder shape, plus the moments table. Replaces
`WhyDifferentSection` and `ControlSection`; delete both and their test files in the same commit.
The moments table uses semantic `<table>` markup with header cells, and scrolls inside its own
`overflow-x: auto` container on mobile.

**Unit 7 — `ShiftSection`** (§3) and **`VerticalsSection`** (§4) — the two interactive ones.
Import `CASES` / `VERTICALS` from `src/components/Landing/data/wireframe.ts`.

- `ShiftSection`: three picker buttons switching a before/after pair — six ordered steps under
  "How you do it today", the rule under "Just ask Colex for". **"Starting a new hire" is
  selected on load and the initial markup must match it** — the wireframe had a real bug where
  the pre-selected pick did not match rendered content. Test the initial state explicitly, then
  a round-trip (hire → freight → hire).
- `VerticalsSection`: five tabs → pills → one card. Each vertical remembers its selected pill
  when you tab away and back. Test that for **two different verticals**, and that it survives a
  rerender.

**Accessibility (both):** `role="tablist"`/`role="tab"` with `aria-selected`, arrow-key
navigation between tabs, a visible focus state, and each panel associated with its tab via
`aria-controls`/`id`. Assert these in tests — a screenshot cannot show them.

## Unit 8 — Closing CTA copy

`BookDemoSection` is copy-only: apply §7 verbatim, including "…a handful of AI first teams…" and
"…we'll build it **for** you."

**RED:** assert the new paragraph text in `__tests__/BookDemoSection.test.tsx`.
Verify + `node scripts/shot.mjs 08-cta-copy`.

## Unit 9 — Remove Lenis (last; only if no consumer remains)

By now the rebuilt sections are static and `HowItWorksSection` — Lenis's only consumer — is gone.

1. `grep -rni 'lenis' src package.json` returns nothing outside the files being deleted. Grep the
   **word**, not three identifiers: this catches the CSS import, config strings, and mocks.
   **Anything else still using it → STOP.**
2. Delete `src/hooks/useSectionScroll.ts`, `src/lib/contexts/LenisProvider.tsx`.
3. Remove `LenisProvider` and `lenis/dist/lenis.css` from `src/app/layout.tsx`.
4. `npm uninstall lenis` — this updates `package-lock.json` too; removing it from
   `package.json` alone leaves the lockfile stale.
5. Remove the `lenis/react` mock from `src/test/setup.ts`.
6. Delete the two tests in `src/test/regression-findings.test.tsx` that exist only to pin the
   `useLenis` mock's async behaviour. Keep the other five.
7. Simplify `scripts/shot.mjs`: with no scroll-linked reveals, drop the scroll walk.

**Screenshots cannot prove this unit.** Also confirm by hand and report: the page scrolls
natively, in-page anchors jump correctly, and the navbar's scroll threshold still fires.

Verify + `node scripts/shot.mjs 09-no-lenis`, compared against unit 8's.

## Unit 10 — Migrate the survivors (completes "one design system")

Units 1–9 leave `HeroSection`, `HeroDemo`, `Navbar`, `Footer` on legacy tokens and raw hex
(`#5a0a38`, the demo's gradients). Until they move, the page runs two colour systems.

Replace their `gray.*`, raw hex, and legacy aliases with unit 2's tokens. Pure refactor: no
copy, no layout, no behaviour change. Then remove any `text.*` / `ui.*` / `button.*` alias that
has no remaining referent.

**RED:** assert no `gray.` and no raw hex in `src/components/Landing/*.tsx`.
Verify + `node scripts/shot.mjs 10-migrated` — must be pixel-identical to unit 9's. Any visible
diff is a defect, not an improvement.

## Verification (every unit, all three, exactly as written)

```
npm run test:run
npx tsc --noEmit
npx next lint
```

Never pipe test output through `head`/`tail`; exit codes stay visible.

## Stop conditions

- The same error twice in a row → STOP; never a third variation.
- No forward progress since the last checkpoint → STOP.
- Copy that looks wrong → STOP and report; never silently reword.
- A file outside the scope wall needs to change → STOP.
- Plan and artifact disagree → the artifact wins; report it.
- Any environment fault (ports, deps, dev server) → ENV-FAULT stop; never debug the environment.

## Plan ↔ code mismatches

Record any contradiction between this plan and what the code actually does. An empty section is
an explicit claim of none.

### Carried from rev 1's advisory review (verified against code, already fixed above)

- Wireframe §§ were off by one — corrected in the table above.
- A "trim the nav" unit was dropped: `Navbar` and `Footer` already contain neither "How it
  works" nor "About" (`grep` returns nothing).
- The scope wall excluded files the Lenis unit must edit — widened.
- `docs/wireframe-data.js` exported nothing — replaced by the typed
  `src/components/Landing/data/wireframe.ts`.
- Two transcription typos in §5 were fixed in the artifact itself, so the North Star and this
  plan agree.
