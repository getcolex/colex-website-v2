"use client";

import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import AWS from "@/assets/icons/aws.svg";
import SOC2 from "@/assets/icons/soc2.svg";
import SSO from "@/assets/icons/sso.svg";

export default function DataSecuritySection() {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  return (
    <Box pt={{ base: 20, xl: 40 }} pb={{ base: 10, xl: 32 }} bg={"white"}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <HStack
          justify="space-evenly"
          align="center"
          gap={{ base: 10, xl: 0 }}
          flexDir={{ base: "column", lg: "row" }}
        >
          {/* Headline */}

          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="600"
            color="brand.primary"
            lineHeight="1.22"
            w={{ base: "full", md: "476px" }}
            alignSelf={{ base: "flex-start", md: "flex-end" }}
          >
            Your data is {isMobile ? "" : <br />} safe with us
          </Heading>

          <HStack
            align="start"
            justify="space-between"
            flexDir={{ base: "column", md: "row" }}
            flex={1}
            gap={5}
          >
            <VStack align="start" gap={5}>
              <HStack gap={5} align="center">
                <AWS style={{ width: 111, height: 66 }} />
                <SOC2 style={{ width: 95, height: 95 }} />
              </HStack>

              <Text
                fontSize="2xl"
                fontWeight="600"
                color="#000"
                lineHeight="1.33"
              >
                Secure by Design
              </Text>

              <Text fontSize="2xl" color="#A1A1AA" lineHeight="1.33">
                Your data is hosted securely on AWS. SOC 2 compliance is a key
                milestone on our roadmap.
              </Text>
            </VStack>
            <VStack align="start" gap={3}>
              <HStack gap={5} align="center">
                <SSO style={{ width: 149, height: 112 }} />
              </HStack>

              <Text
                fontSize="2xl"
                fontWeight="600"
                color="#000"
                lineHeight="1.33"
              >
                Access Control
              </Text>

              {/* Description */}
              <Text fontSize="2xl" color="#A1A1AA" lineHeight="1.33">
                Single Sign-On (SSO) support ensures only authorized users can
                access your workspace.
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
