"use client";

import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import { CASES } from "./data/wireframe";

type CaseKey = keyof typeof CASES;

const PICKER_ITEMS: { key: CaseKey; label: string }[] = [
  { key: "freight", label: "Booking a shipment" },
  { key: "invoice", label: "Paying an invoice" },
  { key: "hire", label: "Starting a new hire" },
];

export default function ShiftSection() {
  const [selected, setSelected] = useState<CaseKey>("hire");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = "shift-tabpanel";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIdx = PICKER_ITEMS.findIndex((p) => p.key === selected);
      let nextIdx = currentIdx;

      if (e.key === "ArrowRight") {
        nextIdx = (currentIdx + 1) % PICKER_ITEMS.length;
      } else if (e.key === "ArrowLeft") {
        nextIdx =
          (currentIdx - 1 + PICKER_ITEMS.length) % PICKER_ITEMS.length;
      } else {
        return;
      }

      e.preventDefault();
      const nextKey = PICKER_ITEMS[nextIdx].key;
      setSelected(nextKey);
      tabRefs.current[nextIdx]?.focus();
    },
    [selected]
  );

  const activeCase = CASES[selected];

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
          textAlign="left"
          mb={{ base: 4, md: 6 }}
        >
          Stop writing the steps. Just write the rules you care about.
        </Text>

        {/* Lede */}
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="ink.muted"
          textAlign="left"
          maxW="640px"
          mb={{ base: 8, md: 12 }}
        >
          You own what &ldquo;done&rdquo; means. Colex works out how.
        </Text>

        {/* Tab picker */}
        <Flex
          role="tablist"
          aria-label="Use case picker"
          gap={{ base: 2, md: 3 }}
          justifyContent="flex-start"
          flexWrap="wrap"
          mb={{ base: 8, md: 10 }}
        >
          {PICKER_ITEMS.map((item, idx) => (
            <Box
              as="button"
              key={item.key}
              role="tab"
              id={`shift-tab-${item.key}`}
              aria-selected={selected === item.key}
              aria-controls={panelId}
              tabIndex={selected === item.key ? 0 : -1}
              ref={(el: HTMLButtonElement | null) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => setSelected(item.key)}
              onKeyDown={handleKeyDown}
              px={{ base: 4, md: 6 }}
              py={{ base: 2, md: 3 }}
              borderRadius="full"
              border="1px solid"
              borderColor={
                selected === item.key ? "ink.primary" : "border.default"
              }
              bg={selected === item.key ? "ink.primary" : "surface.raised"}
              color={selected === item.key ? "surface.raised" : "ink.primary"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="500"
              cursor="pointer"
              transition="all 0.15s ease"
              _hover={{
                borderColor: "ink.primary",
              }}
              _focus={{
                outline: "2px solid",
                outlineColor: "ink.primary",
                outlineOffset: "2px",
              }}
            >
              {item.label}
            </Box>
          ))}
        </Flex>

        {/* Tab panel */}
        <Flex
          role="tabpanel"
          id={panelId}
          aria-labelledby={`shift-tab-${selected}`}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 8 }}
        >
          {/* Left column: Steps */}
          <Box flex="1">
            <Text
              fontFamily="heading"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="600"
              color="ink.primary"
              mb={4}
            >
              How you do it today
            </Text>
            <Box as="ol" pl={5} listStyleType="decimal">
              {activeCase.steps.map((step, idx) => (
                <Box
                  as="li"
                  key={idx}
                  fontSize={{ base: "sm", md: "md" }}
                  color="ink.muted"
                  mb={2}
                >
                  {step}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right column: Condition */}
          <Box flex="1">
            <Text
              fontFamily="heading"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="600"
              color="ink.primary"
              mb={4}
            >
              Just ask Colex for
            </Text>
            <Box
              bg="surface.raised"
              border="1px solid"
              borderColor="border.subtle"
              borderRadius="12px"
              p={{ base: 5, md: 6 }}
            >
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="ink.primary"
                fontStyle="italic"
              >
                {activeCase.cond}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
