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
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { TESTIMONIALS } from "@/lib/constants";
import { getEarlyAccess } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <Box
      pt={{ base: 10, xl: 32 }}
      pb={{ base: 20, xl: 32 }}
      bg="ui.background"
      background="linear-gradient(180deg, var(--gray-contrast, #FFF) 0%, var(--bg-emphasized, #E4E4E7) 100%)"
    >
      <Container maxW={"container.xl"} px={0}>
        <Box
          display={"flex"}
          flexDir={{ base: "column", xl: "row" }}
          justifyContent={"space-between"}
          w={"100%"}
          px={{ base: 5, xl: 16 }}
          gap={{ base: 10, xl: 0 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="semibold"
            lineHeight={{ base: 1.33, md: 1.22 }}
            justifySelf={"flex-start"}
            color={"brand.primary"}
            pr={{ base: 0, xl: 20 }}
          >
            Co-designed with <br /> seasoned lawyers like you
          </Heading>
          <Button
            size={"2xl"}
            w={264}
            px={7}
            py={0.5}
            lineHeight={1.5}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={4}
            gap={3}
            onClick={() => getEarlyAccess("Testimonials")}
          >
            <Text
              textAlign={"center"}
              w={"100%"}
              fontSize={"lg"}
              fontWeight={"medium"}
            >
              Book a demo
            </Text>
            <ArrowRightIcon
              style={{
                width: 24,
                height: 24,
                color: "white",
              }}
            />
          </Button>
        </Box>

        <SimpleGrid
          gridAutoFlow="column"
          gridTemplateRows="1fr"
          gridAutoColumns={{
            base: "294px",
            xl: "auto",
          }}
          gap={5}
          px={{ base: 5, md: 8, lg: 12 }}
          pt={{ base: 10, xl: 20 }}
          overflowX="auto"
          _scrollbar={{ display: "none" }}
        >
          {TESTIMONIALS.map((t) => (
            <VStack
              key={t.name}
              borderRadius={4}
              justifyContent={"space-between"}
              p={7}
              h={420}
              align="stretch"
              bg={"white"}
            >
              <Text fontSize={"2xl"} lineHeight={1.33}>
                {t.quote}
              </Text>

              <HStack mt="auto" gap={3}>
                <Avatar.Root shape="full" size="2xl">
                  <Avatar.Fallback name={t.name} />
                  <Avatar.Image src={t.image} />
                </Avatar.Root>
                <Box>
                  <Text fontWeight="semibold" fontSize="lg" lineHeight={1.42}>
                    {t.name}
                  </Text>
                  <Text fontSize="md" color="text.secondary" lineHeight={1.42}>
                    {t.title}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
