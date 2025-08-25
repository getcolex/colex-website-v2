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

export default function FooterLogo() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="ui.surface" pt={20}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        {isMobile ? (
          <VStack gap={20} align="center">
            <Text
              fontSize="sm"
              color="text.secondary"
              textAlign={"left"}
              w={"full"}
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
        ) : (
          <HStack justifyContent="space-between" alignItems="flex-end">
            <Image
              width={550}
              height={190}
              src="/images/ColexLogo.png"
              alt="Colex Logo"
            />
            <Text fontSize="sm" color="text.secondary" mb={5}>
              © 2025 | ALL RIGHTS RESERVED by Colex.
            </Text>
          </HStack>
        )}
      </Container>
    </Box>
  );
}
