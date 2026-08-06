"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  MotionBox,
  DemoContainer,
} from "./demo-primitives";
import { useIsVisible } from "@/lib/useIsVisible";

// ── Shared colors for maroon variant ──
const C = {
  text: "#F8F7F4",
  muted: "rgba(255,255,255,0.5)",
  border: "rgba(255,255,255,0.12)",
  fieldBg: "rgba(255,255,255,0.08)",
  pillBg: "rgba(255,255,255,0.1)",
  pillText: "rgba(255,255,255,0.8)",
  green: "#10B981",
  amber: "#F59E0B",
  accent: "#DFAEC0", // dusty rose brand accent (replaces generic SaaS blue on dark grounds)
  cardBg: "rgba(255,255,255,0.06)",
};

/**
 * Hook: phase-based animation loop with cleanup.
 * `initialPhase` is the phase the panel mounts in AND the phase a loop
 * reset falls back to — it should already be a populated mid-story frame
 * so the card is never caught empty (first paint or reset alike).
 */
function usePhaseLoop(
  schedule: Array<{ ms: number; phase: number }>,
  resetMs: number,
  initialPhase = 0,
  active = true,
) {
  const [phase, setPhase] = useState(initialPhase);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    setPhase(initialPhase);

    for (const s of schedule) {
      timeouts.push(setTimeout(() => setPhase(s.phase), s.ms));
    }
    timeouts.push(
      setTimeout(() => {
        setPhase(initialPhase);
        setCycle((c) => c + 1);
      }, resetMs)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [cycle, active]);

  return phase;
}

// ═══════════════════════════════════════════════════════════════
// Card 1 — Simple Interfaces (Generative Form from Rules)
// ═══════════════════════════════════════════════════════════════
const formFields = [
  { label: "Mode", value: "Ocean FCL", required: false, isDropdown: true },
  { label: "Origin", value: "Shanghai, CN", required: true, isDropdown: false },
  { label: "Weight", value: "14,200 kg", required: false, isDropdown: false },
];

