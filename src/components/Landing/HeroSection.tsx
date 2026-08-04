"use client";

import { Box, Container, Text, Button, Grid, Link } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { getEarlyAccess } from "@/lib/utils";
import HeroDemo from "./HeroDemo";

const MotionBox = motion.create(Box);

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="transparent"
    >
      <Container maxW="container.xl" h="full" position="relative" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        {/* 12-column grid layout */}
        <Grid
          data-testid="hero-grid"
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 10, lg: 8 }}
          alignItems="center"
          py={{ base: 24, md: 32 }}
          minH="100vh"
        >
          {/* Left side - Text content (7 columns) */}
          <Box
            data-testid="hero-text-col"
            gridColumn={{ base: "1", lg: "span 7" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            {/* Headline */}
            <Text
              fontFamily="heading"
              fontSize={{ base: "10vw", md: "7vw", lg: "clamp(40px, 4.5vw, 65px)" }}
              lineHeight={1.1}
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              <Box as="span" display="block">Give your teams</Box>
              <Box as="span" display="block">extra hands</Box>
            </Text>

            {/* Lede */}
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="text.primary"
              fontWeight="400"
              mt={{ base: 4, md: 6 }}
              maxW="560px"
              mx={{ base: "auto", lg: "0" }}
            >
              Colex turns your business processes into rules and does the work. You get a written record of how your company decides things. It gets sharper every time you use it.
            </Text>

            {/* Two CTAs */}
            <Box mt={{ base: 8, md: 10 }} display="flex" flexDirection={{ base: "column", sm: "row" }} gap={4} justifyContent={{ base: "center", lg: "flex-start" }} alignItems={{ base: "center", sm: "flex-start" }}>
              <Button
                size="lg"
                px={10}
                py={7}
                borderRadius="8px"
                bg="brand.primary"
                color="white"
                fontWeight="500"
                fontSize="md"
                _hover={{
                  bg: "#5a0a38",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                onClick={() => getEarlyAccess("hero_section")}
              >
                Talk to us
              </Button>
              <Link
                href="#thesis"
                px={4}
                py={3}
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                color="ink.primary"
                _hover={{ textDecoration: "underline" }}
                transition="all 0.2s"
              >
                Why are we building this? →
              </Link>
            </Box>
          </Box>

          {/* Right side - Demo (cols 8-12, hidden on mobile) */}
          <Box
            data-testid="hero-demo-col"
            gridColumn={{ base: "1", lg: "8 / 13" }}
            display={{ base: "none", lg: "flex" }}
            w="full"
          >
            <HeroDemo />
          </Box>
        </Grid>

        {/* Scroll indicator — fades out on scroll */}
        <Box
          mt={{ base: "-4rem", md: "-6rem", lg: "-8rem" }}
          opacity={scrolled ? 0 : 1}
          transition="opacity 0.3s ease"
          pointerEvents={scrolled ? "none" : "auto"}
        >
          <MotionBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Text fontSize="xs" color="ink.muted" fontWeight="500" letterSpacing="0.05em">
              SCROLL
            </Text>
            <Box
              w="1px"
              h="24px"
              bg="ink.muted"
              opacity={0.5}
            />
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
