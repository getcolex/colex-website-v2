"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  MotionBox,
  TypingCursor,
  DemoContainer,
  StatusBadge,
} from "./demo-primitives";

// ── Shared sub-components ──

function Pill({
  children,
  variant = "filled",
  glow = false,
}: {
  children: React.ReactNode;
  variant?: "filled" | "dashed" | "green";
  glow?: boolean;
}) {
  const styles = {
    filled: { bg: "#EBF2FF", color: "#3B82F6", border: "1px solid #D4E4FF" },
    dashed: { bg: "transparent", color: "#9CA3AF", border: "1.5px dashed #D1D5DB" },
    green: { bg: "#ECFDF5", color: "#10B981", border: "1px solid #A7F3D0" },
  };
  const s = styles[variant];

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      bg={s.bg}
      color={s.color}
      border={s.border}
      borderRadius="full"
      px={3}
      py={1}
      fontSize="sm"
      fontWeight="600"
      lineHeight="1.4"
      whiteSpace="nowrap"
      boxShadow={glow ? "0 0 0 2px rgba(59,130,246,0.25)" : "none"}
      transition="box-shadow 0.3s"
    >
      {children}
    </Box>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontSize="xs"
      fontWeight="700"
      color="#71717A"
      textTransform="uppercase"
      letterSpacing="0.08em"
      mb={2}
    >
      {children}
    </Text>
  );
}

function Badge({ children, bg = "#10B981" }: { children: React.ReactNode; bg?: string }) {
  return (
    <MotionBox
      display="inline-block"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Box
        bg={bg}
        color="white"
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.05em"
        px={2}
        py={1}
        borderRadius="8px"
      >
        {children}
      </Box>
    </MotionBox>
  );
}

// ═══════════════════════════════════════════
// Card 1 — Create Demo
// Chat conversation → goals + checks tree materializes
// ═══════════════════════════════════════════

const CREATE_USER_MSG =
  "Handle new freight quotes end to end — collect rates, pick the best, and send the client an RFQ";
const CREATE_COLEX_MSG =
  "Got it. I’ll set up three goals for this process.";

const CREATE_GOALS = [
  {
    name: "Lane Defined",
    checks: ["Origin & destination captured", "Mode selected"],
  },
  {
    name: "Quotes Collected",
    checks: ["≥ 3 carrier quotes", "Insurance validated"],
  },
  {
    name: "Booking Confirmed",
    checks: ["Client approval received", "PO matched"],
  },
];

