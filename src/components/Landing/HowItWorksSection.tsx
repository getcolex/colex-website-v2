"use client";

import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const MotionBox = motion.create(Box);

// Step data
const steps = [
  {
    id: 1,
    title: "Describe what you need",
    subtitle: "Tell us your workflow in plain English",
  },
  {
    id: 2,
    title: "Our agents build the workflow",
    subtitle: "Don't like something? Just say so.",
  },
  {
    id: 3,
    title: "Review each output",
    subtitle: "Each task asks for approval when done",
  },
  {
    id: 4,
    title: "We create the connections",
    subtitle: "All tasks connect to your data automatically",
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track from when section enters viewport to when it exits
  // This gives ~300vh of scroll range (100vh section + 200vh travel through viewport)
  const { scrollYProgress } = useSectionScroll(containerRef, {
    offset: ["start end", "end start"],
  });

  // Content fades in
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.25], [40, 0]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="350vh"
      bg="transparent"
    >
      {/* Sticky container */}
      <Box position="sticky" top={0} height="100vh" overflow="hidden">
        <Container maxW="container.xl" h="full" position="relative">
          {/* Header */}
          <Box
            position="absolute"
            top="5%"
            left="50%"
            transform="translateX(-50%)"
            zIndex={2}
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="700"
              color="text.primary"
              letterSpacing="-0.02em"
              textAlign="center"
              whiteSpace="nowrap"
            >
              How it works
            </Text>
          </Box>

          {/* Content area - fades in after header shrinks */}
          <MotionBox
            style={{ opacity: contentOpacity, y: contentY }}
            position="absolute"
            top={{ base: "100px", md: "120px" }}
            left={0}
            right={0}
            bottom={0}
            px={{ base: 4, md: 8 }}
          >
            <Flex
              direction={{ base: "column", lg: "row" }}
              align="center"
              gap={{ base: 8, lg: 16 }}
              h="full"
              maxW="1400px"
              mx="auto"
            >
              {/* Left side - Evolving Visual */}
              <Box flex="1.5" w="full">
                <EvolvingVisual scrollProgress={scrollYProgress} />
              </Box>

              {/* Right side - Step text */}
              <Box flex="1" w="full" position="relative">
                <Box position="relative" h={{ base: "200px", md: "250px" }}>
                  {steps.map((step, index) => (
                    <StepTextSide
                      key={step.id}
                      step={step}
                      index={index}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </Box>
              </Box>
            </Flex>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

// The evolving visual that grows through stages
function EvolvingVisual({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  // Stage timing - with 350vh section height for comfortable pacing
  // Header done at ~0.20, stages run from 0.22 to 0.65
  // Stage 1: 0.22 - 0.32
  // Stage 2: 0.30 - 0.42
  // Stage 3: 0.40 - 0.52
  // Stage 4: 0.50 - 0.65

  const stage1Opacity = useTransform(
    scrollProgress,
    [0.22, 0.25, 0.29, 0.32],
    [0, 1, 1, 0]
  );
  const stage2Opacity = useTransform(
    scrollProgress,
    [0.30, 0.34, 0.39, 0.42],
    [0, 1, 1, 0]
  );
  const stage3Opacity = useTransform(
    scrollProgress,
    [0.40, 0.44, 0.49, 0.52],
    [0, 1, 1, 0]
  );
  const stage4Opacity = useTransform(scrollProgress, [0.50, 0.55, 0.65], [0, 1, 1]);

  // Growth animations
  const chatScale = useTransform(
    scrollProgress,
    [0.22, 0.25, 0.29, 0.32],
    [0.95, 1, 1, 0.95]
  );
  const uiHeight = useTransform(scrollProgress, [0.32, 0.38], ["0%", "100%"]);
  const teamY = useTransform(scrollProgress, [0.42, 0.47], [30, 0]);
  const liveScale = useTransform(scrollProgress, [0.52, 0.57], [0.9, 1]);

  return (
    <Box
      position="relative"
      w="full"
      maxW={{ base: "100%", lg: "700px" }}
      h={{ base: "400px", md: "500px", lg: "550px" }}
      bg="gray.50"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="xl"
    >
      {/* Stage 1: Chat input */}
      <MotionBox
        style={{ opacity: stage1Opacity, scale: chatScale }}
        position="absolute"
        inset={{ base: 4, md: 6, lg: 8 }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Flex direction="column" gap={4}>
          {/* User message */}
          <Box
            bg="brand.primary"
            color="white"
            borderRadius="xl"
            borderBottomRightRadius="sm"
            p={{ base: 4, md: 5, lg: 6 }}
            maxW="85%"
            alignSelf="flex-end"
          >
            <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
              I need a workflow that takes quote requests from email, matches
              them to our rate sheet, and sends proposals
            </Text>
          </Box>

          {/* Typing indicator */}
          <Box
            bg="white"
            borderRadius="xl"
            borderBottomLeftRadius="sm"
            p={{ base: 4, md: 5, lg: 6 }}
            maxW="60%"
            alignSelf="flex-start"
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex gap={2}>
              {[0, 1, 2].map((i) => (
                <MotionBox
                  key={i}
                  w={{ base: 2, md: 3 }}
                  h={{ base: 2, md: 3 }}
                  bg="gray.400"
                  borderRadius="full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </Flex>
          </Box>
        </Flex>
      </MotionBox>

      {/* Stage 2: UI appears */}
      <MotionBox
        style={{ opacity: stage2Opacity }}
        position="absolute"
        inset={{ base: 4, md: 6, lg: 8 }}
      >
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
          h="full"
        >
          {/* Header */}
          <Flex
            bg="gray.50"
            px={{ base: 4, md: 5, lg: 6 }}
            py={{ base: 3, md: 4 }}
            borderBottom="1px solid"
            borderColor="gray.200"
            align="center"
            justify="space-between"
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="600"
              color="gray.700"
            >
              Quote Processor
            </Text>
            <Flex gap={2}>
              <Box
                w={{ base: 3, md: 4 }}
                h={{ base: 3, md: 4 }}
                borderRadius="full"
                bg="green.400"
              />
              <Box
                w={{ base: 3, md: 4 }}
                h={{ base: 3, md: 4 }}
                borderRadius="full"
                bg="gray.300"
              />
            </Flex>
          </Flex>

          {/* Form content grows in */}
          <MotionBox style={{ height: uiHeight }} overflow="hidden">
            <Box p={{ base: 4, md: 5, lg: 6 }}>
              {/* Form fields */}
              {["Quote Source", "Rate Sheet", "Output Template"].map(
                (label, i) => (
                  <Box key={i} mb={{ base: 4, md: 5, lg: 6 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={2}>
                      {label}
                    </Text>
                    <Box
                      h={{ base: 10, md: 12, lg: 14 }}
                      bg="gray.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.200"
                      display="flex"
                      alignItems="center"
                      px={4}
                    >
                      <Box
                        h={{ base: 2, md: 3 }}
                        w={`${80 + i * 30}px`}
                        bg="gray.300"
                        borderRadius="full"
                      />
                    </Box>
                  </Box>
                )
              )}

              {/* Action button */}
              <Box
                bg="brand.primary"
                color="white"
                borderRadius="lg"
                py={{ base: 2, md: 3 }}
                px={{ base: 4, md: 6 }}
                display="inline-block"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="500"
              >
                Run workflow
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </MotionBox>

      {/* Stage 3: Team review */}
      <MotionBox
        style={{ opacity: stage3Opacity, y: teamY }}
        position="absolute"
        inset={{ base: 4, md: 6, lg: 8 }}
      >
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          h="full"
          p={{ base: 4, md: 5, lg: 6 }}
        >
          {/* Team avatars */}
          <Flex align="center" mb={{ base: 4, md: 6 }}>
            <Flex>
              {["#E53E3E", "#DD6B20", "#38A169", "#3182CE"].map((color, i) => (
                <Box
                  key={i}
                  w={{ base: 8, md: 10, lg: 12 }}
                  h={{ base: 8, md: 10, lg: 12 }}
                  borderRadius="full"
                  bg={color}
                  border="2px solid white"
                  ml={i > 0 ? { base: -2, md: -3 } : 0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="white"
                    fontWeight="600"
                  >
                    {["JD", "SK", "MR", "AL"][i]}
                  </Text>
                </Box>
              ))}
            </Flex>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500" ml={4}>
              4 reviewers
            </Text>
          </Flex>

          {/* Approval queue */}
          <Flex direction="column" gap={{ base: 3, md: 4 }}>
            {[
              { status: "approved", label: "Rate lookup #127" },
              { status: "approved", label: "Proposal draft #126" },
              { status: "pending", label: "Email send #125" },
            ].map((item, i) => (
              <MotionBox
                key={i}
                bg="gray.50"
                borderRadius="lg"
                p={{ base: 3, md: 4, lg: 5 }}
                border="1px solid"
                borderColor={
                  item.status === "approved" ? "green.200" : "yellow.200"
                }
                animate={
                  item.status === "pending"
                    ? {
                        borderColor: ["#ECC94B", "#F6E05E", "#ECC94B"],
                      }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Flex justify="space-between" align="center">
                  <Text
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color="gray.700"
                  >
                    {item.label}
                  </Text>
                  <Box
                    px={{ base: 2, md: 3 }}
                    py={{ base: 0.5, md: 1 }}
                    borderRadius="full"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="500"
                    bg={item.status === "approved" ? "green.100" : "yellow.100"}
                    color={
                      item.status === "approved" ? "green.700" : "yellow.700"
                    }
                  >
                    {item.status === "approved" ? "Approved" : "Pending"}
                  </Box>
                </Flex>
              </MotionBox>
            ))}
          </Flex>
        </Box>
      </MotionBox>

      {/* Stage 4: Colex handles engineering - deployed state */}
      <MotionBox
        style={{ opacity: stage4Opacity, scale: liveScale }}
        position="absolute"
        inset={{ base: 4, md: 6, lg: 8 }}
      >
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="green.200"
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={{ base: 6, md: 8 }}
        >
          <Box
            w={{ base: 16, md: 20 }}
            h={{ base: 16, md: 20 }}
            borderRadius="full"
            bg="green.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <Text fontSize={{ base: "3xl", md: "4xl" }} color="green.500">
              ✓
            </Text>
          </Box>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="600"
            color="gray.800"
            mb={2}
          >
            Template shared with team
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Your workflow is live and running
          </Text>
        </Box>
      </MotionBox>
    </Box>
  );
}

// Text overlay for side layout - left aligned
function StepTextSide({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  // Match the visual stage timing - 350vh section
  // Stage 1: 0.22 - 0.32
  // Stage 2: 0.30 - 0.42
  // Stage 3: 0.40 - 0.52
  // Stage 4: 0.50 - 0.65
  const stepStart = 0.22 + index * 0.10;
  const stepEnd = stepStart + 0.12;
  const transitionDuration = 0.03;

  const opacity = useTransform(
    scrollProgress,
    [
      stepStart,
      stepStart + transitionDuration,
      stepEnd - transitionDuration,
      stepEnd,
    ],
    [0, 1, 1, index === 3 ? 1 : 0]
  );
  const y = useTransform(
    scrollProgress,
    [
      stepStart,
      stepStart + transitionDuration,
      stepEnd - transitionDuration,
      stepEnd,
    ],
    [30, 0, 0, index === 3 ? 0 : -30]
  );

  return (
    <MotionBox
      style={{ opacity, y }}
      position="absolute"
      inset={0}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* Step number */}
      <Flex align="center" gap={3} mb={4}>
        <Box
          bg="brand.primary"
          color="white"
          w={10}
          h={10}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          fontWeight="700"
        >
          {step.id}
        </Box>
        <Box h="1px" w="40px" bg="brand.primary" opacity={0.3} />
      </Flex>

      {/* Title */}
      <Text
        fontFamily="heading"
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        color="brand.primary"
        fontWeight="600"
        letterSpacing="-0.03em"
        lineHeight={1.2}
        mb={3}
      >
        {step.title}
      </Text>

      {/* Subtitle */}
      <Text fontSize="md" color="text.muted" lineHeight={1.5} maxW="400px">
        {step.subtitle}
      </Text>
    </MotionBox>
  );
}
