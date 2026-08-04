"use client";

import { Box, Container, Flex, Link, Heading } from "@chakra-ui/react";
import { useState, useRef, useCallback, useEffect } from "react";
import VerticalDemo from "./VerticalDemo";

type VerticalKey = "freight" | "procurement" | "vendor" | "hr" | "finance";

const TAB_ITEMS: { key: VerticalKey; label: string }[] = [
  { key: "freight", label: "Freight & shipping" },
  { key: "procurement", label: "Procurement" },
  { key: "vendor", label: "Vendor management" },
  { key: "hr", label: "HR & onboarding" },
  { key: "finance", label: "Finance ops" },
];

// Human-written prompts mapped to each card index per vertical
const PROMPTS: Record<VerticalKey, string[]> = {
  freight: [
    "Book me a shipment with three valid quotes from different carriers",
    "Flag any accessorial charge we didn’t authorize before we pay it",
  ],
  procurement: [
    "Only pay this invoice if it matches the PO and we received the goods",
    "Raise a PO but make sure the budget has room and the vendor is approved",
  ],
  vendor: [
    "Onboard this vendor — check their registration and confirm bank details on a second channel",
    "A vendor wants to change bank details — make sure the right people confirm it",
  ],
  hr: [
    "Don’t let the new hire start until contract, right to work, laptop and accounts are all ready",
    "Someone’s leaving — revoke access everywhere and reconcile their final pay",
  ],
  finance: [
    "Get month-end close ready — accrue uninvoiced shipments, match bank lines, flag variances",
    "Reconcile this vendor statement against our ledger and surface anything unexplained",
  ],
};

const CYCLE_INTERVAL = 4000;

export default function VerticalsSection() {
  const [activeTab, setActiveTab] = useState<VerticalKey>("freight");
  const [promptSelections, setPromptSelections] = useState<
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

  // Advance to next prompt, wrapping to next vertical when exhausted
  const advance = useCallback(() => {
    setActiveTab((prevTab) => {
      const tabIdx = TAB_ITEMS.findIndex((t) => t.key === prevTab);
      const prompts = PROMPTS[prevTab];

      setPromptSelections((prev) => {
        const currentPrompt = prev[prevTab];
        if (currentPrompt < prompts.length - 1) {
          return { ...prev, [prevTab]: currentPrompt + 1 };
        }
        const nextTabIdx = (tabIdx + 1) % TAB_ITEMS.length;
        const nextTabKey = TAB_ITEMS[nextTabIdx].key;
        return { ...prev, [prevTab]: 0, [nextTabKey]: 0 };
      });

      const currentPrompt = promptSelections[prevTab];
      if (currentPrompt >= prompts.length - 1) {
        const nextTabIdx = (tabIdx + 1) % TAB_ITEMS.length;
        return TAB_ITEMS[nextTabIdx].key;
      }
      return prevTab;
    });
  }, [promptSelections]);

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
      setPromptSelections((prev) => ({ ...prev, [key]: 0 }));
    },
    [handleUserInteraction]
  );

  const handlePromptClick = useCallback(
    (idx: number) => {
      handleUserInteraction();
      setPromptSelections((prev) => ({ ...prev, [activeTab]: idx }));
    },
    [handleUserInteraction, activeTab]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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

  const prompts = PROMPTS[activeTab];
  const selectedIdx = promptSelections[activeTab];

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
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        pointerEvents: "none",
      }}
    >
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }} position="relative">
        {/* Heading */}
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="surface.page"
          letterSpacing="-0.02em"
          textAlign="left"
          mb={{ base: 4, md: 6 }}
        >
          For the teams that run a company day to day.
        </Heading>

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
                activeTab === item.key ? "surface.page" : "rgba(255,255,255,0.2)"
              }
              bg={activeTab === item.key ? "surface.page" : "transparent"}
              color={
                activeTab === item.key ? "ink.primary" : "surface.page"
              }
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="500"
              cursor="pointer"
              whiteSpace="nowrap"
              transition="all 0.15s ease"
              _hover={{ borderColor: "surface.page" }}
              _focus={{
                outline: "2px solid",
                outlineColor: "surface.page",
                outlineOffset: "2px",
              }}
            >
              {item.label}
            </Box>
          ))}
        </Flex>

        {/* Separator */}
        <Box
          borderTop="1px solid"
          borderColor="rgba(255,255,255,0.15)"
          mb={{ base: 4, md: 6 }}
        />

        {/* Tab panel — two columns */}
        <Flex
          role="tabpanel"
          id={panelId}
          aria-labelledby={`vertical-tab-${activeTab}`}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 10 }}
        >
          {/* Left column: Human-written prompts */}
          <Box
            flex="1"
            role="listbox"
            aria-label="Prompts"
          >
            {prompts.map((prompt, idx) => (
              <Box
                key={prompt}
                role="option"
                aria-selected={selectedIdx === idx}
                onClick={() => handlePromptClick(idx)}
                cursor="pointer"
                py={3}
                borderBottom="1px solid"
                borderColor="rgba(255,255,255,0.15)"
                transition="color 0.15s ease"
                color={selectedIdx === idx ? "surface.page" : "rgba(255,255,255,0.5)"}
                fontWeight={selectedIdx === idx ? "600" : "400"}
                fontSize={{ base: "lg", md: "xl" }}
                _hover={{ color: "surface.page" }}
              >
                &ldquo;{prompt}&rdquo;
              </Box>
            ))}

            {/* CTA */}
            <Box mt={{ base: 6, md: 8 }}>
              <Link
                href="#book-demo"
                role="button"
                display="inline-flex"
                alignItems="center"
                bg="surface.page"
                color="ink.primary"
                px={{ base: 4, md: 6 }}
                py={3}
                borderRadius="8px"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                cursor="pointer"
                textDecoration="none"
                transition="all 0.2s ease"
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                  textDecoration: "none",
                }}
              >
                Get a personalised live demo &rarr;
              </Link>
            </Box>
          </Box>

          {/* Right column: Animated demo */}
          <Box flex="1">
            <VerticalDemo activeTab={activeTab} selectedPromptIdx={selectedIdx} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
