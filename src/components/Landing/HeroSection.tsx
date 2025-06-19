import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      py={{ base: 0, md: 20 }}
      minH={{ base: "684px", md: "744px" }}
      display={"flex"}
      alignItems={"flex-end"}
      mx={"auto"}
      bg={"gray.100"}
    >
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8, lg: 12, xl: 16 }}
        py={{ base: 5 }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-end" }}
          justify="space-between"
          gap={{ base: 10, md: 0 }}
        >
          <VStack align="start" flex={{ md: 3 }} gap={{ base: 10, md: 6 }}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight={1.25}
              fontWeight="semibold"
              color={"#000"}
            >
              Research, Draft, and Organize. <br />
              <Text as="span" color="blue.500">
                Colex is an all-in-one <br />
                AI-Powered Legal Workspace.
              </Text>
            </Heading>
          </VStack>

          <Box flex={{ md: 2 }}>
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="black"
              lineHeight={1.55}
            >
              Experience a transformative approach to legal research and
              drafting. Our AI-powered platform is designed to enhance
              efficiency, accuracy, and collaboration.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
