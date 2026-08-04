"use client";

import { Box, Container, Text, Flex, Heading } from "@chakra-ui/react";

const rows = [
  {
    label: "Your company's standards, written down",
    automation: "Scattered across scripts, docs, and people's heads.",
    colex: "One place. In your words. The thing the work is measured against.",
  },
  {
    label: "A record of every past judgement",
    automation: "Run logs. Green or red, no reasoning.",
    colex: "What was decided, on what evidence, by whom.",
  },
  {
    label: "Standards that get sharper with use",
    automation: "The script does exactly what it did on day one.",
    colex: "Every exception teaches you what the rule was missing.",
  },
  {
    label: "An answer for the auditor",
    automation: "“That’s how it’s always run.”",
    colex: "The rule, the evidence, the person who signed it off.",
  },
  {
    label: "A process anyone can pick up",
    automation: "A half-written doc and whoever remembers.",
    colex: "They read the rules. The rules are the process.",
  },
  {
    label: "Books that stay honest after the fact",
    automation: "The run went green on Monday. Nothing left to reopen.",
    colex: "Thursday’s customs rejection reopens Monday’s “done”.",
  },
];

function RedX() {
  return (
    <Flex
      w="22px"
      h="22px"
      borderRadius="full"
      bg="#EF4444"
      align="center"
      justify="center"
      flexShrink={0}
    >
      <Text fontSize="12px" color="white" lineHeight="1" fontWeight="700">&times;</Text>
    </Flex>
  );
}

function GreenCheck() {
  return (
    <Flex
      w="22px"
      h="22px"
      borderRadius="full"
      bg="#10B981"
      align="center"
      justify="center"
      flexShrink={0}
    >
      <Text fontSize="12px" color="white" lineHeight="1" fontWeight="700">&#x2713;</Text>
    </Flex>
  );
}

export default function MomentsSection() {
  return (
    <Box
      as="section"
      py={{ base: 20, md: 28 }}
      bg="#EDE9E3"
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        pointerEvents: "none",
      }}
    >
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }} position="relative">
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="ink.primary"
          letterSpacing="-0.02em"
          mb={{ base: 4, md: 6 }}
        >
          Six months in, you own something.
        </Heading>

        <Text
          color="ink.muted"
          fontSize={{ base: "md", md: "lg" }}
          mb={{ base: 10, md: 16 }}
          maxW="640px"
        >
          Other automation tools leave you with rigid workflows which decay. Colex grows with you continuously.
        </Text>

        {/* ── Desktop layout ── */}
        <Box display={{ base: "none", md: "block" }}>
          {/* Header row */}
          <Flex>
            <Box flex="1" px={6} pb={4}>
              {/* empty — label column has no header */}
            </Box>
            <Box flex="1" px={6} pb={4}>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="#EF4444"
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={3}
              >
                With automation
              </Text>
              <Box h="2px" bg="#EF4444" opacity={0.3} />
            </Box>
            <Box
              flex="1"
              px={6}
              pb={4}
              pt={5}
              bg="rgba(16,185,129,0.08)"
              borderRadius="12px 12px 0 0"
            >
              <Text
                fontSize="xs"
                fontWeight="700"
                color="#10B981"
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={3}
              >
                With Colex
              </Text>
              <Box h="2px" bg="#10B981" opacity={0.3} />
            </Box>
          </Flex>

          {/* Data rows */}
          {rows.map((row, i) => (
            <Flex key={i}>
              {/* Label */}
              <Flex flex="1" px={6} py={5} align="center">
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="ink.primary"
                  textTransform="uppercase"
                  letterSpacing="0.04em"
                  lineHeight="1.5"
                >
                  {row.label}
                </Text>
              </Flex>

              {/* Automation */}
              <Flex flex="1" px={6} py={5} align="center">
                <Flex align="flex-start" gap={3}>
                  <Box pt={0.5}><RedX /></Box>
                  <Text fontSize="sm" color="ink.muted" lineHeight="1.6">
                    {row.automation}
                  </Text>
                </Flex>
              </Flex>

              {/* Colex */}
              <Flex
                flex="1"
                px={6}
                py={5}
                align="center"
                bg="rgba(16,185,129,0.08)"
                {...(i === rows.length - 1 ? { borderRadius: "0 0 12px 12px" } : {})}
              >
                <Flex align="flex-start" gap={3}>
                  <Box pt={0.5}><GreenCheck /></Box>
                  <Text fontSize="sm" color="ink.primary" fontWeight="600" lineHeight="1.6">
                    {row.colex}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Box>

        {/* ── Mobile layout: 2 columns, no labels ── */}
        <Box display={{ base: "block", md: "none" }}>
          <Flex gap={4} mb={6}>
            <Box flex="1">
              <Text fontSize="xs" fontWeight="700" color="#EF4444" textTransform="uppercase" letterSpacing="0.08em" mb={2}>
                Automation
              </Text>
              <Box h="2px" bg="#EF4444" opacity={0.3} />
            </Box>
            <Box flex="1">
              <Text fontSize="xs" fontWeight="700" color="#10B981" textTransform="uppercase" letterSpacing="0.08em" mb={2}>
                Colex
              </Text>
              <Box h="2px" bg="#10B981" opacity={0.3} />
            </Box>
          </Flex>

          {rows.map((row, i) => (
            <Flex
              key={i}
              gap={4}
              py={4}
              borderBottom={i < rows.length - 1 ? "1px solid" : "none"}
              borderColor="rgba(0,0,0,0.06)"
            >
              <Box flex="1">
                <Flex align="flex-start" gap={2}>
                  <Box pt={0.5}><RedX /></Box>
                  <Text fontSize="sm" color="ink.muted" lineHeight="1.5">
                    {row.automation}
                  </Text>
                </Flex>
              </Box>
              <Box flex="1">
                <Flex align="flex-start" gap={2}>
                  <Box pt={0.5}><GreenCheck /></Box>
                  <Text fontSize="sm" color="ink.primary" fontWeight="600" lineHeight="1.5">
                    {row.colex}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
