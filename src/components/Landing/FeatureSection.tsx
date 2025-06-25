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
import { AnimatePresence, motion, useMotionValue } from "motion/react";

const FEATURES = [
  {
    title: "Context-Aware",
    description:
      "The platform remembers your case and improves suggestions as you work, like a junior that never forgets.",
    image: "/images/Context-Aware.png",
  },
  {
    title: "Collaboration That Works",
    description:
      "Stay in sync with clients, colleagues and other stakeholders in real time.",
    image: "/images/Collaboration that works.png",
  },
  {
    title: "Analyse at Lightspeed",
    description:
      "Use LLMs to automate administrative and tedious tasks like reviewing large documents, discovering facts and comparing information",
    image: "/images/Analyse at lightspeed.png",
  },
  {
    title: "Built-in Court Integration",
    description:
      "Search past judgements from eCourts and other trusted databases. Get orders and updates directly from courts as your matters progress.",
    image: "/images/Built in court integration.png",
  },
  {
    title: "Smart Drafting",
    description:
      "Draft with AI and use OCRed templates from courts to file in the correct format. Reduce gaps in your case file and make stronger arguments with AI.",
    image: "/images/Smart Drafting.png",
  },
  {
    title: "Security is Our Top Priority",
    description:
      "Your files are completely private and not visible to Colex or any third party. We are working towards ISO 270001 and SOC 1 & 2 certification.",
    image: "/images/Security is our top priority.png",
  },
];

/* ---------------------------------------------------------------- */
/* constants you may want to tweak                                  */
const FEATURE_HEIGHT_PX = 220; // per-feature slice
const SCROLL_SPAN_PX = 2000; // artificial scroll range
const DESKTOP_MIN_BP = "md"; // breakpoint that enables the effect
/* ---------------------------------------------------------------- */

export default function FeatureShowcase() {
  const isDesktop = useBreakpointValue({ base: false, [DESKTOP_MIN_BP]: true });
  const sliceProgress = useMotionValue(0);

  /* state --------------------------------------------------------- */
  const [activeIndex, setActiveIndex] = useState(0);
  // const [isPinned, setIsPinned] = useState(false);
  const phantomRef = useRef<HTMLDivElement>(null);

  /* scroll logic -------------------------------------------------- */
  useEffect(() => {
    if (!isDesktop) return;
    const phantom = phantomRef.current;
    if (!phantom) return;

    const startTop = phantom.offsetTop; // top of phantom
    const endTop = startTop + SCROLL_SPAN_PX; // bottom of phantom

    console.log(startTop, endTop);
    const handler = () => {
      const y = window.scrollY;

      const inside = y >= startTop && y < endTop;
      // setIsPinned(inside);

      if (inside) {
        const progress = y - startTop;
        const idx = Math.floor(progress / FEATURE_HEIGHT_PX);
        const withinIdx = progress % FEATURE_HEIGHT_PX;
        const lastIndex = FEATURES.length - 1;
        const progressWidth = withinIdx / FEATURE_HEIGHT_PX;

        if (idx < lastIndex) {
          sliceProgress.set(progressWidth);
        } else {
          sliceProgress.set(1);
        }
        setActiveIndex(Math.min(idx, FEATURES.length - 1));
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isDesktop]);

  /* ‼️ phantom height collapses to 0 after first run --------------- */
  const phantomHeight = SCROLL_SPAN_PX + "px";

  /* render -------------------------------------------------------- */
  return (
    <Box
      ref={phantomRef}
      h={isDesktop ? phantomHeight : "auto"}
      position="relative"
    >
      <Box top={10} zIndex={1} position={"sticky"} bg="white">
        <Box py={{ base: 0, md: 20 }} mt={20}>
          <Container
            maxW="container.xl"
            px={{ base: 5, md: 8, lg: 12, xl: 16 }}
          >
            {isDesktop ? (
              <Flex
                justifyContent="space-between"
                direction={["column", null, "row"]}
                gap={40}
              >
                <VStack justifyContent="space-between" maxW={405}>
                  <Heading
                    fontSize="4xl"
                    fontWeight="semibold"
                    alignSelf="flex-start"
                    lineHeight={1.22}
                  >
                    Designed to enhance efficiency and accuracy
                  </Heading>
                  <Box alignSelf={"flex-start"}>
                    {FEATURES.map((f, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <Box key={f.title} mt={5}>
                          <Box
                            position="relative"
                            h="2px"
                            w="full"
                            mb={5}
                            bg="gray.200"
                            overflow="hidden"
                          >
                            {isActive && (
                              <motion.div
                                style={{
                                  height: "100%",
                                  background: "black",
                                  scaleX: sliceProgress,
                                  transformOrigin: "left",
                                }}
                                initial={false}
                                transition={{
                                  type: "tween",
                                  ease: "linear",
                                  duration: 0.1,
                                }}
                              />
                            )}
                          </Box>

                          <HStack align="start" gap={5}>
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
                  width={760}
                  height={760}
                  position="relative"
                  overflow="hidden"
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeIndex}
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
                        delay: 0.3,
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
                  </AnimatePresence>
                </Box>
              </Flex>
            ) : (
              <Box>
                <Heading
                  fontSize="2xl"
                  fontWeight="semibold"
                  lineHeight={1.33}
                  mb={16}
                >
                  Designed to enhance efficiency and accuracy
                </Heading>

                {FEATURES.map((f, idx) => (
                  <Box key={f.title} mb={16} position="relative">
                    <HStack align="start" gap={2}>
                      <Text fontSize="xl" fontWeight="medium">
                        {idx + 1}.
                      </Text>
                      <Box>
                        <Text fontSize="xl" fontWeight="medium" mb={1}>
                          {f.title}
                        </Text>
                        <Text fontSize="lg">{f.description}</Text>
                      </Box>
                    </HStack>
                    <Box height={372} width="100%" mt={5} position="relative">
                      <Image
                        src={f.image}
                        alt={f.title}
                        layout="fill"
                        objectFit="cover"
                        style={{ borderRadius: 4 }}
                      />
                    </Box>
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
