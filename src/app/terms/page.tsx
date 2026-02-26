import { Box, Container, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Colex",
  description: "Colex terms of service — coming soon.",
};

export default function TermsPage() {
  return (
    <Box bg="#F8F7F4" minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.md" py={20} px={{ base: 4, md: 8 }}>
        <VStack gap={6} align="center" textAlign="center">
          <Text
            fontFamily="heading"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="700"
            color="text.primary"
            letterSpacing="-0.02em"
          >
            Terms of Service
          </Text>
          <Text fontSize="lg" color="text.muted" maxW="480px">
            Our terms are currently being compiled by a very thorough
            racteur. Like the Primer itself, they&apos;ll be
            interactive, adaptive, and surprisingly readable.
          </Text>
          <Text fontSize="sm" color="text.muted">
            Until then: be excellent to each other.
          </Text>
          <Link href="/">
            <Text
              fontSize="sm"
              fontWeight="500"
              color="brand.primary"
              _hover={{ textDecoration: "underline" }}
            >
              &larr; Back to home
            </Text>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
