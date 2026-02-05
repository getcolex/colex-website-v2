"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const MotionBox = motion.create(Box);

// Task UI types
type TaskUI =
  | { type: "table"; title: string; rows: string[] }
  | { type: "email"; to: string; subject: string; preview: string }
  | { type: "form"; title: string; fields: string[] }
  | { type: "gallery"; title: string; count: number }
  | { type: "confirmation"; message: string };

interface Task {
  label: string;
  ui: TaskUI;
}

interface Workflow {
  request: string;
  tasks: Task[];
}

// Workflows with multi-step tasks
const workflows: Workflow[] = [
  {
    request: "Send invoice reminders every Monday",
    tasks: [
      {
        label: "Find overdue invoices",
        ui: {
          type: "table",
          title: "Overdue Invoices",
          rows: ["Acme Corp — $2,400", "Beta LLC — $890"],
        },
      },
      {
        label: "Draft reminder emails",
        ui: {
          type: "email",
          to: "billing@acme.corp",
          subject: "Payment Reminder: Invoice #1042",
          preview: "Hi, this is a friendly reminder that your invoice is overdue...",
        },
      },
      {
        label: "Send and log",
        ui: { type: "confirmation", message: "2 emails sent, logged to sheet" },
      },
    ],
  },
  {
    request: "Qualify leads from today's signups",
    tasks: [
      {
        label: "Pull new signups",
        ui: {
          type: "table",
          title: "New Leads",
          rows: ["Sarah Chen — SaaS", "Mike Ross — Legal"],
        },
      },
      {
        label: "Score each lead",
        ui: {
          type: "form",
          title: "Lead Score",
          fields: ["Company: Series B", "Score: 85 — High"],
        },
      },
      {
        label: "Update CRM",
        ui: { type: "confirmation", message: "2 leads synced to HubSpot" },
      },
    ],
  },
  {
    request: "Create social posts from blog",
    tasks: [
      {
        label: "Extract key points",
        ui: {
          type: "table",
          title: "Content",
          rows: ["5 productivity tips", "Tool recommendations"],
        },
      },
      {
        label: "Generate graphics",
        ui: { type: "gallery", title: "Graphics", count: 3 },
      },
      {
        label: "Draft posts",
        ui: {
          type: "email",
          to: "Twitter, LinkedIn",
          subject: "Ready to publish",
          preview: "🚀 5 productivity hacks that actually work...",
        },
      },
    ],
  },
];

const TASK_DURATION = 3200; // Time per task
const TYPING_DURATION = 1000;

type TaskPhase = "running" | "review" | "approved";

