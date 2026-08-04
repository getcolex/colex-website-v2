"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

const NEAT_CONFIG = {
  colors: [
    { color: "#4A072D", enabled: true },
    { color: "#ffc8dd", enabled: false },
    { color: "#ffafcc", enabled: false },
    { color: "#C5E2FF", enabled: false },
    { color: "#00B3FF", enabled: false },
  ],
  speed: 1,
  horizontalPressure: 6,
  verticalPressure: 6,
  waveFrequencyX: 3,
  waveFrequencyY: 3,
  waveAmplitude: 3,
  shadows: 0,
  highlights: 3,
  colorBrightness: 2.5,
  colorSaturation: -4,
  wireframe: true,
  antialias: true,
  colorBlending: 6,
  backgroundColor: "#F7F6F3",
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0,
  resolution: 1,
  yOffset: 25732,
  yOffsetWaveMultiplier: 10.9,
  yOffsetColorMultiplier: 3.8,
  yOffsetFlowMultiplier: 6.2,
  flowDistortionA: 2.8,
  flowDistortionB: 2.4,
  flowScale: 1.5,
  flowEase: 0.41,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureMode: "bitmap" as const,
  bakeEdgeSoftness: 1,
  textureVoidLikelihood: 0.06,
  textureVoidWidthMin: 10,
  textureVoidWidthMax: 500,
  textureBandDensity: 0.8,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.72,
  proceduralBackgroundColor: "#FFED00",
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.6,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.2,
  fresnelColor: "#FF0000",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.8,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: "plane" as const,
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: false,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 2.8,
};

export default function NeatBackground({ zoom = 2.8 }: { zoom?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    import("@firecms/neat").then((mod) => {
      if (!canvasRef.current) return;

      gradientRef.current = new mod.NeatGradient({
        ref: canvasRef.current,
        ...NEAT_CONFIG,
        cameraZoom: zoom,
      });
    });

    return () => {
      gradientRef.current?.destroy();
      gradientRef.current = null;
    };
  }, []);

  return (
    <Box
      position="absolute"
      inset={0}
      borderRadius="inherit"
      overflow="hidden"
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </Box>
  );
}
