"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import { getEarlyAccess } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "#", onClick: () => getEarlyAccess("footer") },
];

export default function Footer() {
  return (
    <Box as="footer" bg="transparent" pt={20}>
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        {/* Mobile + Tablet layout */}
        <VStack gap={4} align="center" display={{ base: "flex", lg: "none" }}>
          <Flex gap={4} flexWrap="wrap" justify="center">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                fontSize="sm"
                color="text.muted"
                _hover={{ color: "text.primary" }}
                transition="color 0.2s"
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          <Text
            fontSize="sm"
            color="text.muted"
            textAlign="center"
            w="full"
          >
            © 2025 | ALL RIGHTS RESERVED by Colex.
          </Text>
          <Box position="relative" w={{ base: "280px", sm: "320px" }} h={{ base: "96px", sm: "110px" }}>
            <Image
              fill
              sizes="320px"
              src="/images/ColexLogo.png"
              alt="Colex Logo"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </VStack>

        {/* Desktop layout */}
        <HStack justifyContent="space-between" alignItems="flex-end" display={{ base: "none", lg: "flex" }}>
          <Box position="relative" w={{ lg: "400px", xl: "500px", "2xl": "550px" }} h={{ lg: "138px", xl: "172px", "2xl": "190px" }}>
            <Image
              fill
              sizes="(min-width: 1280px) 500px, 400px"
              src="/images/ColexLogo.png"
              alt="Colex Logo"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <VStack align="flex-end" gap={2} mb={2}>
            <Flex gap={6}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  fontSize="sm"
                  color="text.muted"
                  _hover={{ color: "text.primary" }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Flex>
            <Text fontSize="sm" color="text.muted">
              © 2025 | ALL RIGHTS RESERVED by Colex.
            </Text>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
