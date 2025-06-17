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
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
// import Image from "next/image";

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

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const progressAnimation = keyframes`
  from { width: 0% }
  to { width: ${inView ? "100%" : "0%"} }
`;

  console.log(inView);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(interval);
    return () => clearInterval(interval);
  }, [inView]);

  const handleItemClick = (idx: number) => {
    if (timer) clearInterval(timer);
    setActiveIndex(idx);
    const newTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(newTimer);
  };

  return (
    <Box mt={20} py={20} mx={"auto"} bg="white" ref={ref}>
      <Container px={0}>
        <Flex
          justifyContent={"space-between"}
          direction={["column", null, "row"]}
          gap={40}
        >
          {/* Left Feature List */}
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
              {FEATURES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <Box
                    key={idx}
                    mb={5}
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
                        fontWeight="medium"
                        fontSize={"2xl"}
                        lineHeight={1.33}
                        color={isActive ? "#000" : "#A1A1AA"}
                      >
                        {idx + 1}.
                      </Text>
                      <Box>
                        <Text
                          fontSize={"2xl"}
                          lineHeight={1.33}
                          fontWeight={"medium"}
                          color={"#000"}
                        >
                          {item.title}
                        </Text>
                        <Collapsible.Root open={isActive}>
                          <Collapsible.Content>
                            <Text
                              mt={3}
                              fontSize="lg"
                              lineHeight={1.55}
                              color="#000"
                            >
                              {item.description}
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

          {/* Right Visual */}
          <Box borderRadius={4} width={834} height={834} bg="gray.100">
            {/* <Image
            src={`/images/feature1.avif`}
            alt={FEATURES[activeIndex].title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/feature1.png";
            }}
          /> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
