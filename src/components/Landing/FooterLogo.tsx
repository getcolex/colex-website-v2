"use client";

import { Box, Container, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function FooterLogo() {
  return (
    <Box bg="ui.surface" pt={{ base: 10, xl: 20 }}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <HStack justifyContent={"space-between"} alignItems={"flex-end"}>
          <Image
            width={550}
            height={190}
            src="/images/ColexLogo.png"
            alt="Colex Logo"
          />
          <Text fontSize={"sm"} color={"text.secondary"} mb={5}>
            © 2025 | ALL RIGHTS RESERVED by Colex.
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}
