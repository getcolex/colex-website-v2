"use client";

import { Box, Container, Text, Grid, Flex, Button } from "@chakra-ui/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { getEarlyAccess } from "@/lib/utils";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
/* eslint-disable @next/next/no-img-element */

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Box
      ref={containerRef}
      py={{ base: 16, md: 24 }}
      bg="brand.primary"
      position="relative"
      zIndex={10}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8, lg: 12 }}>
        {/* 12-column grid layout */}
        <Grid
          data-testid="benefits-grid"
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 0, lg: 8 }}
        >
          {/* Content centered in columns 3-10 (8 cols total, 4 cols per card) */}
          <Box
            data-testid="benefits-content"
            gridColumn={{ base: "1", lg: "3 / 11" }}
          >
            {/* Header + CTA row */}
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              gap={{ base: 4, md: 6 }}
              mb={{ base: 10, md: 14 }}
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
              >
                30 minutes. You walk away with:
              </Text>
              <Button
                size="lg"
                px={{ base: 6, md: 8 }}
                py={6}
                borderRadius="4px"
                bg="white"
                color="brand.primary"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                flexShrink={0}
                _hover={{
                  bg: "gray.100",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                onClick={() => getEarlyAccess("benefits_section")}
              >
                Let&apos;s talk
                <Box as="span" ml={2} display="inline-flex">
                  <ArrowRightIcon
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                </Box>
              </Button>
            </Flex>

            {/* Bento Grid - 2x2 */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 4, lg: 8 }}
            >
              <BentoCell
                label="Your first workflow"
                index={0}
                isInView={isInView}
              >
                <WorkflowVisual isInView={isInView} />
              </BentoCell>

              <BentoCell
                label="A team interface"
                index={1}
                isInView={isInView}
              >
                <TeamInterfaceVisual isInView={isInView} />
              </BentoCell>

              <BentoCell
                label="Built-in human review"
                index={2}
                isInView={isInView}
              >
                <HumanReviewVisual isInView={isInView} />
              </BentoCell>

              <BentoCell
                label="Connected to your tools"
                index={3}
                isInView={isInView}
              >
                <IntegrationsVisual isInView={isInView} />
              </BentoCell>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

function BentoCell({
  children,
  label,
  index,
  isInView,
}: {
  children: React.ReactNode;
  label: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      bg="white"
      borderRadius="xl"
      p={{ base: 5, md: 6 }}
      minH={{ base: "180px", md: "200px" }}
      display="flex"
      flexDirection="column"
      cursor="default"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
      }}
      style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
    >
      <Text
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="600"
        color="text.primary"
        mb={4}
      >
        {label}
      </Text>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        {children}
      </Box>
    </MotionBox>
  );
}

function WorkflowVisual({ isInView }: { isInView: boolean }) {
  const nodes = [
    { label: "Trigger", color: "purple.500" },
    { label: "Process", color: "blue.500" },
    { label: "Output", color: "green.500" },
  ];

  return (
    <Flex align="center" gap={0}>
      {nodes.map((node, i) => (
        <MotionFlex
          key={node.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
          align="center"
        >
          <Box
            bg={node.color}
            color="white"
            px={3}
            py={2}
            borderRadius="lg"
            fontSize="xs"
            fontWeight="600"
            boxShadow="sm"
          >
            {node.label}
          </Box>
          {i < nodes.length - 1 && (
            <MotionBox
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
              w={6}
              h="2px"
              bg="gray.300"
              transformOrigin="left"
            />
          )}
        </MotionFlex>
      ))}
      <MotionBox
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.9 }}
        ml={3}
        px={2}
        py={1}
        bg="green.100"
        borderRadius="full"
        border="1px solid"
        borderColor="green.300"
      >
        <Flex align="center" gap={1}>
          <Box w={1.5} h={1.5} borderRadius="full" bg="green.500" />
          <Text fontSize="10px" fontWeight="600" color="green.700">
            Running
          </Text>
        </Flex>
      </MotionBox>
    </Flex>
  );
}

function TeamInterfaceVisual({ isInView }: { isInView: boolean }) {
  const team = ["Alex", "Sarah", "Mike", "Jane"];

  return (
    <Box
      bg="gray.50"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      p={3}
      w="full"
      maxW="240px"
    >
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="xs" fontWeight="600" color="gray.600">
          Team Access
        </Text>
        <Box
          px={2}
          py={0.5}
          bg="green.100"
          borderRadius="full"
          fontSize="9px"
          fontWeight="600"
          color="green.700"
        >
          Active
        </Box>
      </Flex>
      <Flex align="center">
        {team.map((name, i) => (
          <MotionBox
            key={name}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            w={9}
            h={9}
            borderRadius="full"
            overflow="hidden"
            border="2px solid"
            borderColor="white"
            bg="gray.200"
            ml={i > 0 ? -2 : 0}
            zIndex={4 - i}
          >
            <img
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${name}`}
              alt=""
              width={36}
              height={36}
            />
          </MotionBox>
        ))}
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.8 }}
          w={9}
          h={9}
          borderRadius="full"
          bg="gray.200"
          border="2px solid"
          borderColor="white"
          ml={-2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs" color="gray.500" fontWeight="600">
            +8
          </Text>
        </MotionBox>
      </Flex>
    </Box>
  );
}

function HumanReviewVisual({ isInView }: { isInView: boolean }) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.3 }}
      bg="gray.50"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      p={4}
      w="full"
      maxW="260px"
    >
      <Flex align="center" gap={3} mb={4}>
        <Box
          w={8}
          h={8}
          borderRadius="full"
          overflow="hidden"
          bg="gray.200"
        >
          <img
            src="https://api.dicebear.com/9.x/notionists/svg?seed=Reviewer"
            alt=""
            width={32}
            height={32}
          />
        </Box>
        <Box flex={1}>
          <Text fontSize="xs" fontWeight="600" color="gray.700">
            Invoice #1247
          </Text>
          <Text fontSize="10px" color="gray.500">
            Awaiting your review
          </Text>
        </Box>
      </Flex>
      <Flex gap={2}>
        <MotionBox
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
          flex={1}
          py={2}
          bg="green.500"
          color="white"
          borderRadius="md"
          fontSize="xs"
          fontWeight="600"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "green.600" }}
        >
          Approve
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.7 }}
          flex={1}
          py={2}
          bg="white"
          color="gray.600"
          borderRadius="md"
          fontSize="xs"
          fontWeight="600"
          textAlign="center"
          border="1px solid"
          borderColor="gray.300"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
        >
          Reject
        </MotionBox>
      </Flex>
    </MotionBox>
  );
}

function IntegrationsVisual({ isInView }: { isInView: boolean }) {
  const integrations = [
    {
      name: "Gmail",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
      bg: "white"
    },
    {
      name: "Google Sheets",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg",
      bg: "white"
    },
    {
      name: "Slack",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      bg: "white"
    },
    {
      name: "WhatsApp",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      bg: "white"
    },
  ];

  return (
    <Flex align="center" gap={4} flexWrap="wrap" justify="center">
      {integrations.map((item, i) => (
        <MotionBox
          key={item.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
          w={12}
          h={12}
          borderRadius="xl"
          bg={item.bg}
          border="1px solid"
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="sm"
          p={2.5}
        >
          <img
            src={item.icon}
            alt={item.name}
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </MotionBox>
      ))}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <Text fontSize="sm" color="gray.400" fontWeight="500">
          + more
        </Text>
      </MotionBox>
    </Flex>
  );
}
