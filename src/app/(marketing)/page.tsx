// src/app/(marketing)/page.tsx

"use client";

import { Box } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import FeatureSection from "@/components/Landing/FeatureSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import Footer from "@/components/Landing/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Loading...</p>;

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
