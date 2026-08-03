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
      <BookDemoSection />
      <Footer />
    </Box>
  );
}
