"use client";

import { Box, Container, Text, Button } from "@chakra-ui/react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

const MotionBox = motion.create(Box);

// Failed alternatives
const failures = [
  {
    tried: "Tried SaaS.",
    result: "Team's still on WhatsApp.",
  },
  {
    tried: "Tried no-code.",
    result: "Became the maintenance guy.",
  },
  {
    tried: "Tried vibe coding.",
    result: "Cool demo. Never shipped.",
  },
  {
    tried: "Hired devs.",
    result: "Three months later, 'almost done.'",
  },
];

const success = {
  headline: "Try Colex.",
  subline: "Describe now. Use in minutes.",
};

// Animated strikethrough line
function StrikethroughLine({
  scrollProgress,
  index,
}: {
  scrollProgress: MotionValue<number>;
  index: number;
}) {
  // Each line strikes through in sequence
  // Lines appear at 0.15, 0.25, 0.35, 0.45
  // Lines strike at 0.25, 0.35, 0.45, 0.55
  const strikeStart = 0.25 + index * 0.1;
  const strikeEnd = strikeStart + 0.08;

  const width = useTransform(scrollProgress, [strikeStart, strikeEnd], ["0%", "100%"]);

  return (
    <MotionBox
      style={{ width }}
      position="absolute"
      top="50%"
      left={0}
      h="2px"
      bg="text.muted"
    />
  );
}

// Single failure line with animated strikethrough
function FailureLine({
  failure,
  index,
  scrollProgress,
}: {
  failure: typeof failures[0];
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  // Staggered fade in - lines appear one by one
  const appearStart = 0.1 + index * 0.08;
  const appearEnd = appearStart + 0.06;

  const y = useTransform(scrollProgress, [appearStart, appearEnd], [20, 0]);
  const opacity = useTransform(scrollProgress, [appearStart, appearEnd], [0, 1]);

  // Text fades after its strikethrough completes
  const strikeStart = 0.25 + index * 0.1;
  const strikeEnd = strikeStart + 0.08;
  const textOpacity = useTransform(scrollProgress, [strikeStart, strikeEnd], [1, 0.4]);

  return (
    <MotionBox
      style={{ y, opacity }}
      mb={{ base: 5, md: 6 }}
    >
      <Box position="relative" display="inline-block">
        <MotionBox style={{ opacity: textOpacity }}>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="text.primary"
            lineHeight={1.5}
            display="inline"
          >
            <Text as="span" fontWeight="600">{failure.tried}</Text>
            {" "}
            <Text as="span" color="text.muted">{failure.result}</Text>
          </Text>
        </MotionBox>

        {/* Animated strikethrough - only as wide as text */}
        <StrikethroughLine scrollProgress={scrollProgress} index={index} />
      </Box>
    </MotionBox>
  );
}

export default function WhySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Colex line appears after all strikethroughs (around 0.7)
  const colexStart = 0.68;
  const colexY = useTransform(scrollYProgress, [colexStart, colexStart + 0.1], [30, 0]);
  const colexOpacity = useTransform(scrollYProgress, [colexStart, colexStart + 0.1], [0, 1]);
  const colexScale = useTransform(scrollYProgress, [colexStart, colexStart + 0.1], [0.97, 1]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="300vh"
      bg="transparent"
    >
      {/* Sticky container */}
      <Box
        position="sticky"
        top={0}
        height="100vh"
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.md" px={{ base: 5, md: 8 }}>
          {/* Section header - always visible */}
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            color="brand.primary"
            fontWeight="600"
            letterSpacing="-0.03em"
            lineHeight={1.2}
            mb={{ base: 10, md: 12 }}
          >
            You&apos;ve tried to automate your team before.
          </Text>

          {/* Failed alternatives with strikethroughs */}
          <Box mb={{ base: 8, md: 10 }}>
            {failures.map((failure, index) => (
              <FailureLine
                key={failure.tried}
                failure={failure}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </Box>

          {/* Colex CTA card */}
          <MotionBox
            style={{
              y: colexY,
              opacity: colexOpacity,
              scale: colexScale,
            }}
            bg="brand.primary"
            px={{ base: 6, md: 10 }}
            py={{ base: 6, md: 8 }}
            borderRadius="xl"
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              fontWeight="700"
              lineHeight={1.2}
              mb={2}
            >
              {success.headline}
            </Text>
            <Text
              fontSize="md"
              color="white"
              opacity={0.9}
              lineHeight={1.5}
              mb={{ base: 5, md: 6 }}
            >
              {success.subline}
            </Text>
            <Button
              size="lg"
              bg="white"
              color="brand.primary"
              fontWeight="500"
              fontSize="md"
              px={6}
              borderRadius="4px"
              _hover={{
                bg: "gray.100",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
              onClick={() => getEarlyAccess("why_section")}
            >
              Get access
              <ArrowRightIcon
                style={{
                  width: 18,
                  height: 18,
                  marginLeft: 8,
                  filter: "brightness(0) saturate(100%) invert(12%) sepia(48%) saturate(3000%) hue-rotate(315deg) brightness(90%) contrast(100%)",
                }}
              />
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
