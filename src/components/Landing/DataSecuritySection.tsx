"use client";

import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

const SECURITY_FEATURES = [
  {
    title: "Secure by Design",
    description:
      "Your data is hosted securely on AWS. SOC 2 compliance is a key milestone on our roadmap.",
    logos: ["/images/aws.png", "/images/soc2.png"],
  },
  {
    title: "Access Control",
    description:
      "Single Sign-On (SSO) support ensures only authorized users can access your workspace.",
    logos: ["/images/sso.png"],
  },
];

export default function DataSecuritySection() {
  return (
    <Box pt={{ base: 0, xl: 40 }} pb={{ base: 0, xl: 32 }} bg={"white"}>
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <HStack
          justify="space-evenly"
          align="center"
          gap={8}
          flexDir={{ base: "column", lg: "row" }}
        >
          {/* Headline */}

          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="600"
            color="brand.primary"
            lineHeight="1.22"
            w={{ md: "476px" }}
            alignSelf={"flex-end"}
          >
            Your data is <br /> safe with us
          </Heading>

          <HStack
            align="start"
            justify="space-between"
            flexDir={{ base: "column", md: "row" }}
            flex={1}
          >
            {SECURITY_FEATURES.map((feature) => (
              <VStack
                key={feature.title}
                align="start"
                gap={3}
                // maxW="406px"
                // w="full"
              >
                {/* Logos */}
                <HStack gap={5} align="center">
                  {feature.logos.map((logo, logoIndex) => (
                    <Box
                      key={logoIndex}
                      w="122px"
                      h="122px"
                      position="relative"
                      bg="gray.50"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        {logo
                          .split("/")
                          .pop()
                          ?.replace(".png", "")
                          .toUpperCase()}
                      </Text>
                    </Box>
                  ))}
                </HStack>

                <Text
                  fontSize="2xl"
                  fontWeight="600"
                  color="#000"
                  lineHeight="1.33"
                >
                  {feature.title}
                </Text>

                {/* Description */}
                <Text fontSize="2xl" color="#A1A1AA" lineHeight="1.33">
                  {feature.description}
                </Text>
              </VStack>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
