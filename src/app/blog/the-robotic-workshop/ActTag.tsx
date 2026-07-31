import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function ActTag({ children }: { children: ReactNode }) {
  return (
    <Text
      fontFamily="mono, monospace"
      fontSize="11px"
      letterSpacing="0.15em"
      textTransform="uppercase"
      color="brand.primary"
      pb={2}
      mb={3}
      borderBottom="1px solid"
      borderColor="rgba(73,8,45,.10)"
      display="inline-block"
    >
      {children}
    </Text>
  );
}
