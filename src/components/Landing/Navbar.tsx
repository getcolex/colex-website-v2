"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ColexBrandLogo from "@/assets/icons/ColexBrandLogo.svg";

export default function LandingNavbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg="surface.page"
      borderBottom="1px solid"
      borderColor="border.subtle"
      py={{ base: 3, md: 4 }}
    >
      <Container
        maxW="container.xl"
        px={{ base: 4, sm: 6, md: 8, lg: 12 }}
      >
        <Flex align="center" justify="space-between">
          <Link href="/" aria-label="Colex home">
            <ColexBrandLogo
              style={{
                width: isMobile ? 100 : 126,
                height: isMobile ? 35 : 44,
              }}
              aria-label="Colex Logo"
            />
          </Link>
          <Flex gap={{ base: 2, md: 4 }} align="center">
            {["Use cases", "Why Colex", "Blog"].map((label) => (
              <Link
                key={label}
                href={label === "Blog" ? "/blog" : `/#${label.toLowerCase().replace(/ /g, "-")}`}
              >
                <Box
                  as="span"
                  display={{ base: label === "Blog" ? "inline-block" : "none", md: "inline-block" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="500"
                  color="ink.primary"
                  px={{ base: 2, md: 4 }}
                  py={0.5}
                  _hover={{ color: "brand.primary" }}
                  transition="color 0.15s ease"
                  whiteSpace="nowrap"
                >
                  {label}
                </Box>
              </Link>
            ))}
            <Button
              size={{ base: "sm", md: "lg" }}
              fontSize="md"
              fontWeight="500"
              px={{ base: 3, md: 5 }}
              py={0.5}
              borderRadius="8px"
              bg="brand.primary"
              color="white"
              _hover={{ bg: "#5a0a38" }}
              onClick={() => getEarlyAccess("header")}
            >
              Talk to us
              {!isMobile && (
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 8,
                    color: "white",
                  }}
                />
              )}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
