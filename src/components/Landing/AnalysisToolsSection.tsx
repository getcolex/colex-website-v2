"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";

import { MdInsights } from "react-icons/md";
import { LuRoute, LuFileStack, LuMessageSquareText } from "react-icons/lu";
import { FiPenTool } from "react-icons/fi";
import { MdOutlineFindInPage } from "react-icons/md";

const ANALYSIS_TOOLS = [
  {
    title: "Bulk Analysis",
    description: "Analyze multiple documents at once",
    icon: MdInsights,
  },
  {
    title: "Ask Colex",
    description: "Smart responses for your legal queries",
    icon: LuMessageSquareText,
  },
  {
    title: "Chronology",
    description: "View sequence of events in the case",
    icon: LuRoute,
  },
  {
    title: "Compare Documents",
    description: "Spot substantive differences",
    icon: LuFileStack,
  },
  {
    title: "Write a Summary",
    description: "Generate a summary of your document",
    icon: FiPenTool,
  },
  {
    title: "Find Information",
    description: "Search for names, dates, or key details",
    icon: MdOutlineFindInPage,
  },
];

export default function AnalysisToolsSection() {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  return (
    <Box
      pt={{ base: 10, xl: 32 }}
      pb={{ base: 20, xl: 40 }}
      bg="ui.background"
      background="linear-gradient(180deg, #F8F7F5 0%, #E4E4E7 100%)"
    >
      <Container maxW="container.xl" px={0}>
        <VStack gap={{ base: 10, md: 16 }} align="stretch">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="600"
            color="brand.primary"
            lineHeight="1.22"
            textAlign={{ base: "left", md: "center" }}
            px={{ base: 5, md: 8, lg: 12, xl: 16 }}
          >
            Analyse large documents{isMobile ? <br /> : ""} with a single click
          </Heading>

          {/* Grid Layout - Mobile: horizontal scroll, Desktop: responsive */}
          <Box
            overflow={{ base: "auto", md: "visible" }}
            px={{ base: 5, md: 8, lg: 12, xl: 16 }}
            _scrollbar={{ display: "none" }}
          >
            <SimpleGrid
              columns={{ base: 3, md: 2, lg: 3 }}
              gap={5}
              w={{ base: "fit-content", md: "auto" }}
              minW={{ base: "calc(452px * 3 + 40px)", md: "auto" }}
            >
              {ANALYSIS_TOOLS.map((tool) => (
                <Box
                  key={tool.title}
                  p={7}
                  bg="white"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="#FAFAFA"
                  _hover={{
                    borderColor: "brand.primary",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  flexShrink={0}
                  w={{ base: "452px", md: "auto" }}
                  backgroundImage="url('/images/ToolsBg.png')"
                  transition="all 0.2s ease-in-out"
                  background="linear-gradient(100deg, var(--whiteAlpha-0, #FFF) 50%, var(--whiteAlpha-500, rgba(255, 255, 255, 0.00)) 100%)"
                >
                  <VStack align="start" gap={8} w="full">
                    <Icon color={"#A41752"} as={tool.icon} fontSize={32} />

                    <VStack align="start" gap={3} w="full">
                      <Text
                        fontSize="xl"
                        fontWeight="600"
                        color="text.primary"
                        lineHeight="1.5"
                      >
                        {tool.title}
                      </Text>
                      <Text fontSize="lg" color="text.muted" lineHeight="1.56">
                        {tool.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
