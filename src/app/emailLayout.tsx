"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function EmailLayout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh">
      {/* Left branding/visual side */}
      <Box flex="2" bg="gray.100" />

      {/* Right auth form side */}
      <Flex flex="1" justify="center" align="center" bg="white" p={8}>
        <Box
          w="full"
          maxW="md"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={10}
          boxShadow="sm"
          bg="white"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
