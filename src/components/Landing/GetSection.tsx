"use client";

import { Box, Container, Text, Grid, Heading } from "@chakra-ui/react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

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
    <Box
      as="section"
      py={{ base: 20, md: 28 }}
      bg="ink.primary"
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: NOISE_SVG,
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
          color="surface.page"
          letterSpacing="-0.02em"
          mb={{ base: 10, md: 14 }}
        >
          The part automation never gave you.
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 6, lg: 8 }}
        >
          {cards.map((card) => (
            <Box
              key={card.title}
              bg="rgba(255,255,255,0.05)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.1)"
              borderRadius="xl"
              p={{ base: 5, md: 6 }}
            >
              <Box
                data-testid="card-image-placeholder"
                bg="rgba(255,255,255,0.03)"
                border="1px solid"
                borderColor="rgba(255,255,255,0.08)"
                borderRadius="lg"
                h={{ base: "180px", md: "220px" }}
                mb={{ base: 4, md: 5 }}
              />
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="600"
                color="surface.page"
                mb={2}
              >
                {card.title}
              </Heading>
              <Text color="border.default" fontSize={{ base: "sm", md: "md" }}>
                {card.description}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
