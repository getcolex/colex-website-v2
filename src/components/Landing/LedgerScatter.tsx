"use client";

/**
 * LedgerScatter — cursor-reactive ledger background.
 *
 * Drop-in replacement for the WireframeGrid component: same call signature
 * (`preset`, `lineColor`) is accepted but the visual is entirely different —
 * a still ledger grid whose cells probabilistically ignite around the mouse
 * with an eased trail, plus the ledger's numeral column + corner stamp.
 *
 * Config below is baked from the tuned values chosen in the artifact
 * (see /docs internal or the scratchpad artifact for the source config).
 * Only the palette-aware ink colours are picked per-preset; every other
 * knob is one constant across the site so the reactive character is
 * consistent from hero to footer.
 */

import { useEffect, useRef } from "react";

export type LedgerScatterPreset =
  | "hero"
  | "how"
  | "get"
  | "verticals"
  | "footer"
  | "blog"
  | "pain";

interface LedgerScatterProps {
  preset?: LedgerScatterPreset;
  /** Accepted for API parity with the previous WireframeGrid; ignored — the
   *  ledger picks palette-aware ink from `preset`. */
  lineColor?: string;
  /** Override the canvas's opaque background fill. Use this when the
   *  container's background differs from the palette default (e.g. FooterBand
   *  paints the whole section on a deep-shade maroon; without this override
   *  the ledger canvas re-paints bright oxblood on top of it). */
  groundColor?: string;
}

// ── Config (baked from the tuned scatter values) ────────────────────────────
// dense = true and radius+= 1 bumps; band offset on, classic look off.
const IGNITE_BASE_PER_S = 4.7 * 2.5;   // "denser scatter" multiplies ignite × 2.5
const RADIUS_CELLS = 3 + 1;            // "denser scatter" adds +1 to radius
const MAX_STRENGTH_MULT = 1;
const UP_RATE = 15;
const DOWN_RATE = 1.8;
const TGT_DECAY = 1;
const EASE_POS = 0.5;
const BAND_OFFSET_FRAC = 0.65;         // fraction of H_SP to shift bands vertically

const H_SP_CSS = 30;                    // horizontal ruling spacing (css px)
const V_SP_CSS = 40;                    // vertical ruling spacing
const LEGACY_PERIOD_CSS = 60;           // band period (1 row shaded + 1 empty)
const LEGACY_FILL_CSS = 30;             // shaded portion within the period

// Palette per preset. Grounds match the section backgrounds in the codebase.
type Palette = "light" | "dark" | "oxblood";
const PRESET_PALETTE: Record<LedgerScatterPreset, Palette> = {
  hero: "light",       // paper right-half of hero → paper ground
  how: "light",        // ledger sits INSIDE surface.raised cards (paper) → paper ground
  get: "oxblood",      // ledger sits INSIDE brand.primary cards (oxblood) → oxblood ground
  verticals: "dark",   // section bg is ink.primary → near-black ground
  pain: "dark",        // section bg is ink.primary → near-black ground
  footer: "oxblood",   // brand.primary footer → oxblood ground
  blog: "oxblood",     // brand.primary blog footer → oxblood ground
};

function paletteInks(p: Palette) {
  // "hair" is the hairline / band ink, "hot" is the ember (cell tint) ink.
  const hair: [number, number, number] =
    p === "light" ? [26, 26, 26] : [248, 247, 244];
  // Hot ink (cell ember):
  //  - light (paper): dark maroon — cells DARKEN the paper
  //  - dark (near-black): cream — cells LIGHTEN the near-black
  //  - oxblood: dusty rose — the only surface where a warm tint reads right
  const hot: [number, number, number] =
    p === "light" ? [73, 8, 45]
    : p === "oxblood" ? [223, 174, 192]
    : [248, 247, 244];
  const bg =
    p === "light" ? "#F8F7F4" : p === "oxblood" ? "#49082D" : "#1A1A1A";
  // Tuned per ground:
  //  - light (paper, behind hero right + How cards): pushed DARKER so the
  //    ledger reads through the paper the way pencilled rulings would.
  //  - dark (near-black, Verticals + Pain sections): dulled DOWN so the
  //    ledger sits quietly under the demos rather than competing.
  //  - oxblood (Get cards + Footer): also dulled DOWN for the same reason.
  const baseLineAlpha = p === "light" ? 0.28 : p === "oxblood" ? 0.18 : 0.14;
  const baseBandAlpha = p === "light" ? 0.08 : p === "oxblood" ? 0.06 : 0.04;
  const maxStrengthBase = p === "light" ? 0.22 : p === "oxblood" ? 0.32 : 0.14;
  const numeralColor = p === "light" ? "rgba(26,26,26,0.22)" : "rgba(248,247,244,0.18)";
  const stampColor = p === "light" ? "#49082D" : "#DFAEC0";
  return { hair, hot, bg, baseLineAlpha, baseBandAlpha, maxStrengthBase, numeralColor, stampColor };
}

interface CellState { v: number; tgt: number; }

