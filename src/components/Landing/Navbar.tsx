// src/components/LandingNavbar.tsx

"use client";

import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";

export default function LandingNavbar() {
  return (
    <Box
      as="header"
      py={5}
      bg="white"
      position={"sticky"}
      top={0}
      zIndex={100}
      boxShadow={"sm"}
    >
      <Container maxW="6xl">
        <Flex align="center" justifyContent={"space-between"}>
          <Heading fontSize="4xl" fontWeight="600" color={"#000"}>
            Colex
          </Heading>
          <Flex gap={4}>
            <Button
              variant="ghost"
              bg="gray.100"
              p={4}
              fontSize={"16px"}
              textAlign={"center"}
            >
              Schedule a 1:1 demo
            </Button>
            <Button
              colorScheme="blackAlpha"
              fontSize={"16px"}
              p={4}
              textAlign={"center"}
            >
              Get early access
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