export default function HeroDemo() {
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [activeTaskIndex, setActiveTaskIndex] = useState(-1);
  const [taskPhase, setTaskPhase] = useState<TaskPhase>("running");
  const [typedChars, setTypedChars] = useState(0);

  const workflow = workflows[workflowIndex];
  const activeTask = activeTaskIndex >= 0 ? workflow.tasks[activeTaskIndex] : null;

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Reset
    setActiveTaskIndex(-1);
    setTaskPhase("running");
    setTypedChars(0);

    // Typing
    const len = workflow.request.length;
    for (let i = 0; i <= len; i++) {
      timeouts.push(setTimeout(() => setTypedChars(i), (i * TYPING_DURATION) / len));
    }

    // Start tasks
    const numTasks = workflow.tasks.length;
    for (let t = 0; t < numTasks; t++) {
      const start = TYPING_DURATION + 200 + t * TASK_DURATION;

      // Activate task
      timeouts.push(setTimeout(() => {
        setActiveTaskIndex(t);
        setTaskPhase("running");
      }, start));

      // Review
      timeouts.push(setTimeout(() => setTaskPhase("review"), start + 1200));

      // Approve
      timeouts.push(setTimeout(() => setTaskPhase("approved"), start + 2400));
    }

    // Next workflow
    const total = TYPING_DURATION + 200 + numTasks * TASK_DURATION + 800;
    timeouts.push(setTimeout(() => {
      setWorkflowIndex((prev) => (prev + 1) % workflows.length);
    }, total));

    return () => timeouts.forEach(clearTimeout);
  }, [workflowIndex, workflow.request.length, workflow.tasks.length]);

  const renderUI = (ui: TaskUI) => {
    switch (ui.type) {
      case "table":
        return (
          <Box>
            <Text fontSize="sm" fontWeight="600" color="brand.primary" mb={3} fontFamily="heading">
              {ui.title}
            </Text>
            {/* Table header */}
            <Flex bg="ui.borderLight" borderRadius="4px 4px 0 0" border="1px solid" borderColor="ui.border" borderBottom="none">
              <Box w="28px" p={2} borderRight="1px solid" borderColor="ui.border">
                <Box w="12px" h="12px" border="1.5px solid" borderColor="ui.border" borderRadius="2px" bg="white" />
              </Box>
              <Box flex={1} p={2}>
                <Text fontSize="10px" fontWeight="600" color="text.muted" textTransform="uppercase">Name</Text>
              </Box>
              <Box w="70px" p={2} borderLeft="1px solid" borderColor="ui.border">
                <Text fontSize="10px" fontWeight="600" color="text.muted" textTransform="uppercase">Industry</Text>
              </Box>
            </Flex>
            {/* Table rows */}
            {ui.rows.map((row, i) => {
              const [name, industry] = row.split(" — ");
              return (
                <Flex
                  key={i}
                  bg={i % 2 === 0 ? "white" : "ui.surface"}
                  border="1px solid"
                  borderColor="ui.border"
                  borderTop="none"
                  borderRadius={i === ui.rows.length - 1 ? "0 0 4px 4px" : "0"}
                >
                  <Box w="28px" p={2} borderRight="1px solid" borderColor="ui.border" display="flex" alignItems="center" justifyContent="center">
                    <Box w="12px" h="12px" border="1.5px solid" borderColor="ui.border" borderRadius="2px" bg="white" />
                  </Box>
                  <Box flex={1} p={2}>
                    <Text fontSize="xs" color="text.primary">{name}</Text>
                  </Box>
                  <Box w="70px" p={2} borderLeft="1px solid" borderColor="ui.border">
                    <Text fontSize="xs" color="text.muted">{industry}</Text>
                  </Box>
                </Flex>
              );
            })}
          </Box>
        );
      case "email":
        return (
          <Box>
            {/* Email header */}
            <Flex gap={2} mb={2} align="center">
              <Text fontSize="xs" color="text.muted" fontWeight="500">To:</Text>
              <Box bg="ui.surface" border="1px solid" borderColor="ui.border" borderRadius="4px" px={2} py={0.5}>
                <Text fontSize="xs" color="text.primary">{ui.to}</Text>
              </Box>
            </Flex>
            {/* Subject */}
            <Box bg="white" border="1px solid" borderColor="ui.border" borderRadius="4px" px={3} py={2} mb={2}>
              <Text fontSize="sm" fontWeight="600" color="text.primary">{ui.subject}</Text>
            </Box>
            {/* Body preview */}
            <Box bg="white" border="1px solid" borderColor="ui.border" borderRadius="4px" px={3} py={2} mb={3} minH="40px">
              <Text fontSize="xs" color="text.muted" lineHeight="1.5">{ui.preview.slice(0, 55)}...</Text>
            </Box>
            {/* Action buttons */}
            <Flex gap={2} justify="flex-end">
              <Box bg="white" border="1px solid" borderColor="ui.border" borderRadius="4px" px={3} py={1.5}>
                <Text fontSize="xs" color="text.muted" fontWeight="500">Edit</Text>
              </Box>
              <Box bg="brand.primary" borderRadius="4px" px={3} py={1.5}>
                <Text fontSize="xs" color="white" fontWeight="500">Send →</Text>
              </Box>
            </Flex>
          </Box>
        );
      case "form":
        return (
          <Box>
            <Text fontSize="sm" fontWeight="600" color="brand.primary" mb={3} fontFamily="heading">
              {ui.title}
            </Text>
            {ui.fields.map((field, i) => {
              const [label, value] = field.split(": ");
              return (
                <Box key={i} mb={3}>
                  <Text fontSize="10px" fontWeight="500" color="text.muted" mb={1} textTransform="uppercase">{label}</Text>
                  <Box bg="white" border="1px solid" borderColor="ui.border" borderRadius="6px" px={3} py={2}>
                    <Text fontSize="sm" color="text.primary">{value}</Text>
                  </Box>
                </Box>
              );
            })}
            {/* Save button */}
            <Flex justify="flex-end" mt={2}>
              <Box bg="brand.primary" borderRadius="4px" px={4} py={1.5}>
                <Text fontSize="xs" color="white" fontWeight="500">Save</Text>
              </Box>
            </Flex>
          </Box>
        );
      case "gallery":
        return (
          <Box>
            <Text fontSize="sm" fontWeight="600" color="brand.primary" mb={3} fontFamily="heading">
              {ui.title}
            </Text>
            {/* Image grid */}
            <Flex gap={2} flexWrap="wrap" mb={3}>
              {Array.from({ length: ui.count }).map((_, i) => (
                <Box
                  key={i}
                  w="56px"
                  h="56px"
                  bg="linear-gradient(135deg, #e4e4e7 0%, #d4d4d8 100%)"
                  borderRadius="6px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid"
                  borderColor="ui.border"
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="absolute" bottom={1} right={1} bg="white" borderRadius="2px" px={1}>
                    <Text fontSize="8px" color="text.muted">.png</Text>
                  </Box>
                  <Text fontSize="20px" opacity={0.5}>🖼️</Text>
                </Box>
              ))}
            </Flex>
            {/* Action button */}
            <Flex justify="flex-end">
              <Box bg="brand.primary" borderRadius="4px" px={3} py={1.5}>
                <Text fontSize="xs" color="white" fontWeight="500">Post All →</Text>
              </Box>
            </Flex>
          </Box>
        );
      case "confirmation":
        return (
          <Flex align="center" gap={3} bg="status.success" borderRadius="6px" p={3} opacity={0.9}>
            <Box w="24px" h="24px" borderRadius="full" bg="white" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="sm" color="status.success">✓</Text>
            </Box>
            <Text fontSize="sm" color="white" fontWeight="500">{ui.message}</Text>
          </Flex>
        );
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="ui.border"
      boxShadow="0 8px 32px rgba(0,0,0,0.08)"
      p={{ base: 5, md: 6 }}
      w="full"
      h="560px"
      pointerEvents="none"
      userSelect="none"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      {/* Share badge */}
      <Box position="absolute" top={4} right={4} bg="ui.surface" px={2} py={1} borderRadius="4px" border="1px solid" borderColor="ui.borderLight">
        <Text fontSize="10px" color="text.muted" fontWeight="500" letterSpacing="0.02em">SHARE WITH TEAM</Text>
      </Box>

      {/* Request */}
      <Box mb={5}>
        <Text fontSize="xs" color="text.muted" mb={2} fontWeight="500">Create workflow</Text>
        <Box bg="ui.surface" border="1px solid" borderColor="ui.border" borderRadius="8px" p={3} minH="56px">
          <Text fontSize="sm" color="text.primary" lineHeight="1.5">
            {workflow.request.slice(0, typedChars)}
            {activeTaskIndex === -1 && (
              <Box as="span" display="inline-block" w="2px" h="16px" bg="brand.primary" ml="1px" verticalAlign="middle"
                css={{ animation: "blink 0.7s infinite", "@keyframes blink": { "0%, 45%": { opacity: 1 }, "50%, 100%": { opacity: 0 } } }}
              />
            )}
          </Text>
        </Box>
      </Box>

      {/* Task progress - compact horizontal dots */}
      <Flex align="center" gap={2} mb={5}>
        <Text fontSize="xs" color="text.muted" fontWeight="500">Tasks:</Text>
        {workflow.tasks.map((task, i) => {
          const isActive = i === activeTaskIndex;
          const isDone = i < activeTaskIndex || (isActive && taskPhase === "approved");
          return (
            <Flex key={i} align="center" gap={1.5}>
              <Box
                w="24px" h="24px"
                borderRadius="full"
                bg={isDone ? "status.success" : isActive ? "brand.primary" : "ui.surface"}
                border="2px solid"
                borderColor={isDone ? "status.success" : isActive ? "brand.primary" : "ui.border"}
                display="flex" alignItems="center" justifyContent="center"
                transition="all 0.2s"
              >
                {isDone ? (
                  <Text fontSize="xs" color="white">✓</Text>
                ) : (
                  <Text fontSize="xs" color={isActive ? "white" : "text.muted"} fontWeight="500">{i + 1}</Text>
                )}
              </Box>
              {i < workflow.tasks.length - 1 && (
                <Box w="16px" h="2px" bg={isDone ? "status.success" : "ui.border"} transition="all 0.2s" />
              )}
            </Flex>
          );
        })}
      </Flex>

      {/* Active task UI - fixed height container */}
      <Box flex={1} position="relative" mb={4} overflow="hidden">
        <AnimatePresence mode="wait">
          {activeTask && (
            <MotionBox
              key={`${workflowIndex}-${activeTaskIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              bg="ui.surface"
              border="1px solid"
              borderColor={taskPhase === "approved" ? "status.success" : "brand.primary"}
              borderRadius="10px"
              p={4}
              position="absolute"
              top={0}
              left={0}
              right={0}
              maxH="100%"
              overflow="hidden"
            >
              <Text fontSize="10px" color="text.muted" mb={2} fontWeight="600" letterSpacing="0.03em">
                {activeTask.label.toUpperCase()}
              </Text>
              {renderUI(activeTask.ui)}
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {/* Approval bar */}
      <Box pt={4} borderTop="1px solid" borderColor="ui.borderLight" h="56px" flexShrink={0}>
        <AnimatePresence>
          {activeTask && (taskPhase === "review" || taskPhase === "approved") && (
            <MotionBox
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={2}>
                  <Box
                    w="24px" h="24px"
                    borderRadius="full"
                    bg={taskPhase === "approved" ? "status.success" : "brand.primary"}
                    display="flex" alignItems="center" justifyContent="center"
                  >
                    <Text fontSize="xs" color="white">{taskPhase === "approved" ? "✓" : "👤"}</Text>
                  </Box>
                  <Text fontSize="sm" fontWeight="500" color="text.primary">
                    {taskPhase === "approved" ? "Approved" : "Review needed"}
                  </Text>
                </Flex>
                {taskPhase === "approved" && (
                  <MotionBox initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                    <Box bg="status.success" color="white" fontSize="xs" fontWeight="600" px={2.5} py={1} borderRadius="4px">
                      DONE
                    </Box>
                  </MotionBox>
                )}
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
