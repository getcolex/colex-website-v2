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
        filled: { bg: "rgba(73,8,45,0.08)", color: "#49082D", border: "1px solid rgba(73,8,45,0.15)" },
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
      boxShadow={glow ? (dark ? "0 0 0 2px rgba(223,174,192,0.35)" : "0 0 0 2px rgba(73,8,45,0.25)") : "none"}
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
  // Mid-story start: the first visible frame already has the message sent
  // and the first two check cards in place (>50% of the fullest 3-card
  // frame), so typing/build-out happens with content on screen the whole
  // time — never an empty or mostly-empty card. Loop resets crossfade from
  // the full frame back to this same mid-story frame instead of unmounting
  // to blank.
  const [userChars, setUserChars] = useState(CREATE_USER_MSG.length);
  const [sent, setSent] = useState(true);
  const [checksVisible, setChecksVisible] = useState(CREATE_CHECKS.length);
  const [cycle, setCycle] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;

    // Loop seam: no region fade — checks 2 and 3 exit with their own
    // animations while the bubble, input bar and check 1 stay put, so the
    // card never drops below bubble + one check. Each cycle then replays
    // the build-out: check 2 lands, check 3 lands, hold on the full frame.
    setUserChars(CREATE_USER_MSG.length);
    setSent(true);
    setChecksVisible(1);

    ts.push(setTimeout(() => setChecksVisible(2), 1800));
    ts.push(setTimeout(() => setChecksVisible(CREATE_CHECKS.length), 3200));

    ts.push(setTimeout(() => setCycle((c) => c + 1), 6800));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const isTyping = userChars > 0 && userChars < CREATE_USER_MSG.length;

  return (
    <DemoContainer variant="light" flush>
      <MotionBox display="flex" flexDirection="column" h="100%">
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
                mb={{ base: 2, md: 3 }}
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
                  exit={{ opacity: 0, y: -8 }}
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
                      py={{ base: 1.5, md: 2 }}
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
                      <Text fontSize="sm" fontWeight="600" color="#1A1A1A" fontFamily="heading">
                        {check.name}
                      </Text>
                      <Text fontSize="xs" color="#9CA3AF" ml="auto">
                        {check.rules.length} {check.rules.length === 1 ? "rule" : "rules"}
                      </Text>
                    </Flex>

                    {/* Rules */}
                    <Box px={3} py={{ base: 1, md: 1.5 }}>
                      {check.rules.map((rule, ri) => (
                        <Flex
                          key={ri}
                          align="center"
                          gap={1.5}
                          py={{ base: 1, md: 1.5 }}
                          flexWrap="wrap"
                        >
                          <Box bg="rgba(73,8,45,0.08)" px={2} py={0.5} borderRadius="full">
                            <Text fontSize="xs" color="#49082D" fontWeight="600">
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
// Card 2 — View Demo (Generated interfaces for each check, feed-style)
// Four checks stack top to bottom, each generating its own UI; the card
// auto-scrolls its content so the newest check stays in frame.
// ═══════════════════════════════════════════

// Two fields keeps the baseline form compact enough that the card reads
// clearly before the feed starts scrolling.
const VIEW_FORM_FIELDS = [
  { label: "Carrier name", type: "dropdown", placeholder: "Select carrier...", value: "MSC" },
  { label: "Rate (USD)", type: "number", placeholder: "", value: "$2,840" },
] as const;

// Small header for checks 2-4, reused across the generated feed.
function MiniCheckHeader({ name }: { name: string }) {
  return (
    <Flex align="center" gap={1.5} mb={{ base: 1, md: 1.5 }}>
      <Box w="6px" h="6px" borderRadius="full" bg="#49082D" flexShrink={0} />
      <Text fontSize="xs" fontWeight="700" color="#1A1A1A" fontFamily="heading">
        {name}
      </Text>
    </Flex>
  );
}

export function ViewDemo() {
  // Phases: 0=idle, 1=header appears, 6=check 1 (form) filled and settled,
  //         7=check 2 generates (table), 8=check 3 generates (stat cards),
  //         9=check 4 generates (bar chart), then hold, then loop.
  // Mid-story start: first frame already has the header and check 1's
  // filled form in view (phase 6) — never an empty/near-empty card. Loop
  // resets crossfade-dim back to phase 6 instead of unmounting, and the
  // scroll position returns to top with it.
  const [phase, setPhase] = useState(6);
  const [cycle, setCycle] = useState(0);
  const [fading, setFading] = useState(false);
  const [feedY, setFeedY] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const feedViewportRef = useRef<HTMLDivElement>(null);
  const feedInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];
    timeoutsRef.current = ts;

    // Loop seam: fade only the generated-checks region (2-4) — check 1 +
    // its filled form is the permanent baseline and never dims. Each cycle
    // replays Colex generating a different interface per check: a mini
    // table, then stat cards, then a bar chart, each landing below the
    // last and scrolling the feed up to keep the newest in frame.
    setFading(true);
    ts.push(
      setTimeout(() => {
        setPhase(6);
        setFading(false);
      }, 350)
    );

    ts.push(setTimeout(() => setPhase(7), 1400));  // check 2: table generates
    ts.push(setTimeout(() => setPhase(8), 2800));  // check 3: stat cards generate
    ts.push(setTimeout(() => setPhase(9), 4200));  // check 4: bar chart generates
    ts.push(setTimeout(() => setCycle((c) => c + 1), 8400));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const visibleFields = VIEW_FORM_FIELDS.length;
  const fieldsFilled = phase >= 6;
  const showCheck2 = phase >= 7;
  const showCheck3 = phase >= 8;
  const showCheck4 = phase >= 9;
  const checksVisible = showCheck4 ? 4 : showCheck3 ? 3 : showCheck2 ? 2 : 1;

  // Scroll the feed only as far as the content actually overflows the
  // clipped viewport, measured from the DOM — fixed per-phase offsets
  // can't serve both card aspect ratios (they over-scrolled the taller
  // phone card, clipping widgets mid-frame while leaving the bottom
  // empty). Measured shortly after each widget mounts so its height is
  // known; on phones where everything fits, the feed never moves.
  useEffect(() => {
    if (fading) {
      setFeedY(0);
      return;
    }
    const t = setTimeout(() => {
      const vp = feedViewportRef.current;
      const inner = feedInnerRef.current;
      if (!vp || !inner) return;
      const overflow = inner.scrollHeight - vp.clientHeight;
      setFeedY(overflow > 0 ? -overflow : 0);
    }, 120);
    return () => clearTimeout(t);
  }, [checksVisible, fading]);
  const y = feedY;

  return (
    <DemoContainer variant="light" flush>
      <MotionBox display="flex" flexDirection="column" h="100%">
        {/* Check header — counter reflects how many checks are visible */}
        <AnimatePresence>
          {phase >= 1 && (
            <MotionBox
              key="view-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              mb={{ base: 2, md: 3 }}
              flexShrink={0}
            >
              <Flex align="center" gap={2}>
                <Box w="8px" h="8px" borderRadius="full" bg="#49082D" flexShrink={0} />
                <Text fontSize="sm" fontWeight="700" color="#1A1A1A" fontFamily="heading">
                  Generated interface
                </Text>
                <Text fontSize="xs" color="#9CA3AF" ml="auto" fontVariantNumeric="tabular-nums">
                  {checksVisible} {checksVisible === 1 ? "view" : "views"}
                </Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Scrolling feed — clipped viewport, inner stack translates up as
            later checks generate so the newest one stays in frame. */}
        <Box
          ref={feedViewportRef}
          flex="1"
          overflow="hidden"
          position="relative"
          // Fade the top edge so content scrolled out of the feed dissolves
          // instead of hard-cutting mid-letter under the card title.
          css={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 100%)",
          }}
        >
          <MotionBox
            ref={feedInnerRef}
            animate={{ y }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {/* Check 1 — starting frame, never dims */}
            <Box mb={{ base: 2, md: 3 }}>
              <MiniCheckHeader name="Quotes Collected" />
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
                            {filled ? field.value : (field.placeholder || " ")}
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
            </Box>

            {/* Checks 2-4 region — the only part that fades at the loop
                seam; check 1 above never dims. */}
            <MotionBox animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.35 }}>
              {/* Generating caption — pulses while widgets build below */}
              <AnimatePresence>
                {phase < 9 && (
                  <MotionBox
                    key="gen-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    mb={{ base: 1, md: 1.5 }}
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
                        Generating views from rules...
                      </Text>
                    </Flex>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Check 2 — "Best Rate Flagged" → mini table */}
              <AnimatePresence>
                {showCheck2 && (
                  <MotionBox
                    key="check-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    mb={{ base: 2, md: 3 }}
                  >
                    <MiniCheckHeader name="Best Rate Flagged" />
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
                      {/* Row lands */}
                      <MotionBox
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Flex px={3} py={{ base: 1, md: 1.5 }}>
                          <Text flex={1} fontSize="sm" fontWeight="500" color="#1A1A1A">
                            MSC
                          </Text>
                          <Text w="60px" fontSize="sm" color="#1A1A1A" textAlign="right" fontVariantNumeric="tabular-nums">
                            $2,840
                          </Text>
                          <Text w="50px" fontSize="sm" color="#71717A" textAlign="right" fontVariantNumeric="tabular-nums">
                            18d
                          </Text>
                        </Flex>
                      </MotionBox>
                    </Box>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Check 3 — "RFQ Sent" → stat cards */}
              <AnimatePresence>
                {showCheck3 && (
                  <MotionBox
                    key="check-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    mb={{ base: 2, md: 3 }}
                  >
                    <MiniCheckHeader name="RFQ Sent" />
                    <Flex gap={2}>
                      <Box flex={1} bg="white" border="1px solid" borderColor="#E7E5E4" borderRadius="8px" px={2.5} py={{ base: 1, md: 1.5 }}>
                        <Text fontSize="9px" fontWeight="700" color="#71717A" textTransform="uppercase" letterSpacing="0.04em">
                          Lowest rate
                        </Text>
                        <Text fontSize="sm" fontWeight="700" color="#49082D" fontVariantNumeric="tabular-nums">
                          $2,840 <Text as="span" fontWeight="500" color="#71717A" fontSize="xs">MSC</Text>
                        </Text>
                      </Box>
                      <Box flex={1} bg="white" border="1px solid" borderColor="#E7E5E4" borderRadius="8px" px={2.5} py={{ base: 1, md: 1.5 }}>
                        <Text fontSize="9px" fontWeight="700" color="#71717A" textTransform="uppercase" letterSpacing="0.04em">
                          RFQ
                        </Text>
                        <Text fontSize="sm" fontWeight="700" color="#1A1A1A">
                          Sent
                        </Text>
                      </Box>
                    </Flex>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Check 4 — "Rate Comparison" → bar chart, bars grow in */}
              <AnimatePresence>
                {showCheck4 && (
                  <MotionBox
                    key="check-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MiniCheckHeader name="Rate Comparison" />
                    <Box bg="white" border="1px solid" borderColor="#E7E5E4" borderRadius="8px" px={3} py={{ base: 1.5, md: 2 }}>
                      {[
                        { label: "MSC", pct: 62, best: true },
                        { label: "Hapag", pct: 71, best: false },
                        { label: "ONE", pct: 100, best: false },
                      ].map((bar, bi) => (
                        <Flex key={bar.label} align="center" gap={2} py={0.5}>
                          <Text w="44px" fontSize="9px" fontWeight="600" color="#71717A" flexShrink={0}>
                            {bar.label}
                          </Text>
                          <Box flex={1} h="8px" bg="#F3F2EF" borderRadius="full" overflow="hidden">
                            <MotionBox
                              h="100%"
                              bg={bar.best ? "#49082D" : "#D6D3D1"}
                              borderRadius="full"
                              initial={{ width: "0%" }}
                              animate={{ width: `${bar.pct}%` }}
                              transition={{ duration: 0.5, delay: 0.15 + bi * 0.12 }}
                            />
                          </Box>
                        </Flex>
                      ))}
                    </Box>
                  </MotionBox>
                )}
              </AnimatePresence>
            </MotionBox>
          </MotionBox>
        </Box>
      </MotionBox>
    </DemoContainer>
  );
}

// ═══════════════════════════════════════════
// Card 3 — Run Demo
// Generative UI: check runs, CTA-first, hand-typed 4th row, approval
// ═══════════════════════════════════════════

// The static comparison set — row 4 is NOT in here; it exists only as the
// hand-typed row driven by the ROW4_* constants below.
const RUN_RATE_ROWS = [
  { carrier: "MSC", rate: "$2,840", transit: "18d" },
  { carrier: "Hapag-Lloyd", rate: "$2,920", editedRate: "$2,850", transit: "16d" },
  { carrier: "ONE", rate: "$3,100", transit: "20d" },
];

// The 4th row is hand-typed cell by cell once the CTA is tapped.
const ROW4_CARRIER = "CMA CGM";
const ROW4_RATE = "$2,980";
const ROW4_TRANSIT = "21d";
const TYPE_MS_PER_CHAR = 50;

export function RunDemo() {
  // Phases:
  //  0 = blank
  //  1 = check header appears (RUNNING)
  //  2 = table header + row 1 (MSC)
  //  3 = row 2 (Hapag-Lloyd)
  //  4 = row 3 (ONE)
  //  5 = best rate highlighted (MSC gets brand tint + BEST pill), CTA
  //      visible below the table from this point on — baseline frame
  //  6 = user edits Hapag-Lloyd rate (blue glow, value morphs)
  //  7 = "Edited" indicator on Hapag-Lloyd row
  //  8 = CTA pressed (scale dip)
  //  9 = empty 4th row appears (input-look cells), CTA fades to disabled
  // 10 = typing carrier "CMA CGM" cell by cell
  // 11 = typing rate "$2,980" cell by cell
  // 12 = typing transit "21d" cell by cell
  // 13 = row complete: counter 4/4, check ticks green + DONE, Approved bar
  // 14 = hold, then loop
  // Mid-story start: first frame already has the check header, the full
  // 3-row rate table, the best-rate highlight, and the CTA (phase 5) —
  // never an empty/near-empty card. Loop resets crossfade-dim back to
  // phase 5.
  const [phase, setPhase] = useState(5);
  const [cycle, setCycle] = useState(0);
  // Characters typed so far in each cell of row 4 — drives the
  // hand-typed-row illusion independently of the coarser phase timeline.
  const [typedCarrier, setTypedCarrier] = useState(0);
  const [typedRate, setTypedRate] = useState(0);
  const [typedTransit, setTypedTransit] = useState(0);

  useEffect(() => {
    const ts: NodeJS.Timeout[] = [];

    // Loop seam: no fade at all. Resetting to phase 5 unwinds the story in
    // place — row 4 exits, the CTA resets to its untapped state, the
    // edited value crossfades back, the check unticks to RUNNING —
    // reading as a fresh run starting over the same table. The card never
    // dims and never empties.
    //
    // Story: the check needs 4 quotes but the run found 3; a human edits a
    // rate, then taps "Add quote" — an empty 4th row appears and fills in
    // as if hand-typed, the check satisfies and approves.
    setPhase(5);
    setTypedCarrier(0);
    setTypedRate(0);
    setTypedTransit(0);

    ts.push(setTimeout(() => setPhase(6), 2000));    // edit glow + value change
    ts.push(setTimeout(() => setPhase(7), 3200));    // "Edited" badge
    ts.push(setTimeout(() => setPhase(8), 4600));    // CTA pressed
    ts.push(setTimeout(() => setPhase(9), 4900));    // empty 4th row appears

    // Typing schedule: carrier starts shortly after the empty row lands,
    // then rate, then transit — each a burst of per-char timeouts.
    const carrierStart = 5300;
    ts.push(setTimeout(() => setPhase(10), carrierStart));
    for (let i = 1; i <= ROW4_CARRIER.length; i++) {
      ts.push(
        setTimeout(() => setTypedCarrier(i), carrierStart + i * TYPE_MS_PER_CHAR)
      );
    }

    const rateStart = carrierStart + ROW4_CARRIER.length * TYPE_MS_PER_CHAR + 300;
    ts.push(setTimeout(() => setPhase(11), rateStart));
    for (let i = 1; i <= ROW4_RATE.length; i++) {
      ts.push(setTimeout(() => setTypedRate(i), rateStart + i * TYPE_MS_PER_CHAR));
    }

    const transitStart = rateStart + ROW4_RATE.length * TYPE_MS_PER_CHAR + 300;
    ts.push(setTimeout(() => setPhase(12), transitStart));
    for (let i = 1; i <= ROW4_TRANSIT.length; i++) {
      ts.push(
        setTimeout(() => setTypedTransit(i), transitStart + i * TYPE_MS_PER_CHAR)
      );
    }

    const rowDoneAt = transitStart + ROW4_TRANSIT.length * TYPE_MS_PER_CHAR + 400;
    ts.push(setTimeout(() => setPhase(13), rowDoneAt));       // check done + approved
    ts.push(setTimeout(() => setCycle((c) => c + 1), rowDoneAt + 3400));

    return () => ts.forEach(clearTimeout);
  }, [cycle]);

  const visibleRows = RUN_RATE_ROWS.length;
  const bestHighlighted = phase >= 5;
  const editGlow = phase === 6;
  const rateEdited = phase >= 6;
  const showEdited = phase >= 7;
  const ctaPressed = phase === 8;
  const ctaSettled = phase >= 9;
  const typingCarrier = phase === 10;
  const typingRate = phase === 11;
  const typingTransit = phase === 12;
  const row4Complete = phase >= 13;
  const checkDone = phase >= 13;
  // Counter only ticks to 4 once the hand-typed row is complete.
  const rowCount = row4Complete ? 4 : 3;

  return (
    <DemoContainer variant="light" flush>
      <MotionBox
        display="flex"
        flexDirection="column"
        h="100%"
        // Mobile's taller 4:5 card aspect ratio leaves a big dead gap below
        // the table before the approval bar (which is pinned to the bottom
        // via a flex spacer below) — center the whole stack instead so the
        // card never reads as mostly empty. Desktop keeps the original
        // top-anchored, bottom-pinned layout (unchanged, matches 4:3 card).
        justifyContent={{ base: "center", md: "flex-start" }}
        gap={{ base: 4, md: 0 }}
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
                  <Text fontSize="sm" fontWeight="700" color="#1A1A1A" fontFamily="heading">
                    Quotes Collected
                  </Text>
                </Flex>
                <StatusBadge status={checkDone ? "done" : "running"} />
              </Flex>
              <Text fontSize="xs" color="#4A443E" ml={6} fontVariantNumeric="tabular-nums">
                &#x2265; 4 carrier quotes &middot; {rowCount}/4
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

                {/* Rows 1-3 — the static comparison set */}
                <AnimatePresence initial={false}>
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
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flex
                        px={3}
                        py={{ base: 1, md: 1.5 }}
                        borderBottom="1px solid"
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
                          <AnimatePresence>
                            {isEditRow && showEdited && (
                              <MotionBox
                                key="edited-badge"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Text fontSize="9px" fontWeight="600" color="#49082D">
                                  Edited
                                </Text>
                              </MotionBox>
                            )}
                          </AnimatePresence>
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
                              ? "0 0 0 2px rgba(73,8,45,0.3)"
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
                                fontVariantNumeric="tabular-nums"
                              >
                                {displayRate}
                              </Text>
                            </MotionBox>
                          </AnimatePresence>
                        </Box>
                        <Text w="50px" fontSize="sm" color="#71717A" textAlign="right" fontVariantNumeric="tabular-nums">
                          {row.transit}
                        </Text>
                      </Flex>
                    </MotionBox>
                  );
                })}
                </AnimatePresence>

                {/* Row 4 — empty input-look cells appear on CTA tap, then
                    fill in cell by cell as if hand-typed. Exits at the
                    loop seam with the existing exit animation. */}
                <AnimatePresence initial={false}>
                  {phase >= 9 && (
                    <MotionBox
                      key="row-4"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flex px={3} py={{ base: 1, md: 1.5 }} align="center">
                        {/* Carrier cell */}
                        <Flex flex={1} align="center">
                          {typedCarrier === 0 && !row4Complete ? (
                            <Box
                              w="70px"
                              h="14px"
                              borderBottom="1.5px solid #D6D3D1"
                            />
                          ) : (
                            <Text fontSize="sm" fontWeight="500" color="#1A1A1A">
                              {ROW4_CARRIER.slice(0, typedCarrier || ROW4_CARRIER.length)}
                              {typingCarrier && <TypingCursor />}
                            </Text>
                          )}
                        </Flex>
                        {/* Rate cell */}
                        <Box w="60px" textAlign="right">
                          {typedRate === 0 && !row4Complete ? (
                            <Box
                              w="44px"
                              h="14px"
                              ml="auto"
                              borderBottom="1.5px solid #D6D3D1"
                            />
                          ) : (
                            <Text fontSize="sm" color="#1A1A1A" fontVariantNumeric="tabular-nums">
                              {ROW4_RATE.slice(0, typedRate || ROW4_RATE.length)}
                              {typingRate && <TypingCursor />}
                            </Text>
                          )}
                        </Box>
                        {/* Transit cell */}
                        <Box w="50px" textAlign="right">
                          {typedTransit === 0 && !row4Complete ? (
                            <Box
                              w="30px"
                              h="14px"
                              ml="auto"
                              borderBottom="1.5px solid #D6D3D1"
                            />
                          ) : (
                            <Text fontSize="sm" color="#71717A" fontVariantNumeric="tabular-nums">
                              {ROW4_TRANSIT.slice(0, typedTransit || ROW4_TRANSIT.length)}
                              {typingTransit && <TypingCursor />}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* "Add quote" CTA — visible from the baseline frame, presses down
            when "tapped", then stays visible but disabled-looking while
            the 4th row fills in by hand */}
        <AnimatePresence>
          {phase >= 5 && (
            <MotionBox
              key="add-quote-cta"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: ctaSettled ? 0.5 : 1,
                y: 0,
                scale: ctaPressed ? 0.96 : 1,
              }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              mt={{ base: 0, md: 2 }}
            >
              <Flex
                align="center"
                justify="center"
                w="100%"
                bg={ctaPressed ? "#38061F" : "#49082D"}
                color="white"
                borderRadius="8px"
                py={{ base: 1.5, md: 2 }}
                transition="background 0.15s"
                boxShadow={ctaPressed || ctaSettled ? "none" : "0 2px 8px rgba(73,8,45,0.25)"}
              >
                <Text fontSize="sm" fontWeight="600">+ Add quote</Text>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Spacer to push approval bar toward bottom — desktop only; mobile
            uses justify="space-between" on the outer flex instead so the
            gap between table and approval bar doesn't read as empty card. */}
        <Box flex={{ base: "0", md: "1" }} />

        {/* Approval bar — arrives once the 4th quote satisfies the check */}
        <AnimatePresence>
          {phase >= 13 && (
            <MotionBox
              key="approval"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
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
                py={{ base: 1, md: 1.5 }}
                transition="border-color 0.3s"
              >
                <Flex align="center" gap={1.5}>
                  {/* Icon circle */}
                  <Box
                    w="18px"
                    h="18px"
                    borderRadius="full"
                    bg="#10B981"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="background 0.3s"
                  >
                    <MotionBox
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <Text fontSize="9px" color="white" lineHeight="1">&#x2713;</Text>
                    </MotionBox>
                  </Box>
                  <Text fontSize="sm" color="#10B981" fontWeight="600">
                    Approved
                  </Text>
                </Flex>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text fontSize="xs" color="#9CA3AF">auto</Text>
                </MotionBox>
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
      {/* Center+distribute at every width — top-anchoring left a dead gap
          under the form box on desktop panel heights too. */}
      <Flex direction="column" flex="1" justifyContent="center" gap={{ base: 4, md: 3 }}>
      {/* Rule section */}
      <Box>
      <SectionHeader dark>Rule updated</SectionHeader>
      <Box
        bg="rgba(255,255,255,0.06)"
        border="1.5px solid"
        borderColor={phase >= 1 && phase <= 2 ? "#DFAEC0" : phase >= 6 ? "#10B981" : "rgba(255,255,255,0.12)"}
        borderRadius="8px"
        px={3}
        py={{ base: 3, md: 2 }}
        mb={{ base: 0, md: 2 }}
        transition="border-color 0.3s"
        boxShadow={phase >= 1 && phase <= 2 ? "0 0 0 2px rgba(223,174,192,0.25)" : "none"}
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Pill dark glow={phase === 1} variant={phase >= 6 ? "green" : "filled"}>
            {phase >= 2 ? "Min quotes ≥ 3" : "Min quotes ≥ 2"}
          </Pill>
          {phase >= 2 && (
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Text fontSize="xs" color="#DFAEC0" fontWeight="600">changed</Text>
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
                <Flex align="center" gap={2} bg="rgba(223,174,192,0.18)" mx={-3} px={3} py={1.5} borderRadius="8px">
                  <Box w="8px" h="8px" borderRadius="full" bg="#DFAEC0" flexShrink={0} />
                  <Text fontSize="sm" color="#DFAEC0" fontWeight="600">3rd quote required</Text>
                  <Badge bg="#DFAEC0">NEW</Badge>
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
