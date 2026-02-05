"use client";

import { Box, Container, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/**
 * Visual 12-column grid overlay for development.
 * Only renders when NODE_ENV is 'development'.
 * Toggle visibility with Ctrl+G / Cmd+G.
 */
export default function DevGridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+G or Cmd+G toggles the grid
      if ((e.ctrlKey || e.metaKey) && e.key === "g") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== "development" || !visible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      inset={0}
      pointerEvents="none"
      zIndex={9999}
      className="dev-grid-overlay"
    >
      <Container maxW="container.xl" h="full" px={{ base: 4, md: 8, lg: 12 }}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap={{ base: 4, md: 6, lg: 8 }}
          h="full"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Box
              key={i}
              bg="rgba(255, 0, 0, 0.07)"
              borderLeft="1px solid rgba(255, 0, 0, 0.15)"
              borderRight="1px solid rgba(255, 0, 0, 0.15)"
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
