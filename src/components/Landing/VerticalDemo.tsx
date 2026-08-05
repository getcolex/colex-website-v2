"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  MotionBox,
  ANIM,
  DemoContainer,
  StatusBadge,
} from "./demo-primitives";

/* ── Color tokens (dark bg) ── */
const C = {
  text: "#F8F7F4",
  muted: "rgba(255,255,255,0.4)",
  border: "rgba(255,255,255,0.1)",
  cardBg: "rgba(255,255,255,0.05)",
  green: "#10B981",
  blue: "#3B82F6",
  amber: "#F59E0B",
  trackBg: "rgba(255,255,255,0.1)",
  fieldBg: "rgba(255,255,255,0.06)",
  fieldBorder: "rgba(255,255,255,0.1)",
} as const;

/* ── Types ── */
interface FormField {
  label: string;
  value: string;
  type?: "text" | "dropdown" | "number";
  required?: boolean;
  statusColor?: "green" | "amber";
}

interface TableRow {
  cells: string[];
  highlight?: "amber" | "red";
}

interface CheckDef {
  name: string;
  visualization: "form" | "table" | "status" | "checklist";
  formFields?: FormField[];
  tableHeaders?: string[];
  tableRows?: TableRow[];
  statusText?: string;
  statusColor?: "green" | "amber";
  checklistItems?: string[];
  submitLabel?: string;
}

interface GoalDef {
  name: string;
  checks: CheckDef[];
}

interface PromptDemo {
  goals: GoalDef[];
}

