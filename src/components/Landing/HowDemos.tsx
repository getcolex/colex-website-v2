"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  MotionBox,
  ANIM,
  TypingCursor,
  DemoContainer,
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
// User describes a whole process → goals + checks tree materializes
// ═══════════════════════════════════════════

const CREATE_PROMPT = "Handle new freight quotes end to end";

const GOALS = [
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
  const [typedChars, setTypedChars] = useState(0);
  const [goalsVisible, setGoalsVisible] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;

    setTypedChars(0);
    setGoalsVisible(0);

    const len = CREATE_PROMPT.length;
    const typingDuration = 1800;
    for (let i = 0; i <= len; i++) {
      ts.push(setTimeout(() => setTypedChars(i), (i * typingDuration) / len));
    }

    const goalsStart = typingDuration + 500;
    for (let i = 1; i <= GOALS.length; i++) {
      ts.push(setTimeout(() => setGoalsVisible(i), goalsStart + i * 900));
    }

    const total = goalsStart + GOALS.length * 900 + ANIM.pauseBetweenCycles + 1200;
    ts.push(setTimeout(() => setCycle((c) => c + 1), total));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const isTyping = typedChars < CREATE_PROMPT.length;

  return (
    <DemoContainer variant="light" flush>
      {/* AI input */}
      <Flex align="center" gap={2} mb={3}>
        <Text fontSize="sm" color="#9CA3AF">&#x2728;</Text>
        <Box
          flex={1}
          bg="white"
          border="1px solid"
          borderColor="#E7E5E4"
          borderRadius="8px"
          px={3}
          py={2}
        >
          <Text fontSize="sm" color={typedChars > 0 ? "#1A1A1A" : "#9CA3AF"} lineHeight="1.4">
            {typedChars === 0 ? "Describe what you want..." : CREATE_PROMPT.slice(0, typedChars)}
            {isTyping && typedChars > 0 && <TypingCursor color="#3B82F6" />}
          </Text>
        </Box>
      </Flex>

      {/* Goal/check tree materializing */}
      <Box flex="1">
        <AnimatePresence>
          {Array.from({ length: goalsVisible }).map((_, gi) => {
            const goal = GOALS[gi];
            return (
              <MotionBox
                key={gi}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                mb={3}
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
                      borderRadius="8px"
                      border="1.5px solid #D6D3D1"
                      flexShrink={0}
                    />
                    <Text fontSize="sm" color="#4A443E">
                      {check}
                    </Text>
                  </Flex>
                ))}

                {gi < GOALS.length - 1 && (
                  <Box ml="3.5px" w="1px" h="12px" bg="#E7E5E4" />
                )}
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </Box>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 2 — Edit Demo (Rule editor — unchanged)
// ═══════════════════════════════════════════

export function EditDemo() {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 600));
    ts.push(setTimeout(() => setPhase(2), 1600));
    ts.push(setTimeout(() => setPhase(3), 2600));
    ts.push(setTimeout(() => setPhase(4), 3800));
    ts.push(setTimeout(() => setPhase(5), 4800));
    ts.push(setTimeout(() => setCycle((c) => c + 1), 7500));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  return (
    <DemoContainer variant="light" flush>
      <Flex justify="space-between" align="center" mb={3}>
        <SectionHeader>This check passes when</SectionHeader>
        <Text fontSize="xs" color="#9CA3AF">2 rules &#x25B4;</Text>
      </Flex>

      <Box
        bg="white"
        border="1px solid"
        borderColor="#E7E5E4"
        borderRadius="8px"
        px={3}
        py={2.5}
        mb={3}
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Pill>Email delivered via send_email</Pill>
          <Text fontSize="sm" color="#71717A">has data</Text>
        </Flex>
      </Box>

      <Box
        bg="white"
        border="1.5px solid"
        borderColor={phase >= 1 && phase <= 4 ? "#3B82F6" : "#E7E5E4"}
        borderRadius="8px"
        px={3}
        py={2.5}
        mb={3}
        transition="border-color 0.3s"
        boxShadow={phase >= 1 && phase <= 4 ? "0 0 0 2px rgba(59,130,246,0.12)" : "none"}
        position="relative"
      >
        <Flex align="center" gap={2} flexWrap="wrap" rowGap={2}>
          <Pill glow={phase === 1}>Thread id</Pill>
          <Text fontSize="sm" color="#1A1A1A" fontWeight="600">
            {phase >= 2 ? "matches" : "has data"}
          </Text>
          {phase >= 3 && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              display="inline-flex"
            >
              <Pill variant={phase >= 4 ? "filled" : "dashed"}>
                {phase >= 4 ? "shipment_thread" : "choose..."}
              </Pill>
            </MotionBox>
          )}
        </Flex>
        {phase >= 5 && (
          <Box position="absolute" top={1.5} right={2}>
            <Badge>UPDATED</Badge>
          </Box>
        )}
      </Box>

      <Text fontSize="sm" color="#3B82F6" fontWeight="500" mt={1}>
        + Add rule (by field) &#x25BE;
      </Text>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 3 — Run Demo
// Rich generative UI: stat cards, highlighted table, bar chart
// ═══════════════════════════════════════════

const QUOTE_ROWS = [
  { carrier: "Maersk", price: "$2,840", transit: "18d", best: true },
  { carrier: "MSC", price: "$3,100", transit: "16d", best: false },
  { carrier: "Hapag", price: "$3,450", transit: "20d", best: false },
];

const BAR_DATA = [
  { label: "Maersk", pct: 65, color: "#3B82F6" },
  { label: "MSC", pct: 85, color: "#9CA3AF" },
  { label: "Hapag", pct: 100, color: "#D1D5DB" },
];

export function RunDemo() {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 400));   // stat cards
    ts.push(setTimeout(() => setPhase(2), 1200));  // table header
    ts.push(setTimeout(() => setPhase(3), 1800));  // table rows
    ts.push(setTimeout(() => setPhase(4), 3000));  // highlight best
    ts.push(setTimeout(() => setPhase(5), 4000));  // bar chart
    ts.push(setTimeout(() => setPhase(6), 5500));  // done badge
    ts.push(setTimeout(() => setCycle((c) => c + 1), 8000));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  return (
    <DemoContainer variant="light" flush>
      {/* Progress bar */}
      <Flex align="center" justify="space-between" mb={3}>
        <Flex align="center" gap={2}>
          <Box w="50px" h="4px" bg="#E7E5E4" borderRadius="2px" overflow="hidden">
            <Box
              h="100%"
              w={phase < 1 ? "0%" : phase < 4 ? "50%" : "100%"}
              bg={phase >= 6 ? "#10B981" : "#3B82F6"}
              borderRadius="2px"
              transition="all 0.4s"
            />
          </Box>
          <Text fontSize="xs" color="#71717A" fontWeight="600">
            {phase < 4 ? "1" : "3"}/3 quotes
          </Text>
        </Flex>
        {phase >= 6 && <Badge>COMPLETE</Badge>}
      </Flex>

      {/* Stat cards */}
      <AnimatePresence>
        {phase >= 1 && (
          <MotionBox
            key="stats"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={3}
          >
            <Flex gap={2}>
              {[
                { label: "Best rate", value: "$2,840" },
                { label: "Avg transit", value: "18d" },
                { label: "Carriers", value: phase >= 3 ? "3" : "..." },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  flex="1"
                  bg="white"
                  border="1px solid"
                  borderColor="#E7E5E4"
                  borderRadius="8px"
                  px={2}
                  py={2}
                  textAlign="center"
                >
                  <Text fontSize="xs" color="#9CA3AF" mb={0.5}>{stat.label}</Text>
                  <Text fontSize="sm" fontWeight="700" color="#1A1A1A">{stat.value}</Text>
                </Box>
              ))}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Data table */}
      <AnimatePresence>
        {phase >= 2 && (
          <MotionBox
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            mb={3}
          >
            <Box
              bg="white"
              border="1px solid"
              borderColor="#E7E5E4"
              borderRadius="8px"
              overflow="hidden"
            >
              {/* Header */}
              <Flex bg="#F9FAFB" px={3} py={1.5} borderBottom="1px solid" borderColor="#E7E5E4">
                <Text flex={1} fontSize="xs" fontWeight="700" color="#71717A">Carrier</Text>
                <Text w="60px" fontSize="xs" fontWeight="700" color="#71717A" textAlign="right">Price</Text>
                <Text w="40px" fontSize="xs" fontWeight="700" color="#71717A" textAlign="right">Days</Text>
              </Flex>

              {/* Rows */}
              {phase >= 3 && QUOTE_ROWS.map((row) => (
                <MotionBox
                  key={row.carrier}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Flex
                    px={3}
                    py={1.5}
                    borderBottom="1px solid"
                    borderColor="#F3F4F6"
                    bg={phase >= 4 && row.best ? "rgba(59,130,246,0.06)" : "transparent"}
                    transition="background 0.3s"
                  >
                    <Flex flex={1} align="center" gap={1.5}>
                      <Text fontSize="sm" fontWeight={row.best && phase >= 4 ? "700" : "500"} color="#1A1A1A">
                        {row.carrier}
                      </Text>
                      {phase >= 4 && row.best && (
                        <MotionBox
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Box bg="#3B82F6" color="white" fontSize="9px" fontWeight="700" px={1.5} py={0.5} borderRadius="8px">
                            BEST
                          </Box>
                        </MotionBox>
                      )}
                    </Flex>
                    <Text w="60px" fontSize="sm" color={row.best && phase >= 4 ? "#3B82F6" : "#1A1A1A"} fontWeight={row.best && phase >= 4 ? "700" : "400"} textAlign="right">
                      {row.price}
                    </Text>
                    <Text w="40px" fontSize="sm" color="#71717A" textAlign="right">{row.transit}</Text>
                  </Flex>
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Bar chart */}
      <AnimatePresence>
        {phase >= 5 && (
          <MotionBox
            key="chart"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Text fontSize="xs" color="#71717A" fontWeight="600" mb={1.5}>
              Price comparison
            </Text>
            <Flex gap={3} align="flex-end" h="40px">
              {BAR_DATA.map((bar) => (
                <Flex key={bar.label} direction="column" align="center" flex={1} gap={1}>
                  <MotionBox
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.pct * 0.35}px` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    w="100%"
                    bg={bar.color}
                    borderRadius="4px 4px 0 0"
                  />
                  <Text fontSize="9px" color="#9CA3AF" lineHeight="1">{bar.label}</Text>
                </Flex>
              ))}
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
