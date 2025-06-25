"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { useState } from "react";
import { NOTION_LINK, PHONE_NUMBER } from "@/lib/constants";
import { event } from "@/lib/gtag";

export default function Footer() {
  const isDesktop = useBreakpointValue({ base: false, xl: true });
  const [showPhone, setShowPhone] = useState(false);

  const scheduleDemo = () => {
    event({
      action: "click_demo_footer_button",
      category: "engagement",
      label: "Schedule Demo Footer Clicked",
    });
    if (isDesktop) {
      setShowPhone(true);
    } else {
      window.open(`tel:${PHONE_NUMBER}`);
    }
  };

  const getEarlyAccess = () => {
    event({
      action: "click_early_access_footer_button",
      category: "engagement",
      label: "Get Early Access Footer Clicked",
    });
    window.open(NOTION_LINK, "_blank");
  };

  return (
    <Box bg="gray.200" py={{ base: 10, md: 20 }} mt={{ base: 16, xl: 0 }}>
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
              gap={{ base: 10, md: 12 }}
              w="full"
            >
              <Heading
                fontSize={{ base: "2xl", lg: "3xl", xl: "4xl" }}
                fontWeight="semibold"
                lineHeight={{ base: 1.33, md: 1.22 }}
              >
                Your AI powered {isDesktop ? <br /> : ""}
                collaborative legal {isDesktop ? <br /> : ""}
                workspace
              </Heading>

              <Stack
                h={"100%"}
                direction={{ base: "column", xl: "row" }}
                gap={5}
                w={{ base: "full", xl: "auto" }}
              >
                {isDesktop && showPhone ? (
                  <HStack
                    flex={1}
                    h={"100%"}
                    minH={{ base: "124px", xl: "auto" }}
                    borderRadius={4}
                    px={{ base: 5, md: 8 }}
                    py={5}
                    border={"3px solid #fafafa"}
                    alignItems={"flex-end"}
                    w={{ base: "full", xl: 370 }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "2xl" }}
                      fontWeight={{ base: "semibold", md: "medium" }}
                      lineHeight={{ base: 1.55, md: 1.33 }}
                    >
                      Call us at <br /> {PHONE_NUMBER}
                    </Text>
                  </HStack>
                ) : (
                  <Button
                    bg="white"
                    h={"100%"}
                    minH={{ base: "124px", xl: "auto" }}
                    border={"3px solid transparent"}
                    color="black"
                    borderRadius={4}
                    px={{ base: 5, md: 8 }}
                    py={5}
                    w={{ base: "full", xl: 370 }}
                    justifyContent={{
                      base: "space-between",
                      xl: "center",
                    }}
                    gap={5}
                    flex={1}
                    onClick={scheduleDemo}
                  >
                    <Text
                      alignSelf={"flex-end"}
                      textAlign="left"
                      fontSize={{ base: "lg", md: "2xl" }}
                      fontWeight={{ base: "semibold", md: "medium" }}
                      lineHeight={{ base: 1.55, md: 1.33 }}
                    >
                      Schedule a 1:1 demo
                    </Text>
                    <ArrowRightIcon
                      style={{
                        width: 44,
                        height: 44,
                        color: "black",
                        alignSelf: "flex-end",
                      }}
                    />
                  </Button>
                )}
                <Button
                  bg="black"
                  h={"100%"}
                  minH={{ base: "124px", xl: "auto" }}
                  color="white"
                  borderRadius={4}
                  px={{ base: 5, md: 8 }}
                  py={5}
                  gap={5}
                  justifyContent={{
                    base: "space-between",
                    xl: "center",
                  }}
                  flex={1}
                  w={{ base: "full", xl: 370 }}
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
                    Join Our <br /> Early Access Program
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
