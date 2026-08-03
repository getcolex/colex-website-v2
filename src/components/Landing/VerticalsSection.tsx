"use client";

import { Box, Container, Text, Flex, Link } from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import { VERTICALS } from "./data/wireframe";

type VerticalKey = keyof typeof VERTICALS;

const TAB_ITEMS: { key: VerticalKey; label: string }[] = [
  { key: "freight", label: "Freight & shipping" },
  { key: "procurement", label: "Procurement" },
  { key: "vendor", label: "Vendor management" },
  { key: "hr", label: "HR & onboarding" },
  { key: "finance", label: "Finance ops" },
];

const STATUS_MARKS: Record<string, { symbol: string; color: string }> = {
  ok: { symbol: "✓", color: "status.success" },
  wait: { symbol: "○", color: "ink.muted" },
  late: { symbol: "◷", color: "status.warning" },
};

export default function VerticalsSection() {
  const [activeTab, setActiveTab] = useState<VerticalKey>("freight");
  const [pillSelections, setPillSelections] = useState<
    Record<VerticalKey, number>
  >({
    freight: 0,
    procurement: 0,
    vendor: 0,
    hr: 0,
    finance: 0,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = "verticals-tabpanel";

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIdx = TAB_ITEMS.findIndex((t) => t.key === activeTab);
      let nextIdx = currentIdx;

      if (e.key === "ArrowRight") {
        nextIdx = (currentIdx + 1) % TAB_ITEMS.length;
      } else if (e.key === "ArrowLeft") {
        nextIdx =
          (currentIdx - 1 + TAB_ITEMS.length) % TAB_ITEMS.length;
      } else {
        return;
      }

      e.preventDefault();
      const nextKey = TAB_ITEMS[nextIdx].key;
      setActiveTab(nextKey);
      tabRefs.current[nextIdx]?.focus();
    },
    [activeTab]
  );

  const vertical = VERTICALS[activeTab];
  const cards = vertical.cards;
  const selectedPillIdx = pillSelections[activeTab];
  const activeCard = cards[selectedPillIdx];

  const selectPill = (idx: number) => {
    setPillSelections((prev) => ({ ...prev, [activeTab]: idx }));
  };

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
          For the teams that run a company day to day.
        </Text>

        {/* CTA */}
        <Text textAlign="left" mb={{ base: 8, md: 12 }}>
          <Link
            href="#book-demo"
            color="ink.primary"
            fontWeight="500"
            fontSize={{ base: "md", md: "lg" }}
            textDecoration="underline"
            _hover={{ color: "ink.muted" }}
          >
            Get a personalised live demo &rarr;
          </Link>
        </Text>

        {/* Tabs */}
        <Flex
          role="tablist"
          aria-label="Industry verticals"
          gap={{ base: 1, md: 2 }}
          justifyContent="center"
          flexWrap="wrap"
          mb={{ base: 6, md: 8 }}
          overflowX="auto"
        >
          {TAB_ITEMS.map((item, idx) => (
            <Box
              as="button"
              key={item.key}
              role="tab"
              id={`vertical-tab-${item.key}`}
              aria-selected={activeTab === item.key}
              aria-controls={panelId}
              tabIndex={activeTab === item.key ? 0 : -1}
              ref={(el: HTMLButtonElement | null) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => setActiveTab(item.key)}
              onKeyDown={handleTabKeyDown}
              px={{ base: 3, md: 5 }}
              py={{ base: 2, md: 2.5 }}
              borderRadius="full"
              border="1px solid"
              borderColor={
                activeTab === item.key ? "ink.primary" : "border.default"
              }
              bg={activeTab === item.key ? "ink.primary" : "surface.raised"}
              color={
                activeTab === item.key ? "surface.raised" : "ink.primary"
              }
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="500"
              cursor="pointer"
              whiteSpace="nowrap"
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
        <Box
          role="tabpanel"
          id={panelId}
          aria-labelledby={`vertical-tab-${activeTab}`}
        >
          {/* Pills */}
          <Flex
            gap={{ base: 2, md: 3 }}
            justifyContent="center"
            flexWrap="wrap"
            mb={{ base: 6, md: 8 }}
          >
            {cards.map((card, idx) => (
              <Box
                as="button"
                key={card.name}
                onClick={() => selectPill(idx)}
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                borderRadius="lg"
                border="1px solid"
                borderColor={
                  selectedPillIdx === idx ? "ink.primary" : "border.subtle"
                }
                bg={
                  selectedPillIdx === idx ? "surface.raised" : "transparent"
                }
                color="ink.primary"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={selectedPillIdx === idx ? "600" : "400"}
                cursor="pointer"
                transition="all 0.15s ease"
                _hover={{ borderColor: "border.default" }}
              >
                {card.name}
              </Box>
            ))}
          </Flex>

          {/* Active card */}
          <Box
            bg="surface.raised"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="xl"
            p={{ base: 5, md: 8 }}
            maxW="640px"
            mx="auto"
          >
            <Text
              as="h3"
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="600"
              color="ink.primary"
              mb={1}
            >
              {activeCard.name}
            </Text>
            <Text fontSize="sm" color="ink.muted" mb={1}>
              {activeCard.sub}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="ink.primary"
              fontWeight="500"
              mb={4}
            >
              Goal: {activeCard.goal}
            </Text>

            {/* Rules */}
            <Box as="ul" listStyleType="none" pl={0} mb={4}>
              {activeCard.rules.map((rule, idx) => {
                const [status, text] = rule;
                const mark = STATUS_MARKS[status] || STATUS_MARKS.wait;
                return (
                  <Flex
                    as="li"
                    key={idx}
                    gap={2}
                    mb={2}
                    alignItems="flex-start"
                  >
                    <Text
                      color={mark.color}
                      fontSize="md"
                      fontWeight="600"
                      flexShrink={0}
                      lineHeight="1.5"
                    >
                      {mark.symbol}
                    </Text>
                    <Text fontSize="sm" color="ink.muted" lineHeight="1.5">
                      {text}
                    </Text>
                  </Flex>
                );
              })}
            </Box>

            {/* Footer */}
            <Text fontSize="xs" color="ink.muted" fontStyle="italic">
              {activeCard.ft}
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
