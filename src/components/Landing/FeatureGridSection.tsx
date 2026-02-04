"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Header transforms: starts big centered, shrinks and moves to top as user scrolls
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const headerTop = useTransform(scrollYProgress, [0, 0.15], ["50%", "10%"]);

  // Content fades in SIMULTANEOUSLY as header shrinks
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [0.2, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="150vh"
      bg="transparent"
    >
      {/* Sticky container */}
      <Box position="sticky" top={0} height="100vh" overflow="hidden">
        <Container maxW="container.xl" h="full" position="relative">
          {/* Animated header - starts big and centered, shrinks and moves to top */}
          <MotionBox
            style={{
              scale: headerScale,
              top: headerTop,
              x: "-50%",
            }}
            position="absolute"
            left="50%"
            transformOrigin="center center"
            zIndex={2}
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: "10vw", md: "7vw", lg: "5vw" }}
              fontWeight="700"
              color="text.primary"
              letterSpacing="-0.03em"
              textAlign="center"
              whiteSpace="nowrap"
            >
              Colex gives the control back to you
            </Text>
          </MotionBox>

          {/* Content area - 3 feature cards in a row */}
          <MotionBox
            style={{ opacity: contentOpacity, y: contentY }}
            position="absolute"
            top="18%"
            left={0}
            right={0}
            bottom={0}
            px={{ base: 4, md: 8 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={{ base: 4, md: 6 }}
              maxW="1100px"
              w="full"
            >
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>
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
