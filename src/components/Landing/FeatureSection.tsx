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
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { FEATURES } from "@/lib/constants";

/* ---------------------------------------------------------------- */
/* constants you may want to tweak                                  */
const FEATURE_HEIGHT_PX = 1200; // per-feature slice
const SCROLL_SPAN_PX = 7800; // artificial scroll range
const DESKTOP_MIN_BP = "xl"; // breakpoint that enables the effect
/* ---------------------------------------------------------------- */

export default function FeatureShowcase() {
  const isDesktop = useBreakpointValue({ base: false, [DESKTOP_MIN_BP]: true });
  const sliceProgress = useMotionValue(0);

  /* state --------------------------------------------------------- */
  const [activeIndex, setActiveIndex] = useState(0);
  const phantomRef = useRef<HTMLDivElement>(null);

  const handleFeatureClick = (idx: number) => {
    setActiveIndex(idx);
    sliceProgress.set(1);
  };

  const translateY = useTransform(sliceProgress, [0, 1], [50, 0]);

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
        <Box py={{ base: 0, xl: 20 }} mt={20}>
          <Container
            maxW="container.xl"
            px={{ base: 5, md: 8, lg: 12, xl: 16 }}
          >
            {isDesktop ? (
              <Flex
                justifyContent="space-between"
                direction={["column", null, "row"]}
              >
                <VStack justifyContent="space-between" maxW={427}>
                  <Heading
                    fontSize={{ xl: "3xl", "2xl": "4xl" }}
                    fontWeight="semibold"
                    alignSelf="flex-start"
                    lineHeight={1.22}
                  >
                    Designed to enhance
                    <br /> efficiency and accuracy
                  </Heading>
                  <Box alignSelf={"flex-start"}>
                    {FEATURES.map((f, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <Box
                          key={f.title}
                          mt={5}
                          onClick={() => {
                            handleFeatureClick(idx);
                          }}
                        >
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
                              fontSize={{ xl: "xl", "2xl": "2xl" }}
                              fontWeight="medium"
                              lineHeight={1.33}
                              color={isActive ? "black" : "gray.400"}
                            >
                              {idx + 1}.
                            </Text>
                            <Box>
                              <Text
                                fontSize={{ xl: "xl", "2xl": "2xl" }}
                                fontWeight="medium"
                              >
                                {f.title}
                              </Text>

                              <Collapsible.Root open={isActive}>
                                <Collapsible.Content>
                                  <Text
                                    mt={3}
                                    fontSize={{ xl: "md", "2xl": "lg" }}
                                  >
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
                  height={{ xl: "600px", "2xl": "760px" }}
                  width={{ base: "600px", "2xl": "760px" }}
                  borderRadius={4}
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
                        translateY: translateY,
                        // opacity: 1,
                      }}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.2,
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
                  Designed to enhance <br /> efficiency and accuracy
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
                        priority
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
