"use client";

import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="footer" bg="transparent" pt={20}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        {isMobile ? (
          <VStack gap={10} align="center">
            <Image
              width={350}
              height={120}
              src="/images/ColexLogo.png"
              alt="Colex Logo"
            />
            <Text
              fontSize="sm"
              color="text.secondary"
              textAlign="center"
              w="full"
            >
              © 2025 | ALL RIGHTS RESERVED by Colex.
            </Text>
          </VStack>
        ) : (
          <HStack justifyContent="space-between" alignItems="flex-end">
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
        )}
      </Container>
    </Box>
  );
}
