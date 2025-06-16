// app/dashboard/layout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">{children}</Box>
    </Flex>
  );
}
