// src/app/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import PainSection from "@/components/Landing/PainSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import WhyDifferentSection from "@/components/Landing/WhyDifferentSection";
import ControlSection from "@/components/Landing/ControlSection";
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
      <HowItWorksSection />
      <WhyDifferentSection />
      <ControlSection />
      <BookDemoSection />
      <Footer />
    </Box>
  );
}
