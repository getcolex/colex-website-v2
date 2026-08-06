"use client";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import { useState, useRef, useCallback, useEffect } from "react";
import VerticalDemo from "./VerticalDemo";
import LedgerScatter from "./LedgerScatter";

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

  // Mobile pill row: single swipeable row (no programmatic scrolling — see
  // below, the page must never be scrolled by this section).
  const tabScrollerRef = useRef<HTMLDivElement | null>(null);

  // Mobile prompt carousel: scroll-snap track + per-card refs. Each card
  // hosts its own text + demo animation. An IntersectionObserver watches
  // which card is snapped into view and uses that to drive activeTab /
  // selectedIdx on mobile — swipes are the sole source of truth there.
  // IMPORTANT: this section must never programmatically scroll anything —
  // no element.scrollIntoView (it walks up and scrolls ALL scrollable
  // ancestors, including the document, which was previously yanking the
  // whole page down to this section whenever the demo auto-cycle advanced).
  // There is intentionally no auto-scroll-to-selection effect below.
  const promptScrollerRef = useRef<HTMLDivElement | null>(null);
  const promptCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cross-tab swipe: swiping past the last card of a tab advances to the
  // next tab's first card (and, mirrored, swiping past the first card goes
  // to the previous tab's last card). Detected via touch delta rather than
  // scroll position alone — an onScroll-only check fires spuriously (e.g.
  // rubber-band bounce). We track the touch start X + the scroller's
  // scrollLeft at touchstart, and on touchend look at whether the user was
  // already at (or within a few px of) the scroll boundary AND dragged
  // further past it by more than a small threshold. A ref-based cooldown
  // debounces so one gesture only ever advances one tab.
  const touchStateRef = useRef<{ startX: number; atMax: boolean; atMin: boolean } | null>(null);
  const tabAdvanceCooldownRef = useRef(false);
  const SWIPE_THRESHOLD = 40; // px of further drag past the boundary to count as intent

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

  // Mobile: the swipe carousel owns the selection, so the auto-cycle must
  // not run there — advancing the selection unmounts the demo inside the
  // card the user is looking at (it goes blank while the next card starts).
  // The visible card's demo just keeps looping instead.
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

  // Each mobile card renders its own VerticalDemo, so only the card the user
  // has swiped to needs to actually be selected/animating. An
  // IntersectionObserver watches the cards inside the scroller and, when a
  // swipe settles a new card into view (>=60% visible), promotes it to the
  // active prompt. This makes swiping itself the interaction — no click
  // needed — and naturally wins over auto-cycle because it re-marks
  // "user scrolled" whenever the observer fires from a real scroll.
  useEffect(() => {
    const scroller = promptScrollerRef.current;
    if (!scroller || typeof IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;

        const idx = promptCardRefs.current.findIndex(
          (el) => el === mostVisible.target
        );
        if (idx === -1) return;

        setPromptSelections((prev) =>
          prev[activeTab] === idx ? prev : { ...prev, [activeTab]: idx }
        );
      },
      { root: scroller, threshold: [0.6] }
    );

    promptCardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // Re-observe whenever the active vertical changes (card refs get
    // replaced since each vertical renders its own set of prompt cards).
  }, [activeTab]);

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

  // Advance/retreat the active tab in response to a cross-tab swipe gesture.
  // Resets the carousel container (only) to its boundary card with an
  // INSTANT scroll — never smooth, never the page. This is always called
  // synchronously from a touch handler, i.e. in direct response to user
  // gesture, so programmatic scroll of the carousel container is allowed.
  const handleCrossTabSwipe = useCallback(
    (direction: 1 | -1) => {
      const tabIdx = TAB_ITEMS.findIndex((t) => t.key === activeTab);
      const nextTabIdx = tabIdx + direction;
      if (nextTabIdx < 0 || nextTabIdx >= TAB_ITEMS.length) return; // no wrap-around

      handleUserInteraction();
      const nextTabKey = TAB_ITEMS[nextTabIdx].key;
      const nextPrompts = PROMPTS[nextTabKey];
      const nextIdx = direction === 1 ? 0 : nextPrompts.length - 1;

      setActiveTab(nextTabKey);
      setPromptSelections((prev) => ({ ...prev, [nextTabKey]: nextIdx }));

      // Reset carousel container scroll instantly (no smooth behavior, no
      // page scroll) once the new tab's cards have rendered.
      requestAnimationFrame(() => {
        const scroller = promptScrollerRef.current;
        if (!scroller) return;
        if (direction === 1) {
          scroller.scrollLeft = 0;
        } else {
          scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
        }
      });
    },
    [activeTab, handleUserInteraction]
  );

  // "At the boundary" means the SELECTED card is the first/last one — not a
  // raw scrollLeft comparison: with 88%-wide snap cards and their trailing
  // margins, the last card's snap position is not the scroller's absolute
  // max, so a scrollLeft check never fires on a real device.
  const handlePromptTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const count = PROMPTS[activeTab].length;
      const idx = promptSelections[activeTab];
      touchStateRef.current = {
        startX: e.touches[0].clientX,
        atMax: idx >= count - 1,
        atMin: idx <= 0,
      };
    },
    [activeTab, promptSelections]
  );

  const handlePromptTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touchState = touchStateRef.current;
      if (!touchState || tabAdvanceCooldownRef.current) return;

      const deltaX = touchState.startX - e.touches[0].clientX;

      // Dragging left (content moves left, i.e. finger moves left) past the
      // right boundary => advance to next tab.
      if (touchState.atMax && deltaX > SWIPE_THRESHOLD) {
        tabAdvanceCooldownRef.current = true;
        handleCrossTabSwipe(1);
        setTimeout(() => {
          tabAdvanceCooldownRef.current = false;
        }, 500);
        touchStateRef.current = null;
        return;
      }

      // Dragging right past the left boundary => go to previous tab.
      if (touchState.atMin && deltaX < -SWIPE_THRESHOLD) {
        tabAdvanceCooldownRef.current = true;
        handleCrossTabSwipe(-1);
        setTimeout(() => {
          tabAdvanceCooldownRef.current = false;
        }, 500);
        touchStateRef.current = null;
      }
    },
    [handleCrossTabSwipe]
  );

  const handlePromptTouchEnd = useCallback(() => {
    touchStateRef.current = null;
  }, []);

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
      {/* Section-wide ledger, matches the Pain section treatment. */}
      <LedgerScatter preset="verticals" />
      <Box position="absolute" inset={0} pointerEvents="none" bg="rgba(0,0,0,0.35)" />
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

        {/* Tabs — single swipeable row on mobile, wrapping row on desktop */}
        <Box position="relative" mb={{ base: 4, md: 6 }}>
          <Flex
            ref={tabScrollerRef}
            role="tablist"
            aria-label="Industry verticals"
            gap={{ base: 2, md: 2 }}
            justifyContent="flex-start"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            overflowX="auto"
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
          {/* Edge fade hints — mobile only, to signal the row scrolls */}
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

        {/* Separator — desktop only; on phones the pills sit right above the cards */}
        <Box
          display={{ base: "none", md: "block" }}
          borderTop="1px solid"
          borderColor="rgba(255,255,255,0.15)"
          mb={{ base: 4, md: 6 }}
        />

        {/* Tab panel. A single set of prompt options exists in the DOM (one
            role="listbox"/"option" tree, one CTA link) so accessibility
            queries and text lookups stay unique — only CSS display/layout
            changes between breakpoints, not the DOM shape.

            Desktop (md+): unchanged two columns — text list on the left,
            one shared demo on the right.

            Mobile (base): each option becomes a full card (flex column)
            that also hosts its own WireframeGrid + VerticalDemo, laid out
            as a horizontally swipeable, scroll-snapped row. Only the
            selected card actually mounts VerticalDemo (others render an
            empty placeholder box) so we're not running N animation timers
            for off-screen cards. Dots + CTA sit below the row. */}
        <Flex
          role="tabpanel"
          id={panelId}
          aria-labelledby={`vertical-tab-${activeTab}`}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 10 }}
        >
          {/* Left column (desktop) / whole carousel (mobile) */}
          <Box flex="1">
            <Box
              ref={promptScrollerRef}
              role="listbox"
              aria-label="Prompts"
              display={{ base: "flex", md: "block" }}
              overflowX={{ base: "auto", md: "visible" }}
              onTouchStart={handlePromptTouchStart}
              onTouchMove={handlePromptTouchMove}
              onTouchEnd={handlePromptTouchEnd}
              css={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {prompts.map((prompt, idx) => (
                <Box
                  key={prompt}
                  ref={(el: HTMLDivElement | null) => {
                    promptCardRefs.current[idx] = el;
                  }}
                  role="option"
                  aria-selected={selectedIdx === idx}
                  onClick={() => handlePromptClick(idx)}
                  cursor="pointer"
                  flexShrink={{ base: 0, md: "initial" }}
                  w={{ base: "88%", md: "auto" }}
                  mr={{ base: 4, md: 0 }}
                  css={{ scrollSnapAlign: "start" }}
                  bg={{ base: "rgba(255,255,255,0.04)", md: "transparent" }}
                  border={{ base: "1px solid", md: "none" }}
                  borderBottom={{ base: "1px solid", md: "1px solid" }}
                  borderColor={{
                    base:
                      selectedIdx === idx
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.1)",
                    md: "rgba(255,255,255,0.15)",
                  }}
                  borderRadius={{ base: "16px", md: 0 }}
                  p={{ base: 4, md: 0 }}
                  py={{ md: 3 }}
                >
                  <Box
                    color={selectedIdx === idx ? "surface.page" : "rgba(255,255,255,0.5)"}
                    fontWeight={selectedIdx === idx ? "600" : "400"}
                    fontSize={{ base: "lg", md: "xl" }}
                    transition="color 0.15s ease"
                    mb={{ base: 4, md: 0 }}
                    _hover={{ color: "surface.page" }}
                  >
                    &ldquo;{prompt}&rdquo;
                  </Box>

                  {/* Mobile-only: this card's own demo animation */}
                  <Box display={{ base: "block", md: "none" }} position="relative" borderRadius="12px">
                    {selectedIdx === idx ? (
                      <VerticalDemo activeTab={activeTab} selectedPromptIdx={idx} />
                    ) : (
                      <Box aspectRatio="3 / 4" w="100%" />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Dot indicators — mobile only, hint that the row swipes */}
            <Flex display={{ base: "flex", md: "none" }} justifyContent="center" gap={2} mt={3}>
              {prompts.map((prompt, idx) => (
                <Box
                  key={prompt}
                  as="span"
                  w={selectedIdx === idx ? "16px" : "6px"}
                  h="6px"
                  borderRadius="full"
                  bg={selectedIdx === idx ? "surface.page" : "rgba(255,255,255,0.25)"}
                  transition="all 0.2s ease"
                />
              ))}
            </Flex>

            {/* CTA — below the card carousel on mobile, below the text list
                on desktop (same element, same position in the DOM either
                way; only the spacing above it differs by breakpoint). */}
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

          {/* Right column: shared demo — desktop only now (mobile hosts its
              own demo inside each card above). */}
          <Box
            display={{ base: "none", md: "block" }}
            flex="1"
            position="relative"
            p={{ md: 8, lg: 10 }}
            borderRadius="20px"
          >
            <Box position="relative" zIndex={1} bg="#1A1A1A" borderRadius="12px">
              <VerticalDemo activeTab={activeTab} selectedPromptIdx={selectedIdx} />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
