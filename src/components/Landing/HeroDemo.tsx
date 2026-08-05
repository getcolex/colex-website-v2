"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { MotionBox, StatusBadge, TypingCursor } from "./demo-primitives";

// ── Constants ──
const REQUEST_TEXT = "Every new shipping inquiry needs three carrier quotes, the cheapest flagged, and an RFQ sent to the client";
const TYPING_SPEED = 10; // ms per character
const CHECKS = [
  "At least 3 carrier quotes collected",
  "Lowest rate identified and flagged",
  "RFQ sent to client with summary",
];
const RATES = [
  { carrier: "MSC", price: "$2,840", best: true },
  { carrier: "Hapag-Lloyd", price: "$2,920", best: false },
  { carrier: "ONE", price: "$3,100", best: false },
];

// ── Phase types ──
type Phase =
  | "typing"
  | "goal-appear"
  | "expand-task"
  | "rate-1"
  | "rate-2"
  | "rate-3"
  | "task-review"
  | "approval-show"
  | "approved"
  | "collapse"
  | "check-1"
  | "check-2"
  | "check-3"
  | "complete"
  | "fade-out";

export default function HeroDemo() {
  // Mid-story start: the first visible frame is "complete" — the goal card
  // is already fully populated (all checks ticked, status Processed) —
  // rather than an empty card waiting for typing. The request field types
  // out on top of/above that still-visible prior result each loop.
  const [phase, setPhase] = useState<Phase>("complete");
  const [typedChars, setTypedChars] = useState(REQUEST_TEXT.length);

  const schedule = useCallback(
    (timeouts: NodeJS.Timeout[], fn: () => void, delay: number) => {
      timeouts.push(setTimeout(fn, delay));
    },
    []
  );

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= REQUEST_TEXT.length) return;

    const t = setTimeout(
      () => setTypedChars((c) => c + 1),
      TYPING_SPEED
    );
    return () => clearTimeout(t);
  }, [phase, typedChars]);

  // Phase sequencing
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === "typing" && typedChars >= REQUEST_TEXT.length) {
      // Typing done -> show goal card
      schedule(timeouts, () => setPhase("goal-appear"), 350);
    } else if (phase === "goal-appear") {
      // Goal visible -> expand first check with task
      schedule(timeouts, () => setPhase("expand-task"), 1200);
    } else if (phase === "expand-task") {
      // Task running -> show rates one by one
      schedule(timeouts, () => setPhase("rate-1"), 600);
    } else if (phase === "rate-1") {
      schedule(timeouts, () => setPhase("rate-2"), 500);
    } else if (phase === "rate-2") {
      schedule(timeouts, () => setPhase("rate-3"), 500);
    } else if (phase === "rate-3") {
      // All rates shown -> switch to review
      schedule(timeouts, () => setPhase("task-review"), 800);
    } else if (phase === "task-review") {
      // Show approval bar
      schedule(timeouts, () => setPhase("approval-show"), 800);
    } else if (phase === "approval-show") {
      // Auto-approve
      schedule(timeouts, () => setPhase("approved"), 1000);
    } else if (phase === "approved") {
      // Collapse expanded area
      schedule(timeouts, () => setPhase("collapse"), 1000);
    } else if (phase === "collapse") {
      // Tick checks in succession
      schedule(timeouts, () => setPhase("check-1"), 400);
    } else if (phase === "check-1") {
      schedule(timeouts, () => setPhase("check-2"), 200);
    } else if (phase === "check-2") {
      schedule(timeouts, () => setPhase("check-3"), 200);
    } else if (phase === "check-3") {
      // Mark complete
      schedule(timeouts, () => setPhase("complete"), 400);
    } else if (phase === "complete") {
      // Pause then start the next cycle's request typing (goal card stays
      // visible, dimmed, underneath — never unmounts to empty).
      schedule(timeouts, () => {
        setTypedChars(0);
        setPhase("typing");
      }, 1500);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [phase, typedChars, schedule]);

  // Derived state
  // The goal card stays mounted through the typing phase (dimmed) instead
  // of unmounting to an empty card — it only ever hides on true first mount
  // before any cycle has completed, which never happens since we start
  // mid-story at "complete".
  const showGoal = true;
  const isTyping = phase === "typing";
  const isExpanded =
    phase === "expand-task" ||
    phase === "rate-1" ||
    phase === "rate-2" ||
    phase === "rate-3" ||
    phase === "task-review" ||
    phase === "approval-show" ||
    phase === "approved";
  const visibleRates =
    phase === "rate-1" ? 1 :
    phase === "rate-2" ? 2 :
    (phase === "rate-3" || phase === "task-review" || phase === "approval-show" || phase === "approved") ? 3 : 0;
  const taskStatus: "running" | "review" | "done" =
    (phase === "approval-show" || phase === "task-review") ? "review" :
    phase === "approved" ? "done" : "running";
  const showApproval = phase === "approval-show" || phase === "approved";
  const isApproved = phase === "approved";
  const checksChecked = [
    ["check-1", "check-2", "check-3", "complete", "typing"].includes(phase),
    ["check-2", "check-3", "complete", "typing"].includes(phase),
    ["check-3", "complete", "typing"].includes(phase),
  ];
  const isComplete = phase === "complete" || phase === "typing";
  const goalTitle = isComplete ? "Processed" : "Process inquiry";


  return (
    <Box
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="border.default"
      boxShadow="0 8px 32px rgba(0,0,0,0.08)"
      p={{ base: 5, md: 6 }}
      w="full"
      h={{ base: "420px", md: "460px", lg: "500px", xl: "560px" }}
      pointerEvents="none"
      userSelect="none"
      position="relative"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Content wrapper — always fully populated, never fades to empty.
          Layout stays top-aligned in every phase since the goal card is
          always present (dimmed while retyping the next request). */}
      <MotionBox
        display="flex"
        flexDirection="column"
        flex={1}
        overflow="hidden"
      >
        {/* ── Request field ── */}
        <Box mb={4}>
          <Text fontSize="xs" color="ink.muted" mb={2} fontWeight="500">
            New request
          </Text>
          <Box
            bg="surface.page"
            border="1px solid"
            borderColor="border.default"
            borderRadius="8px"
            p={3}
            minH="48px"
          >
            <Text fontSize="sm" color="ink.primary" lineHeight="1.5">
              {REQUEST_TEXT.slice(0, typedChars)}
              {isTyping && <TypingCursor />}
            </Text>
          </Box>
        </Box>

        {/* ── Goal card ── */}
        <AnimatePresence mode="wait">
          {showGoal && (
            <MotionBox
              key="goal-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isTyping ? 0.35 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              flex={1}
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <Box
                bg="white"
                border="1px solid"
                borderColor="border.default"
                borderRadius="12px"
                overflow="hidden"
                flex={1}
                display="flex"
                flexDirection="column"
              >
                {/* Goal header */}
                <Box px={4} pt={4} pb={2}>
                  <Text
                    fontSize="md"
                    fontWeight="700"
                    color="ink.primary"
                    fontFamily="heading"
                    transition="all 0.3s ease"
                  >
                    {goalTitle}
                  </Text>
                </Box>

                {/* Checks list */}
                <Box px={4} pb={2} flex={1} overflow="hidden" display="flex" flexDirection="column">
                  {CHECKS.map((label, i) => (
                    <Box key={i}>
                      {/* Check row */}
                      <Flex align="center" gap={2.5} py={2}>
                        {/* Checkbox */}
                        <Box
                          w="18px"
                          h="18px"
                          borderRadius="4px"
                          bg={checksChecked[i] ? "#10B981" : "transparent"}
                          border={checksChecked[i] ? "none" : "1.5px solid"}
                          borderColor="border.default"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="all 0.2s"
                          flexShrink={0}
                        >
                          {checksChecked[i] && (
                            <MotionBox
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                              }}
                            >
                              <Text
                                fontSize="10px"
                                color="white"
                                lineHeight="1"
                              >
                                ✓
                              </Text>
                            </MotionBox>
                          )}
                        </Box>
                        <Text
                          fontSize="sm"
                          color={checksChecked[i] ? "ink.primary" : "ink.muted"}
                          fontWeight={checksChecked[i] ? "500" : "400"}
                          transition="all 0.2s"
                        >
                          {label}
                        </Text>
                      </Flex>

                      {/* ── Expanded task area (under check 1 only) ── */}
                      {i === 0 && (
                        <AnimatePresence>
                          {isExpanded && (
                            <MotionBox
                              key="task-expand"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              overflow="hidden"
                              pl={7}
                              pb={2}
                            >
                              {/* Task card */}
                              <Box
                                bg="surface.page"
                                border="1px solid"
                                borderColor="border.default"
                                borderRadius="8px"
                                p={3}
                              >
                                {/* Task header */}
                                <Flex
                                  align="center"
                                  justify="space-between"
                                  mb={3}
                                >
                                  <Text
                                    fontSize="xs"
                                    fontWeight="600"
                                    color="ink.primary"
                                  >
                                    Fetch carrier rates
                                  </Text>
                                  <StatusBadge status={taskStatus} />
                                </Flex>

                                {/* Rate table */}
                                {visibleRates > 0 && (
                                  <Box>
                                    {/* Table header */}
                                    <Flex
                                      px={2}
                                      py={1}
                                      mb={1}
                                    >
                                      <Text
                                        flex={1}
                                        fontSize="10px"
                                        fontWeight="600"
                                        color="ink.muted"
                                        textTransform="uppercase"
                                        letterSpacing="0.04em"
                                      >
                                        Carrier
                                      </Text>
                                      <Text
                                        w="80px"
                                        fontSize="10px"
                                        fontWeight="600"
                                        color="ink.muted"
                                        textTransform="uppercase"
                                        letterSpacing="0.04em"
                                        textAlign="right"
                                      >
                                        Rate
                                      </Text>
                                    </Flex>

                                    {/* Rate rows */}
                                    {RATES.slice(0, visibleRates).map(
                                      (rate, ri) => (
                                        <MotionBox
                                          key={rate.carrier}
                                          initial={{ opacity: 0, x: -6 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{
                                            duration: 0.25,
                                          }}
                                        >
                                          <Flex
                                            px={2}
                                            py={1.5}
                                            bg={
                                              rate.best && visibleRates === 3
                                                ? "rgba(73, 8, 45, 0.04)"
                                                : ri % 2 === 0
                                                ? "white"
                                                : "surface.page"
                                            }
                                            borderRadius="4px"
                                            border={
                                              rate.best && visibleRates === 3
                                                ? "1px solid"
                                                : "1px solid transparent"
                                            }
                                            borderColor={
                                              rate.best && visibleRates === 3
                                                ? "brand.primary"
                                                : "transparent"
                                            }
                                            transition="all 0.3s"
                                          >
                                            <Text
                                              flex={1}
                                              fontSize="xs"
                                              color="ink.primary"
                                              fontWeight={
                                                rate.best && visibleRates === 3
                                                  ? "600"
                                                  : "400"
                                              }
                                            >
                                              {rate.carrier}
                                            </Text>
                                            <Text
                                              w="80px"
                                              fontSize="xs"
                                              color={
                                                rate.best && visibleRates === 3
                                                  ? "brand.primary"
                                                  : "ink.primary"
                                              }
                                              fontWeight={
                                                rate.best && visibleRates === 3
                                                  ? "700"
                                                  : "500"
                                              }
                                              textAlign="right"
                                              fontVariantNumeric="tabular-nums"
                                            >
                                              {rate.price}
                                            </Text>
                                          </Flex>
                                        </MotionBox>
                                      )
                                    )}
                                  </Box>
                                )}

                                {/* Approval bar */}
                                <AnimatePresence>
                                  {showApproval && (
                                    <MotionBox
                                      key="approval"
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      mt={3}
                                      pt={3}
                                      borderTop="1px solid"
                                      borderColor="border.default"
                                    >
                                      <Flex
                                        align="center"
                                        justify="space-between"
                                      >
                                        <Flex align="center" gap={2}>
                                          <Box
                                            w="22px"
                                            h="22px"
                                            borderRadius="full"
                                            bg={
                                              isApproved
                                                ? "#10B981"
                                                : "#F59E0B"
                                            }
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            transition="background 0.3s"
                                          >
                                            <Text
                                              fontSize="11px"
                                              color="white"
                                            >
                                              {isApproved ? "✓" : "👤"}
                                            </Text>
                                          </Box>
                                          <Text
                                            fontSize="xs"
                                            fontWeight="500"
                                            color="ink.primary"
                                          >
                                            {isApproved
                                              ? "Approved"
                                              : "Review needed"}
                                          </Text>
                                        </Flex>
                                        {isApproved && (
                                          <StatusBadge status="done" />
                                        )}
                                      </Flex>
                                    </MotionBox>
                                  )}
                                </AnimatePresence>
                              </Box>
                            </MotionBox>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Separator between checks (not after last) */}
                      {i < CHECKS.length - 1 && (
                        <Box
                          h="1px"
                          bg="border.subtle"
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
}
