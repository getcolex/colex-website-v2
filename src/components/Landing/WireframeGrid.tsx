"use client";

import { useMemo, useRef, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, Flex, Text } from "@chakra-ui/react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

export type GridPreset = "hero" | "how" | "get" | "verticals" | "footer";

interface GridParams {
  segments: number;
  planeSize: number;
  tiltX: number;
  cameraY: number;
  cameraZ: number;
  fov: number;
  waveFreqX: number;
  waveFreqY: number;
  waveAmpX: number;
  waveAmpY: number;
  noiseAmpX: number;
  noiseAmpY: number;
  noiseScaleX: number;
  noiseScaleY: number;
  speed: number;
  opacity: number;
  zoom: number;
}

const BASE: GridParams = {
  segments: 188,
  planeSize: 10,
  tiltX: 0.45,
  cameraY: 3,
  cameraZ: 3,
  fov: 35,
  waveFreqX: 3.7,
  waveFreqY: 3.6,
  waveAmpX: 0.58,
  waveAmpY: 0.58,
  noiseAmpX: 0.33,
  noiseAmpY: 0.54,
  noiseScaleX: 1.2,
  noiseScaleY: 1.2,
  speed: 0.05,
  opacity: 0.15,
  zoom: 1,
};

const DEFAULTS: Record<GridPreset, GridParams> = {
  hero: { ...BASE, segments: 196, planeSize: 5.5, opacity: 0.31, fov: 20 },
  how: { ...BASE, zoom: 2 },
  get: { ...BASE, zoom: 2 },
  verticals: { ...BASE, zoom: 2 },
  footer: { ...BASE, segments: 196, planeSize: 5.5, opacity: 0.31, fov: 20 },
};

/* --- Mutable per-preset store with change notification --- */

const storageKey = (preset: GridPreset) => `wireframe-grid:${preset}`;

function loadPreset(preset: GridPreset): GridParams {
  const params = { ...DEFAULTS[preset] };
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(storageKey(preset));
      if (saved) Object.assign(params, JSON.parse(saved));
    } catch {}
  }
  return params;
}

const store: Record<GridPreset, GridParams> = {
  hero: loadPreset("hero"),
  how: loadPreset("how"),
  get: loadPreset("get"),
  verticals: loadPreset("verticals"),
  footer: loadPreset("footer"),
};

let version = 0;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getVersion() {
  return version;
}

function setParam(preset: GridPreset, key: keyof GridParams, value: number) {
  store[preset][key] = value;
  version++;
  try {
    localStorage.setItem(storageKey(preset), JSON.stringify(store[preset]));
  } catch {}
  listeners.forEach((l) => l());
}

function resetPreset(preset: GridPreset) {
  Object.assign(store[preset], DEFAULTS[preset]);
  version++;
  try {
    localStorage.removeItem(storageKey(preset));
  } catch {}
  listeners.forEach((l) => l());
}

/* --- The animated grid mesh --- */

function WaveGrid({ preset, color }: { preset: GridPreset; color: string }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  // Re-render (and rebuild geometry) when geometry-shaping params change
  useSyncExternalStore(subscribe, getVersion, getVersion);
  const p = store[preset];

  const geoKey = `${p.segments}|${p.planeSize}|${p.tiltX}`;
  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      p.planeSize,
      p.planeSize,
      p.segments,
      p.segments
    );
    geo.rotateX(-Math.PI * p.tiltX);
    const orig = new Float32Array(geo.attributes.position.array);
    return { geometry: geo, originalPositions: orig };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoKey]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const params = store[preset];
    const t = clock.getElapsedTime() * params.speed;
    const positions = geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];

      // Mirrored X/Y: each axis has an independent wave + directional noise,
      // so the X and Y sliders are true equivalents of each other.
      const waveZ =
        Math.sin(ox * params.waveFreqX + t * 1.3) * params.waveAmpX +
        Math.sin(oy * params.waveFreqY + t * 1.3) * params.waveAmpY;

      const noiseZx =
        noise3D(ox * params.noiseScaleX, oy * 0.5, t * 0.5) * params.noiseAmpX +
        noise3D(ox * params.noiseScaleX * 2 + 10, oy * 0.5, t * 0.3) * params.noiseAmpX * 0.3;

      const noiseZy =
        noise3D(oy * params.noiseScaleY + 50, ox * 0.5 + 50, t * 0.5) * params.noiseAmpY +
        noise3D(oy * params.noiseScaleY * 2 + 60, ox * 0.5 + 50, t * 0.3) * params.noiseAmpY * 0.3;

      positions[i * 3 + 2] = originalPositions[i * 3 + 2] + waveZ + noiseZx + noiseZy;
    }

    geometry.attributes.position.needsUpdate = true;

    if (matRef.current) matRef.current.opacity = params.opacity;

    const cam = camera as THREE.PerspectiveCamera;
    const z = params.zoom || 1;
    cam.position.set(0, params.cameraY, params.cameraZ / z);
    cam.fov = params.fov / z;
    cam.updateProjectionMatrix();
    cam.lookAt(0, 0, 0);
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        ref={matRef}
        color={color}
        wireframe
        transparent
        opacity={p.opacity}
      />
    </mesh>
  );
}

/* --- Public grid component --- */

interface WireframeGridProps {
  preset: GridPreset;
  lineColor?: string;
}

