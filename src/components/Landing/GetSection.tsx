"use client";

import { Box, Container, Text, Flex, Grid, Heading } from "@chakra-ui/react";
import {
  SimpleInterfaceDemo,
  RewindDemo,
  AuditDemo,
  HumanJudgementDemo,
} from "./GetDemos";

const demos = [SimpleInterfaceDemo, RewindDemo, AuditDemo, HumanJudgementDemo];

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
      bg="brand.primary"
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
          gap={{ base: 8, lg: 10 }}
        >
          {cards.map((card, i) => {
            const Demo = demos[i];
            return (
              <Flex
                key={card.title}
                direction="column"
              >
                <Heading
                  as="h3"
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="600"
                  color="surface.page"
                  mb={2}
                >
                  {card.title}
                </Heading>
                <Text color="border.default" fontSize={{ base: "sm", md: "md" }} flex="1">
                  {card.description}
                </Text>
                <Box mt={{ base: 6, md: 8 }}>
                  <Demo />
                </Box>
              </Flex>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
