import { Box } from "@chakra-ui/react";
import { POSTS } from "@/app/blog/posts";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Renders the visible byline for a post plus its Article structured data.
 * Google uses the JSON-LD to show the date and author alongside the result.
 */
export default function ArticleMeta({ slug }: { slug: string }) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [`https://getcolex.com/blog/${post.slug}/opengraph-image`],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Colex", url: "https://getcolex.com" },
    publisher: {
      "@type": "Organization",
      name: "Colex",
      logo: {
        "@type": "ImageObject",
        url: "https://getcolex.com/images/ColexLogo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://getcolex.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Box fontSize="13px" color="text.muted" mt={5}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {" \u00b7 "}
        {post.readingTime}
      </Box>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
