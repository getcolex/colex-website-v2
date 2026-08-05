import { Box, Container, Heading, Text } from "@chakra-ui/react";
import LandingNavbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import ArticleMeta from "@/components/Blog/ArticleMeta";
import PostFooterNav from "@/components/Blog/PostFooterNav";
import { METHODS } from "@/components/Blog/workshopChartData";
import ActTag from "../the-robotic-workshop/ActTag";

const TITLE = "A test bench I can rely on | Colex";
const DESC =
  "Testing was the part of my build loop I still did by hand, picking checks from memory. This is how it became a protocol, and what the first run got wrong.";
const URL = "https://getcolex.com/blog/a-test-bench-i-can-rely-on";
const OG = `${URL}/opengraph-image`;

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/blog/a-test-bench-i-can-rely-on" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: "Colex",
    images: [{ url: OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG],
    title: TITLE,
    description: DESC,
  },
};

const BODY = {
  fontSize: "17px",
  lineHeight: "1.62",
  color: "text.primary",
  maxW: "66ch",
} as const;

const H2 = {
  as: "h2",
  fontFamily: "heading",
  fontSize: "27px",
  fontWeight: "700",
  letterSpacing: "-0.014em",
  lineHeight: 1.3,
  mb: 3,
  color: "text.primary",
} as const;

const OL = {
  as: "ol",
  maxW: "66ch",
  pl: 6,
  my: 4,
  fontSize: "17px",
  lineHeight: "1.62",
  color: "text.primary",
  // Chakra's reset strips list markers globally, so put them back.
  listStyleType: "decimal",
  listStylePosition: "outside",
  css: { "& li": { listStyleType: "decimal", mb: 2, pl: 1 } },
} as const;

