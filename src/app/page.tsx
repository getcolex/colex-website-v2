// src/app/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import PainSection from "@/components/Landing/PainSection";
// import ShiftSection from "@/components/Landing/ShiftSection"; // hidden for now
import VerticalsSection from "@/components/Landing/VerticalsSection";
import HowSection from "@/components/Landing/HowSection";
import GetSection from "@/components/Landing/GetSection";
import MomentsSection from "@/components/Landing/MomentsSection";
import BookDemoSection from "@/components/Landing/BookDemoSection";
import Footer from "@/components/Landing/Footer";
import DevGridOverlay from "@/components/DevGridOverlay";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const WireframeGrid = dynamic(() => import("@/components/Landing/WireframeGrid"), {
  ssr: false,
});
import { trackLandingPageView } from "@/lib/gtag";

export default function LandingPage() {
  useEffect(() => {
    trackLandingPageView("home");
  }, []);

  return (
    <Box bg="surface.page" minH="100vh">
      <DevGridOverlay />
      <LandingNavbar />
      <HeroSection />
      <PainSection />
      <HowSection />
      <GetSection />
      <MomentsSection />
      {/* <ShiftSection /> — hidden for now */}
      <VerticalsSection />
      {/* CTA + footer share one continuous wireframe grid */}
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
            background: "linear-gradient(to right, #49082D 0%, transparent 20%, transparent 80%, #49082D 100%)",
          }}
          _after={{
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, #49082D 0%, transparent 20%, transparent 80%, #49082D 100%)",
          }}
        />
        <Box position="relative" zIndex={1}>
          <BookDemoSection />
          <Footer transparentBg />
        </Box>
      </Box>
    </Box>
  );
}
