"use client";

import { Box, Container, Text, Heading } from "@chakra-ui/react";

const tableRows = [
  {
    have: "Your company's standards, written down",
    automation:
      "Scattered across scripts, docs, and people's heads.",
    colex:
      "One place. In your words. The thing the work is measured against.",
  },
  {
    have: "A record of every past judgement",
    automation: "Run logs. Green or red, no reasoning.",
    colex: "What was decided, on what evidence, by whom.",
  },
  {
    have: "Standards that get sharper with use",
    automation: "The script does exactly what it did on day one.",
    colex: "Every exception teaches you what the rule was missing.",
  },
  {
    have: "An answer for the auditor",
    automation: "“That’s how it’s always run.”",
    colex: "The rule, the evidence, the person who signed it off.",
  },
  {
    have: "A process anyone can pick up",
    automation: "A half-written doc and whoever remembers.",
    colex: "They read the rules. The rules are the process.",
  },
  {
    have: "Books that stay honest after the fact",
    automation:
      "The run went green on Monday. Nothing left to reopen.",
    colex:
      "Thursday’s customs rejection reopens Monday’s “done”.",
  },
];

export default function MomentsSection() {
  return (
    <Box as="section" py={{ base: 20, md: 28 }} bg="surface.page">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="ink.primary"
          letterSpacing="-0.02em"
          mb={{ base: 4, md: 6 }}
        >
          Six months in, you own something.
        </Heading>

        <Text
          color="ink.muted"
          fontSize={{ base: "md", md: "lg" }}
          mb={{ base: 8, md: 12 }}
          maxW="640px"
        >
          Other automation tools leave you with rigid workflows which decay. Colex grows with you continuously.
        </Text>

        <Box
          data-testid="table-scroll"
          style={{ overflowX: "auto" as const }}
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
        >
          <Box
            as="table"
            w="full"
            css={{
              borderCollapse: "collapse",
              "& th": {
                padding: "14px 20px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                backgroundColor: "#E4DFD8",
                borderBottomWidth: "2px",
                borderColor: "var(--chakra-colors-border-default, #cbd5e0)",
              },
              "& td": {
                padding: "16px 20px",
                textAlign: "left",
                borderBottomWidth: "1px",
                borderColor: "var(--chakra-colors-border-subtle, #e2e8f0)",
              },
              "& tbody tr:last-child td": {
                borderBottomWidth: 0,
              },
              "& tbody tr:nth-of-type(even)": {
                backgroundColor: "#EDE9E3",
              },
              "& td:last-child": {
                fontWeight: 500,
              },
            }}
          >
            <thead>
              <tr>
                <Box as="th" color="ink.primary">
                  What you have
                </Box>
                <Box as="th" color="ink.muted">
                  With automation
                </Box>
                <Box as="th" color="ink.primary">
                  With Colex
                </Box>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.have}>
                  <Box as="td" color="ink.primary" fontWeight="600">
                    {row.have}
                  </Box>
                  <Box as="td" color="ink.muted">
                    {row.automation}
                  </Box>
                  <Box as="td" color="ink.primary">
                    {row.colex}
                  </Box>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