export function SimpleInterfaceDemo() {
  // 0=empty (unused — never mounted), 1=progress+goal, 2=field1, 3=field2, 4=field3, 5=button, 6=progress-update, 7=pause
  // Mounts (and loop-resets) at phase 2: progress bar + first field already on screen,
  // so the panel is never caught as a bare box.
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const phase = usePhaseLoop(
    [
      { ms: 600, phase: 3 },
      { ms: 1200, phase: 4 },
      { ms: 2100, phase: 5 },
      { ms: 3300, phase: 6 },
      { ms: 4900, phase: 7 },
    ],
    6400,
    2,
    visible,
  );

  return (
    <DemoContainer containerRef={ref} variant="maroon" aspectRatio={{ base: "4 / 5", md: "4 / 3" }}>
      <Flex direction="column" h="100%" gap={0}>
        {/* Progress bar */}
        <AnimatePresence>
          {phase >= 1 && (
            <MotionBox
              key="progress-bar"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              mb={3}
            >
              <Flex align="center" justify="space-between" mb={2}>
                <Flex align="center" gap={2}>
                  <Box w="8px" h="8px" borderRadius="full" bg={C.accent} />
                  <Text fontSize="md" fontFamily="heading" fontWeight="600" color={C.text}>
                    Lane Defined
                  </Text>
                </Flex>
                <Text fontSize="xs" color={C.muted} fontWeight="600" fontVariantNumeric="tabular-nums">
                  {phase >= 6 ? "1/2" : "0/2"}
                </Text>
              </Flex>
              {/* Progress track */}
              <Box
                h="3px"
                bg="rgba(255,255,255,0.08)"
                borderRadius="full"
                overflow="hidden"
                mb={2}
              >
                <Box
                  h="100%"
                  bg={C.green}
                  borderRadius="full"
                  w={phase >= 6 ? "50%" : "0%"}
                  transition="width 0.5s ease"
                />
              </Box>
              {/* Sub-check */}
              <Flex align="center" gap={2} px={1}>
                <Box
                  w="16px"
                  h="16px"
                  borderRadius="8px"
                  bg={phase >= 5 ? C.green : "transparent"}
                  border={phase >= 5 ? "none" : `1.5px solid ${C.border}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s"
                  flexShrink={0}
                >
                  {phase >= 5 && (
                    <Text fontSize="9px" color="white" lineHeight="1">
                      ✓
                    </Text>
                  )}
                </Box>
                <Text
                  fontSize="sm"
                  color={phase >= 5 ? C.green : C.muted}
                  transition="color 0.3s"
                >
                  Form is ready
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Separator */}
        {phase >= 2 && (
          <Box
            h="1px"
            bg={C.border}
            mb={3}
          />
        )}

        {/* Form fields — staggered appearance */}
        <Box flex="1">
          {formFields.map((field, i) => {
            const fieldPhase = i + 2;
            const isVisible = phase >= fieldPhase;
            if (!isVisible) return null;

            return (
              <MotionBox
                key={field.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                mb={3}
              >
                <Text
                  fontSize="xs"
                  fontWeight="500"
                  color={C.muted}
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="0.04em"
                >
                  {field.label}
                  {field.required && (
                    <Box as="span" color={C.amber} ml={0.5}>
                      *
                    </Box>
                  )}
                </Text>
                <Box
                  bg={C.fieldBg}
                  border="1px solid"
                  borderColor={C.border}
                  borderRadius="8px"
                  px={3}
                  py={2.5}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontSize="sm" color={C.text}>
                    {field.value}
                  </Text>
                  {field.isDropdown && (
                    <Text fontSize="xs" color={C.muted} ml={2}>
                      ▾
                    </Text>
                  )}
                </Box>
              </MotionBox>
            );
          })}
        </Box>

        {/* Submit button */}
        <AnimatePresence>
          {phase >= 5 && (
            <MotionBox
              key="submit"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              pt={2}
              borderTop="1px solid"
              borderColor={C.border}
            >
              <Box
                bg={phase >= 5 ? C.green : "transparent"}
                border="1px solid"
                borderColor={C.green}
                borderRadius="8px"
                py={2.5}
                textAlign="center"
                transition="all 0.3s"
              >
                <Text fontSize="sm" fontWeight="600" color="white">
                  Submit form
                </Text>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════════════════════════
// Card 2 — Work That Rewinds (Goal/Check Tree with Cascade)
// ═══════════════════════════════════════════════════════════════
const checkItems = [
  { name: "Customs Filed", key: "customs" },
  { name: "Booking Confirmed", key: "booking" },
  { name: "BoL Issued", key: "bol" },
];

export function RewindDemo() {
  // 0=empty, 1=item1-done, 2=item2-done, 3=all-done, 4=customs-reverts, 5=cascade, 6=reason, 7=pause
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const phase = usePhaseLoop(
    [
      { ms: 500, phase: 1 },
      { ms: 1100, phase: 2 },
      { ms: 1700, phase: 3 },
      { ms: 3200, phase: 4 },
      { ms: 4200, phase: 5 },
      { ms: 5200, phase: 6 },
      { ms: 6200, phase: 7 },
    ],
    8000,
    0,
    visible,
  );

  function getCheckState(key: string) {
    if (key === "customs") {
      if (phase >= 4) return "reverted";
      if (phase >= 1) return "done";
      return "pending";
    }
    if (key === "booking") {
      if (phase >= 5) return "pending";
      if (phase >= 2) return "done";
      return "pending";
    }
    if (key === "bol") {
      // The cascade un-does downstream work too — a later step can never
      // stay "done" while an earlier one has been reopened.
      if (phase >= 5) return "pending";
      if (phase >= 3) return "done";
      return "pending";
    }
    return "pending";
  }

  return (
    <DemoContainer containerRef={ref} variant="maroon" flush>
      <Flex direction="column" h="100%" gap={0} justify="flex-start">
        {/* Goal header with count */}
        <Flex justify="space-between" align="center" mb={3}>
          <Flex align="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg={C.accent} />
            <Text fontSize="sm" fontFamily="heading" fontWeight="600" color={C.text}>
              Shipment Cleared
            </Text>
          </Flex>
          <AnimatePresence mode="wait">
            {phase >= 4 ? (
              <MotionBox
                key="reopened-count"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Text fontSize="xs" color={C.amber} fontWeight="600" fontVariantNumeric="tabular-nums">
                  {phase >= 5 ? "0/3" : "2/3"}
                </Text>
              </MotionBox>
            ) : (
              <MotionBox
                key="normal-count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text fontSize="xs" color={C.muted} fontWeight="600" fontVariantNumeric="tabular-nums">
                  {phase >= 3 ? "3/3" : phase >= 2 ? "2/3" : phase >= 1 ? "1/3" : "0/3"}
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>

        {/* Check tree with vertical connectors — no flex-grow: growing this
            box pushed the cascade toast to the panel bottom and opened a
            dead gap under the three-item tree on desktop heights. */}
        <Box position="relative">
          {/* Vertical connector line */}
          <Box
            position="absolute"
            left="10px"
            top="20px"
            bottom="20px"
            w="1.5px"
            bg={C.border}
          />

          {checkItems.map((item, i) => {
            const state = getCheckState(item.key);
            const isDone = state === "done";
            const isReverted = state === "reverted";
            const isPending = state === "pending";

            return (
              <Box key={item.key} position="relative">
                <Flex
                  align="center"
                  gap={2.5}
                  py={2.5}
                  px={0}
                  bg={isReverted ? "rgba(245,158,11,0.08)" : "transparent"}
                  transition="background 0.3s"
                  borderRadius="8px"
                  mb={i < checkItems.length - 1 ? 1 : 0}
                >
                  {/* Check icon */}
                  <Box
                    w="22px"
                    h="22px"
                    borderRadius="8px"
                    bg={
                      isDone ? C.green : isReverted ? C.amber : "transparent"
                    }
                    border={isPending ? `1.5px solid ${C.border}` : "none"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.3s"
                    flexShrink={0}
                    zIndex={1}
                    position="relative"
                  >
                    {isDone && (
                      <Text fontSize="sm" color="white" lineHeight="1">
                        ✓
                      </Text>
                    )}
                    {isReverted && (
                      <Text
                        fontSize="sm"
                        color="white"
                        lineHeight="1"
                        fontWeight="700"
                      >
                        !
                      </Text>
                    )}
                  </Box>

                  <Box flex="1">
                    <Text
                      fontSize="sm"
                      color={
                        isDone ? C.text : isReverted ? C.amber : C.muted
                      }
                      fontWeight={isDone || isReverted ? "500" : "400"}
                    >
                      {item.name}
                    </Text>
                  </Box>

                  {/* Status badge */}
                  {isReverted && (
                    <Box
                      bg="rgba(245,158,11,0.15)"
                      px={2}
                      py={0.5}
                      borderRadius="8px"
                    >
                      <Text
                        fontSize="xs"
                        color={C.amber}
                        fontWeight="700"
                        letterSpacing="0.04em"
                      >
                        REOPENED
                      </Text>
                    </Box>
                  )}
                  {isDone && (
                    <Text fontSize="xs" color={C.green}>
                      done
                    </Text>
                  )}
                </Flex>
              </Box>
            );
          })}
        </Box>

        {/* Cascade reason */}
        <AnimatePresence>
          {phase >= 6 && (
            <MotionBox
              key="cascade-reason"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              mt={2}
              pt={2}
              borderTop="1px solid"
              borderColor={C.border}
            >
              <Flex align="center" gap={2}>
                <Box
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg={C.amber}
                  flexShrink={0}
                  css={{
                    animation: "pulse-amber 1.5s infinite",
                    "@keyframes pulse-amber": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.4 },
                    },
                  }}
                />
                <Text fontSize="sm" color={C.muted}>
                  Customs rejected — re-entering review
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════════════════════════
// Card 3 — Rules Written Down, Auditable (Rule Editor + Version)
// ═══════════════════════════════════════════════════════════════
export function AuditDemo() {
  // 0=rules visible, 1=highlight-rule2, 2=value-change, 3=version-badge, 4=audit-line, 5=pause
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const phase = usePhaseLoop(
    [
      { ms: 800, phase: 1 },
      { ms: 2000, phase: 2 },
      { ms: 3200, phase: 3 },
      { ms: 4400, phase: 4 },
      { ms: 5600, phase: 5 },
    ],
    7500,
    0,
    visible,
  );

  return (
    <DemoContainer containerRef={ref} variant="maroon" flush>
      {/* Top-anchored so new items (version badge / audit line) appear
          below existing content instead of pushing everything center-out. */}
      <Flex direction="column" justify="flex-start" h="100%" gap={0}>
        {/* Section header — check editor style */}
        <Flex justify="space-between" align="center" mb={3}>
          <Text
            fontSize="xs"
            fontWeight="700"
            color={C.muted}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            This check passes when
          </Text>
          <Flex align="center" gap={1}>
            <Text fontSize="xs" color={C.muted}>
              2 rules
            </Text>
            <Text fontSize="xs" color={C.muted}>
              ▴
            </Text>
          </Flex>
        </Flex>

        {/* Rule 1: pill tokens */}
        <Box>
          <Box
            mb={3}
            px={3}
            py={2.5}
            bg={C.cardBg}
            border="1px solid"
            borderColor={C.border}
            borderRadius="8px"
          >
            <Flex align="center" gap={2} flexWrap="wrap">
              <Box bg={C.pillBg} px={3} py={1} borderRadius="full">
                <Text fontSize="sm" color={C.pillText} fontWeight="500">
                  Quote received
                </Text>
              </Box>
              <Text fontSize="sm" color={C.muted} fontWeight="600">
                has data
              </Text>
            </Flex>
          </Box>

          {/* Rule 2: pill tokens with animated value */}
          <Box
            mb={3}
            px={3}
            py={2.5}
            bg={C.cardBg}
            border="1px solid"
            borderColor={phase >= 1 ? "rgba(223,174,192,0.5)" : C.border}
            borderRadius="8px"
            transition="border-color 0.3s"
            boxShadow={
              phase >= 1 && phase < 3
                ? "0 0 0 1px rgba(223,174,192,0.25)"
                : "none"
            }
          >
            <Flex align="center" gap={2} flexWrap="wrap">
              <Box bg={C.pillBg} px={3} py={1} borderRadius="full">
                <Text fontSize="sm" color={C.pillText} fontWeight="500">
                  Amount
                </Text>
              </Box>
              <Text fontSize="sm" color={C.muted} fontWeight="600">
                ≥
              </Text>
              {/* Value morphs from 2 to 3 */}
              <Box
                bg={phase >= 2 ? "rgba(16,185,129,0.15)" : C.pillBg}
                px={3}
                py={1}
                borderRadius="full"
                transition="background 0.3s"
              >
                <Text
                  fontSize="sm"
                  color={phase >= 2 ? C.green : C.pillText}
                  fontWeight="600"
                  transition="color 0.3s"
                >
                  {phase >= 2 ? "3" : "2"}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Version badge */}
          <AnimatePresence>
            {phase >= 3 && (
              <MotionBox
                key="version"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                mb={3}
                px={3}
              >
                <Flex align="center" gap={2}>
                  <Box
                    bg="rgba(255,255,255,0.08)"
                    px={2}
                    py={1}
                    borderRadius="8px"
                  >
                    <Text fontSize="xs" color={C.muted}>
                      v1
                    </Text>
                  </Box>
                  <Text fontSize="xs" color={C.muted}>
                    →
                  </Text>
                  <Box
                    bg="rgba(16,185,129,0.15)"
                    px={2}
                    py={1}
                    borderRadius="8px"
                  >
                    <Text fontSize="xs" color={C.green} fontWeight="600">
                      v1.1
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {/* Audit trail line */}
        <AnimatePresence>
          {phase >= 4 && (
            <MotionBox
              key="audit-line"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              pt={2}
              borderTop="1px solid"
              borderColor={C.border}
            >
              <Flex align="center" gap={2}>
                {/* Author avatar */}
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Text fontSize="9px" color={C.text} fontWeight="600">
                    P
                  </Text>
                </Box>
                <Text fontSize="xs" color={C.muted} lineHeight="1.4">
                  Aug 4, 14:32 · parijat · Changed minimum quotes
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════════════════════════
// Card 4 — Human Judgement (Approval Gate)
// ═══════════════════════════════════════════════════════════════
const autoSteps = ["Parse input", "Fetch rates", "Score match"];

export function HumanJudgementDemo() {
  // 0-2=idle/step1/step2 (unused — never mounted), 3=step3-done, 4=approval-section, 5=reviewing, 6=approved, 7=pause
  // Mounts (and loop-resets) at phase 3: all three auto steps already complete,
  // so the panel opens with real content rather than an empty box.
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const phase = usePhaseLoop(
    [
      { ms: 900, phase: 4 },
      { ms: 2100, phase: 5 },
      { ms: 3700, phase: 6 },
      { ms: 4900, phase: 7 },
    ],
    6300,
    3,
    visible,
  );

  return (
    <DemoContainer containerRef={ref} variant="maroon" aspectRatio={{ base: "4 / 5", md: "4 / 3" }}>
      <Flex direction="column" h="100%" gap={0}>
        {/* Auto steps — fast completing with green checks */}
        <Box mb={3}>
          {autoSteps.map((step, i) => {
            const stepPhase = i + 1;
            const isDone = phase >= stepPhase;
            if (!isDone && phase < stepPhase) return null;

            return (
              <MotionBox
                key={step}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                display="flex"
                alignItems="center"
                gap={2}
                py={1.5}
                px={3}
              >
                <Box
                  w="18px"
                  h="18px"
                  borderRadius="full"
                  bg={C.green}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Text fontSize="xs" color="white" lineHeight="1">
                    ✓
                  </Text>
                </Box>
                <Text fontSize="sm" color={C.text} fontWeight="400">
                  {step}
                </Text>
                <Text fontSize="xs" color={C.green} ml="auto">
                  done
                </Text>
              </MotionBox>
            );
          })}
        </Box>

        <Box flex="1" />

        {/* APPROVAL section — check editor collapsible */}
        <AnimatePresence>
          {phase >= 4 && (
            <MotionBox
              key="approval-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section header bar */}
              <Box
                borderTop="1px solid"
                borderColor={C.border}
                pt={2}
                mb={3}
              >
                <Flex align="center" gap={2}>
                  <Text fontSize="xs" color={C.muted}>
                    ▾
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color={C.muted}
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                  >
                    Approval
                  </Text>
                </Flex>
              </Box>

              {/* Approval card */}
              <Box
                mx={0}
                mb={3}
                px={3}
                py={2.5}
                bg={C.cardBg}
                border="1px solid"
                borderColor={phase >= 6 ? C.green : C.border}
                borderRadius="8px"
                transition="border-color 0.3s"
              >
                <Text fontSize="sm" color={C.muted} mb={2}>
                  Requires: Ops Manager sign-off
                </Text>

                {/* Reviewing → Approved transition */}
                <AnimatePresence mode="wait">
                  {phase >= 5 && phase < 6 && (
                    <MotionBox
                      key="reviewing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flex align="center" gap={2}>
                        <Box
                          w="24px"
                          h="24px"
                          borderRadius="full"
                          bg="rgba(255,255,255,0.15)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text fontSize="sm" color={C.text}>
                            P
                          </Text>
                        </Box>
                        <Text fontSize="sm" color={C.amber}>
                          Reviewing...
                        </Text>
                        <Box
                          w="6px"
                          h="6px"
                          borderRadius="full"
                          bg={C.amber}
                          ml="auto"
                          css={{
                            animation: "pulse-review 1s infinite",
                            "@keyframes pulse-review": {
                              "0%, 100%": { opacity: 1 },
                              "50%": { opacity: 0.3 },
                            },
                          }}
                        />
                      </Flex>
                    </MotionBox>
                  )}
                  {phase >= 6 && (
                    <MotionBox
                      key="approved"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <Flex align="center" gap={2}>
                        <Box
                          w="24px"
                          h="24px"
                          borderRadius="full"
                          bg={C.green}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text fontSize="xs" color="white" lineHeight="1">
                            ✓
                          </Text>
                        </Box>
                        <Text fontSize="sm" color={C.green} fontWeight="500">
                          Approved by parijat
                        </Text>
                      </Flex>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>

              {/* Resolved badge */}
              <AnimatePresence>
                {phase >= 6 && (
                  <MotionBox
                    key="status-done"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    mt={1}
                  >
                    <Box
                      bg={C.green}
                      color="white"
                      fontSize="xs"
                      fontWeight="700"
                      letterSpacing="0.05em"
                      px={2}
                      py={1}
                      borderRadius="8px"
                      display="inline-block"
                    >
                      RESOLVED
                    </Box>
                  </MotionBox>
                )}
              </AnimatePresence>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </DemoContainer>
  );
}
