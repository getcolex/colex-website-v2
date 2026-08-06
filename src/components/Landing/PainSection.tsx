"use client";

import { Box, Container, Text, Heading } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import LedgerScatter from "./LedgerScatter";

const MotionBox = motion.create(Box);

const AUTOPLAY_MS = 5000;
const BRAND_MAROON = "#49082D";

// Load-bearing word gets the accent color (upright, not italic).
const cards = [
  {
    title: ["People end up doing it their ", "own way", "."],
    body: "You wrote the process. Getting the team (or the agents) to follow it is the hard part.",
  },
  {
    title: ["Automating is expensive. Change is a ", "headache", "."],
    body: "You put the process in a tool. The work changes, and you pay the engineering bill again to make the tool match.",
  },
  {
    title: ["You can’t see what ", "actually", " happened."],
    body: "When something goes wrong, you have the outcome but not the run. To find out, you ask whoever touched it what they remember.",
  },
  {
    title: ["You are your team’s ", "memory", "."],
    body: "Docs hold the process, logs hold the data. The reasoning is in your head.",
  },
];

const ACCENT = "#C9909F";

// Positional variants for the four deck cards. Front = pos0.
// Desktop: fanned right; mobile: gentler fan.
const desktopPositions = [
  { x: -40, y: 0, rot: -2, opacity: 1, brightness: 1, z: 4 },
  { x: 0, y: -4, rot: 3, opacity: 0.9, brightness: 0.9, z: 3 },
  { x: 38, y: -8, rot: 8, opacity: 0.7, brightness: 0.75, z: 2 },
  { x: 72, y: -14, rot: 13, opacity: 0.5, brightness: 0.6, z: 1 },
];

const mobilePositions = [
  { x: -20, y: 0, rot: -1, opacity: 1, brightness: 1, z: 4 },
  { x: 0, y: -4, rot: 2, opacity: 0.9, brightness: 0.9, z: 3 },
  { x: 20, y: -8, rot: 4, opacity: 0.7, brightness: 0.75, z: 2 },
  { x: 38, y: -14, rot: 6, opacity: 0.5, brightness: 0.6, z: 1 },
];

function useIsDesktop(bp = 768) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${bp}px)`);
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [bp]);
  return is;
}

export default function PainSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  const advance = useCallback(() => setActiveIdx((i) => (i + 1) % cards.length), []);

  // Autoplay timer. Restarts (via the useEffect dep list) whenever activeIdx
  // changes, or when paused/inView flip, so the visible progress fill and the
  // actual advance stay locked together.
  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [activeIdx, paused, inView, advance]);

  // Visibility gate.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const ent of entries) setInView(ent.isIntersecting);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const positions = isDesktop ? desktopPositions : mobilePositions;
  const counter = String(activeIdx + 1).padStart(2, "0");
  const progressPlaying = inView && !paused;

  return (
    <Box
      as="section"
      id="why-colex"
      py={{ base: 8, md: 10 }}
      bg="surface.page"
      position="relative"
    >
      <Container
        maxW="container.xl"
        px={{ base: 4, sm: 6, md: 8, lg: 12 }}
        position="relative"
        zIndex={1}
      >
        <Box
          ref={wrapRef}
          tabIndex={0}
          role="group"
          aria-label="Four things ops teams tell us after they have tried to automate"
          onClick={advance}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === " " || e.key === "Enter") {
              e.preventDefault();
              advance();
            }
          }}
          w="100%"
          bg="#101010"
          borderRadius="20px"
          p={{ base: 8, md: 14 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 10, md: 12 }}
          alignItems="center"
          position="relative"
          overflow="hidden"
          cursor="pointer"
          boxShadow="0 40px 120px -40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
          transition="all 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)"
          _hover={{
            transform: "translateY(-6px)",
            boxShadow:
              "0 60px 140px -40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,144,159,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          _focusVisible={{
            outline: "2px solid",
            outlineColor: ACCENT,
            outlineOffset: "2px",
          }}
        >
          {/* Ledger backdrop inside the card */}
          <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}>
            <LedgerScatter preset="pain" />
          </Box>

          {/* Left column */}
          <Box position="relative" zIndex={1} display="flex" flexDirection="column" gap={6}>
            <Heading
              as="h2"
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              color="surface.page"
              letterSpacing="-0.02em"
              lineHeight={1.15}
              m={0}
            >
              Running ops is difficult. Automating, doubly so.
            </Heading>
            {/* Counter with a maroon fill sweeping behind the text over
                AUTOPLAY_MS. Restarts on advance; pauses on hover/off-screen. */}
            <Box
              position="relative"
              display="inline-block"
              alignSelf="flex-start"
              overflow="hidden"
              px="6px"
              py="3px"
              mt={2}
            >
              <MotionBox
                key={`${activeIdx}-${progressPlaying}`}
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                bg={BRAND_MAROON}
                initial={{ width: "0%" }}
                animate={{ width: progressPlaying ? "100%" : "0%" }}
                transition={{
                  duration: progressPlaying ? AUTOPLAY_MS / 1000 : 0,
                  ease: "linear",
                }}
                style={{ zIndex: 0 }}
              />
              <Text
                as="span"
                position="relative"
                fontFamily="mono"
                fontSize="11px"
                letterSpacing="0.16em"
                textTransform="uppercase"
                color="surface.page"
                style={{ fontVariantNumeric: "tabular-nums", zIndex: 1 }}
              >
                {counter} / 04
              </Text>
            </Box>
          </Box>

          {/* Right column — perspective / deck */}
          <MotionBox
            position="relative"
            zIndex={1}
            height={{ base: "240px", md: "260px" }}
            style={{ perspective: "1200px", touchAction: "pan-y" }}
            onPanEnd={(_, info) => {
              // Horizontal swipe past ~50px, or a flick with speed > 500
              if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 500) {
                advance();
              }
            }}
          >
            {cards.map((card, idx) => {
              const posIdx = (idx - activeIdx + cards.length) % cards.length;
              const p = positions[posIdx];
              return (
                <MotionBox
                  key={card.title.join("")}
                  position="absolute"
                  top="50%"
                  left="50%"
                  width={{ base: "280px", md: "360px" }}
                  minHeight={{ base: "240px", md: "260px" }}
                  height="auto"
                  bg="#1E1E1E"
                  border="1px solid rgba(248,247,244,0.10)"
                  borderRadius="12px"
                  padding="22px 24px"
                  boxShadow="0 24px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)"
                  display="flex"
                  flexDirection="column"
                  gap={3}
                  color="rgba(248,247,244,0.85)"
                  style={{ transformOrigin: "center center", willChange: "transform, opacity" }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${p.x}px)`,
                    y: `calc(-50% + ${p.y}px)`,
                    rotate: p.rot,
                    opacity: p.opacity,
                    filter: `brightness(${p.brightness})`,
                  }}
                  transition={{ duration: 0.55, ease: [0.2, 0.9, 0.3, 1] }}
                  zIndex={p.z}
                >
                  <Text
                    as="h3"
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize={{ base: "xl", md: "2xl" }}
                    color="surface.page"
                    lineHeight={1.3}
                    mb={3}
                  >
                    {card.title[0]}
                    <Box as="span" color={ACCENT}>
                      {card.title[1]}
                    </Box>
                    {card.title[2]}
                  </Text>
                  <Text
                    fontFamily="body"
                    fontWeight="400"
                    fontSize={{ base: "sm", md: "md" }}
                    color="rgba(248,247,244,0.72)"
                    lineHeight={1.7}
                  >
                    {card.body}
                  </Text>
                </MotionBox>
              );
            })}
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
