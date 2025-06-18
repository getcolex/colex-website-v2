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
  Stack,
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
    <Box py={{ base: 5, md: 20 }} mt={{ base: 10, md: 20 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 0 }}>
        <Heading
          fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
          color={"#000"}
          fontWeight="semibold"
          lineHeight={1.22}
        >
          Designed with Legal Experts, <br /> for Legal Experts
        </Heading>

        {/* ---------- Testimonial cards ---------- */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap={5}
          my={{ base: 12, md: 20 }}
        >
          {testimonials.map((t) => (
            <VStack
              key={t.name}
              bg="orange.50"
              borderRadius={4}
              py={{ base: 6, md: 8 }}
              px={{ base: 5, md: 7 }}
              gap={20}
              h={420}
              align="stretch"
            >
              <Text
                fontSize={{ base: "lg", sm: "xl", lg: "2xl" }}
                color={"#000"}
                lineHeight={1.33}
              >
                {t.quote}
              </Text>

              <HStack mt="auto" gap={3}>
                <Avatar.Root size={{ base: "lg", md: "xl", lg: "2xl" }}>
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

        {/* ---------- CTA block ---------- */}
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: 5 }}
          align={{ base: "stretch", lg: "flex-start" }}
        >
          {/* spacer on desktop, hidden on mobile */}
          <Flex flex={1} display={{ base: "none", lg: "block" }} />

          <VStack flex={{ base: "unset", lg: 1 }} align="flex-start" gap={5}>
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              lineHeight={1.55}
              fontWeight="medium"
              mr={36}
            >
              We’ve collaborated with seasoned legal professionals to develop a
              tool that addresses real-world challenges, ensuring relevance and
              practicality in every feature.
            </Text>

            <Button
              bg="black"
              size={"lg"}
              color="white"
              px={6}
              py={3}
              fontSize="md"
              _hover={{ bg: "gray.800" }}
              alignSelf="flex-start"
            >
              Define the future with us
            </Button>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
