"use client";

import {
  Box,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { motion } from "motion/react";

const MotionBox = motion.create(Box);

const trustPoints = [
  {
    statement: "Constrained UI.",
    detail: "Fixed components. Predictable output.",
  },
  {
    statement: "Mandatory Review.",
    detail: "AI drafts. You approve.",
  },
  {
    statement: "Full Audit Trail.",
    detail: "Every decision. Every approval. Logged.",
  },
];

export default function TrustSection() {
  return (
    <Box
      as="section"
      py={{ base: 16, md: 20 }}
      bg="transparent"
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Top border */}
          <Box
            h="1px"
            bg="gray.200"
            mb={{ base: 10, md: 12 }}
          />

          {/* Trust statements - horizontal on desktop, stacked on mobile */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ base: "flex-start", lg: "flex-start" }}
            gap={{ base: 8, lg: 0 }}
          >
            {trustPoints.map((point, idx) => (
              <Box
                key={point.statement}
                flex={{ lg: 1 }}
                textAlign={{ base: "left", lg: "center" }}
                px={{ lg: 6 }}
                position="relative"
              >
                {/* Vertical divider between items (desktop only) */}
                {idx > 0 && (
                  <Box
                    display={{ base: "none", lg: "block" }}
                    position="absolute"
                    left={0}
                    top="50%"
                    transform="translateY(-50%)"
                    h="60px"
                    w="1px"
                    bg="gray.200"
                  />
                )}

                <Text
                  fontFamily="heading"
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="brand.primary"
                  fontWeight="500"
                  lineHeight={1.2}
                  mb={1}
                >
                  {point.statement}
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.muted"
                  fontStyle="italic"
                >
                  {point.detail}
                </Text>
              </Box>
            ))}
          </Flex>

          {/* Bottom border */}
          <Box
            h="1px"
            bg="gray.200"
            mt={{ base: 10, md: 12 }}
          />
        </MotionBox>
      </Container>
    </Box>
  );
}
