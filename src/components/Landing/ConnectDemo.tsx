"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { MotionBox, DemoContainer } from "./demo-primitives";
import { useIsVisible } from "@/lib/useIsVisible";

// ── Constants ──

const INTEGRATIONS = [
  { key: "slack", letter: "S", name: "Slack", color: "#E01E5A" },
  { key: "email", letter: "E", name: "Email (SMTP)", color: "#DFAEC0" },
  { key: "sheets", letter: "G", name: "Google Sheets", color: "#34A853" },
] as const;

const ACTIVITY_ITEMS = [
  { text: "Quote received from MSC", dot: "#DFAEC0", time: "just now" },
  { text: "Slack alert sent to #freight", dot: "#E01E5A", time: "2s ago" },
];

// Timing (ms)
const CARD_APPEAR_DELAY = 600;
const CONNECTING_DURATION = 1200;
const INTER_CARD_GAP = 400;
const ACTIVITY_DELAY = 800;
const ACTIVITY_STAGGER = 500;
const END_PAUSE = 1200;

type IntegrationStatus = "hidden" | "connecting" | "connected";

// The panel must never open on a bare box: the first mounted frame (and every
// loop reset, since resets crossfade back to this same state) already shows
// the CONNECTIONS header with Slack connected, so there's always a populated
// row on screen while Email/Sheets stage in behind it.
const INITIAL_STATUSES: IntegrationStatus[] = ["connected", "hidden", "hidden"];

// ── Sub-components ──

function IntegrationIcon({ letter, bg }: { letter: string; bg: string }) {
  return (
    <Flex
      w="28px"
      h="28px"
      borderRadius="8px"
      bg={bg}
      align="center"
      justify="center"
      flexShrink={0}
    >
      <Text fontSize="xs" fontWeight="700" color="white" lineHeight="1">
        {letter}
      </Text>
    </Flex>
  );
}

function PulsingDot({ color }: { color: string }) {
  return (
    <Box
      w="6px"
      h="6px"
      borderRadius="full"
      bg={color}
      flexShrink={0}
      css={{
        animation: "pulse-dot 1s infinite",
        "@keyframes pulse-dot": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
      }}
    />
  );
}

function IntegrationRow({
  letter,
  name,
  iconColor,
  status,
}: {
  letter: string;
  name: string;
  iconColor: string;
  status: IntegrationStatus;
}) {
  if (status === "hidden") return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
      display="flex"
      alignItems="center"
      gap={3}
      bg="rgba(255,255,255,0.06)"
      border="1px solid rgba(255,255,255,0.12)"
      borderRadius="10px"
      px={4}
      py={{ base: 4, md: 2.5 }}
    >
      <IntegrationIcon letter={letter} bg={iconColor} />
      <Text fontSize="sm" fontFamily="heading" color="#F8F7F4" fontWeight="600" flex="1">
        {name}
      </Text>
      {status === "connecting" && (
        <Flex align="center" gap={1.5}>
          <PulsingDot color="#F59E0B" />
          <Text fontSize="xs" color="#F59E0B" fontWeight="500">
            Connecting...
          </Text>
        </Flex>
      )}
      {status === "connected" && (
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Flex align="center" gap={1.5}>
            <Text fontSize="xs" lineHeight="1" color="#10B981">
              ✓
            </Text>
            <Text fontSize="xs" color="#10B981" fontWeight="500">
              Connected
            </Text>
          </Flex>
        </MotionBox>
      )}
    </MotionBox>
  );
}

function ActivityItem({
  text,
  dot,
  time,
  delay,
}: {
  text: string;
  dot: string;
  time: string;
  delay: number;
}) {
  return (
    <MotionBox
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay }}
      display="flex"
      alignItems="center"
      gap={2}
      py={1}
    >
      <Box
        w="5px"
        h="5px"
        borderRadius="full"
        bg={dot}
        flexShrink={0}
      />
      <Text fontSize="xs" color="rgba(255,255,255,0.5)" flex="1">
        {text}
      </Text>
      <Text fontSize="xs" color="rgba(255,255,255,0.3)">
        {time}
      </Text>
    </MotionBox>
  );
}

// ── Main component ──

