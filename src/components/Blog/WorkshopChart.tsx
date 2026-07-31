"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import dagre from "dagre";
import { useEffect, useRef, useState } from "react";
import {
  NodeKind,
  SPINE,
  STAGES,
  Stage,
  StageEdge,
  StageNode,
} from "./workshopChartData";

const SVGNS = "http://www.w3.org/2000/svg";

// Semantic colors, aligned with the site's brand + status tokens.
const COLORS = {
  border: "#D6D3D1",
  borderSub: "#E7E5E4",
  surface: "#FFFFFF",
  surfaceSubdued: "#FBFAF8",
  bg: "#F8F7F4",
  bgNormal: "#ECEAE6",
  text: "#1A1A1A",
  textMuted: "#6F6860",
  brand: "#49082D",
  brandLight: "rgba(73,8,45,.08)",
  brandLighter: "rgba(73,8,45,.05)",
  ok: "#15803D",
  okBg: "#E6F4EB",
  warn: "#B45309",
  warnBg: "#FEF3E6",
  err: "#B91C1C",
  errBg: "#FEE8E8",
};

const KIND_FILL: Record<NodeKind, string> = {
  work: COLORS.surface,
  gate: COLORS.warnBg,
  review: COLORS.brandLighter,
  stop: COLORS.errBg,
  owner: COLORS.okBg,
};
const KIND_STROKE: Record<NodeKind, string> = {
  work: COLORS.border,
  gate: COLORS.warn,
  review: COLORS.brand,
  stop: COLORS.err,
  owner: COLORS.ok,
};
const KIND_LABEL: Record<NodeKind, string> = {
  review: "Review",
  stop: "Stops work",
  owner: "My call",
  gate: "Gate",
  work: "Machine work",
};

const NW = 168;
const NH = 50;
const SW_C = 170;
const SH_C = 86;

interface Measured {
  g: dagre.graphlib.Graph;
  w: number;
  h: number;
}

function measureStage(st: Stage): Measured {
  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({ rankdir: "TB", nodesep: 20, ranksep: 34, marginx: 16, marginy: 32 });
  g.setDefaultEdgeLabel(() => ({}));
  st.nodes.forEach((n) => g.setNode(n.id, { width: NW, height: NH }));
  st.edges.forEach((e, i) =>
    g.setEdge(
      e.f,
      e.t,
      {
        labelpos: "c",
        width: e.label ? e.label.length * 5.6 + 12 : 0,
        height: e.label ? 16 : 0,
      },
      "e" + i
    )
  );
  dagre.layout(g);
  const graph = g.graph();
  return { g, w: graph.width ?? 0, h: graph.height ?? 0 };
}

const el = <K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Record<string, string | number> = {}
): SVGElementTagNameMap[K] => {
  const e = document.createElementNS(SVGNS, name) as SVGElementTagNameMap[K];
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  return e;
};

interface TipState {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  body: string;
  why?: string;
}

