"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const MotionBox = motion.create(Box);

// Feature cards data
const features = [
  {
    id: 1,
    title: "Simple UI",
    description: "We generate UI for all your tasks",
  },
  {
    id: 2,
    title: "Automated Reviews",
    description: "The system asks for reviews when needed",
  },
  {
    id: 3,
    title: "Full Audit Trail",
    description: "Every decision. Every approval. Logged.",
  },
];

export default function FeatureGridSection() {
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
      position="relative"
      py={{ base: 20, md: 28 }}
      bg="transparent"
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
            fontSize={{ base: "8vw", md: "5vw", lg: "4vw" }}
            fontWeight="700"
            color="text.primary"
            letterSpacing="-0.03em"
            textAlign="center"
          >
            Colex gives the control back to you
          </Text>
        </MotionBox>

        {/* Content area - 3 feature cards in a row */}
        <MotionBox style={{ opacity: contentOpacity, y: contentY }}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={{ base: 4, md: 6 }}
            maxW="1100px"
            mx="auto"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
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
        h={{ base: "160px", md: "180px" }}
        p={4}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <FeatureMockup type={feature.id} />
      </Box>

      {/* Text area */}
      <Box p={{ base: 4, md: 5 }}>
        <Text
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="600"
          color="text.primary"
          mb={1}
        >
          {feature.title}
        </Text>
        <Text fontSize="sm" color="text.muted">
          {feature.description}
        </Text>
      </Box>
    </Box>
  );
}

function FeatureMockup({ type }: { type: number }) {
  switch (type) {
    case 1:
      // Task checklist mockup
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Text fontSize="xs" fontWeight="600" color="gray.700" mb={3}>
            Tasks
          </Text>
          {[
            { done: true, label: "Process invoice #1234" },
            { done: true, label: "Send confirmation email" },
            { done: false, label: "Update inventory count" },
          ].map((task, i) => (
            <Flex key={i} align="center" gap={2} mb={2}>
              <Box
                w={4}
                h={4}
                borderRadius="sm"
                border="2px solid"
                borderColor={task.done ? "green.500" : "gray.300"}
                bg={task.done ? "green.500" : "white"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {task.done && (
                  <Text fontSize="10px" color="white">
                    ✓
                  </Text>
                )}
              </Box>
              <Text
                fontSize="xs"
                color={task.done ? "gray.400" : "gray.700"}
                textDecoration={task.done ? "line-through" : "none"}
              >
                {task.label}
              </Text>
            </Flex>
          ))}
        </Box>
      );

    case 2:
      // Approval buttons mockup
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Box
            bg="yellow.50"
            borderRadius="sm"
            p={2}
            mb={3}
            borderLeft="3px solid"
            borderColor="yellow.400"
          >
            <Text fontSize="10px" fontWeight="600" color="yellow.700">
              ⚠️ Review Required
            </Text>
            <Text fontSize="9px" color="yellow.600">
              Invoice amount exceeds $5,000
            </Text>
          </Box>

          <Flex gap={2} justify="center">
            <Box
              bg="green.500"
              color="white"
              px={3}
              py={1.5}
              borderRadius="md"
              fontSize="xs"
              fontWeight="500"
            >
              Approve
            </Box>
            <Box
              bg="red.500"
              color="white"
              px={3}
              py={1.5}
              borderRadius="md"
              fontSize="xs"
              fontWeight="500"
            >
              Reject
            </Box>
            <Box
              bg="gray.200"
              color="gray.700"
              px={3}
              py={1.5}
              borderRadius="md"
              fontSize="xs"
              fontWeight="500"
            >
              Escalate
            </Box>
          </Flex>
        </Box>
      );

    case 3:
      // Activity feed mockup
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Text fontSize="xs" fontWeight="600" color="gray.700" mb={3}>
            Activity Log
          </Text>
          {[
            { action: "Invoice approved", user: "JD", time: "2m ago" },
            { action: "Review requested", user: "System", time: "5m ago" },
            { action: "Data extracted", user: "AI", time: "6m ago" },
          ].map((item, i) => (
            <Flex key={i} align="center" gap={2} mb={2}>
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
                {item.user.slice(0, 2)}
              </Box>
              <Box flex={1}>
                <Text fontSize="xs" color="gray.700">
                  {item.action}
                </Text>
              </Box>
              <Text fontSize="9px" color="gray.400">
                {item.time}
              </Text>
            </Flex>
          ))}
        </Box>
      );

    default:
      return null;
  }
}
