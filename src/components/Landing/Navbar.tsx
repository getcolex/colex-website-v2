// src/components/LandingNavbar.tsx

"use client";

import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";

export default function LandingNavbar() {
  return (
    <Box
      py={5}
      bg="white"
      position={"sticky"}
      top={0}
      zIndex={100}
      boxShadow={"sm"}
    >
      <Container px={0}>
        <Flex align="center" justifyContent={"space-between"}>
          <Heading
            fontSize="4xl"
            fontWeight="600"
            lineHeight={1.22}
            color={"#000"}
          >
            Colex
          </Heading>
          <Flex gap={5}>
            <Button
              flex={1}
              variant="ghost"
              bg="gray.100"
              fontSize={"md"}
              fontWeight={"medium"}
              px={5}
              py={2}
              lineHeight={1.5}
              textAlign={"center"}
            >
              Schedule a 1:1 demo
            </Button>
            <Button
              flex={1}
              colorScheme="blackAlpha"
              fontSize={"md"}
              fontWeight={"medium"}
              px={5}
              py={2}
              lineHeight={1.5}
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
