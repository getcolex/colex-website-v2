// src/components/LandingNavbar.tsx
"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { getEarlyAccess } from "@/lib/utils";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ColexBrandLogo from "@/assets/icons/ColexBrandLogo.svg";

export default function LandingNavbar() {
  const { scrollY } = useScrollPosition();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Show navbar always on mobile, or after scrolling past hero section on desktop
  const shouldShowNavbar = isMobile || scrollY > 580;

  return (
    <>
      {/* Static logo visible on desktop before scroll */}
      {!isMobile && (
        <AnimatePresence>
          {!shouldShowNavbar && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
              }}
            >
              <Box py={5}>
                <Container
                  maxW="container.xl"
                  px={{ base: 4, sm: 6, md: 8, lg: 12 }}
                >
                  <Flex align="center" justify="space-between">
                    <Link href="/" aria-label="Colex home">
                      <ColexBrandLogo
                        style={{ width: 126, height: 44 }}
                        aria-label="Colex Logo"
                      />
                    </Link>
                    <Flex gap={{ base: 2, md: 4 }} align="center">
                      {["Use cases", "Why Colex", "Blog"].map((label) => (
                        <Link
                          key={label}
                          href={label === "Blog" ? "/blog" : `#${label.toLowerCase().replace(/ /g, "-")}`}
                        >
                          <Box
                            as="span"
                            display={{ base: label === "Blog" ? "inline-block" : "none", md: "inline-block" }}
                            fontSize="md"
                            fontWeight="500"
                            color="text.primary"
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
                        size="lg"
                        fontSize="md"
                        fontWeight="500"
                        px={5}
                        py={0.5}
                        borderRadius={4}
                        bg="brand.primary"
                        color="white"
                        _hover={{ bg: "#5a0a38" }}
                        onClick={() => getEarlyAccess("header")}
                      >
                        Talk to us
                      </Button>
                    </Flex>
                  </Flex>
                </Container>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {shouldShowNavbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
          <Box
            py={5}
            bg="ui.background"
            borderBottom="1px solid"
            borderColor="ui.border"
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
                      href={label === "Blog" ? "/blog" : `#${label.toLowerCase().replace(/ /g, "-")}`}
                    >
                      <Box
                        as="span"
                        display={{ base: label === "Blog" ? "inline-block" : "none", md: "inline-block" }}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="500"
                        color="text.primary"
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
                    borderRadius={4}
                    bg="brand.primary"
                    color="white"
                    _hover={{
                      bg: "#5a0a38",
                    }}
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
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
