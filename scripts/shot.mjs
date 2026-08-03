/**
 * Screenshot the homepage at several widths.
 *
 * The page is built on Lenis smooth-scroll + motion scroll-linked transforms:
 * section opacity/position are inline styles written per frame from
 * scrollYProgress. A headless `--screenshot` never scrolls, so every section
 * stays at its start state (invisible) and CSS overrides cannot fix it — the
 * inline styles win. So we drive a real browser and scroll it in steps.
 *
 * Usage: node scripts/shot.mjs <label> [--widths=1440,768,390]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const label = process.argv[2];
if (!label) {
  console.error("usage: node scripts/shot.mjs <label> [--widths=1440,768]");
  process.exit(1);
}
const widthArg = process.argv.find((a) => a.startsWith("--widths="));
const widths = widthArg
  ? widthArg.split("=")[1].split(",").map(Number)
  : [1440, 768, 390];

const url = process.env.TARGET_URL ?? "http://localhost:3000/";
const out = "docs/screenshots";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(url, { waitUntil: "networkidle" });

  // Walk the page so every scroll-linked section passes through its reveal
  // range, then settle at the bottom before we capture.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(1200);

  // Freeze whatever the reveal animations settled on, so the full-page capture
  // (which re-composites while scrolling) does not catch mid-flight frames.
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-play-state: paused !important;
      transition: none !important;
    }`,
  });

  await page.screenshot({
    path: `${out}/${label}-${width}.png`,
    fullPage: true,
  });
  console.log(`  ${out}/${label}-${width}.png`);
  await page.close();
}

await browser.close();
