import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Note({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Box
      borderLeft="2px solid"
      borderColor="brand.primary"
      bg="rgba(73,8,45,.05)"
      px={4}
      py={3}
      mt={5}
      fontSize="13px"
      color="text.muted"
      maxW="74ch"
    >
      <Text
        as="span"
        display="block"
        fontFamily="mono, monospace"
        fontSize="11px"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="brand.primary"
        mb={1.5}
        fontWeight="400"
      >
        {title}
      </Text>
      {children}
    </Box>
  );
}
