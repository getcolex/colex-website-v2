"use client";

import { Box } from "@chakra-ui/react";
import { useRef, useCallback } from "react";

const CELL = 100;

export default function GlassGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const radius = 250;

    ctx.clearRect(0, 0, w, h);

    // Draw vertical lines
    for (let x = 0; x <= w; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);

      const dist = Math.abs(x - mx);
      const glow = dist < radius ? 1 - dist / radius : 0;
      const alpha = 0.03 + glow * 0.12;

      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= h; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);

      const dist = Math.abs(y - my);
      const glow = dist < radius ? 1 - dist / radius : 0;
      const alpha = 0.03 + glow * 0.12;

      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    },
    [draw]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  const handleRef = useCallback(
    (el: HTMLCanvasElement | null) => {
      (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
      if (el) {
        const parent = el.parentElement;
        if (parent) {
          el.width = parent.offsetWidth;
          el.height = parent.offsetHeight;
        }
        draw();

        const ro = new ResizeObserver(() => {
          if (el.parentElement) {
            el.width = el.parentElement.offsetWidth;
            el.height = el.parentElement.offsetHeight;
            draw();
          }
        });
        if (parent) ro.observe(parent);
      }
    },
    [draw]
  );

  return (
    <Box
      position="absolute"
      inset={0}
      overflow="hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={handleRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
