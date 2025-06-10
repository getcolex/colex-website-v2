import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      py={[16, 20, 24]}
      h={600}
      display={"flex"}
      alignItems={"flex-end"}
      bg={"gray.100"}
    >
      <Container maxW="6xl">
        <Flex
          direction={["column", "column", "row"]}
          align="center"
          gap={6}
          justifyContent={"space-between"}
        >
          <VStack align="start" flex="3">
            <Heading as="h1" fontSize={["2xl", "3xl", "4xl"]} lineHeight="1.2">
              Research, Draft, and Organize, <br />
              <Text as="span" color="blue.500">
                Colex is an all-in-one <br />
                AI-Powered Legal Workspace.
              </Text>
            </Heading>
          </VStack>

          <Box flex="2">
            <Text fontSize="md" color="gray.700">
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
