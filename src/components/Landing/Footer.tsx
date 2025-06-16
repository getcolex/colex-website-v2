"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.200" py={{ base: 5, md: 20 }} mt={{ base: 10, md: 20 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 0 }}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 12, lg: 0 }}
        >
          <VStack align="flex-start" gap={6} flex={1}>
            <Heading
              lineHeight={1.22}
              fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
              fontWeight="semibold"
              color={"#000"}
            >
              Colex
            </Heading>

            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent={"space-between"}
              gap={{ base: 8, md: 12 }}
              py={{ base: 8, md: 20 }}
              w="full"
            >
              <Heading
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="semibold"
                lineHeight={1.22}
              >
                An Integrated AI <br />
                Workspace for Modern <br />
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
                  color="black"
                  borderRadius={4}
                  px={8}
                  py={5}
                  w={{ base: "full", md: "auto" }}
                  justifyContent={{
                    base: "space-between",
                    md: "center",
                  }}
                >
                  <Text
                    alignSelf={"flex-end"}
                    textAlign="left"
                    fontSize={{ base: "md", sm: "lg", lg: "2xl" }}
                    fontWeight={"medium"}
                    lineHeight={1.33}
                    color={"#000"}
                  >
                    Schedule a 1:1 demo
                  </Text>

                  <FaArrowRight fontSize="28px" />
                </Button>
                <Button
                  flex={1}
                  bg="black"
                  h={"100%"}
                  color="white"
                  borderRadius={4}
                  px={8}
                  py={5}
                  justifyContent={{
                    base: "space-between",
                    md: "center",
                  }}
                  w={{ base: "full", md: "auto" }}
                >
                  <Text
                    fontSize={{ base: "md", sm: "lg", lg: "2xl" }}
                    textAlign="left"
                    alignSelf={"flex-end"}
                    fontWeight="medium"
                    lineHeight={1.33}
                    color={"#fff"}
                  >
                    Join Our <br /> Early Access Program
                  </Text>
                  <FaArrowRight fontSize="28px" />
                </Button>
              </Stack>
            </Stack>

            <VStack
              align="flex-start"
              fontSize={{ base: "sm", md: "md" }}
              gap={3}
              lineHeight={1.5}
            >
              <Text fontWeight="medium">Company Address</Text>
              <Text fontWeight="medium">Company Phone Number</Text>
              <Text fontWeight="medium">
                © 2025&nbsp;|&nbsp;ALL RIGHTS RESERVED by Colex.
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
