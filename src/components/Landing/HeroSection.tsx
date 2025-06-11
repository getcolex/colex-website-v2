import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      py={20}
      h={744}
      display={"flex"}
      alignItems={"flex-end"}
      mx={"auto"}
      bg={"gray.100"}
    >
      <Container px={0}>
        <Flex
          direction={["column", "column", "row"]}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
        >
          <VStack align="start" flex="3">
            <Heading
              as="h1"
              fontSize={"5xl"}
              lineHeight={"1.25"}
              fontWeight={"semibold"}
            >
              Research, Draft, and Organize, <br />
              <Text as="span" color="blue.500">
                Colex is an all-in-one <br />
                AI-Powered Legal Workspace.
              </Text>
            </Heading>
          </VStack>

          <Box flex="2">
            <Text
              fontSize="lg"
              color="#000"
              fontWeight={"medium"}
              lineHeight={1.5}
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
