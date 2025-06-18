"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  HStack,
  Collapsible,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "motion/react";

const FEATURES = [
  {
    title: "All-in-One Workspace",
    description:
      "Search, draft, annotate, and organize your case in one place. Organize research with folders, tags, and notes.",
    image: "/images/All-in-One Workspace.png",
  },
  {
    title: "Context-aware AI",
    description:
      "The platform remembers your case and improves suggestions as you work—like a junior that never forgets.",
    image: "/images/Context-Aware AI.png",
  },
  {
    title: "Smart Drafting",
    description:
      "Write faster with AI-suggested clauses, memos, and summaries tailored to your matter.",
    image: "/images/Smart Drafting.png",
  },
  {
    title: "Collaboration That Works",
    description:
      "Senior and junior lawyers stay in sync with real-time sharing, version control, and shared notes.",
    image: "/images/Collaboration that works.png",
  },
  {
    title: "Built-In Court Integration",
    description:
      "Get orders, FIRs, and judgments directly from court websites—ready for analysis.",
    image: "/images/Built in court integration.png",
  },
  {
    title: "Secure & Compliant",
    description:
      "Your data is encrypted and securely stored. Client confidentiality is our top priority.",
    image: "/images/Secure and compliant.png",
  },
];

/* ---------------------------------------------------------------- */
/* constants you may want to tweak                                  */
const FEATURE_HEIGHT_PX = 140; // per-feature slice
const SCROLL_SPAN_PX = 834 * 2; // artificial scroll range
const DESKTOP_MIN_BP = "md"; // breakpoint that enables the effect
/* ---------------------------------------------------------------- */

export default function FeatureShowcase() {
  const isDesktop = useBreakpointValue({ base: false, [DESKTOP_MIN_BP]: true });

  /* state --------------------------------------------------------- */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  const phantomRef = useRef<HTMLDivElement>(null);

  /* scroll logic -------------------------------------------------- */
  useEffect(() => {
    if (!isDesktop || playedOnce) return; // run only once, on desktop
    const phantom = phantomRef.current;
    if (!phantom) return;

    const startTop = phantom.offsetTop; // top of phantom
    const endTop = startTop + SCROLL_SPAN_PX; // bottom of phantom

    console.log(startTop, endTop);
    const handler = () => {
      const y = window.scrollY;

      const inside = y >= startTop && y < endTop;
      setIsPinned(inside);

      if (inside) {
        const progress = y - startTop; // 0 … 1700
        const idx = Math.floor(progress / FEATURE_HEIGHT_PX);

        if (idx === FEATURES.length - 1 && y >= endTop) {
          setPlayedOnce(true);
        }
        setActiveIndex(Math.min(idx, FEATURES.length - 1));
      }

      // if (y >= endTop && !playedOnce) setPlayedOnce(true);
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isDesktop, playedOnce]);

  /* ‼️ phantom height collapses to 0 after first run --------------- */
  const phantomHeight = playedOnce ? "834px" : SCROLL_SPAN_PX + "px";

  /* render -------------------------------------------------------- */
  return (
    <Box
      ref={phantomRef}
      h={isDesktop ? phantomHeight : "auto"}
      position="relative"
    >
      <Box
        position={isDesktop && isPinned ? "sticky" : "static"}
        top={10}
        zIndex={1}
        bg="white"
      >
        <Box py={{ base: 0, md: 20 }} mt={{ base: 16, md: 20 }}>
          <Container maxW="container.xl" px={{ base: 5, md: 0 }}>
            {isDesktop ? (
              <Flex
                justifyContent="space-between"
                direction={["column", null, "row"]}
                gap={40}
              >
                <VStack justifyContent="space-between">
                  <Heading
                    fontSize="4xl"
                    fontWeight="semibold"
                    alignSelf="flex-start"
                    lineHeight={1.22}
                  >
                    Key features
                  </Heading>
                  <Box maxW={405}>
                    {FEATURES.map((f, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <Box key={f.title} mt={5}>
                          <Box
                            position="relative"
                            h="2px"
                            w="full"
                            mb={5}
                            bg={isActive ? "black" : "gray.200"}
                          ></Box>

                          <HStack align="start" gap={4}>
                            <Text
                              fontSize="2xl"
                              fontWeight="medium"
                              lineHeight={1.33}
                              color={isActive ? "black" : "gray.400"}
                            >
                              {idx + 1}.
                            </Text>
                            <Box>
                              <Text fontSize="2xl" fontWeight="medium">
                                {f.title}
                              </Text>

                              <Collapsible.Root open={isActive}>
                                <Collapsible.Content>
                                  <Text mt={3} fontSize="lg">
                                    {f.description}
                                  </Text>
                                </Collapsible.Content>
                              </Collapsible.Root>
                            </Box>
                          </HStack>
                        </Box>
                      );
                    })}
                  </Box>
                </VStack>

                <Box
                  borderRadius={4}
                  width={834}
                  height={834}
                  bg="gray.100"
                  position="relative"
                  overflow="hidden"
                >
                  <motion.div /* ✨ fades in/out on index change */
                    key={activeIndex} /* a new MotionBox for every image */
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.05,
                    }}
                  >
                    <Image
                      src={FEATURES[activeIndex].image}
                      alt={FEATURES[activeIndex].title}
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: 4 }}
                      priority
                    />
                  </motion.div>
                </Box>
              </Flex>
            ) : (
              <Box>
                <Heading
                  fontSize="2xl"
                  fontWeight="semibold"
                  mb={10}
                  lineHeight={1.33}
                >
                  Key features
                </Heading>

                {FEATURES.map((f, idx) => (
                  <Box key={f.title} mb={10} position="relative">
                    <Box height={372} width="100%" mb={10} position="relative">
                      <Image
                        src={f.image}
                        alt={f.title}
                        layout="fill"
                        objectFit="cover"
                        style={{ borderRadius: 4 }}
                      />
                    </Box>
                    <HStack align="start" gap={2}>
                      <Text fontSize="xl" fontWeight="medium">
                        {idx + 1}.
                      </Text>
                      <Box>
                        <Text fontSize="xl" fontWeight="medium" mb={2}>
                          {f.title}
                        </Text>
                        <Text fontSize="lg">{f.description}</Text>
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
