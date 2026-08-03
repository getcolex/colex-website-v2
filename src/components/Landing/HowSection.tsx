"use client";

import { Box, Container, Text, Flex, Grid, Heading, Link } from "@chakra-ui/react";

const steps = [
  {
    id: 1,
    title: "Ask Colex to draft the rules for your process",
    description:
      "Describe the job in plain language. Colex turns it into rules over the evidence your process already produces.",
  },
  {
    id: 2,
    title: "Review and get the rules how you want them",
    description:
      "Edit until they’re your standard. Just ask the in-Colex AI or change the rules yourself.",
  },
  {
    id: 3,
    title: "Colex builds an auditable, human-first workflow",
    description:
      "It does the work, then checks every result against your rules the same way every time. And if you want to change anything, it’s editable inline.",
  },
  {
    id: 4,
    title: "If things change, just update the rules and the workflow evolves",
    description:
      "You edit a rule. The workflow gets updated automatically and the team has it in seconds.",
  },
];

export default function HowSection() {
  return (
    <Box position="relative" py={{ base: 20, md: 28 }} bg="surface.page">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        {/* Section heading + CTA */}
        <Flex
          justify="space-between"
          align="flex-start"
          mb={{ base: 10, md: 14 }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
        >
          <Box>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              color="ink.primary"
              letterSpacing="-0.02em"
            >
              This is how Colex works for you
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="ink.muted"
              mt={{ base: 3, md: 4 }}
              maxW="640px"
            >
              We&rsquo;re building Colex so your process becomes the system, not a document people try to follow.
            </Text>
          </Box>
          <Link
            href="/demo"
            display="inline-flex"
            alignItems="center"
            bg="brand.primary"
            color="white"
            px={{ base: 4, md: 6 }}
            py={3}
            borderRadius="4px"
            fontWeight="600"
            fontSize={{ base: "sm", md: "md" }}
            textDecoration="none"
            transition="all 0.2s"
            whiteSpace="nowrap"
            mt={{ base: 0, md: 2 }}
            _hover={{
              opacity: 0.9,
              transform: "translateY(-2px)",
              textDecoration: "none",
            }}
          >
            Get to a personalised demo &rarr;
          </Link>
        </Flex>

        {/* 2x2 grid, collapses to 1 col below md */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 6, md: 8 }}
        >
          {steps.map((step) => (
            <Box
              key={step.id}
              bg="surface.raised"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.default"
              p={{ base: 5, md: 6 }}
            >
              {/* Image placeholder */}
              <Box
                data-testid="how-card-image"
                h={{ base: "180px", md: "220px" }}
                bg="surface.raised"
                border="1px solid"
                borderColor="border.subtle"
                borderRadius="lg"
                mb={{ base: 4, md: 5 }}
              />

              {/* Step label */}
              <Text
                fontSize="xs"
                fontWeight="700"
                color="ink.muted"
                letterSpacing="0.08em"
                textTransform="uppercase"
                mb={2}
              >
                STEP {step.id}
              </Text>

              {/* Card heading */}
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="600"
                color="ink.primary"
                lineHeight={1.3}
                mb={2}
              >
                {step.title}
              </Heading>

              {/* Description */}
              <Text fontSize="sm" color="ink.muted" lineHeight={1.6}>
                {step.description}
              </Text>
            </Box>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
