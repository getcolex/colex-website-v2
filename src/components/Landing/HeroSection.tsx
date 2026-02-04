"use client";

import { Box, Container, Text, Button } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

export default function HeroSection() {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="transparent"
    >
      <Container maxW="container.lg" h="full" position="relative">
        {/* Content centered */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={{ base: 4, md: 8 }}
          py={{ base: 24, md: 32 }}
          minH="100vh"
        >
            {/* Headline */}
            <Text
              fontFamily="heading"
              fontSize={{ base: "10vw", md: "7vw", lg: "5.5vw" }}
              lineHeight={1.1}
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              Give your teams extra hands
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

            {/* CTA + Trust */}
            <Box
              mt={{ base: 8, md: 10 }}
            >
              {/* CTA Button */}
              <Box mb={{ base: 6, md: 8 }}>
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

              {/* Micro-copy */}
              <Text fontSize="sm" color="text.muted">
                No code. No consultants.
              </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
