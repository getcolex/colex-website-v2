"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { getEarlyAccess } from "@/lib/utils";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  return (
    <Box
      bg="ui.surface"
      h={{ base: "726px", xl: "645px" }}
      py={{ base: 10, xl: 40 }}
      backgroundImage={
        isMobile
          ? "url('/images/FooterBgMobile.png')"
          : "url('/images/FooterBg.png')"
      }
      alignContent={"center"}
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8, lg: 12, xl: 16 }}>
        <VStack
          align="flex-start"
          alignSelf={"center"}
          justifyContent={"center"}
          gap={{ base: 10, xl: 20 }}
        >
          <Heading
            fontSize={{ base: "2xl", lg: "3xl", xl: "4xl" }}
            fontWeight="semibold"
            lineHeight={{ base: 1.33, md: 1.22 }}
            color={"white"}
          >
            Want to see it in action? <br /> Streamline legal operations, reduce
            manual tasks, and boost efficiency.
            <br /> Start in minutes.
          </Heading>
          <Button
            size={"2xl"}
            w={{ base: "auto", lg: 264 }}
            px={7}
            py={0.5}
            lineHeight={1.5}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={4}
            gap={3}
            borderColor={"white"}
            borderWidth={1}
            onClick={() => getEarlyAccess("footer")}
          >
            <Text
              textAlign={"center"}
              w={"100%"}
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"#fff"}
            >
              Book a demo
            </Text>
            <ArrowRightIcon
              style={{
                width: 24,
                height: 24,
                color: "white",
              }}
            />
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
