"use client";

import { Box, Button, Container, Text, Flex } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";

export default function CTASection() {
  return (
    <Box bg="brand.primary" py={{ base: 16, md: 24 }}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          gap={{ base: 8, lg: 12 }}
        >
          {/* Left side - Headline + subtitle */}
          <Box flex={1}>
            <Text
              fontFamily="heading"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              lineHeight={1.2}
              letterSpacing="-0.03em"
              color="white"
              mb={3}
            >
              Describe your workflows once.
              <br />
              They run forever.
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.800"
              lineHeight={1.5}
            >
              No devs, no consultants, no waiting
            </Text>
          </Box>

          {/* Right side - CTA button */}
          <Button
            size="lg"
            px={10}
            py={7}
            borderRadius="4px"
            bg="white"
            color="brand.primary"
            fontSize="md"
            fontWeight="600"
            flexShrink={0}
            _hover={{
              bg: "gray.100",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s"
            onClick={() => getEarlyAccess("cta_section")}
          >
            Try colex today
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
