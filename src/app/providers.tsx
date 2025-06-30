// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { system } from "@/theme";
import { ThemeProvider } from "@emotion/react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider theme={system}>{children}</ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
