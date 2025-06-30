// src/app/providers.tsx
"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { system } from "@/theme";
import { ThemeProvider } from "@emotion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider theme={system}>{children}</ThemeProvider>
    </ChakraProvider>
  );
}
