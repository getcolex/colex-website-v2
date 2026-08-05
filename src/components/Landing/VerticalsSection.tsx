"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import VerticalDemo from "./VerticalDemo";
import dynamic from "next/dynamic";

const WireframeGrid = dynamic(() => import("./WireframeGrid"), { ssr: false });

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

const DESCRIPTIONS: Record<VerticalKey, string> = {
  freight: "Book carriers, chase quotes and catch surprise charges before they ever reach your invoice queue.",
  procurement: "Raise POs and pay invoices only when the budget, the goods and the paperwork all agree.",
  vendor: "Onboard new suppliers and confirm every bank-detail change on a second channel before money moves.",
  hr: "Get new hires ready on day one and revoke every account the moment someone leaves.",
  finance: "Close the month faster with automatic accruals, matched bank lines and variance flags you can trust.",
};

const CYCLE_INTERVAL = 4000;

type FlatPrompt = {
  tabKey: VerticalKey;
  tabIdx: number;
  promptIdx: number;
  text: string;
  // Index of the FIRST flat entry belonging to this tab — used when a pill
  // tap should scroll the carousel to the start of that tab.
  firstOfTabFlatIdx: number;
};

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
  const tabScrollerRef = useRef<HTMLDivElement | null>(null);
  const panelId = "verticals-tabpanel";

  // Mobile flat carousel: one row of ALL prompts across ALL tabs. The active
  // tab + selected prompt are DERIVED from which card is snapped into view
  // (IntersectionObserver). There is intentionally no cross-tab shim, no
  // scrollLeft resetting between tabs, and no per-tab sub-carousel — swipe
  // just keeps going and the pill row above rerenders to match.
  //
  // IMPORTANT: this section must never scroll the page programmatically.
  // Tapping a pill scrolls the CAROUSEL container only, and only in direct
  // response to a click (a user gesture). No scrollIntoView anywhere.
  const promptScrollerRef = useRef<HTMLDivElement | null>(null);
  const promptCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Flattened prompts list for the mobile carousel.
  const flatPrompts: FlatPrompt[] = useMemo(() => {
    const out: FlatPrompt[] = [];
    // First-of-tab flat indices, computed as we go.
    const firstOfTab: Record<string, number> = {};
    TAB_ITEMS.forEach((item, tabIdx) => {
      firstOfTab[item.key] = out.length;
      PROMPTS[item.key].forEach((text, promptIdx) => {
        out.push({
          tabKey: item.key,
          tabIdx,
          promptIdx,
          text,
          firstOfTabFlatIdx: firstOfTab[item.key],
        });
      });
    });
    return out;
  }, []);

  // Advance to next prompt, wrapping to next vertical when exhausted (desktop)
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

  // Mobile: the swipe carousel owns the selection, so the auto-cycle must
  // not run there.
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobileViewport(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Auto-cycle effect (desktop only)
  useEffect(() => {
    if (!cycling || isMobileViewport) {
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
  }, [cycling, advance, isMobileViewport]);

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

  // Track which flat card is centered — mobile only. This drives both:
  // (a) which tab pill is highlighted, and (b) which cards are close enough
  // to be "live" (mount their VerticalDemo). Off-screen cards render a
  // same-size placeholder so layout doesn't jump.
  const [centeredFlatIdx, setCenteredFlatIdx] = useState(0);

  useEffect(() => {
    if (!isMobileViewport) return;
    const scroller = promptScrollerRef.current;
    if (!scroller || typeof IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio as "centered".
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;

        const idx = promptCardRefs.current.findIndex(
          (el) => el === mostVisible.target
        );
        if (idx === -1) return;

        setCenteredFlatIdx(idx);
      },
      { root: scroller, threshold: [0.5, 0.75] }
    );

    promptCardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobileViewport]);

  // Mirror the centered flat card into the shared activeTab/promptSelections
  // state so the pill row + a11y stay in sync on mobile.
  useEffect(() => {
    if (!isMobileViewport) return;
    const entry = flatPrompts[centeredFlatIdx];
    if (!entry) return;
    setActiveTab((prev) => (prev === entry.tabKey ? prev : entry.tabKey));
    setPromptSelections((prev) =>
      prev[entry.tabKey] === entry.promptIdx
        ? prev
        : { ...prev, [entry.tabKey]: entry.promptIdx }
    );
  }, [centeredFlatIdx, flatPrompts, isMobileViewport]);

  // Keep the active pill scrolled into view within the pill row itself as
  // the active tab changes (via swipe or pill tap). Never scrollIntoView —
  // that would walk up and scroll the page too.
  useEffect(() => {
    if (!isMobileViewport) return;
    const scroller = tabScrollerRef.current;
    const idx = TAB_ITEMS.findIndex((t) => t.key === activeTab);
    const btn = tabRefs.current[idx];
    if (!scroller || !btn) return;
    // Center the active pill in the scroller viewport when possible.
    const target = btn.offsetLeft - (scroller.clientWidth - btn.clientWidth) / 2;
    const clamped = Math.max(0, Math.min(target, scroller.scrollWidth - scroller.clientWidth));
    scroller.scrollTo({ left: clamped, behavior: "smooth" });
  }, [activeTab, isMobileViewport]);

  const handleTabClick = useCallback(
    (key: VerticalKey) => {
      handleUserInteraction();
      setActiveTab(key);
      setPromptSelections((prev) => ({ ...prev, [key]: 0 }));

      // On mobile, tapping a pill smooth-scrolls the CAROUSEL (not the page)
      // to that tab's first flat card. Direct user gesture -> smooth scroll
      // on the carousel container is fine.
      if (isMobileViewport) {
        const firstIdx = flatPrompts.findIndex((p) => p.tabKey === key);
        const target = promptCardRefs.current[firstIdx];
        const scroller = promptScrollerRef.current;
        if (target && scroller) {
          const targetLeft = target.offsetLeft - scroller.offsetLeft;
          scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
        }
      }
    },
    [handleUserInteraction, isMobileViewport, flatPrompts]
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

  const desktopPrompts = PROMPTS[activeTab];
  const desktopSelectedIdx = promptSelections[activeTab];

  // Which flat cards are "close enough" to be live (mount their demo). The
  // centered one + its immediate neighbors, so the demo is already running
  // as the card snaps in — no pop from placeholder to content.
  const isLive = (flatIdx: number) => Math.abs(flatIdx - centeredFlatIdx) <= 1;

  // Prompts belonging to the currently-active tab, used to render the dots
  // (dots count within-tab, not across all flat entries).
  const activeTabPrompts = PROMPTS[activeTab];
  const activeTabSelectedIdx = promptSelections[activeTab];

  return (
    <Box
      as="section"
      id="use-cases"
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

        {/* Tabs — single swipeable row on mobile, wrapping row on desktop.
            The pill row also mirrors which tab the carousel is currently
            on: when the active tab changes (swipe or tap), the active pill
            smooth-scrolls into view WITHIN this row only. */}
        <Box position="relative" mb={{ base: 4, md: 6 }}>
          <Flex
            ref={tabScrollerRef}
            role="tablist"
            aria-label="Industry verticals"
            gap={2}
            justifyContent="flex-start"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            overflowX={{ base: "auto", md: "visible" }}
            css={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
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
                flexShrink={0}
                transition="all 0.2s ease"
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
          {/* Edge fade hint — mobile only, to signal the row scrolls */}
          <Box
            display={{ base: "block", md: "none" }}
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            w="24px"
            pointerEvents="none"
            bgGradient="linear(to-r, transparent, ink.primary)"
          />
        </Box>

        {/* Tab panel.

            Desktop (md+): unchanged two columns — text list on the left,
            one shared demo on the right.

            Mobile (base): one FLAT scroll-snap carousel of every prompt
            across every tab (5 × 2 = 10 cards). Swipe just keeps going;
            tabs are a readout above driven by which card is centered. Live
            cards (the centered one + immediate neighbors) mount their
            VerticalDemo so the demo is already running when the card snaps
            in; far-away cards render a same-size placeholder to keep
            layout stable without running N animation timers. Dots below
            reflect progress within the CURRENT tab only. */}
        <Flex
          role="tabpanel"
          id={panelId}
          aria-labelledby={`vertical-tab-${activeTab}`}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 10 }}
        >
          {/* Left column (desktop) / whole carousel (mobile) */}
          <Box flex="1">
            {/* MOBILE: flat carousel across all tabs */}
            <Box
              display={{ base: "block", md: "none" }}
            >
              <Text
                color="rgba(255,255,255,0.7)"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.5"
                fontWeight="400"
                mb={4}
              >
                {DESCRIPTIONS[activeTab]}
              </Text>
              <Box
                ref={promptScrollerRef}
                role="listbox"
                aria-label="Prompts"
                display="flex"
                overflowX="auto"
                css={{
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {flatPrompts.map((entry, flatIdx) => {
                  const isCentered = flatIdx === centeredFlatIdx;
                  return (
                    <Box
                      key={`${entry.tabKey}-${entry.promptIdx}`}
                      ref={(el: HTMLDivElement | null) => {
                        promptCardRefs.current[flatIdx] = el;
                      }}
                      role="option"
                      aria-selected={isCentered}
                      flexShrink={0}
                      w="88%"
                      mr={4}
                      css={{ scrollSnapAlign: "start" }}
                      bg="rgba(255,255,255,0.04)"
                      border="1px solid"
                      borderColor={
                        isCentered
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.1)"
                      }
                      borderRadius="16px"
                      p={4}
                      transition="border-color 0.2s ease"
                    >
                      <Box
                        color={isCentered ? "surface.page" : "rgba(255,255,255,0.55)"}
                        fontWeight={isCentered ? "600" : "400"}
                        fontSize="lg"
                        transition="color 0.2s ease"
                        mb={4}
                      >
                        &ldquo;{entry.text}&rdquo;
                      </Box>

                      <Box position="relative" borderRadius="12px">
                        {isLive(flatIdx) ? (
                          <VerticalDemo
                            activeTab={entry.tabKey}
                            selectedPromptIdx={entry.promptIdx}
                          />
                        ) : (
                          <Box aspectRatio="3 / 4" w="100%" />
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Dot indicators — within CURRENT tab only */}
              <Flex justifyContent="center" gap={2} mt={3}>
                {activeTabPrompts.map((prompt, idx) => (
                  <Box
                    key={prompt}
                    as="span"
                    w={activeTabSelectedIdx === idx ? "16px" : "6px"}
                    h="6px"
                    borderRadius="full"
                    bg={activeTabSelectedIdx === idx ? "surface.page" : "rgba(255,255,255,0.25)"}
                    transition="all 0.2s ease"
                  />
                ))}
              </Flex>
            </Box>

            {/* DESKTOP: text list */}
            <Box display={{ base: "none", md: "block" }} data-testid="verticals-desktop-list" role="listbox" aria-label="Prompts (desktop)">
              <Text
                color="rgba(255,255,255,0.7)"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.5"
                fontWeight="400"
                mb={4}
              >
                {DESCRIPTIONS[activeTab]}
              </Text>
              {desktopPrompts.map((prompt, idx) => (
                <Box
                  key={prompt}
                  role="option"
                  aria-selected={desktopSelectedIdx === idx}
                  onClick={() => handlePromptClick(idx)}
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.15)"
                  py={3}
                >
                  <Box
                    color={desktopSelectedIdx === idx ? "surface.page" : "rgba(255,255,255,0.5)"}
                    fontWeight={desktopSelectedIdx === idx ? "600" : "400"}
                    fontSize="xl"
                    transition="color 0.15s ease"
                    _hover={{ color: "surface.page" }}
                  >
                    &ldquo;{prompt}&rdquo;
                  </Box>
                </Box>
              ))}
            </Box>

            {/* CTA */}
            <Box mt={{ base: 6, md: 8 }}>
              <Box
                as="button"
                onClick={() => getEarlyAccess("verticals_section")}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: "full", md: "auto" }}
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
                Get a personalised demo &rarr;
              </Box>
            </Box>
          </Box>

          {/* Right column: shared demo — desktop only. */}
          <Box
            display={{ base: "none", md: "block" }}
            flex="1"
            position="relative"
            p={{ md: 8, lg: 10 }}
            borderRadius="20px"
          >
            <WireframeGrid preset="verticals" lineColor="#F8F7F4" />
            {/* Feather edges into section bg */}
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
                background: "linear-gradient(to right, #1A1A1A 0%, transparent 25%, transparent 75%, #1A1A1A 100%)",
              }}
              _after={{
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #1A1A1A 0%, transparent 25%, transparent 75%, #1A1A1A 100%)",
              }}
            />
            <Box position="relative" zIndex={1} bg="#1A1A1A" borderRadius="12px">
              <VerticalDemo activeTab={activeTab} selectedPromptIdx={desktopSelectedIdx} />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