/* ── All 10 prompt demos ── */
const DEMO_DATA: Record<string, PromptDemo[]> = {
  freight: [
    {
      goals: [
        {
          name: "Lane Defined",
          checks: [
            {
              name: "Lane Defined",
              visualization: "form",
              formFields: [
                { label: "Mode", value: "FTL", type: "dropdown" },
                { label: "Origin", value: "Shanghai, CN", required: true },
                { label: "Destination", value: "Rotterdam, NL", required: true },
              ],
              submitLabel: "Submit form",
            },
          ],
        },
        {
          name: "Quotes Collected",
          checks: [
            {
              name: "Carrier Quotes",
              visualization: "table",
              tableHeaders: ["Carrier", "Price", "Transit"],
              tableRows: [
                { cells: ["Maersk", "$4,820", "28d"] },
                { cells: ["MSC", "$4,350", "31d"] },
                { cells: ["CMA CGM", "$4,690", "29d"] },
              ],
            },
          ],
        },
      ],
    },
    {
      goals: [
        {
          name: "Invoice Parsed",
          checks: [
            {
              name: "Charges Extracted",
              visualization: "table",
              tableHeaders: ["Charge", "Amount", "Auth?"],
              tableRows: [
                { cells: ["Fuel surcharge", "$340", "Yes"] },
                { cells: ["Detention", "$275", "No"], highlight: "amber" },
                { cells: ["Liftgate", "$150", "Yes"] },
              ],
            },
          ],
        },
        {
          name: "Exceptions Flagged",
          checks: [
            {
              name: "Unauthorized Charges",
              visualization: "status",
              statusText: "2 charges flagged for review",
              statusColor: "amber",
            },
          ],
        },
      ],
    },
  ],
  procurement: [
    {
      goals: [
        {
          name: "PO Matched",
          checks: [
            {
              name: "Invoice-PO Match",
              visualization: "form",
              formFields: [
                { label: "Invoice #", value: "INV-2024-0847", required: true },
                { label: "PO #", value: "PO-3391", required: true },
                { label: "Match", value: "Confirmed", statusColor: "green" },
              ],
              submitLabel: "Confirm match",
            },
          ],
        },
        {
          name: "Goods Received",
          checks: [
            {
              name: "Receipt Verified",
              visualization: "status",
              statusText: "Goods receipt GR-7712 confirmed",
              statusColor: "green",
            },
          ],
        },
      ],
    },
    {
      goals: [
        {
          name: "Budget Checked",
          checks: [
            {
              name: "Budget Availability",
              visualization: "form",
              formFields: [
                { label: "Department", value: "Engineering", type: "dropdown" },
                { label: "Amount", value: "$45,000.00", type: "number" },
                { label: "Available", value: "$12,340.00", statusColor: "green" },
              ],
              submitLabel: "Approve spend",
            },
          ],
        },
        {
          name: "Vendor Approved",
          checks: [
            {
              name: "Vendor Status",
              visualization: "status",
              statusText: "Vendor VN-4401 approved and active",
              statusColor: "green",
            },
          ],
        },
      ],
    },
  ],
  vendor: [
    {
      goals: [
        {
          name: "Registration Verified",
          checks: [
            {
              name: "Company Registration",
              visualization: "form",
              formFields: [
                { label: "Company", value: "Nexora Supply Ltd", required: true },
                { label: "Reg #", value: "GB-09281744", required: true },
                { label: "Status", value: "Verified", statusColor: "green" },
              ],
              submitLabel: "Confirm registration",
            },
          ],
        },
        {
          name: "Bank Details Confirmed",
          checks: [
            {
              name: "Bank Verification",
              visualization: "checklist",
              checklistItems: [
                "Callback initiated",
                "Confirmed via second channel",
              ],
            },
          ],
        },
      ],
    },
    {
      goals: [
        {
          name: "Change Logged",
          checks: [
            {
              name: "Bank Change Request",
              visualization: "form",
              formFields: [
                { label: "Current bank", value: "HSBC ****4412" },
                { label: "New bank", value: "Barclays ****7789" },
              ],
              submitLabel: "Log change",
            },
          ],
        },
        {
          name: "Dual Auth",
          checks: [
            {
              name: "Dual Authorization",
              visualization: "checklist",
              checklistItems: [
                "Finance controller approved",
                "Treasury manager approved",
              ],
            },
          ],
        },
      ],
    },
  ],
  hr: [
    {
      goals: [
        {
          name: "Contract Ready",
          checks: [
            {
              name: "Employment Contract",
              visualization: "form",
              formFields: [
                { label: "Name", value: "Sarah Chen", required: true },
                { label: "Role", value: "Senior Engineer" },
                { label: "Start Date", value: "2024-09-02" },
              ],
              submitLabel: "Generate contract",
            },
          ],
        },
        {
          name: "Access Provisioned",
          checks: [
            {
              name: "Provisioning Checklist",
              visualization: "checklist",
              checklistItems: [
                "Laptop shipped",
                "Accounts created",
                "Badge printed",
              ],
            },
          ],
        },
      ],
    },
    {
      goals: [
        {
          name: "Access Revoked",
          checks: [
            {
              name: "System Access",
              visualization: "table",
              tableHeaders: ["System", "Status"],
              tableRows: [
                { cells: ["Email", "Revoked"], highlight: "red" },
                { cells: ["VPN", "Revoked"], highlight: "red" },
                { cells: ["GitHub", "Revoked"], highlight: "red" },
              ],
            },
          ],
        },
        {
          name: "Final Pay",
          checks: [
            {
              name: "Pay Calculation",
              visualization: "form",
              formFields: [
                { label: "Last Day", value: "2024-08-30" },
                { label: "Owed", value: "$3,420.00", type: "number" },
                { label: "Deductions", value: "$180.00", type: "number" },
              ],
              submitLabel: "Process final pay",
            },
          ],
        },
      ],
    },
  ],
  finance: [
    {
      goals: [
        {
          name: "Accruals Posted",
          checks: [
            {
              name: "Uninvoiced Accruals",
              visualization: "table",
              tableHeaders: ["Shipment", "Amount", "Status"],
              tableRows: [
                { cells: ["SHP-4401", "$2,180", "Accrued"] },
                { cells: ["SHP-4455", "$1,740", "Accrued"] },
                { cells: ["SHP-4462", "$890", "Pending"] },
              ],
            },
          ],
        },
        {
          name: "Bank Reconciled",
          checks: [
            {
              name: "Reconciliation Summary",
              visualization: "form",
              formFields: [
                { label: "Matched", value: "147 lines" },
                { label: "Unmatched", value: "3 lines", type: "number" },
                { label: "Variance", value: "$42.10", type: "number" },
              ],
              submitLabel: "Close reconciliation",
            },
          ],
        },
      ],
    },
    {
      goals: [
        {
          name: "Statement Imported",
          checks: [
            {
              name: "Vendor Statement Lines",
              visualization: "table",
              tableHeaders: ["Date", "Ref", "Amount"],
              tableRows: [
                { cells: ["Jul 02", "INV-8812", "$4,200"] },
                { cells: ["Jul 15", "INV-8840", "$1,890"] },
                { cells: ["Jul 22", "CN-0044", "-$310"] },
              ],
            },
          ],
        },
        {
          name: "Exceptions Surfaced",
          checks: [
            {
              name: "Unmatched Items",
              visualization: "status",
              statusText: "3 unmatched items",
              statusColor: "amber",
            },
          ],
        },
      ],
    },
  ],
};

