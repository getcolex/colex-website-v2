"use client";

import { Box, Container, Text, Grid, Heading } from "@chakra-ui/react";

const cards = [
  {
    title: "Simple interfaces, so your team can work with confidence",
    description:
      "The review screen comes from the same rules that run the work. Change the process, the screen changes with it.",
  },
  {
    title: "Work that rewinds when things change",
    description:
      "Customs rejects an entry on Thursday. Monday’s “done” reopens and goes back into review.",
  },
  {
    title: "All your rules written down, all action auditable",
    description:
      "Versioned, inspectable, and yours to reason over, not buried inside a workflow where nobody can find them.",
  },
  {
    title: "Human judgement everywhere you need",
    description:
      "Calls that need a person go to a person, never to a model pretending to be one.",
  },
];


export default function GetSection() {
  return (
    <Box as="section" py={{ base: 20, md: 28 }}>
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        {/* Cards heading */}
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="ink.primary"
          letterSpacing="-0.02em"
          mb={{ base: 10, md: 14 }}
        >
          The part automation never gave you.
        </Heading>

        {/* 2x2 card grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 6, lg: 8 }}
          mb={{ base: 10, md: 14 }}
        >
          {cards.map((card) => (
            <Box
              key={card.title}
              bg="surface.raised"
              borderWidth="1px"
              borderColor="border.default"
              borderRadius="xl"
              p={{ base: 5, md: 6 }}
            >
              <Box
                data-testid="card-image-placeholder"
                bg="surface.raised"
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="lg"
                h={{ base: "180px", md: "220px" }}
                mb={{ base: 4, md: 5 }}
              />
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="600"
                color="ink.primary"
                mb={2}
              >
                {card.title}
              </Heading>
              <Text color="ink.muted" fontSize={{ base: "sm", md: "md" }}>
                {card.description}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
