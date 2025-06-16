"use client";

import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
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
import { useInView } from "react-intersection-observer";

const FEATURES = [
  {
    title: "All-in-One Workspace",
    description:
      "Search, draft, annotate, and organize your case in one place. Organize research with folders, tags, and notes.",
    image: "/features/feature1.png",
  },
  {
    title: "Context-Aware AI",
    description: "AI that understands your case context deeply.",
    image: "/features/feature2.png",
  },
  {
    title: "Smart Drafting",
    description: "Automated legal document drafting tailored to your style.",
    image: "/features/feature3.png",
  },
  {
    title: "Collaboration That Works",
    description: "Work with your team in real-time on the same case files.",
    image: "/features/feature4.png",
  },
  {
    title: "Built-In Court Integration",
    description: "Direct access to court databases, forms, and filings.",
    image: "/features/feature5.png",
  },
  {
    title: "Secure & Compliant",
    description:
      "Built to meet the highest standards of security and compliance.",
    image: "/features/feature6.png",
  },
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const showRightView = useBreakpointValue({ base: false, md: true });

  const progress = keyframes`
    from { width: 0% }
    to ${inView ? "width: 100%" : "width: 0%"}
  `;

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % FEATURES.length),
      5000
    );
    setTimer(interval);
    return () => clearInterval(interval);
  }, [inView]);

  const handleItemClick = (i: number) => {
    if (timer) clearInterval(timer);
    setActiveIndex(i);
    const newTimer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % FEATURES.length),
      5000
    );
    setTimer(newTimer);
  };

  return (
    <Box
      ref={ref}
      bg="white"
      mt={{ base: 10, md: 20 }}
      py={{ base: 5, md: 20 }}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 0 }}>
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          gap={{ base: 10, lg: 16, xl: 40 }}
          align="stretch"
        >
          <VStack align="stretch" gap={8} flex={{ md: 1 }}>
            <Heading
              fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
              fontWeight="semibold"
              lineHeight={1.22}
            >
              Key features
            </Heading>

            {FEATURES.map((f, i) => {
              const active = i === activeIndex;
              return (
                <Box
                  key={f.title}
                  cursor="pointer"
                  onClick={() => handleItemClick(i)}
                >
                  <Box position="relative" h="2px" w="full" mb={4}>
                    <Box pos="absolute" h="2px" w="full" bg="gray.200" />
                    {active && inView && (
                      <Box
                        pos="absolute"
                        h="2px"
                        w="full"
                        bg="black"
                        animation={`${progress} 5s linear forwards`}
                      />
                    )}
                  </Box>

                  <HStack align="start" gap={4}>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "lg", sm: "xl", lg: "2xl" }}
                      color={active ? "black" : "gray.400"}
                    >
                      {i + 1}.
                    </Text>

                    <Box>
                      <Text
                        fontSize={{ base: "lg", sm: "xl", lg: "2xl" }}
                        fontWeight="medium"
                        lineHeight={1.33}
                      >
                        {f.title}
                      </Text>

                      <Collapsible.Root open={active}>
                        <Collapsible.Content>
                          <Text
                            mt={3}
                            fontSize={{ base: "md", sm: "lg" }}
                            lineHeight={1.55}
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
          </VStack>

          {showRightView && (
            <Box borderRadius={4} width={834} height={834} bg="gray.100">
              {/* <Image
            src={`/images/feature1.avif`}
            alt={FEATURES[activeIndex].title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/feature1.png";
            }}
          /> */}
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
