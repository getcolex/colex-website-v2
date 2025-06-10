"use client";

import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  HStack,
  Collapsible,
} from "@chakra-ui/react";
import Image from "next/image";

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

const progressAnimation = keyframes`
  from { width: 0% }
  to { width: 100% }
`;

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(interval);
    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (idx: number) => {
    if (timer) clearInterval(timer);
    setActiveIndex(idx);
    const newTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    setTimer(newTimer);
  };

  return (
    <Box py={20} maxW="6xl" mx="auto" bg="white">
      <Flex direction={["column", null, "row"]} gap={10} align="center">
        {/* Left Feature List */}
        <VStack align="stretch" gap={0} flex={1}>
          <Heading textAlign="left" mb={40} px={[4, 8]}>
            Key features
          </Heading>
          {FEATURES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Box
                key={idx}
                px={2}
                py={2}
                cursor="pointer"
                onClick={() => handleItemClick(idx)}
              >
                {isActive ? (
                  <Box position="relative" h="2px" w="full" mb={2}>
                    <Box position="absolute" h="2px" w="full" bg="gray.200" />
                    <Box
                      position="absolute"
                      h="2px"
                      w="full"
                      bg="black"
                      animation={`${progressAnimation} 5s linear`}
                    />
                  </Box>
                ) : (
                  <Box h="2px" w="full" bg="gray.200" mb={2} />
                )}

                <HStack align="start" gap={4}>
                  <Text
                    fontWeight="bold"
                    color={isActive ? "black" : "gray.400"}
                    minW="20px"
                  >
                    {idx + 1}.
                  </Text>
                  <Box>
                    <Text
                      fontWeight={isActive ? "semibold" : "normal"}
                      color={isActive ? "black" : "gray.500"}
                    >
                      {item.title}
                    </Text>
                    <Collapsible.Root open={isActive}>
                      <Collapsible.Content>
                        <Text mt={1} fontSize="sm" color="gray.600">
                          {item.description}
                        </Text>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </Box>
                </HStack>
              </Box>
            );
          })}
        </VStack>

        {/* Right Visual */}
        <Box
          flex={1}
          minH={600}
          w={"100%"}
          minW={600}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={`/images/feature1.avif`}
            alt={FEATURES[activeIndex].title}
            width={600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
              maxWidth: 500,
              maxHeight: 500,
            }}
            height={600}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/feature1.png";
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
