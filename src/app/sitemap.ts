import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const SITE = "https://getcolex.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((r) => ({
    // No lastModified: these pages have no reliable modification date, and
    // stamping the build time makes every deploy look like a content change.
    url: `${SITE}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const posts = POSTS.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
