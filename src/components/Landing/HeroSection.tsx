import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ColexBrandLogo from "@/assets/icons/ColexBrandLogo.svg";

export default function HeroSection() {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false });
  return (
    <Box
      position="relative"
      minH={{ base: "540px", xl: "660px" }}
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
          alt="Colex"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
      {/* Content Overlay */}
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8, lg: 12, xl: 16 }}
        py={{ base: 10, xl: 40 }}
        position="relative"
        zIndex={1}
      >
        <VStack gap={10} align="start" maxW={"740px"}>
          <ColexBrandLogo
            style={{
              width: 264,
              height: 92,
              aspectRatio: "222/77",
            }}
            alt="Colex Logo"
          />
          <Text
            fontSize={{ base: "4xl", md: "5xl" }}
            lineHeight={1.25}
            fontWeight="600"
            color="brand.primary"
          >
            For Legal Teams That Move Fast
          </Text>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            color="text.primary"
            fontWeight="400"
            lineHeight={{ base: 1.55, md: 1.26 }}
          >
            AI-Powered Workspace for In-House Legal
            <br /> & Compliance Teams
          </Text>
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
            onClick={() => getEarlyAccess("Hero")}
          >
            <Text
              textAlign={"center"}
              w={"100%"}
              fontSize={"lg"}
              fontWeight={"medium"}
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
