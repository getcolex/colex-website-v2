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
    <Box py={20} mt={20}>
      <Container px={0}>
        <Heading
          fontSize={"4xl"}
          color={"#000"}
          fontWeight={"semibold"}
          lineHeight={1.22}
        >
          Designed with Legal Experts, <br /> for Legal Experts
        </Heading>

        <SimpleGrid h={420} flexShrink={0} columns={[1, 2, 4]} gap={5} my={20}>
          {testimonials.map((t, index) => (
            <VStack
              justifyContent={"space-between"}
              key={index}
              bg="orange.50"
              py={6}
              px={7}
              gap={0}
              borderRadius={1}
            >
              <Text
                fontSize="2xl"
                color={"#000"}
                lineHeight={1.33}
                fontWeight={"normal"}
              >
                {t.quote}
              </Text>
              <HStack alignSelf={"flex-start"} mt={5} gap={3}>
                <Avatar.Root size="2xl">
                  <Avatar.Image src={t.image} />
                  <Avatar.Fallback name={t.name} />
                </Avatar.Root>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    lineHeight={1.42}
                    color={"#000"}
                  >
                    {t.name}
                  </Text>
                  <Text fontSize="sm" color="#52525B" lineHeight={1.42}>
                    {t.title}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>

        <HStack gap={5}>
          <Flex flex={1}></Flex>

          <VStack flex={1} gap={0} justifyContent={"flex-start"}>
            <Text
              color={"#000"}
              lineHeight={1.55}
              fontWeight={"medium"}
              mb={10}
              fontSize="lg"
            >
              We&apos;ve collaborated with seasoned legal professionals to
              develop a tool that addresses real-world challenges, ensuring
              relevance and practicality in every feature.
            </Text>
            <Button
              alignSelf={"flex-start"}
              minW={44}
              size="lg"
              bg="black"
              color="white"
              px={5}
              py={2}
              w={"50%"}
              fontWeight={"medium"}
            >
              &lt;Define the future with us&gt;
            </Button>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