export default function LedgerScatter({ preset = "hero", groundColor }: LedgerScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = PRESET_PALETTE[preset];
    const inks = paletteInks(palette);
    const MAX_STRENGTH = inks.maxStrengthBase * MAX_STRENGTH_MULT;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pointer state (in canvas pixels, relative to the canvas bounding box)
    const pointer = { x: 0, y: 0, active: false };
    const eased = { x: 0, y: 0, active: 0 };
    const cells = new Map<string, CellState>();

    let raf = 0;
    let running = false;
    let lastT = performance.now() / 1000;

    function resize() {
      if (!canvas || !container) return;
      const r = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      // Seed eased position at centre so the first ambient frames aren't
      // drawn with a cursor way off-canvas.
      if (eased.x === 0 && eased.y === 0) {
        eased.x = canvas.width / 2;
        eased.y = canvas.height / 2;
      }
    }

    function draw(nowMs: number) {
      if (!ctx || !canvas) return;
      const t = nowMs / 1000;
      const dt = Math.min(0.1, Math.max(0.001, t - lastT));
      lastT = t;

      const W = canvas.width;
      const H = canvas.height;

      const H_SP = H_SP_CSS * dpr;
      const V_SP = V_SP_CSS * dpr;
      const LEGACY_PERIOD = LEGACY_PERIOD_CSS * dpr;
      const LEGACY_FILL = LEGACY_FILL_CSS * dpr;
      const bandShift = BAND_OFFSET_FRAC * H_SP;

      // ── Ease pointer toward target ────────────────────────────────────
      const tx = pointer.active ? pointer.x * dpr : eased.x;
      const ty = pointer.active ? pointer.y * dpr : eased.y;
      eased.x += (tx - eased.x) * EASE_POS;
      eased.y += (ty - eased.y) * EASE_POS;
      const targetActive = pointer.active ? 1 : 0;
      eased.active += (targetActive - eased.active) * 0.05;
      const A = eased.active;

      const cursorCol = Math.floor(eased.x / V_SP);
      const cursorRow = Math.floor(eased.y / H_SP);

      // ── Background ──
      // If the caller passed groundColor, use it so the canvas doesn't
      // re-paint the palette default over a container that's using a
      // different tone (e.g. FooterBand on deep-shade maroon).
      ctx.fillStyle = groundColor ?? inks.bg;
      ctx.fillRect(0, 0, W, H);

      // ── Ignite pass ────────────────────────────────────────────────────
      if (A > 0.05) {
        for (let dy = -RADIUS_CELLS; dy <= RADIUS_CELLS; dy++) {
          for (let dx = -RADIUS_CELLS; dx <= RADIUS_CELLS; dx++) {
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > RADIUS_CELLS) continue;
            const f0 = 1 - d / RADIUS_CELLS;
            const fall = f0 * f0 * (3 - 2 * f0);
            const perSec = IGNITE_BASE_PER_S * fall * A;
            const p = 1 - Math.exp(-perSec * dt);
            if (Math.random() < p) {
              const col = cursorCol + dx;
              const row = cursorRow + dy;
              const x = col * V_SP;
              const y = row * H_SP;
              if (x + V_SP <= 0 || y + H_SP <= 0 || x >= W || y >= H) continue;
              const key = col + "," + row;
              const peak = 0.7 + Math.random() * 0.3;
              const cur = cells.get(key);
              if (cur) cur.tgt = Math.max(cur.tgt, peak);
              else cells.set(key, { v: 0, tgt: peak });
            }
          }
        }
      }

      // ── Row bands (static, band-offset shifted) ────────────────────────
      ctx.fillStyle = `rgba(${inks.hair[0]},${inks.hair[1]},${inks.hair[2]},${inks.baseBandAlpha})`;
      for (
        let yTop = -LEGACY_PERIOD + bandShift;
        yTop < H + LEGACY_PERIOD;
        yTop += LEGACY_PERIOD
      ) {
        ctx.fillRect(0, yTop, W, LEGACY_FILL);
      }

      // ── Cell state update + paint ──────────────────────────────────────
      for (const [key, s] of cells) {
        s.tgt = Math.max(0, s.tgt - TGT_DECAY * dt);
        if (s.tgt > s.v) {
          s.v += (s.tgt - s.v) * (1 - Math.exp(-UP_RATE * dt));
        } else {
          s.v += (s.tgt - s.v) * (1 - Math.exp(-DOWN_RATE * dt));
        }
        if (s.v < 0.01 && s.tgt < 0.01) { cells.delete(key); continue; }
        const [colStr, rowStr] = key.split(",");
        const col = parseInt(colStr, 10);
        const row = parseInt(rowStr, 10);
        const x = col * V_SP;
        const y = row * H_SP;
        const alpha = s.v * MAX_STRENGTH;
        ctx.fillStyle = `rgba(${inks.hot[0]},${inks.hot[1]},${inks.hot[2]},${alpha})`;
        ctx.fillRect(x, y, V_SP, H_SP);
      }

      // ── Hairlines ──────────────────────────────────────────────────────
      ctx.strokeStyle = `rgba(${inks.hair[0]},${inks.hair[1]},${inks.hair[2]},${inks.baseLineAlpha})`;
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      for (let y0 = 0; y0 <= H; y0 += H_SP) {
        ctx.moveTo(0, y0);
        ctx.lineTo(W, y0);
      }
      for (let x0 = 0; x0 <= W; x0 += V_SP) {
        ctx.moveTo(x0, 0);
        ctx.lineTo(x0, H);
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    }

    // Pointer wiring — listen on WINDOW (page-level) so foreground elements
    // stacked over the canvas (demo cards, headlines, CTAs, etc.) don't
    // block the ignites. The event is translated to canvas coordinates
    // per-fire; if the cursor is outside this canvas's bounding rect the
    // pointer goes inactive so the cells cool down naturally.
    const onMove = (e: PointerEvent) => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        pointer.active = false;
        return;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };
    const onLeaveWindow = () => { pointer.active = false; };

    // Start/stop tied to viewport visibility so we don't render off-screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              resize();
              window.addEventListener("pointermove", onMove, { passive: true });
              window.addEventListener("pointerleave", onLeaveWindow);
              lastT = performance.now() / 1000;
              raf = requestAnimationFrame(draw);
            }
          } else if (running) {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeaveWindow);
            pointer.active = false;
          }
        }
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [preset, groundColor]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <canvas ref={canvasRef} style={{ display: "block", pointerEvents: "none" }} />
    </div>
  );
}
