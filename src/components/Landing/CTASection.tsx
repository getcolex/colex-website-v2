"use client";

import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { getEarlyAccess } from "@/lib/utils";

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

export default function CTASection() {
  return (
    <Box
      bg="brand.primary"
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        {/* CTA - headline on left, button on right */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          gap={{ base: 8, lg: 12 }}
          mb={{ base: 12, md: 16 }}
          pb={{ base: 12, md: 16 }}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
        >
          <VStack align="flex-start" gap={3} flex={1}>
            <Text
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="600"
              lineHeight={1.2}
              letterSpacing="-0.03em"
              color="white"
            >
              Ready to give your team extra hands?
            </Text>
            <Text
              fontSize="md"
              color="whiteAlpha.800"
              lineHeight={1.5}
              maxW="500px"
            >
              Describe your first workflow. We'll build it. You'll be live in days.
            </Text>
          </VStack>

          <Button
            size="lg"
            px={8}
            py={6}
            borderRadius="4px"
            borderColor="white"
            borderWidth={1}
            bg="transparent"
            fontSize="md"
            fontWeight="500"
            color="white"
            flexShrink={0}
            _hover={{
              bg: "whiteAlpha.200",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s"
            onClick={() => getEarlyAccess("cta_section")}
          >
            Get access
            <ArrowRightIcon
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                color: "white",
              }}
            />
          </Button>
        </Flex>

        {/* Trust points at bottom */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          gap={{ base: 6, lg: 0 }}
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
                  h="50px"
                  w="1px"
                  bg="whiteAlpha.200"
                />
              )}

              <Text
                fontFamily="heading"
                fontSize={{ base: "md", md: "lg" }}
                color="white"
                fontWeight="600"
                lineHeight={1.2}
                mb={1}
              >
                {point.statement}
              </Text>
              <Text
                fontSize="sm"
                color="whiteAlpha.700"
                lineHeight={1.5}
                fontStyle="italic"
              >
                {point.detail}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
