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
              px={{ base: 4, md: 8, lg: 12 }}
            >
              <Flex align="center" justify="space-between">
                <ColexBrandLogo
                  style={{
                    width: 126,
                    height: 44,
                  }}
                  alt="Colex Logo"
                />
                <Flex gap={{ base: 2, md: 5 }}>
                  <Button
                    size="lg"
                    w={{ base: "auto", lg: 260 }}
                    fontSize="md"
                    fontWeight="500"
                    px={5}
                    py={0.5}
                    borderRadius={4}
                    bg="button.primary"
                    color="white"
                    _hover={{
                      bg: "button.primaryHover",
                    }}
                    _active={{
                      bg: "button.primaryActive",
                    }}
                    onClick={() => getEarlyAccess("header")}
                  >
                    Book a demo
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
  );
}