export default function TestBenchPage() {
  return (
    <Box bg="#F8F7F4" minH="100vh">
      <LandingNavbar />

      <Container maxW="container.xl" pt={{ base: 32, md: 40 }} pb={24} px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        <Box maxW="900px">
        <Box as="header" maxW="700px" mb={12}>
          <Text
            fontFamily="mono"
            fontSize="11px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="brand.primary"
            mb={4}
          >
            Colex / Build log
          </Text>
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: "31px", md: "47px" }}
            lineHeight={1.16}
            letterSpacing="-0.02em"
            mb={5}
            color="text.primary"
          >
            A test bench I can{" "}
            <Box as="em" fontStyle="italic" color="brand.primary">
              rely on
            </Box>
            .
          </Heading>
          <Text fontSize="17px" color="text.muted" maxW="60ch">
            Agents write the code. A coordinator hands out the work. I decide what gets built.
            Testing stayed with me, picked by hand out of memory before every run.
          </Text>
          <ArticleMeta slug="a-test-bench-i-can-rely-on" />
        </Box>

        {/* 1 — THE PART THE FACTORY DID NOT TAKE */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>What the factory left to me</ActTag>
          <Heading {...H2}>I picked the checks out of memory</Heading>

          <Text {...BODY} mb={4}>
            Before each run I chose the checks by hand. Nothing broke. It was tedious rather than
            dangerous, and it got slower as the project grew.
          </Text>
          <Text {...BODY} mb={4}>
            Picking from memory has a second cost. I reached for the checks I reach for, and those
            cluster. The coverage looked broad and was narrow.
          </Text>
          <Text {...BODY}>
            To hand testing to a machine I had to write down two decisions I had never stated. Which
            checks fit this change. What evidence makes a run trustworthy.
          </Text>
        </Box>

        {/* 2 — THE RUN */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>The run</ActTag>
          <Heading {...H2}>The checklist described work I meant to do</Heading>

          <Text {...BODY} mb={4}>
            I ran it for the first time in July. About 65 items on a live stack, across a dozen
            agents in waves. Some drove the tool surface, some drove the browser.
          </Text>
          <Text {...BODY} mb={4}>
            One agent only read the commit history. It looked for shipped work the checklist did not
            list, and it found real problems.
          </Text>
          <Text {...BODY} mb={4}>
            That agent answers the first question. My checklist described the work I meant to do.
            The commit history holds the work that shipped. The assumptions that wrote the code also
            wrote the list, so guardrails and one-commit fixes never reached it. A diff sweep is now
            standing.
          </Text>
          <Text {...BODY}>
            One wave did nothing but re-test results the other agents reported. Fresh agents, fresh
            fixtures.
          </Text>
        </Box>

        {/* 3 — A RUN CAN LOOK COMPLETE AND NOT BE */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>A complete-looking run can still hide a defect</ActTag>
          <Heading {...H2}>Three of nine failures did not survive</Heading>

          <Text {...BODY} mb={4}>
            Nine failures went into that wave. Three came back overturned. Eleven passes went in and
            eleven held.
          </Text>

          <Text {...BODY} mb={1}>
            The three overturned failures had three causes:
          </Text>
          <Box {...OL}>
            <li>A fixture that lacked a required stamp.</li>
            <li>
              A synthetic double-click that fired on the same tick, which no person can produce.
            </li>
            <li>Tool calls spaced closer together than the debounce window.</li>
          </Box>

          <Text {...BODY} mb={4}>
            All three were defects in the test setup, not the product.
          </Text>
          <Text {...BODY} mb={4}>
            The agents followed their instructions. The instructions never said what a valid fixture
            was, or that a failure had to prove itself.
          </Text>
          <Text {...BODY} mb={4}>
            Inside this loop the two errors do not cost the same. A failure starts a fix, so a wrong
            failure spends real work on a bug that does not exist. A wrong pass costs a round,
            because the run that follows tests the same surface again. That holds here and not
            everywhere. A pass that ships to users costs far more.
          </Text>
          <Text {...BODY} mb={4}>
            So every failure re-runs before it drives a fix. A pass re-runs when the evidence is thin
            or when the check beside it can fail the same way.
          </Text>
          <Text {...BODY}>
            Running it added one exception. A failure skips the re-run when the behavior is absent
            from the source and a unit test fences the absence. Two kinds of evidence already
            agree.
          </Text>
        </Box>

        {/* 4 — EVERY CHECK HAS AN ORACLE */}
        <Box as="section" mb={16}>
          <Box maxW="700px">
            <ActTag>Every test needs an oracle</ActTag>
            <Heading {...H2}>
              Two checks count as two only when they{" "}
              <Box as="em" fontStyle="italic" color="brand.primary">
                fail apart
              </Box>
            </Heading>

            <Text {...BODY} mb={4}>
              One of those false failures came from a stale build, and that case is worth following.
            </Text>
            <Text {...BODY} mb={4}>
              A backend fix does not reach the running system until the bundle rebuilds and the
              container restarts. Before that, the tests measure the old code and report that the fix
              works. Timestamps do not settle it. A rebuild can touch a file without changing its
              contents. So every backend check now proves which build the stack serves. It asks the
              served artifact for a marker tied to the commit under test.
            </Text>
            <Text {...BODY} mb={4}>
              The stale build also corrupted the rest of the evidence. A page assertion and a
              screenshot both passed against it. Their oracles differ. Their dependency on the
              running build does not, so one stale bundle took out both. Two checks, one failure
              mode.
            </Text>
            <Text {...BODY} mb={4}>
              That is the question worth asking of any pair of checks. Not which is stronger, but
              whether they can fail for the same reason.
            </Text>
            <Text {...BODY} mb={4}>
              Every test needs an oracle, the thing that decides whether what it saw is acceptable.
              Some sit outside the code. A conformance check tests an invariant with a query the code
              did not write. Some sit very close to it. A unit test asks an assertion, and that
              assertion may repeat the assumption the code already makes. A mock can model column
              types, but it never exercises the real engine.
            </Text>
            <Text {...BODY} mb={4}>
              So the useful count is not how many checks ran. It is how many different ways they
              can fail. Two weak methods that fail apart can beat two strong methods that fail
              together.
            </Text>
            <Text {...BODY} mb={6}>
              The table carries the full set: what each method answers, its oracle, its blind spot,
              and its pair.
            </Text>
          </Box>

          <Box overflowX="auto" border="1px solid" borderColor="ui.border" borderRadius="3px" bg="white">
            <Box as="table" width="100%" style={{ borderCollapse: "collapse" }} fontSize="13px" minW="1040px">
              <Box as="thead">
                <Box as="tr">
                  {["Method", "Area", "Oracle", "Answers", "Blind to", "Re-runs", "Pair with"].map(
                    (h) => (
                      <Box
                        as="th"
                        key={h}
                        textAlign="left"
                        p={3}
                        bg="#F8F7F4"
                        borderBottom="1px solid"
                        borderColor="ui.border"
                        whiteSpace="nowrap"
                        fontFamily="mono, monospace"
                        fontSize="11px"
                        letterSpacing="0.11em"
                        textTransform="uppercase"
                        color="text.muted"
                        fontWeight="400"
                      >
                        {h}
                      </Box>
                    )
                  )}
                </Box>
              </Box>
              <Box as="tbody">
                {METHODS.map((m, i) => (
                  <Box
                    as="tr"
                    key={m.n}
                    borderBottom={i === METHODS.length - 1 ? undefined : "1px solid"}
                    borderColor="#F5F5F4"
                    _hover={{ bg: "#FBFAF8" }}
                  >
                    <Box
                      as="td"
                      p={3}
                      verticalAlign="top"
                      color="text.primary"
                      fontWeight="600"
                      whiteSpace="nowrap"
                      borderLeft="3px solid"
                      borderLeftColor={groupColor(m.g)}
                      pl={3}
                    >
                      {m.n}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" fontFamily="mono, monospace" fontSize="11px" letterSpacing="0.06em" textTransform="uppercase" color="text.muted" whiteSpace="nowrap">
                      {m.a}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" color="text.primary">
                      {m.o}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" color="text.muted">
                      {m.ans}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" color="#B91C1C">
                      {m.b}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" fontFamily="mono, monospace" fontSize="13px" color="text.primary" whiteSpace="nowrap">
                      {m.r}
                    </Box>
                    <Box as="td" p={3} verticalAlign="top" color="text.muted">
                      {m.p}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 5 — A VERDICT IS NOT A DIAGNOSIS */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>A verdict is not a diagnosis</ActTag>
          <Heading {...H2}>Two runs disagreed and both were right</Heading>

          <Text {...BODY} mb={4}>
            Different oracles answer different questions. Network capture reports what the client
            sent. A database read reports what the system stored. Neither reports what the user saw.
          </Text>
          <Text {...BODY} mb={4}>
            That gap produced one finding. Two rigorous runs returned opposite verdicts on the same
            rule. One said constraints were not enforced. The other said they were.
          </Text>
          <Text {...BODY} mb={4}>
            The first instinct is to call one run flaky and drop it. That throws away the evidence.
            Both runs differed only in their fixtures. The passing fixture carried a stamp. The
            failing one did not.
          </Text>
          <Text {...BODY} mb={4}>
            The stamp was the answer. Enforcement trusted a value the client supplied. Neither
            verdict said that. The difference between the fixtures did.
          </Text>
          <Text {...BODY}>
            So a disagreement is a lead, not noise. A third run isolates the delta between the
            fixtures. Then the bench can report a cause rather than a verdict.
          </Text>
        </Box>

        {/* 6 — WHAT SHIPPED */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>What shipped</ActTag>
          <Heading {...H2}>The session orchestrates and never tests by hand</Heading>

          <Text {...BODY} mb={4}>
            That first run was three documents and a person. A checklist, a brief every agent read,
            and a ledger. It worked at the speed of one person dispatching agents by hand.
          </Text>
          <Text {...BODY} mb={4}>
            The protocol is now a skill the session loads. It answers both questions I started with.
          </Text>
          <Text {...BODY} mb={4}>
            For selection, it reads the change and routes to the methods that fit. It then sweeps the
            diff for what the checklist missed. For trust, it proves which build the stack serves. It
            re-runs every failure before that failure drives a fix. It finds the cause when two
            runs disagree.
          </Text>
          <Text {...BODY}>
            The protocol also holds its shape at any size. A branch of 246 commits and a single
            commit run the same invariants, and only the machinery shrinks. The evidence rules, the
            build check and the re-run of every failure do not move. The rate of false failures does
            not fall when the scope is small.
          </Text>
        </Box>

        {/* 7 — GRADUATION */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>Each finding names the check that should have caught it</ActTag>
          <Heading {...H2}>The only step that makes the next run cheaper</Heading>

          <Text {...BODY} mb={4}>
            A run that ends in a good report has produced nothing permanent. The next branch repeats
            it by hand.
          </Text>
          <Text {...BODY} mb={1}>
            So every confirmed finding answers one question before the run closes. Which permanent
            check should have caught this?
          </Text>
          <Box {...OL}>
            <li>
              An engine rule proven by hand with SQL becomes a conformance fixture, judged by a
              separate SQL oracle.
            </li>
            <li>
              A bug that mocked tests were blind to becomes a live-database probe, never another
              mock.
            </li>
            <li>A UI contract proven by an agent in a browser becomes a scripted end-to-end test.</li>
            <li>A tool-surface contract becomes a schema test in the bundle suite.</li>
          </Box>
          <Text {...BODY}>
            Each promoted check, or the decision not to promote it, goes in the ledger. This step
            alone makes the next run cheaper. It also feeds selection. A promoted check leaves my
            list of choices and joins the set that always runs.
          </Text>
        </Box>

        {/* 8 — WHERE THIS GOES */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>Where this goes</ActTag>
          <Heading {...H2}>The plan executor followed the same path before</Heading>

          <Text {...BODY} mb={4}>
            It started as a skill I invoked by hand for one unit of work. Writing its rules down
            made it something the factory could dispatch. It now runs inside a run.
          </Text>
          <Text {...BODY} mb={4}>
            The test bench is part way along. The rules exist and the orchestration works. I still
            start it by hand, and I still approve every fix.
          </Text>
          <Text {...BODY}>
            The skill has run on one branch. The three-of-nine and eleven-of-eleven figures come
            from that single run. They set the current policy, and they need more runs before they
            mean much.
          </Text>
        </Box>

        <PostFooterNav slug="a-test-bench-i-can-rely-on" />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

function groupColor(g: string): string {
  switch (g) {
    case "g-owner":
      return "#15803D";
    case "g-truth":
      return "#1D4ED8";
    case "g-exec":
      return "#49082D";
    case "g-obs":
      return "#B45309";
    case "g-weak":
      return "#B91C1C";
    default:
      return "#D6D3D1";
  }
}