export function ConnectDemo() {
  const [statuses, setStatuses] = useState<IntegrationStatus[]>(INITIAL_STATUSES);
  const [showActivity, setShowActivity] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const active = useIsVisible(rootRef);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (!active) return;
    clearTimers();
    // Slack starts pre-connected (see INITIAL_STATUSES) so the very first
    // frame already has a populated row — only Email and Sheets animate in.
    setStatuses(INITIAL_STATUSES);
    setShowActivity(false);

    const t = 0;
    const remaining = INTEGRATIONS.slice(1);

    // For each remaining integration: appear as connecting, then switch to connected
    remaining.forEach((_, ri) => {
      const i = ri + 1;
      const appearAt = t + ri * (CONNECTING_DURATION + INTER_CARD_GAP) + CARD_APPEAR_DELAY;

      // Show as connecting
      addTimer(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = "connecting";
          return next;
        });
      }, appearAt);

      // Switch to connected
      addTimer(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = "connected";
          return next;
        });
      }, appearAt + CONNECTING_DURATION);
    });

    // Calculate when all integrations are connected
    const allConnectedAt =
      CARD_APPEAR_DELAY +
      remaining.length * (CONNECTING_DURATION + INTER_CARD_GAP) -
      INTER_CARD_GAP +
      CONNECTING_DURATION;

    // Show activity feed
    addTimer(() => {
      setShowActivity(true);
    }, allConnectedAt + ACTIVITY_DELAY);

    // Restart cycle — changing the `cycle` key on the MotionBox below drives
    // an exit/enter crossfade through AnimatePresence directly, so there's
    // no separate "hidden" gap where the panel would render fully empty.
    const totalDuration =
      allConnectedAt +
      ACTIVITY_DELAY +
      ACTIVITY_STAGGER * ACTIVITY_ITEMS.length +
      END_PAUSE;

    addTimer(() => {
      setCycle((c) => c + 1);
    }, totalDuration);

    return clearTimers;
  }, [cycle, clearTimers, addTimer, active]);

  const connectedCount = statuses.filter((s) => s === "connected").length;

  return (
    <DemoContainer containerRef={rootRef} variant="maroon" flush>
      <AnimatePresence mode="wait">
        <MotionBox
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          h="100%"
        >
          {/* Header */}
          <Flex align="center" justify="space-between" mb={4}>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="rgba(255,255,255,0.5)"
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              Connections
            </Text>
            <Text
              fontSize="xs"
              color="rgba(255,255,255,0.5)"
              fontWeight="500"
              fontVariantNumeric="tabular-nums"
            >
              {connectedCount} active
            </Text>
          </Flex>

          {/* Integration rows */}
          <Flex direction="column" gap={{ base: 4, md: 2 }} mb={4}>
            <AnimatePresence>
              {INTEGRATIONS.map((intg, i) =>
                statuses[i] !== "hidden" ? (
                  <IntegrationRow
                    key={intg.key}
                    letter={intg.letter}
                    name={intg.name}
                    iconColor={intg.color}
                    status={statuses[i]}
                  />
                ) : null,
              )}
            </AnimatePresence>
          </Flex>

          {/* Activity feed — the whole column is vertically centered (see
              justifyContent="center" above), so this no longer needs to pin
              itself to the bottom with mt="auto"; that avoided a stranded
              void between the rows and a bottom-pinned feed. */}
          <AnimatePresence>
            {showActivity && (
              <MotionBox
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Flex align="center" gap={1.5} mb={2}>
                  <PulsingDot color="#10B981" />
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="#10B981"
                    letterSpacing="0.04em"
                  >
                    Data flowing
                  </Text>
                </Flex>
                <Box
                  bg="rgba(255,255,255,0.04)"
                  borderRadius="8px"
                  px={3}
                  py={2}
                  border="1px solid rgba(255,255,255,0.08)"
                >
                  {ACTIVITY_ITEMS.map((item, i) => (
                    <ActivityItem
                      key={item.text}
                      text={item.text}
                      dot={item.dot}
                      time={item.time}
                      delay={i * 0.4}
                    />
                  ))}
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>
      </AnimatePresence>
    </DemoContainer>
  );
}
