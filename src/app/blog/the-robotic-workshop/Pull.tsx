import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Pull({
  children,
  big = false,
}: {
  children: ReactNode;
  big?: boolean;
}) {
  return (
    <Box
      as="blockquote"
      fontFamily="heading"
      fontSize="27px"
      fontWeight={big ? "700" : "400"}
      lineHeight={1.45}
      color="brand.primary"
      borderLeft="2px solid"
      borderColor="brand.primary"
      py={1}
      pl={5}
      my={6}
      maxW="58ch"
    >
      {children}
    </Box>
  );
}
