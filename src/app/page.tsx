// src/app/(marketing)/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import FeatureSection from "@/components/Landing/FeatureSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import Footer from "@/components/Landing/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import { useEffect } from "react";
import { event } from "@/lib/gtag";
import AnalysisToolsSection from "@/components/Landing/AnalysisToolsSection";
import DataSecuritySection from "@/components/Landing/DataSecuritySection";
import FooterLogo from "@/components/Landing/FooterLogo";

export default function LandingPage() {
  useEffect(() => {
    event({
      action: "landing_page_viewed",
      category: "page_view",
      label: "Landing page viewed",
    });
  }, []);

  return (
    <Box bg="#F8F7F5">
      <LandingNavbar />
      <HeroSection />
      <FeatureSection />
      <AnalysisToolsSection />
      <DataSecuritySection />

      <TestimonialsSection />

      <Footer />
      <FooterLogo />
    </Box>
  );
}
