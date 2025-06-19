"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box bg="gray.200" py={{ base: 10, md: 20 }} mt={{ base: 16, md: 20 }}>
      <Container
        maxW="container.xl"
        px={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={{ base: 12, md: 0 }}
        >
          <VStack align="flex-start" gap={6} flex={1}>
            <Heading
              lineHeight={{ base: 1.33, md: 1.22 }}
              fontSize={"2xl"}
              fontWeight="semibold"
            >
              Colex
            </Heading>

            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent={"space-between"}
              gap={{ base: 10, md: 12 }}
              py={{ base: 0, md: 20 }}
              w="full"
            >
              <Heading
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="semibold"
                lineHeight={{ base: 1.33, md: 1.22 }}
              >
                An Integrated AI {isMobile ? "" : <br />}
                Workspace for Modern {isMobile ? "" : <br />}
                Legal Professionals
              </Heading>

              <Stack
                h={"100%"}
                direction={{ base: "column", md: "row" }}
                gap={5}
                w={{ base: "full", md: "auto" }}
              >
                <Button
                  bg="white"
                  flex={1}
                  h={"100%"}
                  minH={{ base: "124px", md: "auto" }}
                  color="black"
                  borderRadius={4}
                  px={{ base: 5, md: 8 }}
                  py={5}
                  w={{ base: "full", md: "auto" }}
                  justifyContent={{
                    base: "space-between",
                    md: "center",
                  }}
                  gap={5}
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
                <Button
                  flex={1}
                  bg="black"
                  h={"100%"}
                  minH={{ base: "124px", md: "auto" }}
                  color="white"
                  borderRadius={4}
                  px={{ base: 5, md: 8 }}
                  py={5}
                  gap={5}
                  justifyContent={{
                    base: "space-between",
                    md: "center",
                  }}
                  w={{ base: "full", md: "auto" }}
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

            <VStack
              align="flex-start"
              fontSize={{ base: "sm", md: "md" }}
              gap={3}
              fontWeight={{ base: "semibold", md: "medium" }}
              lineHeight={{ base: 1.42, md: 1.5 }}
            >
              <Text>Company Address</Text>
              <Text>Company Phone Number</Text>
              <Text>© 2025&nbsp;|&nbsp;ALL RIGHTS RESERVED by Colex.</Text>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
