"use client";

import { Box, Container, Text, Grid } from "@chakra-ui/react";

const cards = [
  {
    title: "The automation only covered the easy path",
    lines: [
      "Every exception came back to people.",
      "Every rule change meant rewriting workflows.",
    ],
  },
  {
    title: "The document isn’t the process",
    lines: [
      "It lives in a file written months ago.",
      "The real process lives in dozens of decisions people make every day.",
    ],
  },
  {
    title: "When something breaks, no one knows where",
    lines: [
      "You can see the outcome was wrong.",
      "Finding the answer means asking five people who each remember the process differently.",
    ],
  },
  {
    title: "Every change is expensive",
    lines: [
      "A new policy shouldn’t take months to reach production.",
      "Instead it means updating documents, rebuilding workflows, retraining teams, and hoping everyone switches at the same time.",
    ],
  },
];

export default function PainSection() {
  return (
    <Box as="section" py={{ base: 20, md: 28 }} bg="surface.page">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        {/* Heading */}
        <Text
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="ink.primary"
          letterSpacing="-0.02em"
          textAlign="center"
          mb={{ base: 4, md: 6 }}
        >
          You wrote the process. It still isn&rsquo;t being followed.
        </Text>

        {/* Lede */}
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="ink.muted"
          textAlign="center"
          maxW="640px"
          mx="auto"
          mb={{ base: 10, md: 14 }}
        >
          You documented the workflow. You trained the team. You even automated
          parts of it. But you are still thinking about it.
        </Text>

        {/* 2x2 card grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 4, lg: 8 }}
          mb={{ base: 10, md: 14 }}
        >
          {cards.map((card) => (
            <Box
              key={card.title}
              bg="surface.raised"
              border="1px solid"
              borderColor="border.subtle"
              borderRadius="xl"
              p={{ base: 5, md: 6 }}
            >
              <Text
                as="h3"
                fontFamily="heading"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="600"
                color="ink.primary"
                mb={3}
              >
                {card.title}
              </Text>
              {card.lines.map((line) => (
                <Text
                  key={line}
                  fontSize="sm"
                  color="ink.muted"
                  mb={1}
                >
                  {line}
                </Text>
              ))}
            </Box>
          ))}
        </Grid>

        {/* Pull quote */}
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="ink.muted"
          textAlign="center"
          fontStyle="italic"
          maxW="640px"
          mx="auto"
        >
          We&rsquo;re building Colex so your process becomes the system, not a
          document people try to follow.
        </Text>
      </Container>
    </Box>
  );
}