export default function WorkshopChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const openRef = useRef<Set<string>>(new Set());
  const rebuildRef = useRef<() => void>(() => {});
  const [tip, setTip] = useState<TipState | null>(null);
  // A zero-height marker left in the article's text column. Measuring it tells
  // us where the text starts, so the full-bleed chart can line up with it at
  // any viewport width without hardcoding the Container's max-width.
  const alignRef = useRef<HTMLDivElement | null>(null);
  const [gutter, setGutter] = useState(0);

  useEffect(() => {
    const measure = () => {
      // The width the chart bleeds to. documentElement.clientWidth excludes the
      // scrollbar, which 100vw would wrongly include and overflow the page by.
      document.documentElement.style.setProperty(
        "--bleed-w",
        `${document.documentElement.clientWidth}px`
      );

      const marker = alignRef.current;
      const canvas = canvasRef.current;
      if (!marker || !canvas) return;
      // Measure the text column relative to the full-bleed box, not the
      // viewport: the two differ by the page scrollbar width.
      const delta =
        marker.getBoundingClientRect().left - canvas.getBoundingClientRect().left;
      setGutter(Math.max(0, Math.round(delta)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const svgNode = svgRef.current;
    const measured: Record<string, Measured> = {};
    STAGES.forEach((st) => {
      measured[st.id] = measureStage(st);
    });

    function showTip(target: Element, html: { title: string; body: string; why?: string }) {
      const svg = svgRef.current;
      const canvas = canvasRef.current;
      if (!svg || !canvas) return;
      const nb = target.getBoundingClientRect();
      const cb = canvas.getBoundingClientRect();
      const x = nb.left - cb.left + canvas.scrollLeft + nb.width / 2;
      const y = nb.bottom - cb.top + canvas.scrollTop + 8;
      setTip({ visible: true, x, y, ...html });
    }
    function hideTip() {
      setTip((prev) => (prev ? { ...prev, visible: false } : prev));
    }

    function attachTip(
      node: SVGGElement,
      html: { title: string; body: string; why?: string }
    ) {
      node.addEventListener("mouseenter", () => showTip(node, html));
      node.addEventListener("mouseleave", hideTip);
      node.addEventListener("focus", () => showTip(node, html));
      node.addEventListener("blur", hideTip);
    }

    function drawEdge(
      parent: SVGGElement,
      pts: { x: number; y: number }[],
      e: StageEdge,
      thick: boolean,
      lx?: number,
      ly?: number
    ) {
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const p = pts[i];
        const n = pts[i + 1];
        d += ` Q${p.x},${p.y} ${(p.x + n.x) / 2},${(p.y + n.y) / 2}`;
      }
      d += ` L${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
      const stroke =
        e.k === "stop" ? COLORS.err : e.k === "ok" ? COLORS.ok : e.k === "loop" ? COLORS.warn : COLORS.border;
      const marker =
        e.k === "stop" ? "a-stop" : e.k === "ok" ? "a-ok" : e.k === "loop" ? "a-loop" : "a-def";
      const path = el("path", {
        d,
        fill: "none",
        stroke,
        "stroke-width": thick ? 1.8 : 1.4,
        "stroke-dasharray": e.k === "stop" || e.k === "loop" ? "5 4" : "",
        "marker-end": `url(#${marker})`,
      });
      parent.appendChild(path);

      if (e.label) {
        const mid =
          typeof lx === "number" && typeof ly === "number"
            ? { x: lx, y: ly }
            : pts[Math.floor(pts.length / 2)];
        const tw = e.label.length * 5.4 + 10;
        const rect = el("rect", {
          x: mid.x - tw / 2,
          y: mid.y - 8,
          width: tw,
          height: 14,
          rx: 2,
          fill: COLORS.surface,
        });
        parent.appendChild(rect);
        const labelColor =
          e.k === "stop" ? COLORS.err : e.k === "ok" ? COLORS.ok : e.k === "loop" ? COLORS.warn : COLORS.textMuted;
        const t = el("text", {
          x: mid.x,
          y: mid.y + 2,
          "text-anchor": "middle",
          fill: labelColor,
          style: "font-family:var(--chakra-fonts-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10px;letter-spacing:.06em;text-transform:uppercase",
        });
        t.textContent = e.label;
        parent.appendChild(t);
      }
    }

    function drawNode(parent: SVGGElement, n: StageNode, x: number, y: number) {
      const hasTip = Boolean(n.detail || n.why);
      const g = el("g", {});
      g.setAttribute("class", "wc-node");
      if (hasTip) {
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "img");
        const plain = [n.label.replace(/\n/g, " "), n.detail, n.why]
          .filter(Boolean)
          .join(". ")
          .replace(/<[^>]+>/g, "");
        g.setAttribute("aria-label", plain);
      }
      parent.appendChild(g);

      if (n.kind === "gate") {
        const c = 12;
        const path = el("path", {
          d: `M${x + c},${y} H${x + NW - c} L${x + NW},${y + NH / 2} L${x + NW - c},${y + NH} H${x + c} L${x},${y + NH / 2} Z`,
          fill: KIND_FILL[n.kind],
          stroke: KIND_STROKE[n.kind],
          "stroke-width": 1.25,
        });
        g.appendChild(path);
      } else {
        const rect = el("rect", {
          x,
          y,
          width: NW,
          height: NH,
          rx: n.kind === "owner" ? 14 : 3,
          fill: KIND_FILL[n.kind],
          stroke: KIND_STROKE[n.kind],
          "stroke-width": n.kind === "review" ? 2 : 1.25,
        });
        g.appendChild(rect);
      }

      const lines = n.label.split("\n");
      const lineStep = 13;
      const startY = y + NH / 2 - ((lines.length - 1) * lineStep) / 2;
      lines.forEach((ln, i) => {
        const strong = i === 0 && /^[A-Z0-9 ]+$/.test(ln);
        const t = el("text", {
          x: x + NW / 2,
          y: startY + i * lineStep,
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: COLORS.text,
          style: `font-family:var(--chakra-fonts-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12px;font-weight:${strong ? 600 : 400}`,
        });
        t.textContent = ln;
        g.appendChild(t);
      });
      if (hasTip) {
        attachTip(g, {
          title: KIND_LABEL[n.kind],
          body: n.detail ?? "",
          why: n.why,
        });
      }
    }

    function drawClosedStage(parent: SVGGElement, st: Stage, x: number, y: number) {
      const g = el("g", {});
      g.setAttribute("class", "wc-node wc-stage");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-expanded", "false");
      g.setAttribute("aria-label", `Expand ${st.title}. ${st.detail}`);
      g.style.cursor = "pointer";
      parent.appendChild(g);

      const rect = el("rect", {
        x,
        y,
        width: SW_C,
        height: SH_C,
        rx: 3,
        fill: COLORS.surface,
        stroke: COLORS.border,
        "stroke-width": 1.25,
      });
      g.appendChild(rect);

      const words = st.title.split(" ");
      const lines: string[] = [];
      let cur = "";
      words.forEach((w) => {
        if ((cur + " " + w).trim().length > 12) {
          lines.push(cur.trim());
          cur = w;
        } else {
          cur = (cur + " " + w).trim();
        }
      });
      if (cur) lines.push(cur);

      const titleStep = 15;
      const top = y + SH_C / 2 - ((lines.length - 1) * titleStep) / 2;
      lines.forEach((ln, i) => {
        const t = el("text", {
          x: x + SW_C / 2,
          y: top + i * titleStep,
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: COLORS.text,
          style: "font-family:var(--chakra-fonts-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12px;font-weight:600",
        });
        t.textContent = ln;
        g.appendChild(t);
      });
      const openStage = () => {
        openRef.current.add(st.id);
        rebuild();
      };
      g.addEventListener("click", openStage);
      g.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          openStage();
        }
      });
      attachTip(g, {
        title: st.title,
        body: st.detail,
        why: `${st.nodes.length} steps`,
      });
    }

    function drawOpenStage(parent: SVGGElement, st: Stage, ox: number, oy: number) {
      const m = measured[st.id];
      const g = el("g", {});
      parent.appendChild(g);

      const frame = el("rect", {
        x: ox,
        y: oy,
        width: m.w,
        height: m.h,
        rx: 4,
        fill: COLORS.surfaceSubdued,
        stroke: COLORS.brand,
        "stroke-width": 1.25,
        "stroke-dasharray": "3 3",
      });
      g.appendChild(frame);

      const closeStage = () => {
        openRef.current.delete(st.id);
        rebuild();
      };
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("role", "button");
      frame.setAttribute("aria-label", `Collapse ${st.title}`);
      frame.setAttribute("aria-expanded", "true");
      frame.style.cursor = "zoom-out";
      g.style.cursor = "default";
      frame.addEventListener("click", closeStage);
      frame.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          closeStage();
        }
      });

      const ft = el("text", {
        x: ox + 14,
        y: oy + 21,
        fill: COLORS.brand,
        style: "font-family:var(--chakra-fonts-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10px;letter-spacing:.14em;font-weight:600;text-transform:uppercase",
      });
      ft.textContent = st.title.toUpperCase();
      ft.style.pointerEvents = "none";
      g.appendChild(ft);

      const gEdges = el("g", {});
      const gNodes = el("g", {});
      g.appendChild(gEdges);
      g.appendChild(gNodes);

      st.edges.forEach((e, i) => {
        const ed = m.g.edge({ v: e.f, w: e.t, name: "e" + i });
        if (!ed) return;
        const pts = ed.points.map((p) => ({ x: p.x + ox, y: p.y + oy }));
        const lx = typeof ed.x === "number" ? ed.x + ox : undefined;
        const ly = typeof ed.y === "number" ? ed.y + oy : undefined;
        drawEdge(gEdges, pts, e, false, lx, ly);
      });

      st.nodes.forEach((n) => {
        const p = m.g.node(n.id);
        drawNode(gNodes, n, p.x + ox - NW / 2, p.y + oy - NH / 2);
      });
    }

    function rebuild() {
      // Nodes are destroyed below, so a hovered node never fires mouseleave.
      // Dismiss any open tooltip explicitly.
      setTip((prev) => (prev ? { ...prev, visible: false } : prev));
      const svg = svgRef.current;
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const G = new dagre.graphlib.Graph({ multigraph: true });
      G.setGraph({ rankdir: "LR", nodesep: 30, ranksep: 58, marginx: 0, marginy: 24 });
      G.setDefaultEdgeLabel(() => ({}));

      STAGES.forEach((st) => {
        const isOpen = openRef.current.has(st.id);
        const m = measured[st.id];
        G.setNode(st.id, {
          width: isOpen ? m.w : SW_C,
          height: isOpen ? m.h : SH_C,
        });
      });
      SPINE.forEach((e, i) =>
        G.setEdge(
          e.f,
          e.t,
          {
            labelpos: "c",
            width: e.label ? e.label.length * 5.6 + 12 : 0,
            height: e.label ? 16 : 0,
          },
          "sp" + i
        )
      );
      dagre.layout(G);

      const graph = G.graph();
      const W = graph.width ?? 0;
      const H = graph.height ?? 0;

      // dagre sizes the graph for the tallest row a stage COULD occupy, so a
      // collapsed chart leaves hundreds of px of dead canvas. Measure the real
      // extent from the layout itself (nodes + routed edge points) instead of
      // the DOM, so it is correct on every rebuild without a reflow.
      const pad = 22;
      let top = Infinity;
      let bottom = -Infinity;
      STAGES.forEach((st) => {
        const p2 = G.node(st.id);
        if (!p2) return;
        top = Math.min(top, p2.y - p2.height / 2);
        bottom = Math.max(bottom, p2.y + p2.height / 2);
      });
      SPINE.forEach((e, i) => {
        const ed = G.edge({ v: e.f, w: e.t, name: "sp" + i });
        ed?.points?.forEach((pt) => {
          top = Math.min(top, pt.y);
          bottom = Math.max(bottom, pt.y);
        });
      });
      const hasExtent = Number.isFinite(top) && Number.isFinite(bottom);
      const vy = hasExtent ? top - pad : 0;
      const vh = hasExtent ? bottom - top + pad * 2 : H;

      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(vh));
      svg.setAttribute("viewBox", `0 ${vy} ${W} ${vh}`);

      const defs = el("defs", {});
      svg.appendChild(defs);
      (
        [
          ["a-def", COLORS.border],
          ["a-stop", COLORS.err],
          ["a-ok", COLORS.ok],
          ["a-loop", COLORS.warn],
        ] as const
      ).forEach(([id, col]) => {
        const marker = el("marker", {
          id,
          viewBox: "0 0 10 10",
          refX: 9,
          refY: 5,
          markerWidth: 6,
          markerHeight: 6,
          orient: "auto-start-reverse",
        });
        const path = el("path", { d: "M0,1 L9,5 L0,9 z", fill: col });
        marker.appendChild(path);
        defs.appendChild(marker);
      });

      const gEdges = el("g", {});
      const gNodes = el("g", {});
      svg.appendChild(gEdges);
      svg.appendChild(gNodes);

      SPINE.forEach((e, i) => {
        const edge = G.edge({ v: e.f, w: e.t, name: "sp" + i });
        drawEdge(gEdges, edge.points, e, true, edge.x, edge.y);
      });

      STAGES.forEach((st) => {
        const pos = G.node(st.id);
        const x = pos.x - pos.width / 2;
        const y = pos.y - pos.height / 2;
        if (openRef.current.has(st.id)) {
          drawOpenStage(gNodes, st, x, y);
        } else {
          drawClosedStage(gNodes, st, x, y);
        }
      });
    }

    // Expose rebuild to the toolbar buttons outside this effect.
    rebuildRef.current = rebuild;
    rebuild();

    const canvasNode = canvasRef.current;

    // Centre once on mount only. Re-centring on every rebuild would move the
    // diagram out from under the pointer between clicks.
    if (canvasNode) {
      // Start at the beginning of the flow, not the middle of it.
      canvasNode.scrollLeft = 0;
      canvasNode.scrollTop = Math.max(
        0,
        (canvasNode.scrollHeight - canvasNode.clientHeight) / 2
      );
    }

    // The chart is panned by dragging, not by the wheel. The wheel always
    // belongs to the page, so passing the pointer over the chart while reading
    // never captures the scroll. Dragging moves the canvas in both axes.
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    // A drag that never really moves is a click on a stage, so let it through.
    const SLOP = 4;
    let moved = false;

    const onPointerDown = (ev: PointerEvent) => {
      // Primary button only, and never on the scrollbar gutter.
      if (ev.button !== 0 || !canvasNode) return;
      dragging = true;
      moved = false;
      startX = ev.clientX;
      startY = ev.clientY;
      startLeft = canvasNode.scrollLeft;
      startTop = canvasNode.scrollTop;
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!dragging || !canvasNode) return;
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;
      if (!moved) {
        moved = true;
        canvasNode.setPointerCapture(ev.pointerId);
        canvasNode.style.cursor = "grabbing";
      }
      // Text selection would otherwise fight the drag.
      ev.preventDefault();
      canvasNode.scrollLeft = startLeft - dx;
      canvasNode.scrollTop = startTop - dy;
    };

    const endDrag = (ev: PointerEvent) => {
      if (!dragging || !canvasNode) return;
      dragging = false;
      canvasNode.style.cursor = "";
      if (canvasNode.hasPointerCapture(ev.pointerId)) {
        canvasNode.releasePointerCapture(ev.pointerId);
      }
      // Swallow the click that ends a real drag, so panning past a stage does
      // not also open it. A click without movement is left alone.
      if (moved) {
        const swallow = (c: MouseEvent) => {
          c.stopPropagation();
          c.preventDefault();
        };
        canvasNode.addEventListener("click", swallow, { capture: true, once: true });
        // If no click follows, drop the one-shot listener on the next frame.
        requestAnimationFrame(() =>
          canvasNode.removeEventListener("click", swallow, { capture: true })
        );
      }
      moved = false;
    };

    canvasNode?.addEventListener("pointerdown", onPointerDown);
    canvasNode?.addEventListener("pointermove", onPointerMove);
    canvasNode?.addEventListener("pointerup", endDrag);
    canvasNode?.addEventListener("pointercancel", endDrag);

    return () => {
      canvasNode?.removeEventListener("pointerdown", onPointerDown);
      canvasNode?.removeEventListener("pointermove", onPointerMove);
      canvasNode?.removeEventListener("pointerup", endDrag);
      canvasNode?.removeEventListener("pointercancel", endDrag);
      if (svgNode) while (svgNode.firstChild) svgNode.removeChild(svgNode.firstChild);
    };
  }, []);

  const expandAll = () => {
    STAGES.forEach((s) => openRef.current.add(s.id));
    rebuildRef.current();
  };
  const collapseAll = () => {
    openRef.current.clear();
    rebuildRef.current();
  };

  return (
    <Box>
      <Flex wrap="wrap" gap={3} align="center" mb={4}>
        <Button
          size="sm"
          variant="outline"
          borderColor="ui.border"
          color="text.muted"
          fontFamily="mono, monospace"
          fontSize="11px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          borderRadius="2px"
          _hover={{ borderColor: "brand.primary", color: "brand.primary" }}
          onClick={expandAll}
        >
          Expand all
        </Button>
        <Button
          size="sm"
          variant="outline"
          borderColor="ui.border"
          color="text.muted"
          fontFamily="mono, monospace"
          fontSize="11px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          borderRadius="2px"
          _hover={{ borderColor: "brand.primary", color: "brand.primary" }}
          onClick={collapseAll}
        >
          Collapse all
        </Button>
        <Text
          fontSize="11px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="text.muted"
          marginLeft="auto"
        >
          Drag to pan &middot; hover a node for detail
        </Text>
      </Flex>

      <HStack
        gap={{ base: 3, md: 5 }}
        wrap="wrap"
        px={4}
        py={3}
        mb={4}
        bg="#F8F7F4"
        border="1px solid"
        borderColor="ui.border"
        borderRadius="3px"
        fontSize="11px"
        letterSpacing="0.1em"
        textTransform="uppercase"
        color="text.muted"
      >
        <LegendItem color={COLORS.border}>Machine work</LegendItem>
        <LegendItem color={COLORS.warn}>Gate</LegendItem>
        <LegendItem color={COLORS.brand}>Review</LegendItem>
        <LegendItem color={COLORS.err}>Stops work</LegendItem>
        <LegendItem color={COLORS.ok}>Me</LegendItem>
      </HStack>

      {/* Sits in the normal text column; measured to align the chart with it. */}
      <Box ref={alignRef} h="0" aria-hidden="true" />

      <Box
        ref={canvasRef}
        position="relative"
        display="flex"
        /* "safe" keeps the top reachable once the chart outgrows the frame;
           plain centring would push it past the scrollable area. */
        alignItems="safe center"
        /* Hidden, not auto: the chart is panned by dragging, so the wheel is
           never arbitrated here and always scrolls the page. */
        overflow="hidden"
        cursor="grab"
        /* Vertical touch still scrolls the page. Horizontal is left to the drag
           handler, which "pan-y" alone would stop the browser from delivering. */
        touchAction="pan-y pinch-zoom"
        backgroundImage="radial-gradient(circle at 1px 1px, rgba(26,26,26,.10) 1px, transparent 0)"
        backgroundSize="22px 22px"
        h={{ base: "460px", md: "620px" }}
        /* Break out of the article's text column to the full viewport width.
           Widths come from the root element, not 100vw, because vw counts the
           scrollbar while the page content box does not, and the difference
           makes the page itself scroll sideways. */
        w="var(--bleed-w, 100vw)"
        ml="calc(50% - var(--bleed-w, 100vw) / 2)"
        mr="calc(50% - var(--bleed-w, 100vw) / 2)"
        px={`${gutter}px`}
      >
        <svg
          ref={svgRef}
          role="group"
          aria-label="Flowchart of the nine stages a unit of work passes through. Each stage can be opened to show its internal steps. A text summary follows below."
          style={{ display: "block", flexShrink: 0 }}
        />

        {/* Text alternative: the same information, reachable without the SVG. */}
        <Box
          as="ol"
          position="absolute"
          w="1px"
          h="1px"
          overflow="hidden"
          clipPath="inset(50%)"
          whiteSpace="nowrap"
        >
          {STAGES.map((st) => (
            <li key={st.id}>
              {st.title}. {st.detail} Steps:{" "}
              {st.nodes.map((n) => n.label.replace(/\n/g, " ")).join(", ")}.
            </li>
          ))}
        </Box>

        {tip && (
          <Box
            position="absolute"
            zIndex={50}
            maxW="330px"
            left={`${tip.x - 165}px`}
            top={`${tip.y}px`}
            bg="white"
            border="1px solid"
            borderColor="ui.border"
            borderTop="2px solid"
            borderTopColor="brand.primary"
            borderRadius="3px"
            boxShadow="0 10px 30px rgba(73,8,45,.15), 0 2px 6px rgba(26,26,26,.08)"
            px={4}
            py={3}
            fontSize="13px"
            lineHeight="1.55"
            color="text.muted"
            opacity={tip.visible ? 1 : 0}
            visibility={tip.visible ? "visible" : "hidden"}
            transition="opacity .15s ease"
            pointerEvents="none"
          >
            <Text
              as="span"
              display="block"
              fontFamily="mono, monospace"
              fontSize="11px"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="brand.primary"
              mb={1}
            >
              {tip.title}
            </Text>
            <Text as="span" dangerouslySetInnerHTML={{ __html: tip.body }} />
            {tip.why && (
              <Text
                as="span"
                display="block"
                mt={2}
                pt={2}
                borderTop="1px solid"
                borderColor="#F5F5F4"
                fontStyle="italic"
              >
                {tip.why}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function LegendItem({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <HStack gap={2}>
      <Box w="9px" h="9px" borderRadius="1px" bg={color} />
      <Text as="span">{children}</Text>
    </HStack>
  );
}
