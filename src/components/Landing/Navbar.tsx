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
    <Box py={5} bg="white" position={"sticky"} top={0} zIndex={100}>
      <Container px={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}>
        <Flex align="center" justifyContent={"space-between"}>
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
              size={"lg"}
              flex={1}
              fontSize={{ base: "14px", md: "16px" }}
              minW={{ base: "36px", md: "44px" }}
              fontWeight={"medium"}
              px={{ base: 3.5, md: 5 }}
              py={{ base: 0.5, md: 2.5 }}
              lineHeight={{ base: 1.42, md: 1.5 }}
              textAlign={"center"}
              borderRadius={4}
              onClick={() => {
                window.open(
                  "https://verdant-spinach-db6.notion.site/20af6271dbc381c9b9a4c688f2eb8503?pvs=105",
                  "_blank"
                );
              }}
            >
              Get early access
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
