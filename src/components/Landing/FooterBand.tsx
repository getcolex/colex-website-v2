"use client";

import { Box } from "@chakra-ui/react";
import BookDemoSection from "./BookDemoSection";
import Footer from "./Footer";

/**
 * CTA + footer sharing the maroon ground. The CTA ("Bring us the process
 * that keeps breaking.") sits on brand oxblood with no ledger; only the
 * actual footer strip below carries the reactive ledger, which it owns
 * fully (Footer renders it when transparentBg is false).
 */
export default function FooterBand() {
  return (
    <>
      <Box bg="brand.primary">
        <BookDemoSection />
      </Box>
      <Footer />
    </>
  );
}
