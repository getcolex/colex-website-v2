import { Box, Spinner, Text } from "@chakra-ui/react";

export const HomeLoading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
      h={"100vh"}
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="sm"
        border="1px solid #eee"
        w={450}
        h={484}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Spinner size="xl" color="black" mb={8} />
        <Text
          fontWeight="semibold"
          fontSize="lg"
          textAlign="center"
          color="black"
        >
          Just a moment,
          <br />
          getting things ready...
        </Text>
      </Box>
    </Box>
  );
};
