"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

export default function LandingNavbar() {
  return (
    <Box
      py={{ base: 3, md: 5 }}
      bg="white"
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="sm"
    >
      <Container maxW="container.xl" px={{ base: 4, md: 0 }}>
        <Flex align="center" justify="space-between">
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight={600}
            lineHeight={1.22}
            color="black"
          >
            Colex
          </Heading>

          {/* desktop buttons */}
          <Flex gap={5} display={{ base: "none", md: "flex" }}>
            <Button variant="ghost" bg="gray.100" fontWeight="medium" px={5}>
              Schedule a 1:1 demo
            </Button>
            <Button colorScheme="blackAlpha" fontWeight="medium" px={5}>
              Get early access
            </Button>
          </Flex>

          <IconButton
            onClick={() => {}}
            aria-label="Open menu"
            size="md"
            variant="ghost"
            display={{ base: "flex", md: "none" }}
          >
            <FiMenu />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}
