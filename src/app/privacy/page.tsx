import { Box, Container, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Colex",
  description: "Colex privacy policy — coming soon.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </Text>
          <Text fontSize="lg" color="text.muted" maxW="480px">
            Like a certain Young Lady&apos;s Illustrated Primer, we&apos;re
            still being written. Our privacy policy is adapting to its reader
            and will appear here shortly.
          </Text>
          <Text fontSize="sm" color="text.muted">
            In the meantime, rest assured: your data is yours.
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
