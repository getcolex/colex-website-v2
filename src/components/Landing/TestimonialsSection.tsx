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
    <Box
      py={{ base: 0, md: 20 }}
      mt={{ base: 16, md: 20 }}
      bg="white"
      overflow={"hidden"}
    >
      <Container
        maxW={"container.xl"}
        px={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
      >
        <Heading
          px={{ base: 5, md: 0 }}
          fontSize={{ base: "2xl", md: "4xl" }}
          color={"#000"}
          fontWeight="semibold"
          lineHeight={{ base: 1.33, md: 1.22 }}
        >
          Designed with Legal Experts, <br /> for Legal Experts
        </Heading>

        <SimpleGrid
          gridAutoFlow="column"
          gridTemplateRows="1fr"
          gridAutoColumns={{
            base: "294px",
            xl: "auto",
          }}
          gap={5}
          my={{ base: 10, md: 20 }}
          px={{ base: 5, md: 6, lg: 0 }}
          overflowX="auto"
          _scrollbar={{ display: "none" }}
        >
          {testimonials.map((t) => (
            <VStack
              key={t.name}
              bg="orange.50"
              borderRadius={4}
              py={6}
              px={{ base: 6, md: 7 }}
              gap={20}
              h={420}
              align="stretch"
            >
              <Text fontSize={"2xl"} color={"#000"} lineHeight={1.33}>
                {t.quote}
              </Text>

              <HStack mt="auto" gap={3}>
                <Avatar.Root size={"2xl"} variant={"solid"} shape={"full"}>
                  <Avatar.Image src={t.image} />
                  <Avatar.Fallback name={t.name} />
                </Avatar.Root>
                <Box>
                  <Text
                    fontWeight="semibold"
                    fontSize="sm"
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
          direction={{ base: "column", md: "row" }}
          gap={{ base: 0, md: 5 }}
          px={{ base: 5, md: 0 }}
          align={"flex-start"}
          mt={{ base: 0, md: 20 }}
        >
          {/* spacer on desktop, hidden on mobile */}
          <Flex flex={1} display={"block"} />

          <VStack flex={1} align="flex-start" gap={{ base: 10, md: 5 }}>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              lineHeight={1.55}
              fontWeight="medium"
              mr={{ base: 0, md: 36 }}
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
