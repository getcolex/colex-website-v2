"use client";

import { Box, Container, Text, Button, Grid } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import HeroDemo from "./HeroDemo";

export default function HeroSection() {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="transparent"
    >
      <Container maxW="container.xl" h="full" position="relative" px={{ base: 4, md: 8, lg: 12 }}>
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
              fontSize={{ base: "10vw", md: "7vw", lg: "4.5vw" }}
              lineHeight={1.1}
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              <Box as="span" display="block">Give your teams</Box>
              <Box as="span" display="block">extra hands</Box>
            </Text>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="text.primary"
              fontWeight="500"
              mt={{ base: 4, md: 6 }}
            >
              Colex is purpose-built to automate your team reliably
            </Text>

            {/* CTA + Micro-copy */}
            <Box mt={{ base: 8, md: 10 }}>
              <Box mb={{ base: 4, md: 5 }}>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  borderRadius="4px"
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
                  See it work in 30 minutes
                  <ArrowRightIcon
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 10,
                    }}
                  />
                </Button>
              </Box>

              <Text fontSize="sm" color="text.muted">
                No code. No consultants.
              </Text>
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
      </Container>
    </Box>
  );
}
