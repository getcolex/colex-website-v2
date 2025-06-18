// src/components/LandingNavbar.tsx

"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function LandingNavbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box
      py={5}
      bg="white"
      position={"sticky"}
      top={0}
      zIndex={100}
      boxShadow={"sm"}
    >
      <Container px={{ base: 5, md: 0 }}>
        <Flex align="center" justifyContent={"space-between"}>
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="600"
            lineHeight={{ base: 1.33, md: 1.22 }}
            color={"#000"}
          >
            Colex
          </Heading>
          <Flex gap={{ base: 2, md: 5 }}>
            <Button
              flex={1}
              variant="ghost"
              bg="gray.100"
              fontSize={{ base: "14px", md: "16px" }}
              minW={{ base: "36px", md: "44px" }}
              fontWeight={"medium"}
              px={{ base: 3.5, md: 5 }}
              py={{ base: 0.5, md: 2.5 }}
              lineHeight={{ base: 1.42, md: 1.5 }}
              textAlign={"center"}
              borderRadius={4}
            >
              {isMobile ? "Schedule demo" : "Schedule a 1:1 demo"}
            </Button>
            <Button
              flex={1}
              fontSize={{ base: "14px", md: "16px" }}
              minW={{ base: "36px", md: "44px" }}
              fontWeight={"medium"}
              px={{ base: 3.5, md: 5 }}
              py={{ base: 0.5, md: 2.5 }}
              lineHeight={{ base: 1.42, md: 1.5 }}
              textAlign={"center"}
              borderRadius={4}
            >
              Get early access
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
