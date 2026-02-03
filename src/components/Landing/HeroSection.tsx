"use client";

import { Box, Container, Text, Button, HStack } from "@chakra-ui/react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ColexBrandLogo from "@/assets/icons/ColexBrandLogo.svg";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

// Oversized headline - fades out quickly as subtitle takes over
function OversizedHeadline({
  children,
  scrollProgress,
}: {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollProgress, [0, 0.15], [0, -100]);
  const opacity = useTransform(scrollProgress, [0.05, 0.15], [1, 0]);

  return (
    <MotionBox
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      textAlign="center"
    >
      <Text
        fontFamily="heading"
        fontSize={{ base: "6vw", md: "5vw", lg: "4vw" }}
        lineHeight={1}
        color="brand.primary"
        fontWeight="700"
        letterSpacing="-0.03em"
      >
        {children}
      </Text>
    </MotionBox>
  );
}

// Subtitle - visible from start, grows and moves up to center
function Subtitle({
  children,
  scrollProgress,
}: {
  children: string;
  scrollProgress: MotionValue<number>;
}) {
  // Visible from start, fades out after growing
  const opacity = useTransform(scrollProgress, [0.2, 0.35], [1, 0]);
  // Grows from small to match Frame 2 headline size
  const scale = useTransform(scrollProgress, [0, 0.25], [1, 1.5]);
  // Moves up to center of viewport (where Frame 2 headline sits)
  const y = useTransform(scrollProgress, [0, 0.25], [0, -120]);

  return (
    <MotionText
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{ opacity, scale, y }}
      fontFamily="heading"
      fontSize={{ base: "4vw", md: "3.5vw", lg: "3vw" }}
      lineHeight={1.2}
      color="brand.primary"
      fontWeight="600"
      letterSpacing="-0.03em"
      textAlign="center"
      whiteSpace="pre-line"
      mx="auto"
      mt="16px"
    >
      {children}
    </MotionText>
  );
}

// Scroll indicator
function ScrollIndicator() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      position="absolute"
      bottom={{ base: 6, md: 10 }}
      left="50%"
      transform="translateX(-50%)"
    >
      <MotionBox
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <Box
          w={5}
          h={8}
          border="2px solid"
          borderColor="brand.primary"
          borderRadius="full"
          position="relative"
          opacity={0.3}
        >
          <Box
            position="absolute"
            top={1.5}
            left="50%"
            transform="translateX(-50%)"
            w={1}
            h={1.5}
            bg="brand.primary"
            borderRadius="full"
          />
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Frame 2 animations - fades in after subtitle fades out
  const frame2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 1], [0, 1, 1]);
  const frame2Y = useTransform(scrollYProgress, [0.35, 0.5], [60, 0]);
  const frame2Scale = useTransform(scrollYProgress, [0.35, 0.5], [0.97, 1]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="280vh" // Extended for proper dwell
      bg="transparent"
    >
      {/* Sticky container */}
      <Box position="sticky" top={0} height="100vh" overflow="hidden">
        {/* Frame 1: Pain - Oversized typography */}
        <Box
          position="absolute"
          inset={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={{ base: 4, md: 8 }}
        >
          <OversizedHeadline scrollProgress={scrollYProgress}>
            <ColexBrandLogo
              style={{
                width: "clamp(150px, 18vw, 280px)",
                height: "auto",
                display: "block",
                margin: "0 auto",
                marginBottom: "16px",
              }}
            />
            Give your team extra hands.
          </OversizedHeadline>
          <Subtitle scrollProgress={scrollYProgress}>
            Quotes. Reports. Approvals.{"\n"}On autopilot.
          </Subtitle>
          <ScrollIndicator />
        </Box>

        {/* Frame 2: Relief */}
        <MotionBox
          style={{
            opacity: frame2Opacity,
            y: frame2Y,
            scale: frame2Scale,
          }}
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 4, md: 8 }}
        >
          <Container maxW="container.md">
            <Box textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: "5vw", md: "4vw", lg: "3.5vw" }}
                lineHeight={1.2}
                color="brand.primary"
                fontWeight="600"
                letterSpacing="-0.03em"
                mb={{ base: 4, md: 6 }}
              >
                Describe your workflows once. They run forever.
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="text.muted"
                lineHeight={1.5}
                mb={{ base: 8, md: 10 }}
              >
                No devs. No consultants. No waiting.
              </Text>

              {/* CTA Button */}
              <MotionBox
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(73, 8, 45, 0)",
                    "0 0 0 12px rgba(73, 8, 45, 0.08)",
                    "0 0 0 0 rgba(73, 8, 45, 0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                display="inline-block"
                borderRadius="4px"
              >
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
                  Let&apos;s build yours
                  <ArrowRightIcon
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 10,
                    }}
                  />
                </Button>
              </MotionBox>

              {/* Trust signals */}
              <Box mt={{ base: 10, md: 14 }}>
                <Text
                  fontSize="sm"
                  color="text.muted"
                  mb={3}
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  fontWeight="500"
                >
                  Already shipping
                </Text>
                <HStack gap={6} justify="center">
                  <Text fontSize="sm" color="text.muted">
                    Mellow
                  </Text>
                  <Box w="1px" h="12px" bg="gray.300" />
                  <Text fontSize="sm" color="text.muted">
                    SC Lines
                  </Text>
                </HStack>
              </Box>
            </Box>
          </Container>
        </MotionBox>
      </Box>
    </Box>
  );
}
