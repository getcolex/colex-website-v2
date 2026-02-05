"use client";

import { Box, Container, Text, Button, Flex } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import HeroDemo from "./HeroDemo";

export default function HeroSection() {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="transparent"
    >
      <Container maxW="container.xl" h="full" position="relative">
        {/* Two-column layout: text left, demo right */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ base: 10, lg: 16 }}
          px={{ base: 4, md: 8 }}
          py={{ base: 24, md: 32 }}
          minH="100vh"
        >
          {/* Left side - Text content */}
          <Box
            flex={1}
            textAlign={{ base: "center", lg: "left" }}
            maxW={{ lg: "550px" }}
          >
            {/* Headline */}
            <Text
              fontFamily="heading"
              fontSize={{ base: "10vw", md: "7vw", lg: "4.5vw" }}
              lineHeight={1.1}
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              <Box as="span" display="block">Give your teams</Box>
              <Box as="span" display="block">extra hands</Box>
            </Text>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="text.primary"
              fontWeight="500"
              mt={{ base: 4, md: 6 }}
            >
              Colex is purpose-built to automate your team reliably
            </Text>

            {/* CTA + Micro-copy */}
            <Box mt={{ base: 8, md: 10 }}>
              <Box mb={{ base: 4, md: 5 }}>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  borderRadius="4px"
                  bg="brand.primary"
                  color="white"
                  fontWeight="500"
                  fontSize="md"
                  _hover={{
                    bg: "#5a0a38",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                  onClick={() => getEarlyAccess("hero_section")}
                >
                  See it work in 30 minutes
                  <ArrowRightIcon
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 10,
                    }}
                  />
                </Button>
              </Box>

              <Text fontSize="sm" color="text.muted">
                No code. No consultants.
              </Text>
            </Box>
          </Box>

          {/* Right side - Demo (hidden on mobile) */}
          <Box
            flex={1}
            display={{ base: "none", md: "flex" }}
            justifyContent={{ md: "center", lg: "flex-end" }}
            w="full"
            maxW={{ md: "440px", lg: "none" }}
            mx={{ md: "auto", lg: 0 }}
          >
            <HeroDemo />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
