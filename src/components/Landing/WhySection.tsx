"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
              You have tried this before
            </Text>
          </MotionBox>

          {/* Content area - 2x2 grid of failure cards */}
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
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 4, md: 6 }}
              maxW="900px"
              w="full"
            >
              {failures.map((failure) => (
                <FailureCard key={failure.id} failure={failure} />
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>
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
