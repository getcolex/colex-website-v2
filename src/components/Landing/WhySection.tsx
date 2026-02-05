"use client";

import { Box, Container, Text, Grid, Flex } from "@chakra-ui/react";
import { motion } from "motion/react";

const MotionBox = motion.create(Box);

// Failure cards data
const failures = [
  {
    id: 1,
    title: "SaaS is too rigid",
    subtitle: "The team is still on WhatsApp",
  },
  {
    id: 2,
    title: "No-code is a lot of code",
    subtitle: "Became the maintenance guy.",
  },
  {
    id: 3,
    title: "Vibe coding doesn't ship",
    subtitle: "Cool demo. Never shared.",
  },
  {
    id: 4,
    title: "Devs are expensive",
    subtitle: "Three months later, 'almost done.'",
  },
];

export default function WhySection() {
  return (
    <Box
      position="relative"
      py={{ base: 20, md: 28 }}
      bg="transparent"
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8, lg: 12 }}>
        {/* 12-column grid layout */}
        <Grid
          data-testid="why-grid"
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 10, lg: 8 }}
        >
          {/* Content centered in columns 3-10 (8 cols for 2x2 grid = 4 cols per card) */}
          <Box
            data-testid="why-content"
            gridColumn={{ base: "1", lg: "3 / 11" }}
          >
            {/* Section header */}
            <Box mb={{ base: 10, md: 14 }}>
              <Text
                fontFamily="heading"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="700"
                color="text.primary"
                letterSpacing="-0.02em"
                textAlign="center"
              >
                You have tried to solve this before
              </Text>
            </Box>

            {/* Content area - 2x2 grid of failure cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 4, lg: 8 }}
            >
              {failures.map((failure) => (
                <FailureCard key={failure.id} failure={failure} />
              ))}
            </Grid>
          </Box>
        </Grid>
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
      {/* Mockup area - 1:1.6 ratio */}
      <Box
        bg="gray.50"
        h={{ base: "180px", md: "220px" }}
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
      // WhatsApp-style chat with beige background
      return (
        <Box h="full" bg="#ece5dd" borderRadius="md" p={2} overflow="hidden">
          <Flex direction="column" gap={1.5} h="full" justify="center">
            <Box
              bg="white"
              borderRadius="lg"
              borderBottomLeftRadius="sm"
              px={2}
              py={1.5}
              maxW="85%"
              alignSelf="flex-start"
              boxShadow="xs"
            >
              <Text fontSize="10px" color="gray.700">did you add the inquiry?</Text>
            </Box>
            <Box
              bg="#dcf8c6"
              borderRadius="lg"
              borderBottomRightRadius="sm"
              px={2}
              py={1.5}
              maxW="70%"
              alignSelf="flex-end"
              boxShadow="xs"
            >
              <Text fontSize="10px" color="gray.700">where&apos;s the doc?</Text>
            </Box>
            <Box
              bg="white"
              borderRadius="lg"
              borderBottomLeftRadius="sm"
              px={2}
              py={1.5}
              maxW="60%"
              alignSelf="flex-start"
              boxShadow="xs"
            >
              <Text fontSize="10px" color="gray.700">checking...</Text>
            </Box>
            <Box
              bg="#dcf8c6"
              borderRadius="lg"
              borderBottomRightRadius="sm"
              px={2}
              py={1.5}
              maxW="30%"
              alignSelf="flex-end"
              boxShadow="xs"
            >
              <Text fontSize="2xl">🤯</Text>
            </Box>
          </Flex>
        </Box>
      );

    case 2:
      // n8n-style workflow with errors
      return (
        <Box h="full" bg="gray.800" borderRadius="md" p={4} position="relative" overflow="hidden">
          <Box overflowX="auto" h="full" css={{ "&::-webkit-scrollbar": { display: "none" } }}>
            {/* Grid background like n8n */}
            <Box
              position="absolute"
              inset={0}
              opacity={0.1}
              backgroundImage="linear-gradient(gray 1px, transparent 1px), linear-gradient(90deg, gray 1px, transparent 1px)"
              backgroundSize="20px 20px"
            />
            <Flex direction="column" gap={4} h="full" justify="center" position="relative">
              {/* Top row: Trigger -> HTTP -> Sheets */}
              <Flex align="center" justify="center" gap={2}>
                <Box w={16} h={10} bg="purple.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="10px" color="white" fontWeight="600">Trigger</Text>
                </Box>
                <Box w={6} h="2px" bg="gray.500" />
                <Box w={16} h={10} bg="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" position="relative">
                  <Text fontSize="10px" color="white" fontWeight="600">HTTP</Text>
                  <Box position="absolute" top={-2} right={-2} w={6} h={6} bg="red.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center" border="2px solid" borderColor="gray.800">
                    <Text fontSize="12px" color="white" fontWeight="700">!</Text>
                  </Box>
                </Box>
                <Box w={6} h="2px" bg="red.400" />
                <Box w={16} h={10} bg="green.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" position="relative">
                  <Text fontSize="10px" color="white" fontWeight="600">Sheets</Text>
                  <Box position="absolute" top={-2} right={-2} w={6} h={6} bg="red.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center" border="2px solid" borderColor="gray.800">
                    <Text fontSize="12px" color="white" fontWeight="700">!</Text>
                  </Box>
                </Box>
              </Flex>
              {/* Bottom row: Branch with errors */}
              <Flex align="center" justify="center" gap={2} ml={{ base: 4, md: 12 }}>
                <Box w={16} h={10} bg="orange.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" position="relative">
                  <Text fontSize="10px" color="white" fontWeight="600">IF</Text>
                </Box>
                <Box w={6} h="2px" bg="gray.500" />
                <Box w={16} h={10} bg="teal.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" position="relative">
                  <Text fontSize="10px" color="white" fontWeight="600">Email</Text>
                  <Box position="absolute" top={-2} right={-2} w={6} h={6} bg="red.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center" border="2px solid" borderColor="gray.800">
                    <Text fontSize="12px" color="white" fontWeight="700">!</Text>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      );

    case 3:
      // Lovable-style UI with endless loading sidebar
      return (
        <Flex h="full" gap={0} borderRadius="md" overflow="hidden">
          {/* Sidebar with loading spinner */}
          <Box w="35%" bg="gray.900" p={2} borderRight="1px solid" borderColor="gray.700">
            <Flex direction="column" h="full" align="center" justify="center">
              <MotionBox
                w={8}
                h={8}
                border="2px solid"
                borderColor="gray.600"
                borderTopColor="purple.400"
                borderRadius="full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear", repeatType: "loop" } as never}
                mb={3}
              />
              <Text fontSize="9px" color="gray.500" textAlign="center">Generating...</Text>
            </Flex>
          </Box>
          {/* Main preview area - blank/loading */}
          <Box flex={1} bg="white" p={2} position="relative">
            <Flex gap={1} mb={2}>
              <Box w={2} h={2} borderRadius="full" bg="red.400" />
              <Box w={2} h={2} borderRadius="full" bg="yellow.400" />
              <Box w={2} h={2} borderRadius="full" bg="green.400" />
            </Flex>
            <Box h="full" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="9px" color="gray.400">Preview loading...</Text>
            </Box>
            <Box
              position="absolute"
              top={2}
              right={2}
              bg="purple.500"
              color="white"
              fontSize="8px"
              fontWeight="600"
              px={1.5}
              py={0.5}
              borderRadius="sm"
            >
              DEMO
            </Box>
          </Box>
        </Flex>
      );

    case 4:
      // Jira-style board with 💰 on each ticket
      return (
        <Flex gap={2} h="full" overflowX="auto" css={{ "&::-webkit-scrollbar": { display: "none" } }}>
          <Box flex="0 0 130px" bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>TODO</Text>
            <Box h={7} bg="white" borderRadius="sm" mb={1} boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
            <Box h={7} bg="white" borderRadius="sm" mb={1} boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
            <Box h={7} bg="white" borderRadius="sm" boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
          </Box>
          <Box flex="0 0 130px" bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>IN PROGRESS</Text>
            <Box h={7} bg="yellow.100" borderRadius="sm" mb={1} boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
            <Box h={7} bg="yellow.100" borderRadius="sm" boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
          </Box>
          <Box flex="0 0 130px" bg="gray.100" borderRadius="md" p={2}>
            <Text fontSize="8px" color="gray.500" mb={2}>DONE</Text>
            <Box h={7} bg="green.100" borderRadius="sm" boxShadow="xs" display="flex" alignItems="center" justifyContent="flex-end" px={2}>
              <Text fontSize="lg">💰</Text>
            </Box>
          </Box>
        </Flex>
      );

    default:
      return null;
  }
}
