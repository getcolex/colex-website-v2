// src/app/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import WhySection from "@/components/Landing/WhySection";
import FeatureGridSection from "@/components/Landing/FeatureGridSection";
import BenefitsSection from "@/components/Landing/BenefitsSection";
import Footer from "@/components/Landing/Footer";
import DevGridOverlay from "@/components/DevGridOverlay";
import { useEffect } from "react";
import { trackLandingPageView } from "@/lib/gtag";

export default function LandingPage() {
  useEffect(() => {
    trackLandingPageView("home");
  }, []);

  return (
    <Box bg="#F8F7F4" minH="100vh">
      <DevGridOverlay />
      <LandingNavbar />
      <HeroSection />
      <HowItWorksSection />
      <WhySection />
      <FeatureGridSection />
      <BenefitsSection />
      <Footer />
    </Box>
  );
}
