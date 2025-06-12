"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.200" py={20} mt={20}>
      <Container px={0}>
        <Flex>
          <VStack align="flex-start" gap={6} flex={1}>
            <Heading
              fontSize="4xl"
              fontWeight="semibold"
              lineHeight={1.22}
              color={"#000"}
            >
              Colex
            </Heading>
            <HStack py={20} justifyContent={"space-between"} width={"100%"}>
              <Heading
                fontSize="4xl"
                color={"#000"}
                lineHeight={"1.22"}
                fontWeight="semibold"
              >
                An Integrated AI <br /> Workspace for Modern <br /> Legal
                Professionals
              </Heading>
              <HStack gap={5} h={"100%"}>
                <Button
                  bg="white"
                  flex={1}
                  h={"100%"}
                  color="black"
                  borderRadius={4}
                  px={8}
                  py={5}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text
                    alignSelf={"flex-end"}
                    textAlign="left"
                    fontSize={"2xl"}
                    fontWeight={"medium"}
                    lineHeight={1.33}
                    color={"#000"}
                  >
                    Schedule a 1:1 demo
                  </Text>
                  <Box display={"flex"} h={"100%"} alignItems={"flex-end"}>
                    <FaArrowRight width={42} height={42} fontSize="42px" />
                  </Box>
                </Button>
                <Button
                  flex={1}
                  bg="black"
                  h={"100%"}
                  color="white"
                  borderRadius={4}
                  px={8}
                  py={5}
                  justifyContent={"center"}
                >
                  <Text
                    textAlign="left"
                    fontSize={"2xl"}
                    alignSelf={"flex-end"}
                    fontWeight={"medium"}
                    lineHeight={1.33}
                    color={"#fff"}
                  >
                    Join Our <br /> Early Access Program
                  </Text>
                  <Box display={"flex"} h={"100%"} alignItems={"flex-end"}>
                    <FaArrowRight width={42} height={42} fontSize="42px" />
                  </Box>
                </Button>
              </HStack>
            </HStack>

            <VStack align="flex-start" gap={3} fontSize="sm" color="#52525B">
              <Text fontSize={"md"} fontWeight={"medium"} lineHeight={1.5}>
                Company Address
              </Text>
              <Text fontSize={"md"} fontWeight={"medium"} lineHeight={1.5}>
                Company Phone Number
              </Text>
              <Text fontSize={"md"} fontWeight={"medium"} lineHeight={1.5}>
                © 2025 | ALL RIGHTS RESERVED by Colex.
              </Text>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
