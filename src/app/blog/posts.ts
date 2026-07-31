export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "the-robotic-workshop",
    title: "I stopped writing code. Now I run a factory.",
    description:
      "Agents write the code here. My job is to decide what gets built, and to catch what they got wrong. This is how that setup came together, including the parts that are still broken.",
    date: "2026-07-18",
    readingTime: "10 min read",
  },
  {
    slug: "a-test-bench-i-can-rely-on",
    title: "A test bench I can rely on",
    description:
      "Testing was the part of my build loop I still did by hand, picking checks from memory. This is how it became a protocol, and what the first run got wrong.",
    date: "2026-07-30",
    readingTime: "7 min read",
  },
];
