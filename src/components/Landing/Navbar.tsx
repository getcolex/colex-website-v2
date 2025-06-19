// src/components/LandingNavbar.tsx
"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function LandingNavbar() {
  const phone = "+91 9945 075 889";
  const isMobile = useBreakpointValue({ base: true, md: false });

  const isRealMobile =
    typeof window !== "undefined" &&
    /iPhone|Android/i.test(window.navigator.userAgent);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <Box py={5} bg="white" position="sticky" top={0} zIndex={100}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12 }}>
        <Flex align="center" justify="space-between">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="600"
            lineHeight={{ base: 1.33, md: 1.22 }}
          >
            Colex
          </Heading>
          <Flex gap={{ base: 2, md: 5 }}>
            {isMobile ? (
              <Link
                flex={1}
                href={isRealMobile ? `tel:${phone}` : undefined}
                _hover={{ textDecoration: "none" }}
              >
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
                  Schedule demo
                </Button>
              </Link>
            ) : showPhone ? (
              /* -------- Desktop & clicked: show phone text ------ */
              <Box
                bg="gray.100"
                px={5}
                py={2.5}
                borderRadius={4}
                fontWeight="medium"
                fontSize="16px"
              >
                Call us at&nbsp;
                <Text as="span" fontWeight="semibold">
                  {phone}
                </Text>
              </Box>
            ) : (
              /* -------- Desktop (initial): reveal-on-click ------- */
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
                onClick={() => setShowPhone(true)}
              >
                Schedule a 1:1 demo
              </Button>
            )}
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
