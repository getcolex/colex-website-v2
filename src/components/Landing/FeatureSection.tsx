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
    description:
      "The platform remembers your case and improves suggestions as you work—like a junior that never forgets.",
    image: "/features/feature2.png",
  },
  {
    title: "Smart Drafting",
    description:
      "Write faster with AI-suggested clauses, memos, and summaries tailored to your matter.",
    image: "/features/feature3.png",
  },
  {
    title: "Collaboration That Works",
    description:
      "Senior and junior lawyers stay in sync with real-time sharing, version control, and shared notes.",
    image: "/features/feature4.png",
  },
  {
    title: "Built-In Court Integration",
    description:
      "Get orders, FIRs, and judgments directly from court websites—ready for analysis.",
    image: "/features/feature5.png",
  },
  {
    title: "Secure & Compliant",
    description:
      "Your data is encrypted and securely stored. Client confidentiality is our top priority.",
    image: "/features/feature6.png",
  },
];

export default function FeatureShowcase() {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  /* desktop carousel state */
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const progressAnimation = keyframes`
  from { width: 0% }
  to { width: ${inView ? "100%" : "0%"} }
`;
  useEffect(() => {
    if (!isDesktop || !inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(interval);
    return () => clearInterval(interval);
  }, [isDesktop, inView]);

  const handleItemClick = (idx: number) => {
    if (timer) clearInterval(timer);
    setActiveIndex(idx);
    const newTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(newTimer);
  };

  return (
    <Box
      ref={ref}
      bg="white"
      py={{ base: 0, md: 20 }}
      mt={{ base: 16, md: 20 }}
    >
      <Container maxW="container.xl" px={{ base: 5, md: 0 }}>
        {isDesktop && (
          <Flex
            justifyContent={"space-between"}
            direction={["column", null, "row"]}
            gap={40}
          >
            <VStack justifyContent={"space-between"}>
              <Heading
                fontSize={"4xl"}
                fontWeight={"semibold"}
                alignSelf={"flex-start"}
                lineHeight={1.22}
              >
                Key features
              </Heading>
              <Box maxW={405}>
                {FEATURES.map((f, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <Box
                      key={f.title}
                      mt={5}
                      cursor="pointer"
                      onClick={() => handleItemClick(idx)}
                    >
                      {isActive && inView ? (
                        <Box position="relative" h="2px" w="full" mb={5}>
                          <Box
                            position="absolute"
                            h="2px"
                            w="full"
                            bg="gray.200"
                          />
                          <Box
                            position="absolute"
                            h="2px"
                            w="full"
                            bg="black"
                            animation={`${progressAnimation} 5s linear`}
                          />
                        </Box>
                      ) : (
                        <Box h="2px" w="full" bg="gray.200" mb={5} />
                      )}

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
                              <Text mt={3} fontSize="lg" lineHeight={1.55}>
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

            <Box borderRadius={4} width={834} height={834} bg="gray.100" />
          </Flex>
        )}

        {!isDesktop && (
          <Box gap={10}>
            <Heading
              fontSize="2xl"
              fontWeight="semibold"
              lineHeight={1.33}
              mb={10}
            >
              Key features
            </Heading>

            {FEATURES.map((f, idx) => (
              <Box key={f.title} mb={10}>
                <Box
                  borderRadius={4}
                  width={"full"}
                  height={372}
                  bg="gray.100"
                  mb={5}
                />

                <HStack align="start" gap={2}>
                  <Text fontSize="xl" fontWeight="medium" lineHeight={1.5}>
                    {idx + 1}.
                  </Text>

                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="medium"
                      lineHeight={1.5}
                      mb={2}
                    >
                      {f.title}
                    </Text>
                    <Text fontSize="lg" color="#000" lineHeight={1.55}>
                      {f.description}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
