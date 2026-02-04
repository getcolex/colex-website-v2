"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";

interface NoiseBackgroundProps {
  opacity?: number;
  showControls?: boolean;
}

const DEFAULT_PARAMS = {
  opacity: 0.06,
  grainSize: 1.5,
  animated: true,
  speed: 80, // ms between frames for animated noise
};

function DebugControls({
  params,
  setParams,
}: {
  params: typeof DEFAULT_PARAMS;
  setParams: React.Dispatch<React.SetStateAction<typeof DEFAULT_PARAMS>>;
}) {
  const controls = [
    { key: "opacity", label: "Opacity", min: 0.01, max: 0.2, step: 0.01 },
    { key: "grainSize", label: "Grain Size", min: 0.5, max: 4, step: 0.5 },
    { key: "speed", label: "Speed (ms)", min: 30, max: 200, step: 10 },
  ] as const;

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      bg="rgba(0,0,0,0.9)"
      color="white"
      p={4}
      borderRadius="md"
      zIndex={9999}
      fontSize="11px"
      fontFamily="monospace"
      maxH="90vh"
      overflowY="auto"
      minW="220px"
    >
      <Box fontWeight="bold" mb={3} fontSize="13px">Noise Controls</Box>
      {controls.map(({ key, label, min, max, step }) => (
        <Box key={key} mb={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <span>{label}</span>
            <span>{params[key]}</span>
          </Box>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={params[key]}
            onChange={(e) => setParams((p) => ({ ...p, [key]: parseFloat(e.target.value) }))}
            style={{ width: "100%", accentColor: "#49082d" }}
          />
        </Box>
      ))}
      <Box mt={3}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={params.animated}
            onChange={(e) => setParams((p) => ({ ...p, animated: e.target.checked }))}
          />
          Animated
        </label>
      </Box>
    </Box>
  );
}

// Generate noise texture on a small canvas, then tile it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateNoiseCanvas(size: number, grainSize: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
    data[i + 3] = 255;   // A
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export default function AsciiBackground({
  opacity: initialOpacity,
  showControls = false,
}: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [params, setParams] = useState({
    ...DEFAULT_PARAMS,
    opacity: initialOpacity ?? DEFAULT_PARAMS.opacity,
  });
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate noise pattern
  useEffect(() => {
    if (!isClient) return;

    const size = Math.ceil(256 / params.grainSize);
    noiseCanvasRef.current = generateNoiseCanvas(size, params.grainSize);
  }, [isClient, params.grainSize]);

  // Render loop
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (timestamp: number) => {
      // Throttle animation
      if (params.animated && timestamp - lastFrameRef.current < params.speed) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameRef.current = timestamp;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Resize canvas if needed
      if (canvas.width !== vw || canvas.height !== vh) {
        canvas.width = vw;
        canvas.height = vh;
      }

      ctx.clearRect(0, 0, vw, vh);

      // Regenerate noise for animation
      if (params.animated) {
        const size = Math.ceil(256 / params.grainSize);
        noiseCanvasRef.current = generateNoiseCanvas(size, params.grainSize);
      }

      if (!noiseCanvasRef.current) return;

      // Draw noise pattern tiled across screen
      ctx.globalAlpha = params.opacity;

      const pattern = ctx.createPattern(noiseCanvasRef.current, "repeat");
      if (pattern) {
        // Scale the pattern for grain size
        ctx.save();
        ctx.scale(params.grainSize, params.grainSize);
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, vw / params.grainSize, vh / params.grainSize);
        ctx.restore();
      }

      ctx.globalAlpha = 1;

      if (params.animated) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, params]);

  if (!isClient) return null;

  return (
    <>
      {showControls && <DebugControls params={params} setParams={setParams} />}
      <Box
        position="fixed"
        inset={0}
        zIndex={0}
        pointerEvents="none"
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            mixBlendMode: "multiply",
          }}
        />
      </Box>
    </>
  );
}
