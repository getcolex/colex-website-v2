"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const MotionBox = motion.create(Box);

// Benefit cards data
const benefits = [
  {
    id: 1,
    title: "Minutes to your first workflow",
    position: "top-left",
  },
  {
    id: 2,
    title: "Works with your data",
    position: "top-right",
  },
  {
    id: 3,
    title: "Human review by default",
    position: "bottom-left",
  },
  {
    id: 4,
    title: "Changes with your needs",
    position: "bottom-right",
  },
  {
    id: 5,
    title: "Comes with interface to use the workflow, no plumbing needed",
    position: "full-width",
  },
];

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track section as it travels through viewport
  const { scrollYProgress } = useSectionScroll(containerRef, {
    offset: ["start end", "end start"],
  });

  // Header shrinks as section enters viewport
  const headerScale = useTransform(scrollYProgress, [0.05, 0.35], [1.2, 0.5]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.35], ["20vh", "0vh"]);

  // Content fades in after header starts shrinking
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.4], [60, 0]);

  return (
    <Box
      ref={containerRef}
      py={{ base: 20, md: 28 }}
      bg="transparent"
      position="relative"
      zIndex={10}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        {/* Section header - shrinks as you scroll */}
        <MotionBox
          style={{ scale: headerScale, y: headerY }}
          transformOrigin="center top"
          mb={{ base: 6, md: 11 }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: "10vw", md: "6vw", lg: "5vw" }}
            fontWeight="700"
            color="text.primary"
            letterSpacing="-0.03em"
            textAlign="center"
          >
            We have got your back
          </Text>
        </MotionBox>

        {/* Content area - fades in as header shrinks */}
        <MotionBox style={{ opacity: contentOpacity, y: contentY }}>
          {/* 2x2 Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 4, md: 6 }}
            mb={{ base: 4, md: 6 }}
            maxW="1100px"
            mx="auto"
          >
            {benefits.slice(0, 4).map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </Grid>

          {/* Full-width bottom card */}
          <Box maxW="1100px" mx="auto">
            <BenefitCard benefit={benefits[4]} isFullWidth />
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

function BenefitCard({
  benefit,
  isFullWidth = false,
}: {
  benefit: (typeof benefits)[0];
  isFullWidth?: boolean;
}) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Mockup area */}
      <Box
        bg="gray.50"
        h={isFullWidth ? { base: "180px", md: "200px" } : { base: "140px", md: "160px" }}
        p={4}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <BenefitMockup type={benefit.id} />
      </Box>

      {/* Text area */}
      <Box p={{ base: 4, md: 5 }}>
        <Text
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="600"
          color="text.primary"
        >
          {benefit.title}
        </Text>
      </Box>
    </Box>
  );
}

