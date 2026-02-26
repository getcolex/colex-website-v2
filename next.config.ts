import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  webpack(config) {
    // Exclude SVGs from Next.js default file loader
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add @svgr/webpack for SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
