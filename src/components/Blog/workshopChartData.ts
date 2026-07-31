// Data model for the "Robotic Workshop" flowchart.
// Ported verbatim (content-wise) from the source article's STAGES / SPINE / METHODS.

export type NodeKind = "work" | "gate" | "review" | "stop" | "owner";

export interface StageNode {
  id: string;
  kind: NodeKind;
  label: string;
  detail?: string;
  why?: string;
}

export type EdgeKind = "ok" | "stop" | "loop";

export interface StageEdge {
  f: string;
  t: string;
  label?: string;
  k?: EdgeKind;
}

export interface Stage {
  id: string;
  idx: string;
  title: string;
  who: string;
  detail: string;
  nodes: StageNode[];
  edges: StageEdge[];
}

export interface SpineEdge {
  f: string;
  t: string;
  label?: string;
  k?: EdgeKind;
}

export interface MethodRow {
  g: "g-owner" | "g-truth" | "g-exec" | "g-obs" | "g-weak";
  n: string;
  a: string;
  /** What decides pass or fail. Two checks count as two only when these fail apart. */
  o: string;
  ans: string;
  b: string;
  r: string;
  p: string;
}

export const STAGES: Stage[] = [
  {
    id: "s1",
    idx: "01",
    title: "Start the run",
    who: "Owner → coordinator",
    detail: "Check that the machinery matches. Then resume the run, or plan its shape.",
    nodes: [
      { id: "start", kind: "owner", label: "I start\nthe run" },
      {
        id: "vassert",
        kind: "gate",
        label: "Version\nassert",
        detail:
          "The coordinator's own version must match the policy file and any existing manifest header.",
        why: "A plugin update must never change the machinery in the middle of a run.",
      },
      { id: "vstop", kind: "stop", label: "Stop.\nI rule" },
      {
        id: "ledger",
        kind: "gate",
        label: "Ledger\nexists?",
        detail:
          "The run name comes from the plan path. The coordinator resumes by convention. It does not ask.",
      },
      {
        id: "resume",
        kind: "work",
        label: "Resume from\nstate header",
        detail:
          "It does not recompile. It does not re-ask settled decisions. It does not re-run finished units.",
      },
      {
        id: "shape",
        kind: "work",
        label: "Compile the\nrun shape only",
        detail:
          "The shape holds units, order, dependencies, seams and first risk levels. It does not hold the unit specs.",
        why: "Unit 8 points at code that units 1 to 7 have not written yet. Late compiling costs nothing. Recompiling stale specs costs real work.",
      },
      {
        id: "bounce",
        kind: "stop",
        label: "Bounce the\nplan-set",
        detail: "The plan lacks test commands, or it still carries open BLOCKS marks.",
        why: "Bad plans bounce at the door. They must not bounce in the middle of a run.",
      },
      {
        id: "ask",
        kind: "owner",
        label: "Report\nto me",
        detail:
          "The coordinator reads the plans. It can find a blocker that nobody marked. It reports the blocker to me. It does not rule on it.",
      },
    ],
    edges: [
      { f: "start", t: "vassert" },
      { f: "vassert", t: "vstop", label: "mismatch", k: "stop" },
      { f: "vassert", t: "ledger", label: "match", k: "ok" },
      { f: "ledger", t: "resume", label: "yes", k: "ok" },
      { f: "ledger", t: "shape", label: "no" },
      { f: "shape", t: "bounce", label: "missing / blocked", k: "stop" },
      { f: "shape", t: "ask", label: "unmarked blocker", k: "loop" },
      { f: "ask", t: "shape", label: "ruling", k: "loop" },
    ],
  },

  {
    id: "s2",
    idx: "02",
    title: "Provision",
    who: "Script + config",
    detail: "Build a certified workspace. Without one, no work starts.",
    nodes: [
      {
        id: "prov",
        kind: "work",
        label: "Build the\nworkspace",
        detail:
          "Fork from the tip. Install. Check the images. Run the baseline once and <strong>write down every failure by name</strong>. Run the probes. Write a certificate.",
        why: "Named failures turn a debugging job into a label. The executor reads the label instead of investigating.",
      },
      {
        id: "retry",
        kind: "gate",
        label: "Failed.\nRetry?",
        detail:
          "Setup fails for ordinary reasons. Missing image tags, failed installs, port clashes, or a dead docker daemon.",
      },
      {
        id: "systemic",
        kind: "stop",
        label: "Stop the run\nreport systemic",
        detail: "One cause that fails twice in a row is a system problem. It is not bad luck.",
      },
      {
        id: "freeze",
        kind: "stop",
        label: "Freeze\nread-only",
        detail:
          "The machine itself failed. A full disk, a dead docker, or a stuck host. A rebuild cannot fix any of these.",
        why: "Write nothing. A write to a full disk destroys the record. Pass the unwritten journal entry to the next session word for word.",
      },
      {
        id: "certified",
        kind: "work",
        label: "Certified\n+ warm spare",
        detail:
          "The coordinator keeps one spare workspace ready, so a swap costs me no waiting.",
        why: "Without a certificate, no work starts.",
      },
    ],
    edges: [
      { f: "prov", t: "retry", label: "failed", k: "stop" },
      { f: "retry", t: "prov", label: "transient", k: "loop" },
      { f: "retry", t: "systemic", label: "same cause ×2", k: "stop" },
      { f: "retry", t: "freeze", label: "host fault", k: "stop" },
      { f: "prov", t: "certified", label: "ok", k: "ok" },
    ],
  },

  {
    id: "s3",
    idx: "03",
    title: "Dispatch",
    who: "Coordinator",
    detail: "Write the spec for this unit. Then give it to a new executor.",
    nodes: [
      {
        id: "spec",
        kind: "work",
        label: "Compile THIS\nunit's spec",
        detail:
          "Copy the task text <strong>word for word</strong> from the plan. Rebuild the preflight from the ledger. State the scope wall.",
        why: "Reworded text is where drift starts. The coordinator writes the spec itself, because it must know what it sent out. That is my control surface.",
      },
      {
        id: "disp",
        kind: "work",
        label: "Dispatch fresh\nexecutor",
        detail: "One writer per unit. Any agents that run beside it can only read.",
      },
    ],
    edges: [{ f: "spec", t: "disp" }],
  },

  {
    id: "s4",
    idx: "04",
    title: "Execution",
    who: "Executor · coordinator blind",
    detail: "Review the plan. Write the code test-first. Then review the diff with a different model.",
    nodes: [
      {
        id: "r1",
        kind: "review",
        label: "REVIEW 1\nPlan review",
        detail:
          "This review reads the <strong>plan</strong>, not the code. Is this worth building this way? Does the plan contradict itself?",
        why: "A contradictory plan caught here costs one review. The same plan caught later costs the whole unit.",
      },
      {
        id: "tdd",
        kind: "work",
        label: "TDD loop\nred → green",
        detail:
          "Write the test first. Watch it fail. Write the smallest code that passes it. Never weaken a test to make the suite pass. Never skip one.",
      },
      {
        id: "r3",
        kind: "review",
        label: "REVIEW 3\nDiff review",
        detail:
          "This is the one full read of the diff. It asks <strong>is this code right?</strong> A new agent runs it inside the workspace. It uses a different model. It is never the writer.",
        why: "A different model has different blind spots. The review stays in the workspace, so the coordinator never reads a diff it cannot judge.",
      },
      {
        id: "bundle",
        kind: "work",
        label: "Evidence bundle\n+ signed verdict",
        detail:
          "The bundle holds the raw test output with exit codes. It holds the diff, the scope statement, and screenshots for any changed screen. It also lists every gap between plan and code.",
      },
      {
        id: "envfault",
        kind: "stop",
        label: "ENV-FAULT",
        detail: "Dependencies, ports, docker, hooks, or working directory. Move to the spare workspace and rebuild.",
        why: "Executors never debug the environment. The workshop counts these minutes as waste and drives them to zero.",
      },
      {
        id: "amend",
        kind: "stop",
        label: "Drift or\ndesign conflict",
        detail:
          "<strong>Drift</strong> means the code moved under the plan. Pause, fix the plan, write it down, send it again. <strong>Design conflict</strong> means someone must choose between two designs. Stop and ask me.",
        why: "Never tell an executor to ignore a plan that still says something else. Fix the plan first.",
      },
    ],
    edges: [
      { f: "r1", t: "tdd" },
      { f: "tdd", t: "r3" },
      { f: "r3", t: "tdd", label: "blocker", k: "loop" },
      { f: "r3", t: "bundle", label: "clean", k: "ok" },
      { f: "tdd", t: "envfault", label: "env failure", k: "stop" },
      { f: "tdd", t: "amend", label: "plan wrong", k: "stop" },
    ],
  },

  {
    id: "s5",
    idx: "05",
    title: "Gate the work",
    who: "Coordinator · never reads diffs",
    detail: "Check the bundle is complete. Work out the real risk level. Both steps are mechanical.",
    nodes: [
      {
        id: "g1",
        kind: "gate",
        label: "GATE 1\nCompleteness",
        detail:
          "This is a checklist. Take the required proofs and subtract what the bundle holds. Whatever remains has no proof.",
        why: "An agent that judges its own risk is a fox guarding the henhouse. So nothing here needs judgement.",
      },
      {
        id: "b1",
        kind: "stop",
        label: "Bounce to\nexecutor",
        detail: "A bundle that is incomplete or unsigned never reaches a review.",
      },
      {
        id: "risk",
        kind: "gate",
        label: "Re-derive\nrisk level",
        detail: "The stated level is only a claim. The real level comes from the diff. Size alone can raise it.",
        why: "A unit must not escape a deeper review by understating what it touches.",
      },
      {
        id: "esc",
        kind: "stop",
        label: "Escalate\none-way",
        detail: "Risk moves up only. It never moves back down.",
      },
    ],
    edges: [
      { f: "g1", t: "b1", label: "incomplete", k: "stop" },
      { f: "g1", t: "risk", label: "complete", k: "ok" },
      { f: "risk", t: "esc", label: "higher than declared", k: "stop" },
    ],
  },

  {
    id: "s5b",
    idx: "06",
    title: "Audit the evidence",
    who: "Fresh context · read-only",
    detail: "Did this really happen? This stage re-runs the claims. It does not judge the code.",
    nodes: [
      {
        id: "r2",
        kind: "review",
        label: "REVIEW 2\nEvidence audit",
        detail:
          "This review checks the <strong>evidence, not the meaning</strong>. It re-runs the given commands. It re-tests each claim with a throwaway probe. It follows the claimed path from end to end.",
        why: "This is the coordinator's one independent check, and it needs no diff. Review 3 asks if the code is right. Review 2 asks if the work really happened.",
      },
      {
        id: "select",
        kind: "work",
        label: "Pick methods from\nthe changed surface",
        detail: "The touched surface sets the required methods. The agent doing the work never picks them.",
        why: "A new agent cannot list what it has never seen. An agent chasing a green result picks the easiest check.",
      },
      {
        id: "indep",
        kind: "gate",
        label: "Independent\nfailure modes?",
        detail:
          "Two methods that fail the same way are not backup for each other. They are one method with two names.",
      },
      { id: "addm", kind: "stop", label: "Add a method\nthat fails differently" },
      {
        id: "nondet",
        kind: "gate",
        label: "Non-deterministic\nmethod used?",
        detail: "Browser tests, MCP tests and manual checks all give different results run to run. They also hide stale builds.",
        why: "One green pass can be luck, or a stale build. Run it again until the result holds.",
      },
      { id: "repro", kind: "gate", label: "Claims\nreproducible?" },
      { id: "b2", kind: "stop", label: "Bounce to\nexecutor" },
    ],
    edges: [
      { f: "r2", t: "select" },
      { f: "select", t: "indep" },
      { f: "indep", t: "addm", label: "one angle", k: "stop" },
      { f: "addm", t: "nondet" },
      { f: "indep", t: "nondet", label: "covered", k: "ok" },
      { f: "nondet", t: "nondet", label: "re-run", k: "loop" },
      { f: "nondet", t: "repro", label: "deterministic", k: "ok" },
      { f: "repro", t: "b2", label: "no", k: "stop" },
    ],
  },

  {
    id: "s6",
    idx: "07",
    title: "Merge & record",
    who: "Coordinator",
    detail: "Merge the work. Prove that nothing broke. Write it down.",
    nodes: [
      { id: "merge", kind: "gate", label: "Merge +\nfull suite" },
      {
        id: "workstop",
        kind: "stop",
        label: "WORK STOPS\nnothing dispatches",
        detail: "A failed suite stops all new work until the suite passes again.",
      },
      {
        id: "ledgerw",
        kind: "work",
        label: "Ledger +\ntelemetry",
        detail:
          "Rewrite the state header in place. Add to the journal, which holds decisions, dead ends and limits. Tag friction as it happens.",
        why: "The next session cannot see an uncommitted ledger. The handover fails.",
      },
      {
        id: "bench",
        kind: "work",
        label: "Seed the server\nwrite the brief",
        detail: "The executor finished before the merge and is gone. So the coordinator seeds the shared test server itself and records the new IDs.",
      },
    ],
    edges: [
      { f: "merge", t: "workstop", label: "red", k: "stop" },
      { f: "merge", t: "ledgerw", label: "green", k: "ok" },
      { f: "ledgerw", t: "bench" },
    ],
  },

  {
    id: "s7",
    idx: "08",
    title: "My verdict",
    who: "Owner",
    detail: "I check a unit when its risk calls for it. I check every run without exception.",
    nodes: [
      {
        id: "verdict",
        kind: "owner",
        label: "My verdict\non the unit",
        detail: "At risk 0 to 2 the work continues while my verdict follows. At risk 3 the work waits.",
      },
      {
        id: "repair",
        kind: "stop",
        label: "Fast-repair\nat queue front",
        detail: "A defect escaped. Name the gate that missed it. Tighten the risk rules. Do both in one step.",
        why: "The repair runs during the stop. Work restarts when the repair merges clean and someone writes down the new rule.",
      },
      { id: "remain", kind: "gate", label: "Units\nremaining?" },
      {
        id: "smoke",
        kind: "owner",
        label: "MY SMOKE\nevery run",
        detail: "This is the only method that sees the product itself. Every other method reads a trace. Nothing ships without it.",
        why: "I found screen bugs and design faults that every automatic gate missed. This is my rarest check, and the one that finds the most.",
      },
    ],
    edges: [
      { f: "verdict", t: "repair", label: "fail", k: "stop" },
      { f: "verdict", t: "remain", label: "pass", k: "ok" },
      { f: "remain", t: "smoke", label: "none left", k: "ok" },
      { f: "smoke", t: "repair", label: "defects found", k: "stop" },
    ],
  },

  {
    id: "s8",
    idx: "09",
    title: "Factory feedback",
    who: "Coordinator drafts · I rule",
    detail: "Turn the friction from this run into the next version of the workshop.",
    nodes: [
      {
        id: "friction",
        kind: "work",
        label: "Collect every\nFRICTION tag",
        detail:
          "The journal already holds a tag for every stop, every ruling I did not plan for, every made-up procedure and every wasted round trip.",
        why: "The journal records each tag as the event happens. Nobody digs for them later. The waste from one run becomes the input to the next.",
      },
      {
        id: "drafts",
        kind: "work",
        label: "Draft the fixes\nthey imply",
        detail: "The workshop allows only four kinds of change. A setup fix, a skill edit, a new evidence method, or a policy change. Each one names the evidence behind it.",
      },
      {
        id: "rule",
        kind: "owner",
        label: "I keep, strike\nor amend",
        detail: "I rule on the whole batch in one sitting. Never one item at a time. These changes ship before the next run starts.",
      },
    ],
    edges: [
      { f: "friction", t: "drafts" },
      { f: "drafts", t: "rule" },
    ],
  },
];