export default function WireframeGrid({
  preset,
  lineColor = "#49082D",
}: WireframeGridProps) {
  const p = store[preset];
  return (
    <Box
      position="absolute"
      inset={0}
      borderRadius="inherit"
      overflow="hidden"
      pointerEvents="none"
    >
      <Canvas
        camera={{
          position: [0, p.cameraY, p.cameraZ / (p.zoom || 1)],
          fov: p.fov / (p.zoom || 1),
        }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <WaveGrid preset={preset} color={lineColor} />
      </Canvas>
    </Box>
  );
}

/* --- Tuner sidebar (dev tool) --- */

const SLIDERS: { label: string; param: keyof GridParams; min: number; max: number; step: number }[] = [
  { label: "Segments", param: "segments", min: 16, max: 260, step: 4 },
  { label: "Plane Size", param: "planeSize", min: 2, max: 20, step: 0.5 },
  { label: "Zoom", param: "zoom", min: 0.5, max: 5, step: 0.1 },
  { label: "Wave Freq X", param: "waveFreqX", min: 0.5, max: 8, step: 0.1 },
  { label: "Wave Freq Y", param: "waveFreqY", min: 0.5, max: 8, step: 0.1 },
  { label: "Wave Amp X", param: "waveAmpX", min: 0, max: 1.5, step: 0.02 },
  { label: "Wave Amp Y", param: "waveAmpY", min: 0, max: 1.5, step: 0.02 },
  { label: "Noise Amp X", param: "noiseAmpX", min: 0, max: 0.8, step: 0.01 },
  { label: "Noise Amp Y", param: "noiseAmpY", min: 0, max: 0.8, step: 0.01 },
  { label: "Noise Scl X", param: "noiseScaleX", min: 0.2, max: 4, step: 0.1 },
  { label: "Noise Scl Y", param: "noiseScaleY", min: 0.2, max: 4, step: 0.1 },
  { label: "Speed", param: "speed", min: 0.01, max: 1.5, step: 0.01 },
  { label: "Opacity", param: "opacity", min: 0.02, max: 0.6, step: 0.01 },
  { label: "Tilt", param: "tiltX", min: 0.1, max: 0.5, step: 0.01 },
  { label: "Camera Y", param: "cameraY", min: 0.5, max: 6, step: 0.1 },
  { label: "Camera Z", param: "cameraZ", min: 0.5, max: 6, step: 0.1 },
  { label: "FOV", param: "fov", min: 20, max: 80, step: 1 },
];

const PRESETS: GridPreset[] = ["hero", "how", "get", "verticals", "footer"];

export function GridTuner() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<GridPreset>("hero");
  const [copied, setCopied] = useState(false);
  useSyncExternalStore(subscribe, getVersion, getVersion);

  if (process.env.NODE_ENV !== "development") return null;

  const p = store[preset];

  if (!open) {
    return (
      <Box
        as="button"
        position="fixed"
        bottom={4}
        left={4}
        zIndex={9999}
        bg="rgba(0,0,0,0.85)"
        color="white"
        fontSize="11px"
        fontWeight="700"
        px={3}
        py={2}
        borderRadius="8px"
        cursor="pointer"
        onClick={() => setOpen(true)}
      >
        Grid tuner
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      top="80px"
      bottom={4}
      left={4}
      w="290px"
      bg="rgba(0,0,0,0.92)"
      borderRadius="10px"
      p={3}
      zIndex={9999}
      overflowY="auto"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="12px" color="white" fontWeight="700">
          Grid tuner
        </Text>
        <Box
          as="button"
          color="rgba(255,255,255,0.6)"
          fontSize="12px"
          cursor="pointer"
          onClick={() => setOpen(false)}
        >
          ✕
        </Box>
      </Flex>

      {/* Preset tabs */}
      <Flex gap={1} mb={3}>
        {PRESETS.map((name) => (
          <Box
            key={name}
            as="button"
            flex="1"
            fontSize="11px"
            fontWeight="700"
            textTransform="capitalize"
            py={1.5}
            borderRadius="6px"
            cursor="pointer"
            bg={preset === name ? "white" : "rgba(255,255,255,0.12)"}
            color={preset === name ? "black" : "white"}
            onClick={() => setPreset(name)}
          >
            {name}
          </Box>
        ))}
      </Flex>

      <Flex direction="column" gap={1.5}>
        {SLIDERS.map((s) => (
          <Flex key={s.param} align="center" gap={2}>
            <Text fontSize="11px" color="white" w="78px" flexShrink={0}>
              {s.label}
            </Text>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={p[s.param]}
              onChange={(e) => setParam(preset, s.param, parseFloat(e.target.value))}
              style={{ width: "110px" }}
            />
            <Text fontSize="11px" color="white" w="42px" textAlign="right">
              {p[s.param]}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex gap={2} mt={3}>
        <Box
          as="button"
          flex="1"
          fontSize="11px"
          fontWeight="700"
          py={1.5}
          borderRadius="6px"
          cursor="pointer"
          bg="rgba(255,255,255,0.15)"
          color="white"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(p, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied!" : "Copy config"}
        </Box>
        <Box
          as="button"
          flex="1"
          fontSize="11px"
          fontWeight="700"
          py={1.5}
          borderRadius="6px"
          cursor="pointer"
          bg="rgba(255,255,255,0.15)"
          color="white"
          onClick={() => resetPreset(preset)}
        >
          Reset
        </Box>
      </Flex>
      <Text fontSize="9px" color="rgba(255,255,255,0.5)" mt={2}>
        All sliders are live. Saved per-preset in localStorage. Copy config to
        freeze values into DEFAULTS.
      </Text>
    </Box>
  );
}
