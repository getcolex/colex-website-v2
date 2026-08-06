"use client";

import { Box, Container, Text, Button, Grid, Link } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { getEarlyAccess } from "@/lib/utils";
import HeroDemo from "./HeroDemo";
import dynamic from "next/dynamic";

const LedgerScatter = dynamic(() => import("./LedgerScatter"), { ssr: false });

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
      /* svh = small viewport height: stable when mobile browser chrome
         collapses, so the hero fills the first fold on any device */
      minH={{ base: "100svh", md: "auto", lg: "100vh" }}
      bg="transparent"
      overflow="hidden"
    >
      {/* Neat gradient covering right half */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        w={{ base: "0%", lg: "55%" }}
        display={{ base: "none", lg: "block" }}
      >
        <LedgerScatter preset="hero" />
        {/* Left edge gradient to merge into page bg */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          zIndex={1}
          background="linear-gradient(to right, #F8F7F4 0%, transparent 40%)"
        />
        {/* Top feather — fixed height from navbar */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="200px"
          pointerEvents="none"
          zIndex={1}
          background="linear-gradient(to bottom, #F8F7F4 0%, transparent 100%)"
        />
        {/* Bottom feather */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="150px"
          pointerEvents="none"
          zIndex={1}
          background="linear-gradient(to top, #F8F7F4 0%, transparent 100%)"
        />
      </Box>
      <Container
        maxW="container.xl"
        h="full"
        position="relative"
        px={{ base: 4, sm: 6, md: 8, lg: 12 }}
        zIndex={2}
        /* Phones: flex column filling the fold — content centers, SCROLL
           indicator pins to the bottom. md+ keeps the original block flow. */
        display={{ base: "flex", md: "block" }}
        flexDirection="column"
        minH={{ base: "100svh", md: "auto" }}
      >
        {/* 12-column grid layout */}
        <Grid
          data-testid="hero-grid"
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 10, lg: 8 }}
          alignItems="center"
          pt={{ base: 24, md: 32 }}
          pb={{ base: 8, md: 32 }}
          minH={{ base: "auto", lg: "100vh" }}
          flex={{ base: "1", md: "0 1 auto" }}
          alignContent={{ base: "center", md: "stretch" }}
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
              color="ink.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              <Box as="span" display="block">Give your teams</Box>
              <Box as="span" display="block">extra hands</Box>
            </Text>

            {/* Lede */}
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="ink.primary"
              fontWeight="400"
              mt={{ base: 4, md: 6 }}
              maxW="560px"
              mx={{ base: "auto", lg: "0" }}
            >
              Describe your business processes and Colex turns them into rules and gets the job done. You get a written record of how your company decides things.
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
                Get a personalised demo
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

          {/* Right side - Demo (cols 8-12, desktop only) */}
          <Box
            data-testid="hero-demo-col"
            gridColumn={{ base: "1", lg: "8 / 13" }}
            display={{ base: "none", lg: "flex" }}
            w="full"
            maxW="100%"
            overflow="hidden"
          >
            <HeroDemo />
          </Box>
        </Grid>

        {/* Scroll indicator — fades out on scroll */}
        <Box
          mt={{ base: "auto", md: "-6rem", lg: "-8rem" }}
          mb={{ base: 6, lg: 0 }}
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
