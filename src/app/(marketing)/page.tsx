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

export default function LandingPage() {
  useEffect(() => {
    event({
      action: "landing_page_viewed",
      category: "page_view",
      label: "Landing page viewed",
    });
  }, []);

  return (
    <Box bg="white">
      <LandingNavbar />
      <HeroSection />
      <FeatureSection />

      <TestimonialsSection />

      <Footer />
    </Box>
  );
}