/* ── Animation timing ── */
const PHASE_FORM_FIELD = 500;
const PHASE_FORM_SUBMIT = 800;
const PHASE_TABLE_ROW = 400;
const PHASE_CHECK_ITEM = 500;
const PHASE_GOAL_PAUSE = 600;
const PHASE_STATUS_SHOW = 500;
const LOOP_PAUSE = 2000;

/* ── Sub-components ── */

function ProgressBar({
  completed,
  total,
  needsYou,
}: {
  completed: number;
  total: number;
  needsYou: number;
}) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const allDone = completed === total;
  return (
    <Box mb={3}>
      <Flex align="center" justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="600" color={C.text}>
          {completed}/{total}
        </Text>
        {needsYou > 0 && (
          <Text fontSize="sm" color={C.blue} fontWeight="500">
            {needsYou} needs you &rarr;
          </Text>
        )}
        {allDone && (
          <StatusBadge status="done" />
        )}
      </Flex>
      <Box bg={C.trackBg} borderRadius="2px" h="5px" overflow="hidden">
        <Box
          bg={allDone ? C.green : C.blue}
          h="100%"
          borderRadius="2px"
          w={`${pct}%`}
          transition="width 0.4s ease, background 0.3s"
        />
      </Box>
    </Box>
  );
}

function GoalCard({
  goal,
  state,
  activeCheckViz,
}: {
  goal: GoalDef;
  state: "active" | "done" | "waiting";
  activeCheckViz: React.ReactNode | null;
}) {
  const checkStatusColor =
    state === "done" ? C.green : state === "active" ? C.text : C.muted;
  const checkStatusText =
    state === "done"
      ? "Complete"
      : state === "active"
        ? "In progress"
        : "Waiting";

  return (
    <Box
      bg={C.cardBg}
      borderRadius="8px"
      px={3}
      py={2.5}
      mb={3}
    >
      <Flex
        align="center"
        justify="space-between"
        mb={state === "active" && activeCheckViz ? 2 : 0}
      >
        <Box>
          <Text fontSize="sm" fontWeight="600" color={C.text} mb={0.5}>
            {goal.name}
          </Text>
          <Text fontSize="xs" color={checkStatusColor} fontWeight="500">
            {state === "waiting"
              ? "Waiting for previous goal"
              : goal.checks[0]?.name ?? ""}
            {state !== "waiting" && (
              <Box as="span" ml={1.5} color={checkStatusColor} fontSize="xs">
                &middot; {checkStatusText}
              </Box>
            )}
          </Text>
        </Box>
        {state === "done" && (
          <Box
            w="16px"
            h="16px"
            borderRadius="full"
            bg={C.green}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Text fontSize="9px" color="white" lineHeight="1">
              &#10003;
            </Text>
          </Box>
        )}
        {state === "active" && (
          <Box
            w="6px"
            h="6px"
            borderRadius="full"
            bg={C.blue}
            flexShrink={0}
            css={{
              animation: "goal-pulse 1.5s infinite",
              "@keyframes goal-pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.3 },
              },
            }}
          />
        )}
        {state === "waiting" && (
          <Box
            w="16px"
            h="16px"
            borderRadius="full"
            border="1.5px solid"
            borderColor={C.border}
            flexShrink={0}
          />
        )}
      </Flex>
      {state === "active" && activeCheckViz && (
        <Box mt={2}>{activeCheckViz}</Box>
      )}
    </Box>
  );
}

