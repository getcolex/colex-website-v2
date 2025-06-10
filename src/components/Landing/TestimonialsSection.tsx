"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  Button,
  Container,
  Flex,
} from "@chakra-ui/react";

const testimonials = [
  {
    quote:
      "I spend less time switching between tools and more time building strong arguments.",
    name: "Rishabh",
    title: "Associate at a Tier-1 Law Firm",
    image: "/avatars/user1.png",
  },
  {
    quote:
      "Research is a continuous process. This platform feels like it’s built for the way we actually work.",
    name: "Ananya",
    title: "Senior Associate at a Litigation Practice",
    image: "/avatars/user2.png",
  },
  {
    quote:
      "Finally, something that understands the Indian legal ecosystem. I’d use this every day if it keeps improving.",
    name: "Lovesh",
    title: "Corporate Counsel",
    image: "/avatars/user3.png",
  },
  {
    quote:
      "I’ve used ChatGPT and other AI tools. They’re good, but this platform knows my context and never loses track.",
    name: "Sameer",
    title: "Independent Litigator",
    image: "/avatars/user4.png",
  },
];

export default function TestimonialsSection() {
  return (
    <Box py={20}>
      <Container maxW="6xl">
        <Heading as="h2" size="xl" mb={10}>
          Designed with Legal Experts, <br /> for Legal Experts
        </Heading>

        <SimpleGrid columns={[1, 2, 4]} gap={6} mb={10}>
          {testimonials.map((t, index) => (
            <Box
              key={index}
              bg="#FFF6EC"
              p={6}
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text fontSize="md" mb={20}>
                {t.quote}
              </Text>
              <HStack gap={4} align="center">
                <Avatar.Root size="sm">
                  <Avatar.Image src={t.image} />
                  <Avatar.Fallback name={t.name} />
                </Avatar.Root>
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    {t.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {t.title}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>

        <HStack>
          <Flex flex={1} bg={"red.100"}></Flex>
          <VStack flex={1} justifyContent={"flex-start"}>
            <VStack p={4} pr={24}>
              <Text maxW="2xl" textAlign={"left"} fontSize="sm">
                We&apos;ve collaborated with seasoned legal professionals to
                develop a tool that addresses real-world challenges, ensuring
                relevance and practicality in every feature.
              </Text>
              <Button
                alignSelf={"flex-start"}
                size="sm"
                mt={4}
                bg="black"
                color="white"
                px={6}
              >
                &lt;Define the future with us&gt;
              </Button>
            </VStack>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
