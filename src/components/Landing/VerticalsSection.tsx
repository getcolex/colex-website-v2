"use client";

import { Box, Container, Text, Flex, Link } from "@chakra-ui/react";
import { useState, useRef, useCallback, useEffect } from "react";
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

const CYCLE_INTERVAL = 4000;

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
  const [cycling, setCycling] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = "verticals-tabpanel";

  // Advance to next pill, wrapping to next vertical when exhausted
  const advance = useCallback(() => {
    setActiveTab((prevTab) => {
      const tabIdx = TAB_ITEMS.findIndex((t) => t.key === prevTab);
      const cards = VERTICALS[prevTab].cards;

      setPillSelections((prev) => {
        const currentPill = prev[prevTab];
        if (currentPill < cards.length - 1) {
          // Next pill in same vertical
          return { ...prev, [prevTab]: currentPill + 1 };
        }
        // Reset this vertical to 0, move to next vertical
        const nextTabIdx = (tabIdx + 1) % TAB_ITEMS.length;
        const nextTabKey = TAB_ITEMS[nextTabIdx].key;
        return { ...prev, [prevTab]: 0, [nextTabKey]: 0 };
      });

      const currentPill = pillSelections[prevTab];
      if (currentPill >= cards.length - 1) {
        const nextTabIdx = (tabIdx + 1) % TAB_ITEMS.length;
        return TAB_ITEMS[nextTabIdx].key;
      }
      return prevTab;
    });
  }, [pillSelections]);

  // Auto-cycle effect
  useEffect(() => {
    if (!cycling) {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
      return;
    }

    cycleTimerRef.current = setInterval(advance, CYCLE_INTERVAL);
    return () => {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, [cycling, advance]);

  // User interaction: stop cycling, resume after idle
  const handleUserInteraction = useCallback(() => {
    setCycling(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setCycling(true);
    }, 8000);
  }, []);

  // Cleanup idle timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleTabClick = useCallback(
    (key: VerticalKey) => {
      handleUserInteraction();
      setActiveTab(key);
    },
    [handleUserInteraction]
  );

  const handlePillClick = useCallback(
    (idx: number) => {
      handleUserInteraction();
      setPillSelections((prev) => ({ ...prev, [activeTab]: idx }));
    },
    [handleUserInteraction, activeTab]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Determine current index from the focused element's id, not state
      const targetId = (e.currentTarget as HTMLElement).id;
      const currentIdx = TAB_ITEMS.findIndex(
        (t) => `vertical-tab-${t.key}` === targetId
      );
      if (currentIdx === -1) return;

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
      handleUserInteraction();
      const nextKey = TAB_ITEMS[nextIdx].key;
      setActiveTab(nextKey);
      tabRefs.current[nextIdx]?.focus();
    },
    [handleUserInteraction]
  );

  const vertical = VERTICALS[activeTab];
  const cards = vertical.cards;
  const selectedPillIdx = pillSelections[activeTab];
  const activeCard = cards[selectedPillIdx];

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
        <Box textAlign="left" mb={{ base: 8, md: 12 }}>
          <Link
            href="#book-demo"
            role="button"
            display="inline-flex"
            alignItems="center"
            bg="brand.primary"
            color="white"
            px={10}
            py={7}
            borderRadius="4px"
            fontWeight="500"
            fontSize="md"
            cursor="pointer"
            textDecoration="none"
            transition="all 0.2s ease"
            _hover={{ bg: "#5a0a38", transform: "translateY(-2px)", textDecoration: "none" }}
          >
            Get a personalised live demo &rarr;
          </Link>
        </Box>

        {/* Tabs — left-aligned */}
        <Flex
          role="tablist"
          aria-label="Industry verticals"
          gap={{ base: 1, md: 2 }}
          justifyContent="flex-start"
          flexWrap="wrap"
          mb={{ base: 4, md: 6 }}
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
              onClick={() => handleTabClick(item.key)}
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
          {/* Pills — left-aligned */}
          <Flex
            gap={{ base: 2, md: 3 }}
            justifyContent="flex-start"
            flexWrap="wrap"
            mb={{ base: 6, md: 8 }}
          >
            {cards.map((card, idx) => (
              <Box
                as="button"
                key={card.name}
                onClick={() => handlePillClick(idx)}
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

          {/* Active card — left-aligned, not centered */}
          <Box
            bg="surface.raised"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="xl"
            p={{ base: 5, md: 8 }}
            maxW="640px"
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