function BenefitMockup({ type }: { type: number }) {
  switch (type) {
    case 1:
      // Progress stepper showing quick setup
      return (
        <Box h="full" display="flex" alignItems="center" justifyContent="center">
          <Flex align="center" gap={4}>
            {[
              { step: 1, label: "Describe", done: true },
              { step: 2, label: "Review", done: true },
              { step: 3, label: "Deploy", done: true },
            ].map((item, i) => (
              <Flex key={i} align="center" gap={3}>
                <Box
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="green.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  fontWeight="600"
                >
                  ✓
                </Box>
                <Text fontSize="xs" color="gray.600" fontWeight="500">
                  {item.label}
                </Text>
                {i < 2 && <Box w={6} h="1px" bg="green.300" />}
              </Flex>
            ))}
          </Flex>
          <Text
            position="absolute"
            bottom={2}
            right={3}
            fontSize="xs"
            color="green.600"
            fontWeight="500"
          >
            5 min
          </Text>
        </Box>
      );

    case 2:
      // Integration icons with connected status
      return (
        <Flex
          h="full"
          direction="column"
          justify="center"
          align="center"
          gap={3}
        >
          {[
            { name: "Gmail", color: "red.500" },
            { name: "Sheets", color: "green.500" },
            { name: "Slack", color: "purple.500" },
          ].map((service, i) => (
            <Flex key={i} align="center" gap={3} bg="white" px={3} py={2} borderRadius="md" boxShadow="xs">
              <Box
                w={6}
                h={6}
                borderRadius="md"
                bg={service.color}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="10px" color="white" fontWeight="600">
                  {service.name.slice(0, 1)}
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.700" fontWeight="500">
                {service.name}
              </Text>
              <Box
                bg="green.100"
                px={2}
                py={0.5}
                borderRadius="full"
                fontSize="9px"
                color="green.700"
                fontWeight="500"
              >
                Connected
              </Box>
            </Flex>
          ))}
        </Flex>
      );

    case 3:
      // Approval queue with pending items
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Text fontSize="xs" fontWeight="600" color="gray.700" mb={3}>
            Pending Reviews
          </Text>
          {[
            { item: "Invoice #1247", reviewer: "JD" },
            { item: "Contract update", reviewer: "SK" },
          ].map((review, i) => (
            <Flex
              key={i}
              align="center"
              justify="space-between"
              bg="yellow.50"
              p={2}
              borderRadius="md"
              mb={2}
            >
              <Text fontSize="xs" color="gray.700">
                {review.item}
              </Text>
              <Flex align="center" gap={2}>
                <Box
                  w={5}
                  h={5}
                  borderRadius="full"
                  bg="brand.primary"
                  color="white"
                  fontSize="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="600"
                >
                  {review.reviewer}
                </Box>
                <Text fontSize="9px" color="yellow.700">
                  Pending
                </Text>
              </Flex>
            </Flex>
          ))}
        </Box>
      );

    case 4:
      // Settings panel with toggles
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Text fontSize="xs" fontWeight="600" color="gray.700" mb={3}>
            Settings
          </Text>
          {[
            { label: "Auto-approve < $500", enabled: true },
            { label: "Email notifications", enabled: true },
            { label: "Require 2 approvers", enabled: false },
          ].map((setting, i) => (
            <Flex key={i} align="center" justify="space-between" mb={2}>
              <Text fontSize="xs" color="gray.600">
                {setting.label}
              </Text>
              <Box
                w={8}
                h={4}
                borderRadius="full"
                bg={setting.enabled ? "green.400" : "gray.200"}
                position="relative"
              >
                <Box
                  w={3}
                  h={3}
                  borderRadius="full"
                  bg="white"
                  position="absolute"
                  top="2px"
                  left={setting.enabled ? "18px" : "2px"}
                  boxShadow="xs"
                />
              </Box>
            </Flex>
          ))}
        </Box>
      );

    case 5:
      // Dashboard mockup (full-width)
      return (
        <Flex h="full" gap={4} align="stretch">
          {/* Sidebar */}
          <Box w="60px" bg="gray.800" borderRadius="md" p={2} flexShrink={0}>
            <Box w={6} h={6} bg="brand.primary" borderRadius="md" mb={3} />
            {[1, 2, 3].map((_, i) => (
              <Box
                key={i}
                w={6}
                h={6}
                bg={i === 0 ? "gray.600" : "gray.700"}
                borderRadius="md"
                mb={2}
              />
            ))}
          </Box>

          {/* Main content */}
          <Box flex={1} bg="white" borderRadius="md" p={3} boxShadow="xs">
            <Text fontSize="xs" fontWeight="600" color="gray.700" mb={3}>
              Workflows
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {[
                { name: "Quote Processor", runs: 234, status: "active" },
                { name: "Invoice Handler", runs: 189, status: "active" },
                { name: "Email Responder", runs: 567, status: "paused" },
              ].map((workflow, i) => (
                <Box
                  key={i}
                  bg="gray.50"
                  p={2}
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Flex justify="space-between" align="center" mb={1}>
                    <Text fontSize="10px" fontWeight="600" color="gray.700">
                      {workflow.name}
                    </Text>
                    <Box
                      w={2}
                      h={2}
                      borderRadius="full"
                      bg={workflow.status === "active" ? "green.400" : "yellow.400"}
                    />
                  </Flex>
                  <Text fontSize="9px" color="gray.500">
                    {workflow.runs} runs
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex>
      );

    default:
      return null;
  }
}