/** Stage-to-stage edges, including the returns */
export const SPINE: SpineEdge[] = [
  { f: "s1", t: "s2" },
  { f: "s2", t: "s3" },
  { f: "s3", t: "s4" },
  { f: "s4", t: "s5" },
  { f: "s5", t: "s5b" },
  { f: "s5b", t: "s6" },
  { f: "s6", t: "s7" },
  { f: "s7", t: "s8", label: "no units left", k: "ok" },
  { f: "s7", t: "s3", label: "next unit", k: "loop" },
  { f: "s4", t: "s2", label: "env-fault · rebuild", k: "loop" },
  { f: "s5", t: "s4", label: "bounced", k: "stop" },
  { f: "s5b", t: "s4", label: "bounced", k: "stop" },
  { f: "s7", t: "s2", label: "fast-repair", k: "stop" },
];

export const METHODS: MethodRow[] = [
  { g: "g-owner", n: "Owner smoke", a: "All", o: "My judgment", ans: "Does the product really work, and does it look right to me", b: "Rules that span many rows. Anything not visible on screen", r: "Every run, required", p: "SQL checks, for what my eye cannot scan" },
  { g: "g-truth", n: "DB / state reads", a: "Data · engine", o: "The stored row itself", ans: "What the system really stored. Rows, payloads, status changes", b: "Whether the screen showed it. How it got there", r: "Once", p: "Network capture, to compare sent against stored" },
  { g: "g-truth", n: "Network capture", a: "FE ↔ BE seam", o: "The wire, recorded", ans: "What the client really sent and received, including repeat posts", b: "Whether the write survived. What the server did inside", r: "Once", p: "Database reads, to confirm the write landed" },
  { g: "g-exec", n: "CI suite", a: "All", o: "Assertions I wrote earlier", ans: "Nothing regressed in the behaviour it already covers", b: "Anything without a test. Integration and screen behaviour", r: "Once", p: "Narrow runs for the new behaviour" },
  { g: "g-exec", n: "Targeted unit run", a: "Logic · engine", o: "An assertion, which may repeat the code's own assumptions", ans: "One behaviour, precisely and cheaply", b: "Everything outside the suite it ran. Real engine behaviour, when it mocks", r: "Once", p: "The full CI run, to catch what it missed" },
  { g: "g-exec", n: "SQL conformance", a: "Data · engine", o: "An invariant, checked by a query the code did not write", ans: "A rule holds for every row, not just the one you sampled", b: "Whether any of it renders, or whether a user can reach it", r: "Once", p: "My own check, for what a query cannot judge" },
  { g: "g-exec", n: "Playwright E2E", a: "UI · FE", o: "A script, replayable by anyone", ans: "Browser behaviour in a script that anyone can run again", b: "Anything off the scripted path. Visual judgement", r: "Once", p: "My own check, for look and feel" },
  { g: "g-obs", n: "DOM / JS assertions", a: "UI", o: "The document, as served", ans: "What the page really contains. Stronger than a screenshot", b: "Whether it looks right. Whether the data survived", r: "Once, if scripted", p: "Network capture, which fails in a different way" },
  { g: "g-obs", n: "Chrome smoke", a: "UI · FE", o: "The rendered page, read by an agent", ans: "Does the real flow work when driven like a user", b: "What the system stored. It also hides stale builds", r: "2 to 3 matching runs", p: "Database reads, to prove the effect was real" },
  { g: "g-obs", n: "MCP test", a: "Engine · API", o: "The tool's own response", ans: "The tool surface behaves as specified", b: "The screen above it. Any write it triggers", r: "2 to 3 matching runs", p: "Database reads for effects, telemetry for internals" },
  { g: "g-obs", n: "Runtime telemetry", a: "Engine · LLM", o: "Events the system emitted", ans: "Structured events. Model calls, prompt hashes, trace ids", b: "Whether the result was right. Anything never logged", r: "Once", p: "Database reads, for the resulting state" },
  { g: "g-weak", n: "Container logs", a: "All", o: "Whatever the system chose to report", ans: "What the system reported while it ran. Visible errors", b: "Silent failures. Anything it never logged", r: "Once", p: "Telemetry, which is narrower but far more reliable" },
  { g: "g-weak", n: "Code read", a: "All", o: "A reader, judging source against expected behaviour", ans: "What the code is written to do", b: "What actually happened at runtime. This is never proof by itself", r: "none", p: "Any method that runs. It never stands alone." },
];
