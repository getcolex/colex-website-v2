// app/dashboard/layout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Flex>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Box flex="1">{children}</Box>
    </Flex>
  );
}
