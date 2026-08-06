"use client";

import { Box, Container, Text, Flex, Grid, Heading } from "@chakra-ui/react";
import {
  RewindDemo,
  AuditDemo,
} from "./GetDemos";
import { UpdateDemo } from "./HowDemos";
import { ConnectDemo } from "./ConnectDemo";
import LedgerScatter from "./LedgerScatter";

const cards = [
  {
    title: "Works with the tools you already use.",
    description:
      "Email, Slack, ERPs, spreadsheets. Colex reads from and writes to whatever your process already touches.",
    Demo: ConnectDemo,
  },
  {
    title: "Change a rule, the workflow catches up.",
    description:
      "Edit any rule and the running workflow updates in seconds. No rebuild, no retraining.",
    Demo: UpdateDemo,
  },
  {
    title: "Take back a decision.",
    description:
      "You approved something on Monday. On Thursday you realise it shouldn’t have been. Undo it, and everything that followed goes back into review.",
    Demo: RewindDemo,
  },
  {
    title: "Every rule and every action, written down.",
    description:
      "Every rule change, every decision, every run, kept in one place your team can open and read. Not buried inside a workflow nobody can get into.",
    Demo: AuditDemo,
  },
];

export default function GetSection() {
  return (
    <Box
      as="section"
      py={{ base: 20, md: 28 }}
      bg="brand.primary"
      data-selection="inverse"
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
          {cards.map((card) => {
            const Demo = card.Demo;
            return (
              /* Outer card: Neat bg + dimmed overlay + cream border */
              <Box
                key={card.title}
                position="relative"
                borderRadius="16px"
                border="1.5px solid"
                borderColor="rgba(248,247,244,0.25)"
                overflow="hidden"
              >
                {/* Neat wireframe */}
                <LedgerScatter preset="get" />

                {/* Maroon dim overlay on top of Neat */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="rgba(73,8,45,0.65)"
                  pointerEvents="none"
                  zIndex={0}
                />

                {/* Content */}
                <Flex
                  direction="column"
                  position="relative"
                  zIndex={1}
                  p={{ base: 5, md: 7, lg: 8 }}
                >
                  {/* Text */}
                  <Box mb={{ base: 5, md: 6 }}>
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

                  {/* Inner card: cream border, solid maroon bg, demo */}
                  <Box
                    border="1.5px solid"
                    borderColor="rgba(248,247,244,0.2)"
                    borderRadius="12px"
                    overflow="hidden"
                    bg="brand.primary"
                    aspectRatio={{ base: "4 / 5", md: "4 / 3" }}
                  >
                    <Demo />
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
