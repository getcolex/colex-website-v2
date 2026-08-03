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
import { useEffect } from "react";
import { trackLandingPageView } from "@/lib/gtag";

export default function LandingPage() {
  useEffect(() => {
    trackLandingPageView("home");
  }, []);

  return (
    <Box
      bg="surface.page"
      minH="100vh"
      position="relative"
      _after={{
        content: '""',
        position: "fixed",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <DevGridOverlay />
      <LandingNavbar />
      <HeroSection />
      <PainSection />
      <HowSection />
      <GetSection />
      <MomentsSection />
      {/* <ShiftSection /> — hidden for now */}
      <VerticalsSection />
      <BookDemoSection />
      <Footer />
    </Box>
  );
}
