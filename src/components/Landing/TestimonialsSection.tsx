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
  useBreakpointValue,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { NOTION_LINK, TESTIMONIALS } from "@/lib/constants";
import { event } from "@/lib/gtag";

export default function TestimonialsSection() {
  const partnerWithUs = () => {
    event({
      action: "click_partner_with_us_button",
      category: "engagement",
      label: "Partner with us Clicked",
    });
    window.open(NOTION_LINK, "_blank");
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });
  return (
    <Box py={{ base: 0, md: 20 }} bg="white" overflow={"hidden"}>
      <Container maxW={"container.xl"} px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        {!isMobile ? (
          <VStack gap={10}>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Heading
                fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
                fontWeight="semibold"
                lineHeight={{ base: 1.33, md: 1.22 }}
                justifySelf={"flex-start"}
                // maxW="833px"
                pr={{ base: 0, xl: 20 }}
              >
                We are co-designing <br /> with legal experts
              </Heading>
              <Button
                bg="black"
                flex={1}
                h={"100%"}
                minH={{ base: "124px", xl: "auto" }}
                color="black"
                maxW={407}
                borderRadius={4}
                px={8}
                py={5}
                alignSelf="flex-end"
                gap={5}
                justifyContent={"space-between"}
                onClick={partnerWithUs}
              >
                <Text
                  color={"white"}
                  fontSize={"2xl"}
                  fontWeight={"medium"}
                  lineHeight={1.33}
                >
                  Partner with us
                </Text>
                <ArrowRightIcon
                  style={{
                    width: 44,
                    height: 44,
                    color: "white",
                  }}
                />
              </Button>
            </HStack>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              lineHeight={1.55}
              alignSelf={"flex-start"}
              fontWeight="medium"
              maxW={"548px"}
            >
              We want to collaborate with seasoned legal professionals to
              develop a tool that addresses real-world challenges, ensuring
              relevance and practicality in every feature.
            </Text>
          </VStack>
        ) : (
          <Heading fontSize={"2xl"} fontWeight="semibold" lineHeight={1.33}>
            We are co-designing with legal experts
          </Heading>
        )}

        <SimpleGrid
          gridAutoFlow="column"
          gridTemplateRows="1fr"
          gridAutoColumns={{
            base: "294px",
            xl: "auto",
          }}
          gap={5}
          my={{ base: 10, md: 20 }}
          overflowX="auto"
          _scrollbar={{ display: "none" }}
        >
          {TESTIMONIALS.map((t) => (
            <VStack
              key={t.name}
              backgroundImage="url('/images/TestimonialBg.png')"
              borderRadius={4}
              border="1px solid #E4E4E7"
              py={6}
              justifyContent={"space-between"}
              px={{ base: 6, md: 7 }}
              h={420}
              align="stretch"
            >
              <Text fontSize={"xl"} lineHeight={1.33}>
                {t.quote}
              </Text>

              <HStack mt="auto" gap={3}>
                <Avatar.Root size={"2xl"} variant={"solid"} shape={"full"}>
                  <Avatar.Image src={t.image} />
                  <Avatar.Fallback name={t.name} />
                </Avatar.Root>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm" lineHeight={1.42}>
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

        {isMobile ? (
          <VStack flex={1} align="flex-start" gap={10}>
            <Text fontSize={"lg"} lineHeight={1.55} fontWeight="medium">
              We want to collaborate with seasoned legal professionals to
              develop a tool that addresses real-world challenges, ensuring
              relevance and practicality in every feature.
            </Text>

            <Button
              bg="black"
              w={"100%"}
              maxW={360}
              flex={1}
              color="black"
              borderRadius={4}
              p={5}
              gap={5}
              justifyContent={"space-between"}
            >
              <Text
                color={"white"}
                fontSize={"lg"}
                fontWeight={"600"}
                lineHeight={1.55}
              >
                Partner with us
              </Text>
              <ArrowRightIcon
                style={{
                  width: 44,
                  height: 44,
                  color: "white",
                }}
              />
            </Button>
          </VStack>
        ) : null}
      </Container>
    </Box>
  );
}
