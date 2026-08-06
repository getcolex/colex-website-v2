"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { getEarlyAccess } from "@/lib/utils";
import dynamic from "next/dynamic";

const LedgerScatter = dynamic(() => import("./LedgerScatter"), { ssr: false });

const FOOTER_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "#", onClick: () => getEarlyAccess("footer") },
];

export default function Footer({ transparentBg = false }: { transparentBg?: boolean }) {
  return (
    <Box as="footer" bg={transparentBg ? "transparent" : "brand.primary"} pt={{ base: 20, lg: 32 }} position="relative">
      {/* When the footer owns its background, it also owns the reactive
          ledger — feathered top and bottom into the maroon ground so the
          seam with the CTA above reads as one continuous surface. */}
      {!transparentBg && (
        <>
          <LedgerScatter preset="blog" />
          <Box
            position="absolute"
            inset={0}
            pointerEvents="none"
            background="linear-gradient(to bottom, #49082D 0%, transparent 35%, transparent 80%, #49082D 100%)"
          />
        </>
      )}
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }} position="relative" zIndex={1}>
        {/* Mobile + Tablet layout */}
        <VStack gap={4} align="center" display={{ base: "flex", lg: "none" }}>
          <Flex gap={4} flexWrap="wrap" justify="center">
            {FOOTER_LINKS.map((link) => (
              <ChakraLink
                asChild
                key={link.label}
                onClick={link.onClick}
                fontSize="sm"
                color="rgba(255,255,255,0.6)"
                _hover={{ color: "surface.page" }}
                transition="color 0.2s"
              >
                <NextLink href={link.href}>
                {link.label}
                </NextLink>
              </ChakraLink>
            ))}
          </Flex>
          <Text
            fontSize="sm"
            color="rgba(255,255,255,0.5)"
            textAlign="center"
            w="full"
          >
            © 2026 Colex. All rights reserved.
          </Text>
          <Box position="relative" w="full" h={{ base: "120px", sm: "150px" }}>
            <Image
              fill
              sizes="100vw"
              src="/images/ColexLogo.png"
              alt="Colex Logo"
              style={{ objectFit: "contain", objectPosition: "left bottom", filter: "brightness(0) invert(1)" }}
            />
          </Box>
        </VStack>

        {/* Desktop layout */}
        <HStack justifyContent="space-between" alignItems="flex-end" display={{ base: "none", lg: "flex" }}>
          <Box position="relative" w={{ lg: "500px", xl: "620px", "2xl": "680px" }} h={{ lg: "172px", xl: "214px", "2xl": "234px" }}>
            <Image
              fill
              sizes="(min-width: 1280px) 620px, 500px"
              src="/images/ColexLogo.png"
              alt="Colex Logo"
              style={{ objectFit: "contain", objectPosition: "left bottom", filter: "brightness(0) invert(1)" }}
            />
          </Box>
          <VStack align="flex-end" gap={2} mb={2}>
            <Flex gap={6}>
              {FOOTER_LINKS.map((link) => (
                <ChakraLink
                  asChild
                  key={link.label}
                  onClick={link.onClick}
                  fontSize="sm"
                  color="rgba(255,255,255,0.6)"
                  _hover={{ color: "surface.page" }}
                  transition="color 0.2s"
                >
                  <NextLink href={link.href}>
                  {link.label}
                  </NextLink>
                </ChakraLink>
              ))}
            </Flex>
            <Text fontSize="sm" color="rgba(255,255,255,0.5)">
              © 2026 Colex. All rights reserved.
            </Text>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
