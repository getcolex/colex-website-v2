import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import LandingNavbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { POSTS } from "./posts";

export const metadata = {
  title: "Blog | Colex",
  description: "Notes from building Colex.",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  return (
    <Box bg="#F8F7F4" minH="100vh">
      <LandingNavbar />
      <Container maxW="container.md" pt={{ base: 32, md: 40 }} pb={20} px={{ base: 4, md: 8 }}>
        <VStack gap={2} align="flex-start" mb={12}>
          <Text
            fontFamily="mono, monospace"
            fontSize="11px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="brand.primary"
          >
            Colex / build log
          </Text>
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="400"
            fontSize={{ base: "3xl", md: "5xl" }}
            letterSpacing="-0.02em"
            color="text.primary"
          >
            Blog
          </Heading>
        </VStack>

        <VStack gap={8} align="stretch">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block" }}>
            <Box
              display="block"
              borderTop="1px solid"
              borderColor="ui.border"
              pt={6}
              _hover={{ opacity: 0.85 }}
              transition="opacity 0.15s ease"
            >
              <Text
                fontFamily="mono, monospace"
                fontSize="11px"
                letterSpacing="0.1em"
                textTransform="uppercase"
                color="text.muted"
                mb={2}
              >
                {formatDate(post.date)} &middot; {post.readingTime}
              </Text>
              <Heading
                as="h2"
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="700"
                color="text.primary"
                mb={2}
                lineHeight={1.3}
              >
                {post.title}
              </Heading>
              <Text color="text.muted" maxW="66ch">
                {post.description}
              </Text>
            </Box>
            </Link>
          ))}
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}
