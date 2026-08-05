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
  dark = false,
}: {
  children: React.ReactNode;
  variant?: "filled" | "dashed" | "green";
  glow?: boolean;
  dark?: boolean;
}) {
  const styles = dark
    ? {
        filled: { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" },
        dashed: { bg: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px dashed rgba(255,255,255,0.3)" },
        green: { bg: "rgba(16,185,129,0.15)", color: "#34D399", border: "1px solid rgba(16,185,129,0.4)" },
      }
    : {
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

function SectionHeader({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <Text
      fontSize="xs"
      fontWeight="700"
      color={dark ? "rgba(255,255,255,0.5)" : "#71717A"}
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
const CREATE_CHECKS = [
  {
    name: "Quotes Collected",
    rules: [
      { field: "Carrier quotes", operator: "count ≥", value: "3" },
      { field: "Insurance", operator: "has data", value: "" },
    ],
  },
  {
    name: "Best Rate Flagged",
    rules: [
      { field: "Lowest rate", operator: "is marked", value: "best" },
    ],
  },
  {
    name: "RFQ Sent",
    rules: [
      { field: "Client email", operator: "sent via", value: "send_rfq" },
      { field: "Summary", operator: "has data", value: "" },
    ],
  },
];

export function CreateDemo() {
  const [userChars, setUserChars] = useState(0);
  const [sent, setSent] = useState(false);
  const [checksVisible, setChecksVisible] = useState(0);
  const [fading, setFading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;

    setUserChars(0);
    setSent(false);
    setChecksVisible(0);
    setFading(false);

    const userLen = CREATE_USER_MSG.length;
    const charMs = 30;
    for (let i = 1; i <= userLen; i++) {
      ts.push(setTimeout(() => setUserChars(i), i * charMs));
    }
    const typeDone = userLen * charMs;

    ts.push(setTimeout(() => setSent(true), typeDone + 300));

    const checksStart = typeDone + 1000;
    for (let i = 1; i <= CREATE_CHECKS.length; i++) {
      ts.push(setTimeout(() => setChecksVisible(i), checksStart + i * 1200));
    }
    const checksDone = checksStart + CREATE_CHECKS.length * 1200;

    ts.push(setTimeout(() => setFading(true), checksDone + 2000));
    ts.push(setTimeout(() => setCycle((c) => c + 1), checksDone + 2600));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const isTyping = userChars > 0 && userChars < CREATE_USER_MSG.length;

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
        {/* Main area */}
        <Box flex="1" overflow="hidden">
          {/* Sent message as bubble */}
          <AnimatePresence>
            {sent && (
              <MotionBox
                key="sent-msg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                display="flex"
                justifyContent="flex-end"
                mb={3}
              >
                <Box
                  bg="#F3F2EF"
                  borderRadius="12px 12px 2px 12px"
                  px={3}
                  py={2}
                  maxW="90%"
                >
                  <Text fontSize="xs" color="#1A1A1A" lineHeight="1.45">
                    {CREATE_USER_MSG}
                  </Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* "Creating checks..." indicator */}
          <AnimatePresence>
            {sent && checksVisible < CREATE_CHECKS.length && (
              <MotionBox
                key="creating-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                mb={2}
              >
                <Flex align="center" gap={1.5}>
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg="#49082D"
                    css={{
                      animation: "pulse-brand 1.2s infinite",
                      "@keyframes pulse-brand": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.3 },
                      },
                    }}
                  />
                  <Text fontSize="xs" fontWeight="600" color="#49082D">
                    Creating checks...
                  </Text>
                </Flex>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Check cards with styled rules */}
          <AnimatePresence>
            {Array.from({ length: checksVisible }).map((_, ci) => {
              const check = CREATE_CHECKS[ci];
              return (
                <MotionBox
                  key={`check-${ci}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  mb={2}
                >
                  <Box
                    bg="white"
                    border="1px solid"
                    borderColor="#E7E5E4"
                    borderRadius="8px"
                    overflow="hidden"
                  >
                    {/* Check header */}
                    <Flex
                      align="center"
                      gap={2}
                      px={3}
                      py={2}
                      borderBottom="1px solid"
                      borderColor="#F3F2EF"
                    >
                      <Box
                        w="14px"
                        h="14px"
                        borderRadius="4px"
                        border="1.5px solid #D6D3D1"
                        flexShrink={0}
                      />
                      <Text fontSize="sm" fontWeight="600" color="#1A1A1A">
                        {check.name}
                      </Text>
                      <Text fontSize="xs" color="#9CA3AF" ml="auto">
                        {check.rules.length} {check.rules.length === 1 ? "rule" : "rules"}
                      </Text>
                    </Flex>

                    {/* Rules */}
                    <Box px={3} py={1.5}>
                      {check.rules.map((rule, ri) => (
                        <Flex
                          key={ri}
                          align="center"
                          gap={1.5}
                          py={1.5}
                          flexWrap="wrap"
                        >
                          <Box bg="#EBF2FF" px={2} py={0.5} borderRadius="full">
                            <Text fontSize="xs" color="#3B82F6" fontWeight="600">
                              {rule.field}
                            </Text>
                          </Box>
                          <Text fontSize="xs" color="#71717A" fontWeight="500">
                            {rule.operator}
                          </Text>
                          {rule.value && (
                            <Box bg="#F3F2EF" px={2} py={0.5} borderRadius="full">
                              <Text fontSize="xs" color="#1A1A1A" fontWeight="500">
                                {rule.value}
                              </Text>
                            </Box>
                          )}
                        </Flex>
                      ))}
                    </Box>
                  </Box>
                </MotionBox>
              );
            })}
          </AnimatePresence>
        </Box>

        {/* Chat input bar at bottom */}
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
            <Text
              fontSize="sm"
              color={isTyping || (userChars > 0 && !sent) ? "#1A1A1A" : "#9CA3AF"}
              lineHeight="1.4"
              flex="1"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {userChars > 0 && !sent
                ? CREATE_USER_MSG.slice(0, userChars)
                : "Describe your process..."}
              {isTyping && !sent && <TypingCursor color="#1A1A1A" />}
            </Text>
            <Flex
              align="center"
              justify="center"
              w="24px"
              h="24px"
              borderRadius="full"
              bg={userChars > 0 && !sent ? "#49082D" : "#E7E5E4"}
              flexShrink={0}
              ml={2}
              transition="background 0.2s"
            >
              <Text
                fontSize="xs"
                color={userChars > 0 && !sent ? "white" : "#9CA3AF"}
                lineHeight="1"
              >
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
// Card 2 — View Demo (Generated interface for Quotes Collected check)
// Form fields build in, table appears, counter updates, progress bar
// ═══════════════════════════════════════════

const VIEW_FORM_FIELDS = [
  { label: "Carrier name", type: "dropdown", placeholder: "Select carrier...", value: "MSC" },
  { label: "Rate (USD)", type: "number", placeholder: "", value: "$2,840" },
  { label: "Transit days", type: "number", placeholder: "", value: "18" },
] as const;

export function ViewDemo() {
  // Phases: 0=idle, 1=header appears, 2=section label, 3=field1, 4=field2,
  //         5=field3, 6=fields fill, 7=table appears, 8=counter updates, 9=fade
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 400));   // check header
    ts.push(setTimeout(() => setPhase(2), 1000));  // section label
    ts.push(setTimeout(() => setPhase(3), 1500));  // field 1
    ts.push(setTimeout(() => setPhase(4), 2000));  // field 2
    ts.push(setTimeout(() => setPhase(5), 2500));  // field 3
    ts.push(setTimeout(() => setPhase(6), 3400));  // fields fill with values
    ts.push(setTimeout(() => setPhase(7), 4600));  // table appears
    ts.push(setTimeout(() => setPhase(8), 5800));  // counter updates to 1/3
    ts.push(setTimeout(() => setPhase(9), 7500));  // fade out
    ts.push(setTimeout(() => setCycle((c) => c + 1), 8500));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const visibleFields = phase >= 5 ? 3 : phase >= 4 ? 2 : phase >= 3 ? 1 : 0;
  const fieldsFilled = phase >= 6;
  const showTable = phase >= 7;
  const counterUpdated = phase >= 8;
  const fading = phase >= 9;

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
        {/* Check header */}
        <AnimatePresence>
          {phase >= 1 && (
            <MotionBox
              key="view-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              mb={{ base: 2, md: 3 }}
            >
              <Flex align="center" gap={2}>
                <Box w="8px" h="8px" borderRadius="full" bg="#3B82F6" flexShrink={0} />
                <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                  Quotes Collected
                </Text>
                <Text fontSize="xs" color="#9CA3AF" ml="auto">
                  {counterUpdated ? "1/3 quotes" : "0/3 quotes"}
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Section label */}
        <AnimatePresence>
          {phase >= 2 && (
            <MotionBox
              key="section-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              mb={{ base: 1, md: 2 }}
            >
              <Text
                fontSize="xs"
                fontWeight="700"
                color="#71717A"
                textTransform="uppercase"
                letterSpacing="0.04em"
                display={{ base: "none", md: "block" }}
              >
                Carrier Quote Form
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Form fields — appear one by one */}
        <AnimatePresence>
          {Array.from({ length: visibleFields }).map((_, fi) => {
            const field = VIEW_FORM_FIELDS[fi];
            const filled = fieldsFilled;
            return (
              <MotionBox
                key={`field-${fi}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                mb={{ base: 1, md: 2 }}
              >
                {/* Field label */}
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="#71717A"
                  textTransform="uppercase"
                  letterSpacing="0.04em"
                  mb={{ base: 0.5, md: 1 }}
                >
                  {field.label}
                </Text>
                {/* Field input */}
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="#E7E5E4"
                  borderRadius="8px"
                  px={3}
                  py={{ base: 1, md: 1.5 }}
                >
                  <Flex align="center" justify="space-between">
                    <Text
                      fontSize="sm"
                      color={filled ? "#1A1A1A" : "#9CA3AF"}
                      fontWeight={filled ? "500" : "400"}
                    >
                      {filled ? field.value : (field.placeholder || " ")}
                    </Text>
                    {field.type === "dropdown" && (
                      <Text fontSize="xs" color="#9CA3AF" lineHeight="1">&#x25BE;</Text>
                    )}
                  </Flex>
                </Box>
              </MotionBox>
            );
          })}
        </AnimatePresence>

        {/* Data table — quotes already collected */}
        <AnimatePresence>
          {showTable && (
            <MotionBox
              key="quote-table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              mb={{ base: 1, md: 2 }}
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
                  py={{ base: 1, md: 1.5 }}
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
                {/* Single row — just submitted */}
                <MotionBox
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Flex px={3} py={{ base: 1, md: 1.5 }}>
                    <Text flex={1} fontSize="sm" fontWeight="500" color="#1A1A1A">
                      MSC
                    </Text>
                    <Text w="60px" fontSize="sm" color="#1A1A1A" textAlign="right">
                      $2,840
                    </Text>
                    <Text w="50px" fontSize="sm" color="#71717A" textAlign="right">
                      18d
                    </Text>
                  </Flex>
                </MotionBox>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Progress bar — 1/3 */}
        <AnimatePresence>
          {counterUpdated && (
            <MotionBox
              key="progress"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Flex align="center" gap={2}>
                <Box
                  flex={1}
                  h="4px"
                  bg="#E7E5E4"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <MotionBox
                    h="100%"
                    bg="#3B82F6"
                    borderRadius="full"
                    initial={{ width: "0%" }}
                    animate={{ width: "33.3%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Box>
                <Text fontSize="xs" color="#9CA3AF" fontWeight="500" flexShrink={0}>
                  1/3
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 3 — Run Demo
// Generative UI: check runs, table fills, best highlighted, approval
// ═══════════════════════════════════════════

const RUN_RATE_ROWS = [
  { carrier: "MSC", rate: "$2,840", transit: "18d" },
  { carrier: "Hapag-Lloyd", rate: "$2,920", editedRate: "$2,850", transit: "16d" },
  { carrier: "ONE", rate: "$3,100", transit: "20d" },
];

export function RunDemo() {
  // Phases:
  //  0 = blank
  //  1 = check header appears (RUNNING)
  //  2 = table header + row 1 (MSC)
  //  3 = row 2 (Hapag-Lloyd)
  //  4 = row 3 (ONE)
  //  5 = best rate highlighted (MSC gets brand tint + BEST pill)
  //  6 = user edits Hapag-Lloyd rate (blue glow, value morphs)
  //  7 = "Edited" indicator on Hapag-Lloyd row
  //  8 = approval bar slides in ("Review needed" amber)
  //  9 = approval transitions to "Approved" green
  // 10 = check ticks green, status DONE
  // 11 = fade out, then loop
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    setPhase(0);

    ts.push(setTimeout(() => setPhase(1), 400));     // check header
    ts.push(setTimeout(() => setPhase(2), 1200));    // table + row 1
    ts.push(setTimeout(() => setPhase(3), 1900));    // row 2
    ts.push(setTimeout(() => setPhase(4), 2600));    // row 3
    ts.push(setTimeout(() => setPhase(5), 3600));    // best highlighted
    ts.push(setTimeout(() => setPhase(6), 5000));    // edit glow + value change
    ts.push(setTimeout(() => setPhase(7), 6200));    // "Edited" badge
    ts.push(setTimeout(() => setPhase(8), 7200));    // approval bar (review needed)
    ts.push(setTimeout(() => setPhase(9), 8400));    // approved
    ts.push(setTimeout(() => setPhase(10), 9200));   // check done
    ts.push(setTimeout(() => setPhase(11), 10200));  // fade out
    ts.push(setTimeout(() => setCycle((c) => c + 1), 11000));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const visibleRows = phase >= 4 ? 3 : phase >= 3 ? 2 : phase >= 2 ? 1 : 0;
  const bestHighlighted = phase >= 5;
  const editGlow = phase === 6;
  const rateEdited = phase >= 6;
  const showEdited = phase >= 7 && phase < 11;
  const checkDone = phase >= 10;
  const fading = phase >= 11;

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
        {/* Check header with rule */}
        <AnimatePresence>
          {phase >= 1 && (
            <MotionBox
              key="check-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              mb={{ base: 2, md: 3 }}
            >
              <Flex align="center" justify="space-between" mb={{ base: 1, md: 1.5 }}>
                <Flex align="center" gap={2}>
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
                  <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                    Quotes Collected
                  </Text>
                </Flex>
                <StatusBadge status={checkDone ? "done" : "running"} />
              </Flex>
              <Text fontSize="xs" color="#4A443E" ml={6}>
                &#x2265; 3 carrier quotes
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Rate comparison table */}
        <AnimatePresence>
          {phase >= 2 && (
            <MotionBox
              key="rate-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              mb={{ base: 1, md: 2 }}
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
                  py={{ base: 1, md: 1.5 }}
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
                {RUN_RATE_ROWS.slice(0, visibleRows).map((row, i) => {
                  const isBest = i === 0 && bestHighlighted;
                  const isEditRow = i === 1;
                  const displayRate =
                    isEditRow && rateEdited && row.editedRate
                      ? row.editedRate
                      : row.rate;

                  return (
                    <MotionBox
                      key={row.carrier}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flex
                        px={3}
                        py={{ base: 1, md: 1.5 }}
                        borderBottom={i < RUN_RATE_ROWS.length - 1 ? "1px solid" : "none"}
                        borderColor="#F3F4F6"
                        bg={isBest ? "rgba(73,8,45,0.04)" : "transparent"}
                        transition="background 0.3s"
                        position="relative"
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
                          {isEditRow && showEdited && (
                            <MotionBox
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Text fontSize="9px" fontWeight="600" color="#3B82F6">
                                Edited
                              </Text>
                            </MotionBox>
                          )}
                        </Flex>
                        <Box
                          w="60px"
                          textAlign="right"
                          borderRadius="4px"
                          px={1}
                          mx={-1}
                          transition="box-shadow 0.3s"
                          boxShadow={
                            isEditRow && editGlow
                              ? "0 0 0 2px rgba(59,130,246,0.35)"
                              : "none"
                          }
                        >
                          <AnimatePresence mode="wait">
                            <MotionBox
                              key={displayRate}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Text
                                fontSize="sm"
                                color={isBest ? "#49082D" : "#1A1A1A"}
                                fontWeight={isBest ? "700" : "400"}
                              >
                                {displayRate}
                              </Text>
                            </MotionBox>
                          </AnimatePresence>
                        </Box>
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

        {/* Spacer to push approval bar toward bottom */}
        <Box flex="1" />

        {/* Approval bar */}
        <AnimatePresence>
          {phase >= 8 && phase < 11 && (
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
                borderColor={phase >= 9 ? "#10B981" : "#E7E5E4"}
                borderRadius="8px"
                px={3}
                py={{ base: 1, md: 1.5 }}
                transition="border-color 0.3s"
              >
                <Flex align="center" gap={1.5}>
                  {/* Icon circle */}
                  <Box
                    w="18px"
                    h="18px"
                    borderRadius="full"
                    bg={phase >= 9 ? "#10B981" : "#F59E0B"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="background 0.3s"
                  >
                    {phase >= 9 ? (
                      <MotionBox
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Text fontSize="9px" color="white" lineHeight="1">&#x2713;</Text>
                      </MotionBox>
                    ) : (
                      <Box w="6px" h="6px" borderRadius="full" bg="white" />
                    )}
                  </Box>
                  <AnimatePresence mode="wait">
                    <MotionBox
                      key={phase >= 9 ? "approved" : "review"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text
                        fontSize="sm"
                        color={phase >= 9 ? "#10B981" : "#F59E0B"}
                        fontWeight="600"
                      >
                        {phase >= 9 ? "Approved" : "Review needed"}
                      </Text>
                    </MotionBox>
                  </AnimatePresence>
                </Flex>
                {phase >= 9 && (
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text fontSize="xs" color="#9CA3AF">auto</Text>
                  </MotionBox>
                )}
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
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
    <DemoContainer variant="maroon" flush>
      {/* Base: center+distribute so sparse early phases don't leave a dead
          gap under the rule box; md+: natural top-anchored stack (unchanged). */}
      <Flex direction="column" flex="1" justifyContent={{ base: "center", md: "flex-start" }} gap={{ base: 4, md: 0 }}>
      {/* Rule section */}
      <Box>
      <SectionHeader dark>Rule updated</SectionHeader>
      <Box
        bg="rgba(255,255,255,0.06)"
        border="1.5px solid"
        borderColor={phase >= 1 && phase <= 2 ? "#3B82F6" : phase >= 6 ? "#10B981" : "rgba(255,255,255,0.12)"}
        borderRadius="8px"
        px={3}
        py={{ base: 3, md: 2 }}
        mb={{ base: 0, md: 2 }}
        transition="border-color 0.3s"
        boxShadow={phase >= 1 && phase <= 2 ? "0 0 0 2px rgba(59,130,246,0.2)" : "none"}
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Pill dark glow={phase === 1} variant={phase >= 6 ? "green" : "filled"}>
            {phase >= 2 ? "Min quotes ≥ 3" : "Min quotes ≥ 2"}
          </Pill>
          {phase >= 2 && (
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Text fontSize="xs" color="#60A5FA" fontWeight="600">changed</Text>
            </MotionBox>
          )}
        </Flex>
      </Box>
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
            mb={{ base: 0, md: 2 }}
          >
            <Text fontSize="sm" color="rgba(255,255,255,0.5)">↓</Text>
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
            mb={{ base: 0, md: 2 }}
          >
            <SectionHeader dark>Task redeployed</SectionHeader>
            <Box
              bg="rgba(255,255,255,0.06)"
              border="1px solid"
              borderColor={phase >= 6 ? "#10B981" : "rgba(255,255,255,0.12)"}
              borderRadius="8px"
              px={3}
              py={{ base: 3, md: 2 }}
              transition="border-color 0.3s"
            >
              <Flex align="center" gap={2}>
                <Pill dark variant={phase >= 6 ? "green" : "filled"}>
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
            <SectionHeader dark>Form updated</SectionHeader>
            <Box
              bg="rgba(255,255,255,0.06)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.12)"
              borderRadius="8px"
              px={3}
              py={{ base: 3, md: 2 }}
            >
              {/* Existing fields */}
              <Flex align="center" gap={2} mb={1.5}>
                <Box w="8px" h="8px" borderRadius="full" bg="rgba(255,255,255,0.3)" flexShrink={0} />
                <Text fontSize="sm" color="rgba(255,255,255,0.6)">Carrier name</Text>
              </Flex>
              <Flex align="center" gap={2} mb={1.5}>
                <Box w="8px" h="8px" borderRadius="full" bg="rgba(255,255,255,0.3)" flexShrink={0} />
                <Text fontSize="sm" color="rgba(255,255,255,0.6)">Price</Text>
              </Flex>
              {/* New field */}
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <Flex align="center" gap={2} bg="rgba(59,130,246,0.15)" mx={-3} px={3} py={1.5} borderRadius="8px">
                  <Box w="8px" h="8px" borderRadius="full" bg="#60A5FA" flexShrink={0} />
                  <Text fontSize="sm" color="#60A5FA" fontWeight="600">3rd quote required</Text>
                  <Badge bg="#3B82F6">NEW</Badge>
                </Flex>
              </MotionBox>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
      </Flex>
    </DemoContainer>
  );
}
