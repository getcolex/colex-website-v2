import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import LandingNavbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import ArticleMeta from "@/components/Blog/ArticleMeta";
import PostFooterNav from "@/components/Blog/PostFooterNav";
import WorkshopChart from "@/components/Blog/WorkshopChart";
import ActTag from "./ActTag";
import Pull from "./Pull";

export const metadata = {
  title: "I stopped writing code. Now I run a factory. | Colex",
  description:
    "Agents write the code here. My job is to decide what gets built, and to catch what they got wrong. This is how that setup came together, including the parts that are still broken.",
  alternates: { canonical: "/blog/the-robotic-workshop" },
  openGraph: {
    type: "article",
    title: "I stopped writing code. Now I run a factory. | Colex",
    description:
      "Agents write the code here. My job is to decide what gets built, and to catch what they got wrong. This is how that setup came together, including the parts that are still broken.",
    url: "https://getcolex.com/blog/the-robotic-workshop",
    siteName: "Colex",
    images: [{ url: "https://getcolex.com/blog/the-robotic-workshop/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://getcolex.com/blog/the-robotic-workshop/opengraph-image"],
    title: "I stopped writing code. Now I run a factory. | Colex",
    description:
      "Agents write the code here. My job is to decide what gets built, and to catch what they got wrong. This is how that setup came together, including the parts that are still broken.",
  },
};

const chain = [
  {
    when: "Fix one",
    heading: "Kill the environment questions",
    body: "Every workspace gets built fresh and runs its test suite before any agent touches it. Whatever is already failing gets written down by name. Now a red test is either on that list or it's real. No investigation.",
  },
  {
    when: "Fix two",
    heading: "Stop arguing about proof",
    body: "What counts as evidence comes from what the change touched, decided before the work starts. The agent doing the work doesn't get to pick. Sounds bureaucratic. It killed a conversation I had several times a day.",
  },
  {
    when: "Fix three",
    heading: "Get myself out of the dispatch loop",
    body: "Runs, manifests, a ledger that survives between sessions. A coordinator hands out the work now. It helped that plans got good enough to write for every open issue, which turned a pile of vague bugs into an actual queue.",
  },
];

const rounds = [
  {
    n: "Round one",
    body: "Full run. Many units, a manifest, a ledger.",
  },
  {
    n: "Then I smoke it",
    body: "I use the real thing and find what the gates missed. Smoke isn't the last gate. It's what generates the next round.",
  },
  {
    n: "Round two onward",
    body: "Mostly single units. I talk one fix through, dispatch it, same gates, no manifest.",
  },
];

export default function TheRoboticWorkshopPage() {
  return (
    <Box bg="#F8F7F4" minH="100vh">
      <LandingNavbar />

      <Container maxW="900px" pt={{ base: 32, md: 40 }} pb={24} px={{ base: 4, md: 8 }}>
        {/* Header */}
        <Box as="header" pb={8} mb={10} borderBottom="1px solid" borderColor="ui.border">
          <Text
            fontFamily="mono, monospace"
            fontSize="11px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="brand.primary"
            mb={5}
          >
            Colex / build log
          </Text>
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: "4xl", md: "6xl" }}
            lineHeight={1.16}
            letterSpacing="-0.02em"
            color="text.primary"
            mb={5}
          >
            I stopped writing code.
            <br />
            Now I run a <Box as="em" fontStyle="italic" color="brand.primary">factory</Box>.
          </Heading>
          <Text fontSize="17px" color="text.muted" maxW="62ch">
            Agents write the code here. My job is to decide what gets built, and to catch what
            they got wrong. This is how that setup came together, including the parts that are
            still broken.
          </Text>
          <ArticleMeta slug="the-robotic-workshop" />
        </Box>

        {/* ACT 1 — THE PROBLEM */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>The problem</ActTag>
          <Heading as="h2" fontFamily="heading" fontSize="27px" fontWeight="700" letterSpacing="-0.014em" lineHeight={1.3} mb={3} color="text.primary">
            Writing code was never the bottleneck
          </Heading>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            I had one skill that took a plan and built it test-first. It worked. Not sometimes.
            Reliably, on real work, often enough that I stopped reading the code it produced line
            by line.
          </Text>
          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            So I used it more. An agent comes back with a red test. Is that a real bug or a broken container? Nobody
            knows, so I go find out. Twenty minutes gone. An agent says it&apos;s done, and I have
            no idea what &quot;done&quot; meant to it, so I go check. Twenty more. Multiply by
            every piece of work, every day.
          </Text>

          <Pull>
            Code generation was the solved part. Everything on either side of it wasn&apos;t, and
            that&apos;s where all my time went.
          </Pull>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            Then reliability created its own problem. Once each piece lands, the limit becomes how
            fast <Box as="em" fontStyle="italic">I</Box> can hand out the next one. I was the
            queue. Sitting there dispatching work one item at a time, which is a bad job for a
            person and a worse one for the person meant to be deciding what gets built.
          </Text>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch">
            I call it a factory and it is not really one. Nothing here is a stamped part. The code
            is bespoke every time, and when something bigger goes wrong I still have to open the
            thing up, think like a developer, and guide it out. What actually resembles a factory is
            the discipline around the work: every run measures itself, every bit of friction gets
            written down, and each one becomes a fix before the next run starts. That is kaizen, not
            mass production. The line is worth copying. The idea that the parts are interchangeable
            is not.
          </Text>
        </Box>

        {/* ACT 2 — HOW I GOT TO THE FIX */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>How I got to the fix</ActTag>
          <Heading as="h2" fontFamily="heading" fontSize="27px" fontWeight="700" letterSpacing="-0.014em" lineHeight={1.3} mb={3} color="text.primary">
            Every fix moved the problem somewhere else
          </Heading>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch">
            I didn&apos;t design this. Each part exists because the part before it worked and the
            bottleneck slid somewhere new.
          </Text>

          <Box as="ul" mt={6} pl={6} maxW="66ch" listStyleType="disc" css={{ "& li": { listStyleType: "disc", marginBottom: "14px" } }}>
            {chain.map((step) => (
              <Box as="li" key={step.when} fontSize="17px" lineHeight="1.62" color="text.primary">
                <Text as="strong" fontWeight="700">
                  {step.heading}.
                </Text>{" "}
                {step.body}
              </Box>
            ))}
          </Box>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mt={6}>
            Three fixes in. All three are working, and together they are the thing below.
          </Text>
        </Box>

        {/* ACT 3 — THE FIX (CHART) */}
        <Box as="section" mb={16}>
          <ActTag>The fix, exactly</ActTag>
          <Heading as="h2" fontFamily="heading" fontSize="27px" fontWeight="700" letterSpacing="-0.014em" lineHeight={1.3} mb={3} color="text.primary">
            The whole thing, <Box as="em" fontStyle="italic" color="brand.primary">drawn</Box>
          </Heading>
          <Text color="text.muted" maxW="68ch" mb={5} fontSize="13px">
            This is what replaced me sitting in the loop. Nine stages. Click any one to open it
            and see what happens inside. Reviews are burgundy, stops are red, my calls are green.
          </Text>

          <WorkshopChart />

        </Box>

        {/* STILL THE FIX — how it runs */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>Still the fix</ActTag>
          <Heading as="h2" fontFamily="heading" fontSize="27px" fontWeight="700" letterSpacing="-0.014em" lineHeight={1.3} mb={3} color="text.primary">
            One run is never the answer
          </Heading>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            That&apos;s the part I had wrong for a while. A run doesn&apos;t produce a finished
            thing. It produces something worth testing. I smoke it, that finds real problems, those
            become the next run. Repeat until it holds.
          </Text>
          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={6}>
            How many rounds depends on the work. Logic settles fast. Screens don&apos;t. I find
            them hard to specify well, so they take more passes.
          </Text>

          <Box as="ul" mb={6} pl={6} maxW="66ch" listStyleType="disc" css={{ "& li": { listStyleType: "disc", marginBottom: "14px" } }}>
            {rounds.map((r) => (
              <Box as="li" key={r.n} fontSize="17px" lineHeight="1.62" color="text.primary">
                <Text as="strong" fontWeight="700">
                  {r.n}.
                </Text>{" "}
                {r.body}
              </Box>
            ))}
          </Box>

        </Box>

        {/* WHAT IS NEXT */}
        <Box as="section" maxW="700px" mb={16}>
          <ActTag>What is next</ActTag>
          <Heading as="h2" fontFamily="heading" fontSize="27px" fontWeight="700" letterSpacing="-0.014em" lineHeight={1.3} mb={3} color="text.primary">
            Testing is the bottleneck now
          </Heading>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            Code, setup and dispatch are all handled. What is left is the part where I find out
            whether any of it is good. Single units still have no ledger entry either, so the mode
            I use most is the one leaving the least trace.
          </Text>

          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={5}>
            Testing is the part I still picked by hand, out of memory, before every run. I wrote the
            rules down and ran them properly for the first time in July. The run found real problems
            and three failures that were not real, which turned out to be the more useful result.
          </Text>

          <Link href="/blog/a-test-bench-i-can-rely-on">
            <Text fontSize="17px" fontWeight="600" color="brand.primary" _hover={{ textDecoration: "underline" }}>
              A test bench I can rely on &rarr;
            </Text>
          </Link>
        </Box>

        {/* CLOSING */}
        <Box as="section" maxW="700px">
          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch" mb={4}>
            None of this makes agents smarter. It makes their output checkable, which turns out to
            be the part that was missing. Every fix here started as something I was doing by hand
            several times a day until I got tired enough to build the thing that does it instead.
          </Text>
          <Text fontSize="17px" lineHeight="1.62" color="text.primary" maxW="66ch">
            I expect most of this to look wrong in six months. The certified workspaces and the
            prescribed proof I would keep. The rest is scaffolding I built to get past a specific
            problem, and it will change when the problem does. That&apos;s the whole method,
            really. Fix the slow thing, watch where the slowness goes, fix that.
          </Text>
        </Box>

        <PostFooterNav slug="the-robotic-workshop" />
      </Container>

      {/* The shared footer bleeds its logo to the page bottom, which reads as
          design on the landing page and as a cut-off page under an article. */}
      <Box pb={{ base: 10, md: 16 }}>
        <Footer />
      </Box>
    </Box>
  );
}
