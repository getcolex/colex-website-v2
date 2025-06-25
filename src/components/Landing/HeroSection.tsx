import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

export default function HeroSection() {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false });
  return (
    <Box
      position="relative"
      minH={{ base: "744px", xl: "660px" }}
      display={"flex"}
      alignItems={"flex-end"}
      mx={"auto"}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        pointerEvents="none"
      >
        <Image
          src={
            isMobile ? "/images/HeroImageMobile.png" : "/images/HeroImage.png"
          }
          alt="Colex "
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
      {/* Content Overlay */}
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8, lg: 12, xl: 16 }}
        py={{ base: 10, xl: 20 }}
        position="relative"
        zIndex={1}
      >
        <VStack gap={10} align="start" maxW={"700px"}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            lineHeight={1.25}
            fontWeight="semibold"
            color={"#000"}
          >
            Your AI powered collaborative legal workspace
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="semibold"
            color="#52525B"
            lineHeight={{ base: 1.55, lg: 1.25 }}
          >
            Research • Organise • Analyse • Draft
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
