"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "motion/react";

export const MotionBox = motion.create(Box);

// Shared timing constants
export const ANIM = {
  fadeIn: 0.3,
  fadeOut: 0.2,
  stagger: 0.12,
  typingPerChar: 18,
  checkDelay: 400,
  stepDuration: 2800,
  pauseBetweenCycles: 1200,
} as const;

// Shared motion presets
export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: ANIM.fadeIn },
};

// ── Animated check row ──
// Shows a label with a check mark that animates in
export function AnimatedCheckRow({
  label,
  checked,
  delay = 0,
  variant = "light",
}: {
  label: string;
  checked: boolean;
  delay?: number;
  variant?: "light" | "dark" | "maroon";
}) {
  const colors = {
    light: { text: "#1A1A1A", muted: "#4A443E", border: "#E7E5E4", checkBg: "#10B981", bg: "#FFFFFF" },
    dark: { text: "#F8F7F4", muted: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.12)", checkBg: "#10B981", bg: "rgba(255,255,255,0.05)" },
    maroon: { text: "#F8F7F4", muted: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.12)", checkBg: "#10B981", bg: "rgba(255,255,255,0.06)" },
  };
  const c = colors[variant];

  return (
    <MotionBox
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
      display="flex"
      alignItems="center"
      gap={2.5}
      py={2}
      px={3}
      borderBottom="1px solid"
      borderColor={c.border}
    >
      <Box
        w="18px"
        h="18px"
        borderRadius="8px"
        bg={checked ? c.checkBg : "transparent"}
        border={checked ? "none" : `1.5px solid ${c.border}`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
        flexShrink={0}
      >
        {checked && (
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Text fontSize="10px" color="white" lineHeight="1">✓</Text>
          </MotionBox>
        )}
      </Box>
      <Text fontSize="xs" color={checked ? c.text : c.muted} fontWeight={checked ? "500" : "400"}>
        {label}
      </Text>
    </MotionBox>
  );
}

// ── Status badge ──
export function StatusBadge({
  status,
}: {
  status: "running" | "review" | "done";
}) {
  const config = {
    running: { bg: "#3B82F6", label: "RUNNING" },
    review: { bg: "#F59E0B", label: "REVIEW" },
    done: { bg: "#10B981", label: "DONE" },
  };
  const { bg, label } = config[status];

  return (
    <MotionBox
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Box
        bg={bg}
        color="white"
        fontSize="9px"
        fontWeight="700"
        letterSpacing="0.05em"
        px={2}
        py={0.5}
        borderRadius="8px"
      >
        {label}
      </Box>
    </MotionBox>
  );
}

// ── Typing cursor ──
export function TypingCursor({ color = "#49082D" }: { color?: string }) {
  return (
    <Box
      as="span"
      display="inline-block"
      w="2px"
      h="14px"
      bg={color}
      ml="1px"
      verticalAlign="middle"
      css={{
        animation: "blink 0.7s infinite",
        "@keyframes blink": {
          "0%, 45%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      }}
    />
  );
}

// ── Rule card ──
// A mini rule/condition card used in multiple demos
export function RuleCard({
  label,
  value,
  highlighted = false,
  variant = "light",
}: {
  label: string;
  value: string;
  highlighted?: boolean;
  variant?: "light" | "dark" | "maroon";
}) {
  const colors = {
    light: { bg: "#FFFFFF", border: "#D6D3D1", labelColor: "#4A443E", valueColor: "#1A1A1A", hlBorder: "#49082D" },
    dark: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", labelColor: "rgba(255,255,255,0.5)", valueColor: "#F8F7F4", hlBorder: "#F8F7F4" },
    maroon: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", labelColor: "rgba(255,255,255,0.5)", valueColor: "#F8F7F4", hlBorder: "#F8F7F4" },
  };
  const c = colors[variant];

  return (
    <Box
      bg={c.bg}
      border="1px solid"
      borderColor={highlighted ? c.hlBorder : c.border}
      borderRadius="8px"
      px={3}
      py={2}
      mb={2}
    >
      <Text fontSize="9px" fontWeight="600" color={c.labelColor} textTransform="uppercase" letterSpacing="0.06em" mb={0.5}>
        {label}
      </Text>
      <Text fontSize="xs" color={c.valueColor} fontWeight="500">
        {value}
      </Text>
    </Box>
  );
}

// ── Mini form field ──
export function MiniField({
  label,
  value,
  variant = "light",
}: {
  label: string;
  value: string;
  variant?: "light" | "dark" | "maroon";
}) {
  const colors = {
    light: { bg: "#FFFFFF", border: "#E7E5E4", labelColor: "#4A443E", valueColor: "#1A1A1A" },
    dark: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", labelColor: "rgba(255,255,255,0.5)", valueColor: "#F8F7F4" },
    maroon: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)", labelColor: "rgba(255,255,255,0.5)", valueColor: "#F8F7F4" },
  };
  const c = colors[variant];

  return (
    <Box mb={2}>
      <Text fontSize="9px" fontWeight="500" color={c.labelColor} mb={0.5} textTransform="uppercase" letterSpacing="0.04em">
        {label}
      </Text>
      <Box bg={c.bg} border="1px solid" borderColor={c.border} borderRadius="8px" px={2.5} py={1.5}>
        <Text fontSize="xs" color={c.valueColor}>{value}</Text>
      </Box>
    </Box>
  );
}

// ── Demo container ──
// Wraps each animation in a consistent card shell
export function DemoContainer({
  children,
  variant = "light",
  aspectRatio,
  flush = false,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "maroon";
  aspectRatio?: string | Record<string, string>;
  flush?: boolean;
}) {
  const styles = {
    light: {
      bg: "#FFFFFF",
      border: "#D6D3D1",
      shadow: "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
      innerBg: "#FAFAF9",
    },
    dark: {
      bg: "rgba(255,255,255,0.06)",
      border: "rgba(255,255,255,0.12)",
      shadow: "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      innerBg: "rgba(255,255,255,0.03)",
    },
    maroon: {
      bg: "rgba(255,255,255,0.06)",
      border: "rgba(255,255,255,0.12)",
      shadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      innerBg: "rgba(255,255,255,0.03)",
    },
  };
  const s = styles[variant];

  return (
    <Box
      bg={flush ? s.innerBg : s.bg}
      border={flush ? "none" : "1px solid"}
      borderColor={flush ? "transparent" : s.border}
      borderRadius={flush ? "0" : "12px"}
      boxShadow={flush ? "none" : s.shadow}
      w="100%"
      h="100%"
      position="relative"
      overflow="hidden"
      pointerEvents="none"
      userSelect="none"
      {...(aspectRatio ? { aspectRatio } : {})}
    >
      <Box
        position="absolute"
        inset={0}
        p={{ base: 4, md: 6 }}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        bg={s.innerBg}
      >
        {children}
      </Box>
    </Box>
  );
}

// ── Progress dots (like HeroDemo) ──
export function ProgressDots({
  total,
  current,
  variant = "light",
}: {
  total: number;
  current: number;
  variant?: "light" | "dark" | "maroon";
}) {
  const colors = {
    light: { done: "#10B981", active: "#49082D", inactive: "#E7E5E4", text: "#4A443E", doneText: "white", activeText: "white" },
    dark: { done: "#10B981", active: "#F8F7F4", inactive: "rgba(255,255,255,0.15)", text: "rgba(255,255,255,0.5)", doneText: "white", activeText: "#1A1A1A" },
    maroon: { done: "#10B981", active: "#F8F7F4", inactive: "rgba(255,255,255,0.15)", text: "rgba(255,255,255,0.5)", doneText: "white", activeText: "#49082D" },
  };
  const c = colors[variant];

  return (
    <Flex align="center" gap={1.5}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <Flex key={i} align="center" gap={1}>
            <Box
              w="20px"
              h="20px"
              borderRadius="full"
              bg={isDone ? c.done : isActive ? c.active : "transparent"}
              border="1.5px solid"
              borderColor={isDone ? c.done : isActive ? c.active : c.inactive}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.2s"
            >
              {isDone ? (
                <Text fontSize="9px" color={c.doneText} lineHeight="1">✓</Text>
              ) : (
                <Text fontSize="9px" color={isActive ? c.activeText : c.text} fontWeight="600" lineHeight="1">
                  {i + 1}
                </Text>
              )}
            </Box>
            {i < total - 1 && (
              <Box w="10px" h="1.5px" bg={isDone ? c.done : c.inactive} transition="all 0.2s" />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
