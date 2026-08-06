"use client";

import { Box, Container, Text, Grid, Heading } from "@chakra-ui/react";
import LedgerScatter from "./LedgerScatter";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

// Title split so one load-bearing word carries the accent italic
const cards = [
  {
    title: ["Exceptions taught it ", "nothing", ""],
    lines: [
      "Every edge case went to a person and got handled in chat.",
      "Next month the same exception showed up, and nobody remembered.",
    ],
  },
  {
    title: ["The document isn’t the ", "process", ""],
    lines: [
      "It lives in a file written months ago.",
      "The real process lives in dozens of decisions people make every day.",
    ],
  },
  {
    title: ["When something breaks, no one knows ", "where", ""],
    lines: [
      "You can see the outcome was wrong.",
      "Finding the answer means asking five people who each remember the process differently.",
    ],
  },
  {
    title: ["Change is ", "expensive", " and slow"],
    lines: [
      "One rule change touches five systems.",
      "By the time it’s live, the process has moved on.",
    ],
  },
];

export default function PainSection() {
  return (
    <Box
      as="section"
      id="why-colex"
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
      {/* Wireframe grid behind the section */}
      <LedgerScatter preset="pain" />
      {/* Dulling overlay — black on the near-black ink ground darkens it
          straight without pulling the hue toward maroon. */}
      <Box position="absolute" inset={0} pointerEvents="none" bg="rgba(0,0,0,0.35)" />
      {/* Feather grid edges into the ink bg on all 4 sides */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #1A1A1A 0%, transparent 20%, transparent 80%, #1A1A1A 100%)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #1A1A1A 0%, transparent 20%, transparent 80%, #1A1A1A 100%)",
        }}
      />
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }} position="relative" zIndex={1}>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="surface.page"
          letterSpacing="-0.02em"
          mb={{ base: 10, md: 14 }}
        >
          You wrote the process. It still isn&rsquo;t being followed.
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 4, lg: 6 }}
        >
          {cards.map((card) => (
            <Box
              key={card.title.join("")}
              bg="#242424"
              border="1px solid"
              borderColor="rgba(255,255,255,0.12)"
              borderRadius="12px"
              p={{ base: 6, md: 8 }}
            >
              <Text
                as="h3"
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="600"
                color="surface.page"
                lineHeight={1.3}
                mb={4}
              >
                {card.title[0]}
                <Box as="em" fontStyle="italic" color="#C9909F">
                  {card.title[1]}
                </Box>
                {card.title[2]}
              </Text>
              {card.lines.map((line) => (
                <Text key={line} fontSize={{ base: "sm", md: "md" }} color="border.default" mb={1.5}>
                  {line}
                </Text>
              ))}
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
