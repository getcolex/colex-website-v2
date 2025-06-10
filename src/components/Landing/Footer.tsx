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
    <Box bg="gray.200" p={20} borderTop={"1px solid gray"}>
      <Container maxW="6xl">
        <Flex
          direction={["column", "column", "row"]}
          justify="space-between"
          align={["flex-start", "flex-start", "center"]}
          gap={10}
        >
          <VStack align="flex-start" gap={6} flex={1}>
            <Heading fontSize="4xl" fontWeight="bold">
              Colex
            </Heading>
            <HStack justifyContent={"space-between"} w={"100%"} flex={1}>
              <Heading
                fontSize="2xl"
                lineHeight={"1.5"}
                textAlign={"left"}
                fontWeight="bold"
              >
                An Integrated AI <br /> Workspace for Modern <br /> Legal
                Professionals
              </Heading>
              <HStack gap={5}>
                <Button
                  size="lg"
                  bg="white"
                  color="black"
                  px={5}
                  py={10}
                  boxShadow="md"
                  borderRadius="sm"
                  _hover={{ bg: "gray.50" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box textAlign="left" flex="1">
                    Schedule a 1:1 demo
                  </Box>
                  <Box ml={4}>
                    <FaArrowRight />
                  </Box>
                </Button>
                <Button
                  size="lg"
                  bg="black"
                  color="white"
                  px={5}
                  boxShadow="md"
                  borderRadius="sm"
                  _hover={{ bg: "gray.800" }}
                  alignItems={"center"}
                  py={10}
                  justifyContent={"center"}
                >
                  <Text textAlign="left" flex="1">
                    Join Our <br /> Early Access Program
                  </Text>
                  <Box ml={4}>
                    <FaArrowRight />
                  </Box>
                </Button>
              </HStack>
            </HStack>

            <VStack align="flex-start" gap={1} fontSize="sm" color="gray.600">
              <Text>Company Address</Text>
              <Text>Company Phone Number</Text>
              <Text>© 2025 | ALL RIGHTS RESERVED by Colex.</Text>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