function FormViz({
  fields,
  visibleCount,
  submitted,
  submitLabel,
}: {
  fields: FormField[];
  visibleCount: number;
  submitted: boolean;
  submitLabel?: string;
}) {
  return (
    <Box>
      {fields.map((f, i) => {
        if (i >= visibleCount) return null;
        const statusColor = f.statusColor === "green" ? C.green : f.statusColor === "amber" ? C.amber : undefined;
        return (
          <MotionBox
            key={f.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            mb={2}
          >
            <Flex align="center" gap={0.5} mb={0.5}>
              <Text
                fontSize="xs"
                fontWeight="500"
                color={C.muted}
                textTransform="uppercase"
                letterSpacing="0.04em"
              >
                {f.label}
              </Text>
              {f.required && (
                <Text fontSize="xs" color={C.blue} fontWeight="600">
                  *
                </Text>
              )}
            </Flex>
            <Flex
              bg={C.fieldBg}
              border="1px solid"
              borderColor={statusColor ?? C.fieldBorder}
              borderRadius="8px"
              px={2}
              py={1}
              align="center"
              justify="space-between"
            >
              <Text fontSize="sm" color={statusColor ?? C.text}>
                {f.value}
              </Text>
              {f.type === "dropdown" && (
                <Text fontSize="xs" color={C.muted} ml={1}>
                  &darr;
                </Text>
              )}
              {f.type === "number" && (
                <Flex direction="column" gap={0} ml={1}>
                  <Text fontSize="8px" color={C.muted} lineHeight="1">
                    &uarr;
                  </Text>
                  <Text fontSize="8px" color={C.muted} lineHeight="1">
                    &darr;
                  </Text>
                </Flex>
              )}
            </Flex>
          </MotionBox>
        );
      })}
      {visibleCount >= fields.length && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          mt={2}
        >
          <Flex
            bg={submitted ? C.green : "#333"}
            borderRadius="8px"
            px={3}
            py={1.5}
            justify="center"
            transition="background 0.3s"
          >
            <Text fontSize="sm" fontWeight="600" color="white">
              {submitted ? "Submitted" : (submitLabel ?? "Submit form")}
            </Text>
          </Flex>
        </MotionBox>
      )}
    </Box>
  );
}

