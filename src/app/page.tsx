// src/app/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import WhySection from "@/components/Landing/WhySection";
import FeatureGridSection from "@/components/Landing/FeatureGridSection";
import BenefitsSection from "@/components/Landing/BenefitsSection";
import CTASection from "@/components/Landing/CTASection";
import Footer from "@/components/Landing/Footer";
import AsciiBackground from "@/components/AsciiBackground";
import { useEffect } from "react";
import { trackLandingPageView } from "@/lib/gtag";

export default function LandingPage() {
  useEffect(() => {
    trackLandingPageView("home");
  }, []);

  return (
    <Box bg="transparent" position="relative">
      <AsciiBackground opacity={0.06} showControls={true} />
      <Box position="relative" zIndex={1}>
        <LandingNavbar />
        <HeroSection />
        <HowItWorksSection />
        <WhySection />
        <FeatureGridSection />
        <BenefitsSection />
        <CTASection />
        <Footer />
      </Box>
    </Box>
  );
}
