import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { POSTS } from "@/app/blog/posts";

/**
 * End-of-article navigation. Shows the next post to read plus a route back to
 * the index, so a reader arriving from search always has somewhere to go.
 */
export default function PostFooterNav({ slug }: { slug: string }) {
  const others = POSTS.filter((p) => p.slug !== slug);
  const next = others[0];

  return (
    <Box as="nav" maxW="700px" mt={16} pt={8} borderTop="1px solid" borderColor="ui.border">
      {next && (
        <Link href={`/blog/${next.slug}`}>
          <Box
            border="1px solid"
            borderColor="ui.border"
            borderRadius="3px"
            p={5}
            mb={5}
            bg="ui.background"
            _hover={{ borderColor: "brand.primary" }}
            transition="border-color 0.15s ease"
          >
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="text.muted"
              mb={2}
            >
              Read next
            </Text>
            <Text fontSize="19px" fontFamily="heading" fontWeight="700" color="text.primary" mb={2}>
              {next.title}
            </Text>
            <Text fontSize="13px" color="text.muted" lineHeight="1.5">
              {next.description}
            </Text>
          </Box>
        </Link>
      )}

      <Link href="/blog">
        <Text
          fontSize="13px"
          fontWeight="500"
          color="brand.primary"
          _hover={{ textDecoration: "underline" }}
        >
          &larr; All posts
        </Text>
      </Link>
    </Box>
  );
}
