import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

export default function HeroSection() {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false });
  return (
    <Box
      position="relative"
      minH={{ base: "580px", xl: "480px" }}
      display={"flex"}
      alignItems={"flex-end"}
      mx={"auto"}
    >
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
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8, lg: 12, xl: 16 }}
        py={{ base: 10, xl: 20 }}
        position="relative"
        zIndex={1}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-end" }}
          justify="space-between"
          gap={{ base: 10, md: 0 }}
        >
          <VStack align="start" flex={{ md: 3 }} gap={{ base: 10, md: 6 }}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight={1.25}
              fontWeight="semibold"
              color={"#000"}
              textAlign={"left"}
              mr={{ base: 6, md: 4 }}
            >
              Cut the busywork and reclaim hours for strategic planning
            </Heading>
          </VStack>
          <Box flex={{ md: 2 }}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="#000"
              lineHeight={{ base: 1.55, lg: 1.25 }}
            >
              Colex is an AI-Powered Legal Workspace built for In-house legal
              teams dealing increasingly complex business challanges
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