function TableViz({
  headers,
  rows,
  visibleRowCount,
}: {
  headers: string[];
  rows: TableRow[];
  visibleRowCount: number;
}) {
  return (
    <Box
      border="1px solid"
      borderColor={C.border}
      borderRadius="8px"
      overflow="hidden"
      fontSize="sm"
    >
      {/* Header */}
      <Flex
        bg="rgba(255,255,255,0.06)"
        borderBottom="1px solid"
        borderColor={C.border}
      >
        {headers.map((h) => (
          <Text
            key={h}
            flex={1}
            px={1.5}
            py={1}
            color="rgba(255,255,255,0.6)"
            fontWeight="600"
            borderRight="1px solid"
            borderColor={C.border}
            css={{ "&:last-child": { borderRight: "none" } }}
          >
            {h}
          </Text>
        ))}
      </Flex>
      {/* Rows */}
      {rows.map((row, ri) => {
        if (ri >= visibleRowCount) return null;
        const rowBg =
          row.highlight === "amber"
            ? "rgba(245,158,11,0.12)"
            : row.highlight === "red"
              ? "rgba(239,68,68,0.12)"
              : "transparent";
        const rowTextColor =
          row.highlight === "amber"
            ? C.amber
            : row.highlight === "red"
              ? "#EF4444"
              : C.text;
        return (
          <MotionBox
            key={ri}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            display="flex"
            borderBottom={ri < rows.length - 1 ? "1px solid" : "none"}
            borderColor={C.border}
            bg={rowBg}
          >
            {row.cells.map((cell, ci) => (
              <Text
                key={ci}
                flex={1}
                px={1.5}
                py={1}
                color={rowTextColor}
                borderRight="1px solid"
                borderColor={C.border}
                css={{ "&:last-child": { borderRight: "none" } }}
              >
                {cell}
              </Text>
            ))}
          </MotionBox>
        );
      })}
    </Box>
  );
}

