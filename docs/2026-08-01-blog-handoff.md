# Blog handoff — 2026-08-01

State of the blog on getcolex.com, what is unverified, and what to do next.

## Where things stand

Everything is merged to `main`. Four PRs, all squashed:

| PR | What |
|---|---|
| #39 | Blog section, two posts, chart, SEO, navigation |
| #40 | Mobile touch panning, full-bleed overflow, footer spacing |
| #41 | Bold post titles, nav link padding, cut a vague note |
| #42 | Fewer font sizes, plain bullets, navbar `100vw` removed |

`main` tip at time of writing: `3da9c95`.

Live pages:

- `/blog` — index, driven by `src/app/blog/posts.ts`
- `/blog/the-robotic-workshop` — post 1, the build loop, carries the chart
- `/blog/a-test-bench-i-can-rely-on` — post 2, the testing protocol

## Open item: the chart on a real phone

**Nobody has touched the chart on a real device.** This is the one thing to check first.

The chart is a full-bleed SVG that is much wider than any phone. It pans by dragging. It does not scroll. The relevant CSS is `touch-action: pan-y pinch-zoom` on the canvas in `src/components/Blog/WorkshopChart.tsx`.

- `pan-y` alone reserved horizontal touch for the browser, so a sideways swipe never reached the drag handler and the diagram could not be moved at all on a phone. `pinch-zoom` was added to release horizontal gestures.
- Browser automation in this environment cannot send real touch gestures, and `resize_window` reports success while leaving the viewport unchanged. So the fix is reasoned and measured, never felt.

What to confirm on a phone:

1. A horizontal swipe on the chart moves the diagram.
2. A vertical swipe on the chart scrolls the page, and does not move the diagram.
3. Tapping a stage opens it. Dragging across a stage does not open it.
4. The page never scrolls sideways.

If horizontal panning still fails, the next thing to try is `touch-action: none` on the canvas plus explicit vertical page scrolling in the pointer handler. That is more code and more to get wrong, so only go there if `pan-y pinch-zoom` is genuinely not enough.

## The chart, and the four failed designs before this one

The chart lives in `src/components/Blog/WorkshopChart.tsx`. It builds an SVG imperatively with `document.createElementNS` inside a `useEffect`, laid out by `dagre`. Nine stages, each expandable.

**Do not reintroduce wheel handling.** Four designs failed before the current one:

1. Static `overscroll-behavior: contain` — trapped the reader on a chart that had nowhere to scroll.
2. A custom wheel handler with edge release — leftover scroll still chained to the page, because `preventDefault()` does not stop scroll chaining.
3. Containment toggled by React state — the style was stale for the first wheel event after a stage opened, because a render had to happen first.
4. Containment set imperatively — closer, but still arbitrating something the browser already does.

The current design removes the problem instead of solving it. `overflow: hidden` means there is no scrollport for the wheel to act on, so the wheel always belongs to the page. Panning is by pointer drag, which moves `scrollLeft` and `scrollTop` directly. Those remain settable under `overflow: hidden`, which is what makes this work while hiding the scrollbars.

A 4px slop threshold separates a click from a drag, and a real drag swallows the trailing click so panning across a stage does not open it.

## Two layout traps already hit, both the same bug

`100vw` includes the scrollbar. The page content box does not. Anything sized `100vw` is therefore wider than the page by the scrollbar width, and the page scrolls sideways.

- The chart used `w="100vw"` for its full-bleed. It now uses a `--bleed-w` custom property, set from `document.documentElement.clientWidth` in the resize effect, with a `100vw` CSS fallback for first paint.
- Both navbar states also set `width: "100vw"` next to `position: fixed; left: 0; right: 0`. The positioning already spans the viewport correctly, so the declaration was redundant and wrong. Removed.

**If you add any full-bleed element, do not reach for `100vw`.** Use the same `--bleed-w` variable, or `left: 0; right: 0` on a fixed element.

## Type scale

The article scale is **60 / 27 / 17 / 13 / 11**, and it took two rounds of cutting to get there.

- 60px, post h1. 47px on post 2, which uses a smaller display size.
- 27px, section h2, also the pull quote.
- 17px, body, list items, header blurb.
- 13px, table cells, byline.
- 11px, monospace eyebrows, table headers.

The owner asked twice for fewer sizes. Sizes that get added for a single element, one step away from an existing size, are the ones that get cut. Before adding one, check whether an existing step works.

Post h1 weight is `700`, matching section h2. It was `400`, which made the title read lighter than the headings beneath it.

## Styling rules learned from review

The owner rejected several things by name. Worth not repeating:

- **No special layout for ordinary prose.** Bordered cards, boxed callouts and grids around what is really a list were all removed and replaced with plain bullets. The owner called it "another smell". The table is the only special layout that survived, because it is genuinely tabular.
- **No pull quotes added for emphasis.** One exists in post 1 and reuses the h2 size.
- Chakra's global reset strips list markers. `list-style-type` must be set explicitly on both the `ol`/`ul` and its `li` children, or bullets and numbers silently vanish.

## Writing process

There is a skill for this at `~/.claude/skills/writing-build-posts/`. Read `SKILL.md` and `references/voice.md` before writing or editing copy. It carries the loop that produced both posts, the owner's voice preferences in his own words, and an anti-pattern table where every row is a real mistake from the session.

It also vendors the ASD-STE100 linter at `~/.claude/skills/writing-build-posts/ste-lint.py`.

Two rules from it that matter most here:

1. **Lint the served HTML, not the draft file.** Both posts sit at zero violations measured against the rendered page. Text written straight into a `page.tsx`, such as a heading or a blurb, never passes through the draft, and that is exactly where a violation was found and fixed.
2. **Show the raw linter JSON.** The owner asked for this directly after a summary hid a finding.

## Publishing mechanics

- `src/app/blog/posts.ts` is the registry. It drives the index, the sitemap and OG image generation. A post missing from it renders but is invisible to all three.
- OG images are generated by `src/app/blog/[slug]/opengraph-image.tsx`. Each post must also declare `openGraph.images` and `twitter.images` explicitly in its own metadata, because the `[slug]` route is not in a static page's metadata tree and the image does not attach on its own.
- `sitemap.ts` deliberately omits `lastModified` on static routes, so a deploy does not look like a content change.

**Stop the dev server before running `next build`.** A build writes into `.next` while the dev server serves from it, and the running page then fails with `Cannot find module` or `__webpack_modules__[moduleId] is not a function`. `NEXT_DIST_DIR` does not prevent this, because Next reads `distDir` from `next.config`. This happened three times in one session.

## Working with the owner on this repo

The owner merges PRs quickly, often within minutes of one opening. Four times in a row, work finished after a merge and needed a fresh branch off the new `main` plus a cherry-pick.

**Ask before pushing incrementally.** Either hold changes until the owner says to ship, or tell him a PR is coming so he can wait. Do not assume a branch is still open.

## Loose ends, none blocking

- Post 1's slug is `/blog/the-robotic-workshop` and its component is `WorkshopChart`, while the article itself says "factory" throughout. Renaming now costs a redirect, since the URL is public.
- Post 2 says "promoted check" where the `smoke-it` skill says "graduation". The owner accepted the prose version, but the article and the system now use different words for the same act.
- `PostFooterNav` and each post's metadata both hold the title and description. A third post would make a shared `PostLayout` worth building. Two does not.
