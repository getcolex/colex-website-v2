"use client";

import { Box, Container, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { getEarlyAccess } from "@/lib/utils";

export default function BookDemoSection() {
  return (
    <Box as="section" id="book-demo" pt={{ base: 14, md: 28 }} pb={{ base: 2, md: 4 }}>
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          color="surface.page"
          letterSpacing="-0.02em"
          mb={{ base: 4, md: 6 }}
        >
          Bring us the process that keeps breaking.
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="rgba(255,255,255,0.7)"
          maxW="640px"
          mb={{ base: 8, md: 14 }}
        >
          We&apos;re pre-launch, working with a handful of AI first teams who
          see this problem now. Show us the one that breaks most and we&apos;ll
          build it for you.
        </Text>
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "flex-start", sm: "center" }}
          gap={{ base: 3, md: 4 }}
        >
          <Button
            size="lg"
            px={{ base: 6, md: 8 }}
            py={6}
            borderRadius="8px"
            bg="surface.page"
            color="brand.primary"
            fontWeight="600"
            fontSize={{ base: "sm", md: "md" }}
            _hover={{
              opacity: 0.9,
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s"
            onClick={() => getEarlyAccess("closing_cta")}
          >
            Become a design partner
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
