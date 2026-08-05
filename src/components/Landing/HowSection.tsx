"use client";

import { Box, Container, Text, Flex, Heading } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import { CreateDemo, ViewDemo, RunDemo } from "./HowDemos";
import dynamic from "next/dynamic";

const WireframeGrid = dynamic(() => import("./WireframeGrid"), { ssr: false });

const steps = [
  {
    id: 1,
    title: "Ask Colex to draft the rules in plain English",
    description:
      "Colex turns it into rules over the evidence your process already produces.",
  },
  {
    id: 2,
    title: "Colex builds the interface from the rules for your team",
    description:
      "Colex generates forms, tables, and views from the checks you defined. Your team can edit anything in it, and it updates when the rules change.",
  },
  {
    id: 3,
    title: "Colex does the work, your team verifies",
    description:
      "Data fills in as Colex works. Your team reviews it, edits what needs editing, and approves when it looks right.",
  },
];

export default function HowSection() {
  return (
    <Box
      position="relative"
      py={{ base: 20, md: 28 }}
      bg="surface.page"
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
              lineHeight={1.15}
              maxW="900px"
            >
              You decide how it&rsquo;s done. Colex makes sure it gets done.
            </Heading>
          </Box>
          <Box
            as="button"
            onClick={() => getEarlyAccess("how_section")}
            cursor="pointer"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: "full", md: "auto" }}
            bg="brand.primary"
            color="white"
            px={{ base: 4, md: 6 }}
            py={3}
            borderRadius="8px"
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
            Get a personalised demo &rarr;
          </Box>
        </Flex>

        {/* Alternating rows — text on bg, demo in bordered card */}
        <Flex direction="column" gap={{ base: 12, md: 20 }}>
          {steps.map((step) => {
            const isEven = step.id % 2 === 0;
            return (
              <Flex
                key={step.id}
                direction={{ base: "column", md: isEven ? "row-reverse" : "row" }}
                align="center"
                gap={{ base: 6, md: 10, lg: 14 }}
                pb={{ base: step.id !== steps.length ? 6 : 0, md: 0 }}
                borderBottom={{ base: step.id !== steps.length ? "1px solid" : "none", md: "none" }}
                borderColor="border.default"
              >
                {/* Demo card with thick border + decorative bg */}
                <Box
                  data-testid="how-card-image"
                  flexShrink={0}
                  w={{ base: "100%", md: "50%" }}
                  position="relative"

                  /* Phones have no wireframe grid behind the card, so no
                     decorative inset either — the card spans the same width
                     as the text column (page margins only). */
                  p={{ base: 0, md: 10, lg: 12 }}
                  borderRadius="20px"
                >
                  {/* Neat animated gradient behind card */}
                  <WireframeGrid preset="how" />
                  {/* Feather edges into page bg */}
                  <Box
                    position="absolute"
                    inset={0}
                    borderRadius="inherit"
                    pointerEvents="none"
                    zIndex={0}
                    _before={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to right, #F8F7F4 0%, transparent 25%, transparent 75%, #F8F7F4 100%)",
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, #F8F7F4 0%, transparent 25%, transparent 75%, #F8F7F4 100%)",
                    }}
                  />
                  <Box
                    position="relative"
                    border="2px solid"
                    borderColor="border.default"
                    borderRadius="12px"
                    overflow="hidden"
                    bg="surface.raised"
                    boxShadow="0 8px 32px rgba(0,0,0,0.08)"
                    aspectRatio={{ base: "4 / 5", md: "4 / 3" }}
                    zIndex={1}
                  >
                    {step.id === 1 && <CreateDemo />}
                    {step.id === 2 && <ViewDemo />}
                    {step.id === 3 && <RunDemo />}
                  </Box>
                </Box>

                {/* Text content — sits on section bg */}
                <Flex
                  direction="column"
                  justify="center"
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
                    {["Create", "View", "Run"][step.id - 1]}
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
