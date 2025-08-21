"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { NOTION_LINK } from "@/lib/constants";
import { event } from "@/lib/gtag";

export default function Footer() {
  const isDesktop = useBreakpointValue({ base: false, xl: true });

  const getEarlyAccess = () => {
    event({
      action: "click_early_access_footer_button",
      category: "engagement",
      label: "Get Early Access Footer Clicked",
    });
    window.open(NOTION_LINK, "_blank");
  };

  return (
    <Box bg="gray.200" py={{ base: 10, xl: 20 }} mt={{ base: 16, xl: 0 }}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 12, md: 0 }}
        >
          <VStack align="flex-start" gap={{ base: 10, xl: 20 }} flex={1}>
            <Heading
              lineHeight={{ base: 1.33, md: 1.22 }}
              fontSize={"4xl"}
              fontWeight="semibold"
            >
              Colex
            </Heading>

            <Stack
              direction={{ base: "column", xl: "row" }}
              justifyContent={"space-between"}
              gap={{ base: 10, xl: 12 }}
              w="full"
            >
              <Heading
                fontSize={{ base: "2xl", lg: "3xl", xl: "4xl" }}
                fontWeight="semibold"
                lineHeight={{ base: 1.33, md: 1.22 }}
              >
                Your AI-powered legal {isDesktop ? <br /> : ""}
                Workspace built for {isDesktop ? <br /> : ""}
                In-house legal teams
              </Heading>

              <Stack
                h={"100%"}
                direction={{ base: "column", xl: "row" }}
                gap={5}
                w={{ base: "full", xl: "auto" }}
              >
                <Button
                  bg="black"
                  h={"100%"}
                  minH={{ base: "124px", xl: "auto" }}
                  color="white"
                  borderRadius={4}
                  px={{ base: 5, md: 8 }}
                  py={5}
                  gap={5}
                  justifyContent={"space-between"}
                  flex={1}
                  w={{ base: "full", xl: 407 }}
                  onClick={getEarlyAccess}
                >
                  <Text
                    fontSize={{ base: "lg", md: "2xl" }}
                    textAlign="left"
                    alignSelf={"flex-end"}
                    fontWeight={{ base: "semibold", md: "medium" }}
                    lineHeight={{ base: 1.55, md: 1.33 }}
                    color={"#fff"}
                  >
                    Book a demo
                  </Text>
                  <ArrowRightIcon
                    style={{
                      width: 44,
                      height: 44,
                      color: "white",
                      alignSelf: "flex-end",
                    }}
                  />
                </Button>
              </Stack>
            </Stack>
            <VStack>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={{ base: "semibold", md: "medium" }}
                lineHeight={{ base: 1.42, md: 1.5 }}
              >
                © 2025 | ALL RIGHTS RESERVED by Colex.
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
