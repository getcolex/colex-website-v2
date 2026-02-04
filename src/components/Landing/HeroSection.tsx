"use client";

import { Box, Container, Text, Button, HStack } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // CTA and trust signals fade in on scroll
  const ctaOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="140vh"
      bg="transparent"
    >
      {/* Sticky container */}
      <Box position="sticky" top={0} height="100vh" overflow="hidden">
        <Container maxW="container.lg" h="full" position="relative">
          {/* Content centered */}
          <Box
            position="absolute"
            inset={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            px={{ base: 4, md: 8 }}
          >
            {/* Headline */}
            <MotionText
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              fontFamily="heading"
              fontSize={{ base: "10vw", md: "7vw", lg: "5.5vw" }}
              lineHeight={1.1}
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.03em"
            >
              Give your teams extra hands
            </MotionText>

            {/* Subtitle */}
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="text.primary"
              fontWeight="500"
              mt={{ base: 4, md: 6 }}
            >
              Colex is purpose built to automate your team reliably
            </MotionText>

            {/* CTA + Trust - fades in on scroll */}
            <MotionBox
              style={{ opacity: ctaOpacity, y: ctaY }}
              mt={{ base: 8, md: 10 }}
            >
              {/* CTA Button */}
              <Box mb={{ base: 6, md: 8 }}>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  borderRadius="4px"
                  bg="brand.primary"
                  color="white"
                  fontWeight="500"
                  fontSize="md"
                  _hover={{
                    bg: "#5a0a38",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                  onClick={() => getEarlyAccess("hero_section")}
                >
                  Let&apos;s build yours
                  <ArrowRightIcon
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 10,
                    }}
                  />
                </Button>
              </Box>

              {/* Trust signals */}
              <Box>
                <Text fontSize="sm" color="text.muted" mb={3}>
                  Trusted by teams at
                </Text>
                <HStack gap={8} justify="center">
                  <Text fontSize="md" color="text.primary" fontWeight="500">
                    Mellow Designs
                  </Text>
                  <Box w="1px" h="20px" bg="gray.300" />
                  <Text fontSize="md" color="text.primary" fontWeight="500">
                    SC Lines
                  </Text>
                </HStack>
              </Box>
            </MotionBox>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
