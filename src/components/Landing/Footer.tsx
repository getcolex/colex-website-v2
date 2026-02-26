"use client";

import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Box as="footer" bg="transparent" pt={20}>
      <Container maxW="container.xl" px={{ base: 4, md: 8, lg: 12 }}>
        {/* Mobile layout */}
        <VStack gap={4} align="center" display={{ base: "flex", md: "none" }}>
          <Text
            fontSize="xs"
            color="text.secondary"
            textAlign="center"
            w="full"
          >
            © 2025 | ALL RIGHTS RESERVED by Colex.
          </Text>
          <Image
            width={350}
            height={120}
            src="/images/ColexLogo.png"
            alt="Colex Logo"
          />
        </VStack>

        {/* Desktop layout */}
        <HStack justifyContent="space-between" alignItems="flex-end" display={{ base: "none", md: "flex" }}>
          <Image
            width={550}
            height={190}
            src="/images/ColexLogo.png"
            alt="Colex Logo"
          />
          <Text fontSize="sm" color="text.secondary" mb={2}>
            © 2025 | ALL RIGHTS RESERVED by Colex.
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}
