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
import { getEarlyAccess } from "@/lib/utils";

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
    <Box
      py={{ base: 0, xl: 32 }}
      bg="ui.background"
      background="linear-gradient(180deg, var(--gray-contrast, #FFF) 0%, var(--bg-emphasized, #E4E4E7) 100%)"
    >
      <Container maxW={"container.xl"} px={0}>
        {!isMobile ? (
          <HStack justifyContent={"space-between"} w={"100%"} px={16}>
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
              w={{ base: "auto", lg: 264 }}
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
          </HStack>
        ) : (
          <Heading
            px={{ base: 5, md: 8, lg: 12 }}
            fontSize={"2xl"}
            fontWeight="semibold"
            lineHeight={1.33}
            color={"brand.primary"}
          >
            Co-designed with <br /> seasoned lawyers like you
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
          px={{ base: 5, md: 8, lg: 12 }}
          my={{ base: 10, xl: 20 }}
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

        {isMobile ? (
          <VStack
            flex={1}
            align="flex-start"
            gap={10}
            px={{ base: 5, md: 8, lg: 12 }}
          >
            <Text fontSize={"lg"} lineHeight={1.55} fontWeight="medium">
              We’ve collaborated with seasoned legal professionals to develop a
              tool that addresses real-world challenges, aiming at relevance and
              practicality in every feature.
            </Text>

            <Button
              bg="button.primary"
              w={"100%"}
              maxW={360}
              flex={1}
              color="text.primary"
              borderRadius={4}
              p={5}
              gap={5}
              onClick={partnerWithUs}
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
