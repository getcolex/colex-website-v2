"use client";

import { Box, Container, Text, Grid, Flex, Image } from "@chakra-ui/react";

// Feature cards data
const features = [
  {
    id: 1,
    title: "Each task has a interface",
    description: "No more fighting google sheets",
  },
  {
    id: 2,
    title: "Reviews where needed",
    description: "The system notifies for reviews automatically",
  },
  {
    id: 3,
    title: "Full Audit Trail",
    description: "Every decision. Every approval. Logged.",
  },
];

export default function FeatureGridSection() {
  return (
    <Box
      position="relative"
      py={{ base: 20, md: 28 }}
      bg="transparent"
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8, lg: 12 }}>
        {/* 12-column grid layout */}
        <Grid
          data-testid="feature-grid"
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 10, lg: 8 }}
        >
          {/* Content spans columns 2-11 (centered) */}
          <Box
            data-testid="feature-content"
            gridColumn={{ base: "1", lg: "1 / -1" }}
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
                Colex gives the control back to you
              </Text>
            </Box>

            {/* Content area - 3 feature cards in a row */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={{ base: 4, lg: 8 }}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </Grid>
          </Box>
        </Grid>
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
      {/* Mockup area - 1.6:1 ratio (taller) */}
      <Box
        bg="gray.50"
        h={{ base: "280px", md: "320px" }}
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
      // Task inbox with expanded task UI
      return (
        <Flex h="full" gap={2}>
          {/* Task list - left side */}
          <Flex direction="column" gap={1} w="35%">
            {[
              { id: 1, name: "Invoice #1247", active: true },
              { id: 2, name: "Quote request", active: false },
              { id: 3, name: "Email draft", active: false },
            ].map((task) => (
              <Box
                key={task.id}
                bg={task.active ? "white" : "gray.100"}
                borderRadius="md"
                p={2}
                border={task.active ? "1px solid" : "none"}
                borderColor="brand.primary"
                boxShadow={task.active ? "sm" : "none"}
              >
                <Text fontSize="9px" color={task.active ? "gray.800" : "gray.500"} fontWeight={task.active ? "600" : "400"}>
                  {task.name}
                </Text>
              </Box>
            ))}
          </Flex>

          {/* Expanded task - right side */}
          <Box flex={1} bg="white" borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.200" overflow="hidden">
            {/* Task header */}
            <Box bg="gray.50" px={3} py={2} borderBottom="1px solid" borderColor="gray.100">
              <Text fontSize="10px" fontWeight="600" color="gray.700">Invoice #1247</Text>
              <Text fontSize="8px" color="gray.500">Process and approve invoice</Text>
            </Box>

            {/* Generated UI for this task */}
            <Box p={3}>
              <Box mb={2}>
                <Text fontSize="8px" color="gray.500">Vendor</Text>
                <Box bg="gray.50" borderRadius="sm" px={2} py={1} mt={0.5}>
                  <Text fontSize="9px" color="gray.800">Acme Corp</Text>
                </Box>
              </Box>
              <Flex gap={2} mb={2}>
                <Box flex={1}>
                  <Text fontSize="8px" color="gray.500">Amount</Text>
                  <Box bg="gray.50" borderRadius="sm" px={2} py={1} mt={0.5}>
                    <Text fontSize="9px" color="gray.800" fontWeight="600">$4,850</Text>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Text fontSize="8px" color="gray.500">Due</Text>
                  <Box bg="gray.50" borderRadius="sm" px={2} py={1} mt={0.5}>
                    <Text fontSize="9px" color="gray.800">Feb 15</Text>
                  </Box>
                </Box>
              </Flex>
              <Flex gap={2} mt={3}>
                <Box bg="green.500" color="white" px={2} py={1} borderRadius="md" fontSize="8px" fontWeight="500">
                  Approve
                </Box>
                <Box bg="gray.200" color="gray.600" px={2} py={1} borderRadius="md" fontSize="8px" fontWeight="500">
                  Reject
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      );

    case 2:
      // Review workflow with context
      return (
        <Flex h="full" direction="column" bg="white" borderRadius="md" boxShadow="xs" overflow="hidden">
          {/* Header */}
          <Box bg="gray.50" px={3} py={2} borderBottom="1px solid" borderColor="gray.100">
            <Flex justify="space-between" align="center">
              <Text fontSize="10px" fontWeight="600" color="gray.700">Quote Review</Text>
              <Box bg="yellow.100" px={2} py={0.5} borderRadius="full">
                <Text fontSize="8px" color="yellow.700" fontWeight="500">Pending</Text>
              </Box>
            </Flex>
          </Box>

          {/* Content preview */}
          <Box flex={1} p={3}>
            <Box bg="gray.50" borderRadius="md" p={2} mb={2}>
              <Text fontSize="8px" color="gray.500" mb={1}>Customer</Text>
              <Text fontSize="10px" color="gray.800" fontWeight="500">BlueSky Logistics</Text>
            </Box>
            <Flex gap={2} mb={2}>
              <Box bg="gray.50" borderRadius="md" p={2} flex={1}>
                <Text fontSize="8px" color="gray.500">Route</Text>
                <Text fontSize="9px" color="gray.800">SIN → LAX</Text>
              </Box>
              <Box bg="gray.50" borderRadius="md" p={2} flex={1}>
                <Text fontSize="8px" color="gray.500">Weight</Text>
                <Text fontSize="9px" color="gray.800">2,400 kg</Text>
              </Box>
            </Flex>
            <Box bg="blue.50" borderRadius="md" p={2} mb={2}>
              <Text fontSize="8px" color="blue.600" fontWeight="500">Proposed: $12,450</Text>
            </Box>
            {/* Reviewer inline */}
            <Flex align="center" gap={2}>
              <Image
                src="https://api.dicebear.com/9.x/notionists/svg?seed=Sarah"
                alt="Reviewer"
                w={5}
                h={5}
                borderRadius="full"
              />
              <Text fontSize="8px" color="gray.500">Assigned to <Text as="span" color="gray.700" fontWeight="500">Sarah</Text></Text>
            </Flex>
          </Box>

          {/* Actions */}
          <Flex gap={2} p={3} pt={0} justify="center">
            <Box bg="green.500" color="white" px={3} py={1.5} borderRadius="md" fontSize="xs" fontWeight="500">
              Approve
            </Box>
            <Box bg="red.500" color="white" px={3} py={1.5} borderRadius="md" fontSize="xs" fontWeight="500">
              Reject
            </Box>
            <Box bg="gray.200" color="gray.700" px={3} py={1.5} borderRadius="md" fontSize="xs" fontWeight="500">
              Escalate
            </Box>
          </Flex>
        </Flex>
      );

    case 3:
      // Activity feed with DiceBear avatars
      return (
        <Box h="full" bg="white" borderRadius="md" p={3} boxShadow="xs">
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontSize="xs" fontWeight="600" color="gray.700">Activity Log</Text>
            <Text fontSize="8px" color="gray.400">Today</Text>
          </Flex>
          {[
            { action: "Invoice approved", user: "John", seed: "JohnDoe", time: "2m ago", icon: "✓", iconBg: "green.100", iconColor: "green.600" },
            { action: "Quote sent to client", user: "Sarah", seed: "SarahChen", time: "15m ago", icon: "→", iconBg: "blue.100", iconColor: "blue.600" },
            { action: "Review requested", user: "System", seed: "SystemBot", time: "1h ago", icon: "!", iconBg: "yellow.100", iconColor: "yellow.600" },
            { action: "Data extracted", user: "AI", seed: "AIAgent", time: "1h ago", icon: "◉", iconBg: "purple.100", iconColor: "purple.600" },
          ].map((item, i) => (
            <Flex key={i} align="center" gap={2} mb={3} pb={3} borderBottom={i < 3 ? "1px solid" : "none"} borderColor="gray.100">
              <Image
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${item.seed}`}
                alt={item.user}
                w={8}
                h={8}
                borderRadius="full"
                bg="gray.100"
              />
              <Box flex={1}>
                <Text fontSize="10px" color="gray.800" fontWeight="500">{item.action}</Text>
                <Text fontSize="8px" color="gray.500">{item.user}</Text>
              </Box>
              <Flex direction="column" align="flex-end" gap={1}>
                <Box bg={item.iconBg} w={5} h={5} borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="10px" color={item.iconColor}>{item.icon}</Text>
                </Box>
                <Text fontSize="8px" color="gray.400">{item.time}</Text>
              </Flex>
            </Flex>
          ))}
        </Box>
      );

    default:
      return null;
  }
}
