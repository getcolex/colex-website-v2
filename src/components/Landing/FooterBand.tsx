"use client";

import { Box } from "@chakra-ui/react";
import BookDemoSection from "./BookDemoSection";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const WireframeGrid = dynamic(() => import("./WireframeGrid"), { ssr: false });

/** CTA + footer sharing one continuous wireframe grid on the maroon ground. */
export default function FooterBand() {
  return (
    <Box position="relative" bg="brand.primary">
      <WireframeGrid preset="footer" lineColor="rgba(248,247,244,0.35)" />
      {/* Feather grid edges into the maroon bg on all 4 sides */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #49082D 0%, transparent 20%, transparent 80%, #49082D 100%)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #49082D 0%, transparent 20%, transparent 80%, #49082D 100%)",
        }}
      />
      <Box position="relative" zIndex={1}>
        <BookDemoSection />
        <Footer transparentBg />
      </Box>
    </Box>
  );
}
