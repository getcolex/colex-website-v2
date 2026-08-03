"use client";

import { Box } from "@chakra-ui/react";
import { useRef, useCallback } from "react";

export default function GlassGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty("--glow-x", `${x}px`);
    gridRef.current.style.setProperty("--glow-y", `${y}px`);
    gridRef.current.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!gridRef.current) return;
    gridRef.current.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <Box
      ref={gridRef}
      position="absolute"
      inset={0}
      overflow="hidden"
      pointerEvents="auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      css={{
        "--glow-x": "0px",
        "--glow-y": "0px",
        "--glow-opacity": "0",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          left: "var(--glow-x)",
          top: "var(--glow-y)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          opacity: "var(--glow-opacity)",
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        },
      }}
    />
  );
}
