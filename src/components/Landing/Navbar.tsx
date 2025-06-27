// src/components/LandingNavbar.tsx
"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { NOTION_LINK, PHONE_NUMBER } from "@/lib/constants";
import { event } from "@/lib/gtag";
import { useHasMounted } from "@/lib/hooks/useHasMounted";

export default function LandingNavbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const hasMounted = useHasMounted();

  const [showPhone, setShowPhone] = useState(false);

  const scheduleDemo = () => {
    event({
      action: "click_demo_button",
      category: "engagement",
      label: "Schedule Demo Clicked",
    });
    setShowPhone(true);
  };

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
            {isMobile ? null : showPhone ? (
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
                  {PHONE_NUMBER}
                </Text>
              </Box>
            ) : hasMounted ? (
              /* -------- Desktop (initial): reveal-on-click ------- */
              <Button
                size={"lg"}
                // flex={1}
                variant="ghost"
                bg="gray.100"
                w={{ base: "auto", lg: 260 }}
                fontSize={{ base: "14px", md: "16px" }}
                minW={{ base: "36px", md: "44px" }}
                fontWeight={"medium"}
                px={{ base: 3.5, md: 5 }}
                py={{ base: 0.5, md: 2.5 }}
                lineHeight={{ base: 1.42, md: 1.5 }}
                textAlign={"center"}
                borderRadius={4}
                onClick={scheduleDemo}
              >
                Schedule a 1:1 demo
              </Button>
            ) : null}
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
              Get early access
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