export function CreateDemo() {
  const [userChars, setUserChars] = useState(0);
  const [showColex, setShowColex] = useState(false);
  const [colexChars, setColexChars] = useState(0);
  const [goalsVisible, setGoalsVisible] = useState(0);
  const [fading, setFading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;

    // reset
    setUserChars(0);
    setShowColex(false);
    setColexChars(0);
    setGoalsVisible(0);
    setFading(false);

    // Phase 1: type user message (~35ms per char)
    const userLen = CREATE_USER_MSG.length;
    const userCharMs = 35;
    for (let i = 1; i <= userLen; i++) {
      ts.push(setTimeout(() => setUserChars(i), i * userCharMs));
    }
    const userDone = userLen * userCharMs;

    // Phase 2: Colex reply appears after a brief pause, then types
    const colexStart = userDone + 600;
    ts.push(setTimeout(() => setShowColex(true), colexStart));
    const colexLen = CREATE_COLEX_MSG.length;
    const colexCharMs = 30;
    for (let i = 1; i <= colexLen; i++) {
      ts.push(
        setTimeout(() => setColexChars(i), colexStart + 200 + i * colexCharMs)
      );
    }
    const colexDone = colexStart + 200 + colexLen * colexCharMs;

    // Phase 3: goals materialize one by one
    const goalsStart = colexDone + 500;
    for (let i = 1; i <= CREATE_GOALS.length; i++) {
      ts.push(setTimeout(() => setGoalsVisible(i), goalsStart + i * 1000));
    }
    const goalsDone = goalsStart + CREATE_GOALS.length * 1000;

    // Phase 4: pause, fade out, loop
    const fadeStart = goalsDone + 1800;
    ts.push(setTimeout(() => setFading(true), fadeStart));
    ts.push(setTimeout(() => setCycle((c) => c + 1), fadeStart + 600));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const userTyping = userChars > 0 && userChars < CREATE_USER_MSG.length;
  const colexTyping =
    showColex && colexChars > 0 && colexChars < CREATE_COLEX_MSG.length;

  return (
    <DemoContainer variant="light" flush>
      <MotionBox
        display="flex"
        flexDirection="column"
        h="100%"
        initial={{ opacity: 1 }}
        animate={{ opacity: fading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Chat area */}
        <Box flex="1" overflow="hidden">
          {/* User message — right aligned */}
          <AnimatePresence>
            {userChars > 0 && (
              <MotionBox
                key="user-msg"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                display="flex"
                justifyContent="flex-end"
                mb={2.5}
              >
                <Box
                  bg="#F3F2EF"
                  borderRadius="12px 12px 2px 12px"
                  px={3}
                  py={2}
                  maxW="88%"
                >
                  <Text fontSize="sm" color="#1A1A1A" lineHeight="1.45">
                    {CREATE_USER_MSG.slice(0, userChars)}
                    {userTyping && <TypingCursor color="#1A1A1A" />}
                  </Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Colex message — left aligned */}
          <AnimatePresence>
            {showColex && (
              <MotionBox
                key="colex-msg"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                mb={2.5}
              >
                <Flex align="center" gap={1.5} mb={1}>
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg="#49082D"
                    flexShrink={0}
                  />
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="#49082D"
                    lineHeight="1"
                  >
                    Colex
                  </Text>
                </Flex>
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="#E7E5E4"
                  borderRadius="2px 12px 12px 12px"
                  px={3}
                  py={2}
                  maxW="88%"
                >
                  <Text fontSize="sm" color="#1A1A1A" lineHeight="1.45">
                    {colexChars > 0
                      ? CREATE_COLEX_MSG.slice(0, colexChars)
                      : " "}
                    {colexTyping && <TypingCursor color="#49082D" />}
                  </Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Goal / check tree */}
          <AnimatePresence>
            {Array.from({ length: goalsVisible }).map((_, gi) => {
              const goal = CREATE_GOALS[gi];
              return (
                <MotionBox
                  key={`goal-${gi}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  mb={2.5}
                >
                  {/* Goal row */}
                  <Flex align="center" gap={2} mb={1.5}>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg="#3B82F6"
                      flexShrink={0}
                    />
                    <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                      {goal.name}
                    </Text>
                    <Text fontSize="xs" color="#9CA3AF">
                      0/{goal.checks.length}
                    </Text>
                  </Flex>

                  {/* Checks indented */}
                  {goal.checks.map((check, ci) => (
                    <Flex key={ci} align="center" gap={2} ml={4} mb={1}>
                      <Box
                        w="14px"
                        h="14px"
                        borderRadius="4px"
                        border="1.5px solid #D6D3D1"
                        flexShrink={0}
                      />
                      <Text fontSize="sm" color="#4A443E">
                        {check}
                      </Text>
                    </Flex>
                  ))}

                  {gi < CREATE_GOALS.length - 1 && (
                    <Box ml="3.5px" w="1px" h="10px" bg="#E7E5E4" />
                  )}
                </MotionBox>
              );
            })}
          </AnimatePresence>
        </Box>

        {/* Chat input bar */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="#E7E5E4"
          borderRadius="10px"
          px={3}
          py={2}
          mt={2}
          flexShrink={0}
        >
          <Flex align="center" justify="space-between">
            <Text fontSize="sm" color="#9CA3AF" lineHeight="1.4">
              Describe your process...
            </Text>
            <Flex
              align="center"
              justify="center"
              w="24px"
              h="24px"
              borderRadius="full"
              bg="#E7E5E4"
              flexShrink={0}
              ml={2}
            >
              <Text fontSize="xs" color="#9CA3AF" lineHeight="1">
                &#x2191;
              </Text>
            </Flex>
          </Flex>
        </Box>
      </MotionBox>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 2 — Edit Demo (Rule editor for freight quotes)
// Shows same ruleset from CreateDemo; user refines a rule
// ═══════════════════════════════════════════

const EDIT_OPERATORS = ["≥", "=", "≤"] as const;

export function EditDemo() {
  // Phases: 0=initial, 1=highlight rule2, 2=dropdown open, 3=value morphs 2->3,
  //         4=dropdown closes + "Updated" pill, 5=fade out / pause before loop
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];

    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 800));   // rule 2 border glows
    ts.push(setTimeout(() => setPhase(2), 2000));  // dropdown opens on operator
    ts.push(setTimeout(() => setPhase(3), 3800));  // value changes 2 -> 3
    ts.push(setTimeout(() => setPhase(4), 5000));  // dropdown closes, "Updated" pill
    ts.push(setTimeout(() => setPhase(5), 6500));  // fade out before loop
    ts.push(setTimeout(() => setCycle((c) => c + 1), 7800));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const rule2Focused = phase >= 1 && phase <= 4;
  const dropdownOpen = phase >= 2 && phase <= 3;
  const valueChanged = phase >= 3;
  const showUpdated = phase === 4;

  return (
    <DemoContainer variant="light" flush>
      {/* Goal header */}
      <Flex align="center" gap={2} mb={3}>
        <Box w="8px" h="8px" borderRadius="full" bg="#3B82F6" flexShrink={0} />
        <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
          Quotes Collected
        </Text>
        <Text fontSize="xs" color="#9CA3AF">2 checks</Text>
      </Flex>

      {/* Rule 1 — static */}
      <Box
        bg="white"
        border="1px solid"
        borderColor="#E7E5E4"
        borderRadius="8px"
        px={3}
        py={2.5}
        mb={2}
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Pill>Carrier quotes</Pill>
          <Text fontSize="sm" color="#1A1A1A" fontWeight="500">has data</Text>
        </Flex>
      </Box>

      {/* Rule 2 — editable */}
      <Box
        bg="white"
        border="1.5px solid"
        borderColor={rule2Focused ? "#3B82F6" : "#E7E5E4"}
        borderRadius="8px"
        px={3}
        py={2.5}
        mb={2}
        transition="border-color 0.3s, box-shadow 0.3s"
        boxShadow={rule2Focused ? "0 0 0 2px rgba(59,130,246,0.12)" : "none"}
        position="relative"
      >
        <Flex align="center" gap={2} flexWrap="wrap" rowGap={2}>
          <Pill>Quote count</Pill>

          {/* Operator — with dropdown */}
          <Box position="relative">
            <Text
              fontSize="sm"
              color="#1A1A1A"
              fontWeight="600"
              cursor="default"
            >
              {"≥"}
            </Text>

            {/* Dropdown menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <MotionBox
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  position="absolute"
                  top="calc(100% + 4px)"
                  left="50%"
                  css={{ transform: "translateX(-50%)" }}
                  bg="white"
                  border="1px solid"
                  borderColor="#E7E5E4"
                  borderRadius="8px"
                  boxShadow="0 4px 12px rgba(0,0,0,0.08)"
                  py={1}
                  w="72px"
                  zIndex={10}
                >
                  {EDIT_OPERATORS.map((op) => (
                    <Flex
                      key={op}
                      align="center"
                      justify="space-between"
                      px={3}
                      py={1}
                      bg={op === "≥" ? "rgba(59,130,246,0.06)" : "transparent"}
                    >
                      <Text
                        fontSize="sm"
                        fontWeight={op === "≥" ? "600" : "400"}
                        color={op === "≥" ? "#3B82F6" : "#4A443E"}
                      >
                        {op}
                      </Text>
                      {op === "≥" && (
                        <Text fontSize="xs" color="#3B82F6" lineHeight="1">
                          {"✓"}
                        </Text>
                      )}
                    </Flex>
                  ))}
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Value pill — morphs from 2 to 3 */}
          <AnimatePresence mode="wait">
            <MotionBox
              key={valueChanged ? "v3" : "v2"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              display="inline-flex"
            >
              <Pill>{valueChanged ? "3" : "2"}</Pill>
            </MotionBox>
          </AnimatePresence>
        </Flex>

        {/* "Updated" badge */}
        <AnimatePresence>
          {showUpdated && (
            <Box position="absolute" top={1.5} right={2}>
              <Badge>Updated</Badge>
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* Second check label */}
      <Flex align="center" gap={2} ml={0.5} mt={1}>
        <Box
          w="14px"
          h="14px"
          borderRadius="8px"
          border="1.5px solid #D6D3D1"
          flexShrink={0}
        />
        <Text fontSize="sm" color="#4A443E">Insurance validated</Text>
      </Flex>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 3 — Run Demo
// Generative UI: check runs, table fills, best highlighted, approval
// ═══════════════════════════════════════════

const RATE_ROWS = [
  { carrier: "MSC", rate: "$2,840", transit: "18d" },
  { carrier: "Hapag-Lloyd", rate: "$2,920", transit: "16d" },
  { carrier: "ONE", rate: "$3,100", transit: "20d" },
];

export function RunDemo() {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 400));    // check header
    ts.push(setTimeout(() => setPhase(2), 1200));   // task running
    ts.push(setTimeout(() => setPhase(3), 2000));   // table header + row 1
    ts.push(setTimeout(() => setPhase(4), 2600));   // row 2
    ts.push(setTimeout(() => setPhase(5), 3200));   // row 3
    ts.push(setTimeout(() => setPhase(6), 4200));   // best highlighted
    ts.push(setTimeout(() => setPhase(7), 5200));   // stat cards
    ts.push(setTimeout(() => setPhase(8), 6200));   // check done
    ts.push(setTimeout(() => setPhase(9), 7200));   // approval
    ts.push(setTimeout(() => setCycle((c) => c + 1), 9500));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const visibleRows = phase >= 5 ? 3 : phase >= 4 ? 2 : phase >= 3 ? 1 : 0;
  const checkDone = phase >= 8;

  return (
    <DemoContainer variant="light" flush>
      {/* Check header */}
      <AnimatePresence>
        {phase >= 1 && (
          <MotionBox
            key="check-header"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={3}
          >
            <Flex align="center" gap={2} mb={1.5}>
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg={checkDone ? "#10B981" : "#3B82F6"}
                flexShrink={0}
                transition="background 0.3s"
              />
              <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                Quotes Collected
              </Text>
            </Flex>
            <Flex align="center" gap={2} ml={4}>
              <Box
                w="14px"
                h="14px"
                borderRadius="8px"
                bg={checkDone ? "#10B981" : "transparent"}
                border={checkDone ? "none" : "1.5px solid #D6D3D1"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.3s"
                flexShrink={0}
              >
                {checkDone && (
                  <MotionBox
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Text fontSize="8px" color="white" lineHeight="1">&#x2713;</Text>
                  </MotionBox>
                )}
              </Box>
              <Text
                fontSize="sm"
                color={checkDone ? "#1A1A1A" : "#4A443E"}
                fontWeight={checkDone ? "600" : "500"}
              >
                &#x2265; 3 carrier quotes
              </Text>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Task label with status badge */}
      <AnimatePresence>
        {phase >= 2 && (
          <MotionBox
            key="task-bar"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            mb={2}
          >
            <Flex
              align="center"
              justify="space-between"
              bg="white"
              border="1px solid"
              borderColor="#E7E5E4"
              borderRadius="8px"
              px={3}
              py={1.5}
            >
              <Text fontSize="sm" color="#1A1A1A" fontWeight="500">
                Fetch carrier rates
              </Text>
              <StatusBadge status={checkDone ? "done" : "running"} />
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Rate comparison table */}
      <AnimatePresence>
        {phase >= 3 && (
          <MotionBox
            key="rate-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            mb={2}
          >
            <Box
              bg="white"
              border="1px solid"
              borderColor="#E7E5E4"
              borderRadius="8px"
              overflow="hidden"
            >
              {/* Table header */}
              <Flex
                bg="#F5F5F4"
                px={3}
                py={1.5}
                borderBottom="1px solid"
                borderColor="#E7E5E4"
              >
                <Text flex={1} fontSize="xs" fontWeight="700" color="#71717A">
                  Carrier
                </Text>
                <Text w="60px" fontSize="xs" fontWeight="700" color="#71717A" textAlign="right">
                  Rate
                </Text>
                <Text w="50px" fontSize="xs" fontWeight="700" color="#71717A" textAlign="right">
                  Transit
                </Text>
              </Flex>

              {/* Data rows */}
              {RATE_ROWS.slice(0, visibleRows).map((row, i) => {
                const isBest = i === 0 && phase >= 6;
                return (
                  <MotionBox
                    key={row.carrier}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Flex
                      px={3}
                      py={1.5}
                      borderBottom={i < RATE_ROWS.length - 1 ? "1px solid" : "none"}
                      borderColor="#F3F4F6"
                      bg={isBest ? "rgba(73,8,45,0.04)" : i % 2 === 1 ? "#FAFAF9" : "transparent"}
                      transition="background 0.3s"
                    >
                      <Flex flex={1} align="center" gap={1.5}>
                        <Text
                          fontSize="sm"
                          fontWeight={isBest ? "700" : "500"}
                          color="#1A1A1A"
                        >
                          {row.carrier}
                        </Text>
                        {isBest && (
                          <MotionBox
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Box
                              bg="#49082D"
                              color="white"
                              fontSize="9px"
                              fontWeight="700"
                              px={1.5}
                              py={0.5}
                              borderRadius="8px"
                            >
                              BEST
                            </Box>
                          </MotionBox>
                        )}
                      </Flex>
                      <Text
                        w="60px"
                        fontSize="sm"
                        color={isBest ? "#49082D" : "#1A1A1A"}
                        fontWeight={isBest ? "700" : "400"}
                        textAlign="right"
                      >
                        {row.rate}
                      </Text>
                      <Text w="50px" fontSize="sm" color="#71717A" textAlign="right">
                        {row.transit}
                      </Text>
                    </Flex>
                  </MotionBox>
                );
              })}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Stat summary cards */}
      <AnimatePresence>
        {phase >= 7 && (
          <MotionBox
            key="stats"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={2}
          >
            <Flex gap={2}>
              {[
                { label: "Best rate", value: "$2,840" },
                { label: "Quotes found", value: "3" },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  flex="1"
                  bg="white"
                  border="1px solid"
                  borderColor="#E7E5E4"
                  borderRadius="8px"
                  px={2.5}
                  py={2}
                  textAlign="center"
                >
                  <Text fontSize="xs" color="#9CA3AF" mb={0.5}>
                    {stat.label}
                  </Text>
                  <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Approval bar */}
      <AnimatePresence>
        {phase >= 9 && (
          <MotionBox
            key="approval"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Flex
              align="center"
              justify="space-between"
              bg="white"
              border="1px solid"
              borderColor="#10B981"
              borderRadius="8px"
              px={3}
              py={1.5}
            >
              <Flex align="center" gap={1.5}>
                <Box
                  w="14px"
                  h="14px"
                  borderRadius="full"
                  bg="#10B981"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="8px" color="white" lineHeight="1">&#x2713;</Text>
                </Box>
                <Text fontSize="sm" color="#10B981" fontWeight="600">
                  Approved
                </Text>
              </Flex>
              <Text fontSize="xs" color="#9CA3AF">
                auto
              </Text>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 4 — Update Demo
// Rule changes → task updates → UI adds new fields
// ═══════════════════════════════════════════

export function UpdateDemo() {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 500));   // rule highlights
    ts.push(setTimeout(() => setPhase(2), 1400));  // rule text changes
    ts.push(setTimeout(() => setPhase(3), 2200));  // propagation
    ts.push(setTimeout(() => setPhase(4), 3200));  // task updates
    ts.push(setTimeout(() => setPhase(5), 4200));  // new field appears in form
    ts.push(setTimeout(() => setPhase(6), 5400));  // done
    ts.push(setTimeout(() => setCycle((c) => c + 1), 8000));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  return (
    <DemoContainer variant="light" flush>
      {/* Rule section */}
      <SectionHeader>Rule updated</SectionHeader>
      <Box
        bg="white"
        border="1.5px solid"
        borderColor={phase >= 1 && phase <= 2 ? "#3B82F6" : phase >= 6 ? "#10B981" : "#E7E5E4"}
        borderRadius="8px"
        px={3}
        py={2}
        mb={2}
        transition="border-color 0.3s"
        boxShadow={phase >= 1 && phase <= 2 ? "0 0 0 2px rgba(59,130,246,0.12)" : "none"}
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Pill glow={phase === 1} variant={phase >= 6 ? "green" : "filled"}>
            {phase >= 2 ? "Min quotes ≥ 3" : "Min quotes ≥ 2"}
          </Pill>
          {phase >= 2 && (
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Text fontSize="xs" color="#3B82F6" fontWeight="600">changed</Text>
            </MotionBox>
          )}
        </Flex>
      </Box>

      {/* Propagation */}
      <AnimatePresence>
        {phase >= 3 && phase < 6 && (
          <MotionBox
            key="prop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            textAlign="center"
            mb={2}
          >
            <Text fontSize="sm" color="#9CA3AF">↓</Text>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Task section */}
      <AnimatePresence>
        {phase >= 4 && (
          <MotionBox
            key="task"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={2}
          >
            <SectionHeader>Task redeployed</SectionHeader>
            <Box
              bg="white"
              border="1px solid"
              borderColor={phase >= 6 ? "#10B981" : "#E7E5E4"}
              borderRadius="8px"
              px={3}
              py={2}
              transition="border-color 0.3s"
            >
              <Flex align="center" gap={2}>
                <Pill variant={phase >= 6 ? "green" : "filled"}>
                  Collect carrier quotes
                </Pill>
                {phase >= 6 && <Badge>v2</Badge>}
              </Flex>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* UI changes — new field appears */}
      <AnimatePresence>
        {phase >= 5 && (
          <MotionBox
            key="ui"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>Form updated</SectionHeader>
            <Box
              bg="white"
              border="1px solid"
              borderColor="#E7E5E4"
              borderRadius="8px"
              px={3}
              py={2}
            >
              {/* Existing fields */}
              <Flex align="center" gap={2} mb={1.5}>
                <Box w="8px" h="8px" borderRadius="full" bg="#D6D3D1" flexShrink={0} />
                <Text fontSize="sm" color="#71717A">Carrier name</Text>
              </Flex>
              <Flex align="center" gap={2} mb={1.5}>
                <Box w="8px" h="8px" borderRadius="full" bg="#D6D3D1" flexShrink={0} />
                <Text fontSize="sm" color="#71717A">Price</Text>
              </Flex>
              {/* New field */}
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <Flex align="center" gap={2} bg="rgba(59,130,246,0.06)" mx={-3} px={3} py={1.5} borderRadius="8px">
                  <Box w="8px" h="8px" borderRadius="full" bg="#3B82F6" flexShrink={0} />
                  <Text fontSize="sm" color="#3B82F6" fontWeight="600">3rd quote required</Text>
                  <Badge bg="#3B82F6">NEW</Badge>
                </Flex>
              </MotionBox>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </DemoContainer>
  );
}
