// src/components/LandingNavbar.tsx
"use client";

import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { NOTION_LINK } from "@/lib/constants";
import { event } from "@/lib/gtag";

export default function LandingNavbar() {
  const getEarlyAccess = () => {
    event({
      action: "click_early_access_button",
      category: "engagement",
      label: "Get Early Access Clicked",
    });
    window.open(NOTION_LINK, "_blank");
  };

  return (
    <Box
      py={5}
      bg="white"
      position="sticky"
      borderBottom={"1px solid #e4e4e7"}
      top={0}
      zIndex={100}
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <Flex align="center" justify="space-between">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="600"
            lineHeight={{ base: 1.33, md: 1.22 }}
          >
            Colex
          </Heading>
          <Flex gap={{ base: 2, md: 5 }}>
            <Button
              size={"lg"}
              w={{ base: "auto", lg: 260 }}
              fontSize={{ base: "14px", md: "16px" }}
              minW={{ base: "36px", md: "44px" }}
              fontWeight={"medium"}
              px={{ base: 3.5, md: 5 }}
              py={{ base: 0.5, md: 2.5 }}
              lineHeight={{ base: 1.42, md: 1.5 }}
              textAlign={"center"}
              borderRadius={4}
              onClick={getEarlyAccess}
            >
              Book a demo
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
