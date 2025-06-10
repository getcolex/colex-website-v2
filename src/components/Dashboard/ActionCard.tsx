import { Box, Icon, Heading, Text, VStack } from "@chakra-ui/react";

export default function ActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      cursor="pointer"
      alignItems="center"
      justifyContent="center"
      _hover={{ boxShadow: "md" }}
    >
      <VStack align="center" justify="center" gap={3}>
        <Icon as={icon} boxSize={6} />
        <Heading size="sm">{title}</Heading>
        <Text color="gray.600" fontSize="sm" textAlign="center">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
