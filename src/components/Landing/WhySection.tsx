"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const MotionBox = motion.create(Box);

// Failure cards data
const failures = [
  {
    id: 1,
    title: "Tried SaaS",
    subtitle: "team is still on whatsapp",
  },
  {
    id: 2,
    title: "Tried no-code",
    subtitle: "Became the maintenance guy.",
  },
  {
    id: 3,
    title: "Tried vibe coding",
    subtitle: "Cool demo. Never shipped.",
  },
  {
    id: 4,
    title: "Hired devs",
    subtitle: "Three months later, 'almost done.'",
  },
];

export default function WhySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track section as it travels through viewport
  // Progress 0 = section top enters viewport bottom
  // Progress 0.5 = section centered in viewport
  // Progress 1 = section bottom exits viewport top
  const { scrollYProgress } = useSectionScroll(containerRef, {
    offset: ["start end", "end start"],
  });

  // Header shrinks as section enters viewport (0 to 0.35 progress)
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
            fontSize={{ base: "10vw", md: "6vw", lg: "5vw" }}
            fontWeight="700"
            color="text.primary"
            letterSpacing="-0.03em"
            textAlign="center"
          >
            You have tried this before
          </Text>
        </MotionBox>

        {/* Content area - 2x2 grid of failure cards */}
        <MotionBox style={{ opacity: contentOpacity, y: contentY }}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 4, md: 6 }}
            maxW="900px"
            mx="auto"
          >
            {failures.map((failure) => (
              <FailureCard key={failure.id} failure={failure} />
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

function FailureCard({ failure }: { failure: (typeof failures)[0] }) {
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
        h={{ base: "140px", md: "160px" }}
        p={4}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <FailureMockup type={failure.id} />
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
          {failure.title}
        </Text>
        <Text fontSize="sm" color="text.muted">
          {failure.subtitle}
        </Text>
      </Box>
    </Box>
  );
}

function FailureMockup({ type }: { type: number }) {
  switch (type) {
    case 1:
      // WhatsApp-style chat bubbles
      return (
        <Flex direction="column" gap={2} h="full" justify="center">
          <Box
            bg="white"
            borderRadius="lg"
            borderBottomLeftRadius="sm"
            p={2}
            maxW="80%"
            alignSelf="flex-start"
            boxShadow="xs"
          >
            <Text fontSize="xs" color="gray.600">did you update the CRM?</Text>
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            borderBottomRightRadius="sm"
            p={2}
            maxW="70%"
            alignSelf="flex-end"
            boxShadow="xs"
          >
            <Text fontSize="xs" color="gray.600">where&apos;s the doc?</Text>
          </Box>
          <Box
            bg="white"
            borderRadius="lg"
            borderBottomLeftRadius="sm"
            p={2}
            maxW="60%"
            alignSelf="flex-start"
            boxShadow="xs"
          >
            <Text fontSize="xs" color="gray.600">checking...</Text>
          </Box>
        </Flex>
      );

    case 2:
      // Tangled flowchart nodes
      return (
        <Flex direction="column" gap={3} h="full" justify="center" align="center">
          <Flex gap={3} align="center">
            <Box w={10} h={6} bg="gray.200" borderRadius="md" />
            <Box w="20px" h="1px" bg="red.400" />
            <Box w={10} h={6} bg="gray.200" borderRadius="md" position="relative">
              <Box
                position="absolute"
                top={-1}
                right={-1}
                w={3}
                h={3}
                bg="red.500"
                borderRadius="full"
                fontSize="8px"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                !
              </Box>
            </Box>
          </Flex>
          <Flex gap={3} align="center">
            <Box w={10} h={6} bg="gray.200" borderRadius="md" />
            <Box w="20px" h="1px" bg="gray.300" />
            <Box w={10} h={6} bg="gray.200" borderRadius="md" position="relative">
              <Box
                position="absolute"
                top={-1}
                right={-1}
                w={3}
                h={3}
                bg="red.500"
                borderRadius="full"
                fontSize="8px"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                !
              </Box>
            </Box>
          </Flex>
        </Flex>
      );

    case 3:
      // Code editor with DEMO badge
      return (
        <Box h="full" position="relative">
          <Box
            bg="gray.800"
            borderRadius="md"
            p={2}
            h="full"
            fontFamily="mono"
          >
            <Flex gap={1} mb={2}>
              <Box w={2} h={2} borderRadius="full" bg="red.400" />
              <Box w={2} h={2} borderRadius="full" bg="yellow.400" />
              <Box w={2} h={2} borderRadius="full" bg="green.400" />
            </Flex>
            <Box h={2} w="60%" bg="gray.600" borderRadius="sm" mb={1} />
            <Box h={2} w="80%" bg="gray.600" borderRadius="sm" mb={1} />
            <Box h={2} w="40%" bg="gray.600" borderRadius="sm" />
          </Box>
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="yellow.400"
            color="gray.800"
            fontSize="9px"
            fontWeight="700"
            px={2}
            py={0.5}
            borderRadius="sm"
          >
            DEMO
          </Box>
        </Box>
      );

    case 4:
      // Jira-style board with tickets
      return (
        <Flex gap={2} h="full">
          <Box flex={1} bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>TODO</Text>
            <Box h={4} bg="white" borderRadius="sm" mb={1} boxShadow="xs" />
            <Box h={4} bg="white" borderRadius="sm" mb={1} boxShadow="xs" />
            <Box h={4} bg="white" borderRadius="sm" boxShadow="xs" />
          </Box>
          <Box flex={1} bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>IN PROGRESS</Text>
            <Box h={4} bg="yellow.100" borderRadius="sm" mb={1} boxShadow="xs" />
            <Box h={4} bg="yellow.100" borderRadius="sm" boxShadow="xs" />
          </Box>
          <Box flex={1} bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>DONE</Text>
            <Box h={4} bg="green.100" borderRadius="sm" boxShadow="xs" />
          </Box>
        </Flex>
      );

    default:
      return null;
  }
}
