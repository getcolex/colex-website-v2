"use client";

import { Box, Container, Text, Flex, Heading, Link } from "@chakra-ui/react";

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
      "Edit until they're your standard. Just ask the in-Colex AI or change the rules yourself.",
  },
  {
    id: 3,
    title: "Colex builds an auditable, human-first workflow",
    description:
      "It does the work, then checks every result against your rules the same way every time. And if you want to change anything, it's editable inline.",
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

        {/* Full-width cards, alternating image/text sides */}
        <Flex direction="column" gap={{ base: 6, md: 8 }}>
          {steps.map((step) => {
            const isEven = step.id % 2 === 0;
            return (
              <Flex
                key={step.id}
                bg="surface.raised"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.default"
                overflow="hidden"
                direction={{ base: "column", md: isEven ? "row-reverse" : "row" }}
              >
                {/* Square image placeholder */}
                <Box
                  data-testid="how-card-image"
                  flexShrink={0}
                  w={{ base: "100%", md: "45%" }}
                  minH={{ base: "200px", md: "auto" }}
                  aspectRatio={{ base: "16 / 9", md: "1 / 1" }}
                  bg="border.subtle"
                />

                {/* Text content */}
                <Flex
                  direction="column"
                  justify="center"
                  p={{ base: 6, md: 8, lg: 10 }}
                  flex="1"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="ink.muted"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    mb={3}
                  >
                    STEP {step.id}
                  </Text>

                  <Heading
                    as="h3"
                    fontFamily="heading"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="600"
                    color="ink.primary"
                    lineHeight={1.3}
                    mb={3}
                  >
                    {step.title}
                  </Heading>

                  <Text fontSize={{ base: "sm", md: "md" }} color="ink.muted" lineHeight={1.7}>
                    {step.description}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