function ChecklistViz({
  items,
  checkedCount,
}: {
  items: string[];
  checkedCount: number;
}) {
  return (
    <Box>
      {items.map((item, i) => (
        <MotionBox
          key={item}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
          display="flex"
          alignItems="center"
          gap={2}
          py={1}
        >
          <Box
            w="18px"
            h="18px"
            borderRadius="8px"
            bg={i < checkedCount ? C.green : "transparent"}
            border={i < checkedCount ? "none" : `1.5px solid ${C.border}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            transition="all 0.2s"
          >
            {i < checkedCount && (
              <Text fontSize="xs" color="white" lineHeight="1">
                &#10003;
              </Text>
            )}
          </Box>
          <Text
            fontSize="sm"
            color={i < checkedCount ? C.text : C.muted}
            fontWeight={i < checkedCount ? "500" : "400"}
          >
            {item}
          </Text>
        </MotionBox>
      ))}
    </Box>
  );
}

function StatusViz({
  text,
  color,
}: {
  text: string;
  color?: "green" | "amber";
}) {
  const dotColor = color === "amber" ? C.amber : C.green;
  const textColor = color === "amber" ? C.amber : C.green;
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Flex align="center" gap={2} py={1}>
        <Box
          w="6px"
          h="6px"
          borderRadius="full"
          bg={dotColor}
          flexShrink={0}
        />
        <Text fontSize="sm" color={textColor} fontWeight="500">
          {text}
        </Text>
      </Flex>
    </MotionBox>
  );
}

/* ── Animation state machine ── */

interface AnimState {
  completedGoals: number;
  activeGoalIdx: number;
  formFieldsVisible: number;
  formSubmitted: boolean;
  tableRowsVisible: number;
  checklistChecked: number;
  statusVisible: boolean;
  allDone: boolean;
  cycle: number;
}

const INITIAL_STATE: AnimState = {
  completedGoals: 0,
  activeGoalIdx: 0,
  formFieldsVisible: 0,
  formSubmitted: false,
  tableRowsVisible: 0,
  checklistChecked: 0,
  statusVisible: false,
  allDone: false,
  cycle: 0,
};

/* ── Main component ── */

export default function VerticalDemo({
  activeTab,
  selectedPromptIdx,
}: {
  activeTab: string;
  selectedPromptIdx: number;
}) {
  const [anim, setAnim] = useState<AnimState>(INITIAL_STATE);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const demo =
    DEMO_DATA[activeTab]?.[selectedPromptIdx] ?? DEMO_DATA.freight[0];
  const animKey = `${activeTab}-${selectedPromptIdx}-${anim.cycle}`;
  const totalGoals = demo.goals.length;

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
    return t;
  }, []);

  const runAnimation = useCallback(
    (demoData: PromptDemo) => {
      let elapsed = 400;

      for (let gi = 0; gi < demoData.goals.length; gi++) {
        const goal = demoData.goals[gi];
        const check = goal.checks[0];
        const goalIdx = gi;

        // Activate this goal
        const activateTime = elapsed;
        schedule(() => {
          setAnim((prev) => ({
            ...prev,
            activeGoalIdx: goalIdx,
            formFieldsVisible: 0,
            formSubmitted: false,
            tableRowsVisible: 0,
            checklistChecked: 0,
            statusVisible: false,
          }));
        }, activateTime);
        elapsed += 300;

        // Animate the check content
        if (check.visualization === "form" && check.formFields) {
          const fieldCount = check.formFields.length;
          for (let fi = 0; fi < fieldCount; fi++) {
            const showAt = elapsed;
            schedule(() => {
              setAnim((prev) => ({ ...prev, formFieldsVisible: fi + 1 }));
            }, showAt);
            elapsed += PHASE_FORM_FIELD;
          }
          elapsed += PHASE_FORM_SUBMIT;
          const submitAt = elapsed;
          schedule(() => {
            setAnim((prev) => ({ ...prev, formSubmitted: true }));
          }, submitAt);
          elapsed += 400;
        } else if (check.visualization === "table" && check.tableRows) {
          const rowCount = check.tableRows.length;
          for (let ri = 0; ri < rowCount; ri++) {
            const showAt = elapsed;
            schedule(() => {
              setAnim((prev) => ({ ...prev, tableRowsVisible: ri + 1 }));
            }, showAt);
            elapsed += PHASE_TABLE_ROW;
          }
          elapsed += 200;
        } else if (
          check.visualization === "checklist" &&
          check.checklistItems
        ) {
          const itemCount = check.checklistItems.length;
          for (let ci = 0; ci < itemCount; ci++) {
            const showAt = elapsed;
            schedule(() => {
              setAnim((prev) => ({ ...prev, checklistChecked: ci + 1 }));
            }, showAt);
            elapsed += PHASE_CHECK_ITEM;
          }
          elapsed += 200;
        } else if (check.visualization === "status") {
          const showAt = elapsed;
          schedule(() => {
            setAnim((prev) => ({ ...prev, statusVisible: true }));
          }, showAt);
          elapsed += PHASE_STATUS_SHOW;
        }

        // Complete this goal
        const completeAt = elapsed;
        schedule(() => {
          setAnim((prev) => ({ ...prev, completedGoals: goalIdx + 1 }));
        }, completeAt);
        elapsed += PHASE_GOAL_PAUSE;
      }

      // All done
      schedule(() => {
        setAnim((prev) => ({ ...prev, allDone: true }));
      }, elapsed);

      // Loop: restart after a pause
      schedule(() => {
        setAnim((prev) => ({
          ...INITIAL_STATE,
          cycle: prev.cycle + 1,
        }));
      }, elapsed + LOOP_PAUSE);
    },
    [schedule],
  );

  useEffect(() => {
    clearTimeouts();
    runAnimation(demo);
    return clearTimeouts;
  }, [activeTab, selectedPromptIdx, anim.cycle, clearTimeouts, runAnimation, demo]);

  // Reset fully on prop change
  useEffect(() => {
    setAnim(INITIAL_STATE);
  }, [activeTab, selectedPromptIdx]);

  // Derive what the active check should render
  const activeGoal = demo.goals[anim.activeGoalIdx];
  const activeCheck = activeGoal?.checks[0];

  function renderActiveViz(): React.ReactNode | null {
    if (!activeCheck) return null;
    if (anim.completedGoals > anim.activeGoalIdx) return null;

    switch (activeCheck.visualization) {
      case "form":
        return (
          <FormViz
            fields={activeCheck.formFields ?? []}
            visibleCount={anim.formFieldsVisible}
            submitted={anim.formSubmitted}
            submitLabel={activeCheck.submitLabel}
          />
        );
      case "table":
        return (
          <TableViz
            headers={activeCheck.tableHeaders ?? []}
            rows={activeCheck.tableRows ?? []}
            visibleRowCount={anim.tableRowsVisible}
          />
        );
      case "checklist":
        return (
          <ChecklistViz
            items={activeCheck.checklistItems ?? []}
            checkedCount={anim.checklistChecked}
          />
        );
      case "status":
        return anim.statusVisible ? (
          <StatusViz
            text={activeCheck.statusText ?? ""}
            color={activeCheck.statusColor}
          />
        ) : null;
      default:
        return null;
    }
  }

  const needsYou =
    !anim.allDone && anim.activeGoalIdx < totalGoals
      ? activeCheck?.visualization === "form" && !anim.formSubmitted
        ? 1
        : 0
      : 0;

  return (
    // Mobile content (fixed px font sizes) needs more height per unit width
    // than desktop, where the demo column is much wider. DemoContainer sizes
    // itself from its own `aspectRatio` prop (a plain string, no JS
    // media-query hook), so we can't hand it a responsive value directly —
    // instead this wrapper carries the responsive ratio (a native Chakra
    // responsive prop, safe under jsdom/SSR) and DemoContainer's h="100%"
    // simply fills whatever height the wrapper resolves to. Desktop ratio
    // (4:3) is unchanged from before; only base gets taller.
    <Box aspectRatio={{ base: "3 / 4", md: "4 / 3" }} w="100%">
      <DemoContainer variant="dark">
        <AnimatePresence mode="wait">
          <MotionBox
            key={animKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: ANIM.fadeIn }}
            display="flex"
            flexDirection="column"
            h="100%"
          >
            {/* Progress bar */}
            <ProgressBar
              completed={anim.completedGoals}
              total={totalGoals}
              needsYou={needsYou}
            />

            {/* Goal cards — masked fade at the bottom edge instead of a hard
                clip, so if content ever runs slightly taller than the box
                (long labels, more fields) it reads as an intentional fade
                rather than a mid-row cut. */}
            <Box
              flex="1"
              overflow="hidden"
              css={{
                maskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
              }}
            >
              {demo.goals.map((goal, gi) => {
                const goalState: "active" | "done" | "waiting" =
                  gi < anim.completedGoals
                    ? "done"
                    : gi === anim.activeGoalIdx && gi >= anim.completedGoals
                      ? "active"
                      : "waiting";

                return (
                  <GoalCard
                    key={`${animKey}-goal-${gi}`}
                    goal={goal}
                    state={goalState}
                    activeCheckViz={
                      goalState === "active" ? renderActiveViz() : null
                    }
                  />
                );
              })}
            </Box>

            {/* Footer */}
            <Flex
              align="center"
              justify="space-between"
              mt={2}
              pt={2}
              borderTop="1px solid"
              borderColor="rgba(255,255,255,0.08)"
            >
              <Text fontSize="sm" color={C.muted} fontWeight="500">
                {anim.completedGoals}/{totalGoals} goals
              </Text>
              {anim.allDone ? (
                <Flex align="center" gap={1}>
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={C.green}
                  />
                  <Text fontSize="sm" color={C.green} fontWeight="500">
                    Complete
                  </Text>
                </Flex>
              ) : (
                <Flex align="center" gap={1}>
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={C.blue}
                    css={{
                      animation: "vd-pulse 1.5s infinite",
                      "@keyframes vd-pulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.3 },
                      },
                    }}
                  />
                  <Text fontSize="sm" color={C.muted} fontWeight="500">
                    Running
                  </Text>
                </Flex>
              )}
            </Flex>
          </MotionBox>
        </AnimatePresence>
      </DemoContainer>
    </Box>
  );
}
