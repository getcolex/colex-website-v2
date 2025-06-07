import { HStack, Input, Button } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <HStack gap={3}>
      <Input
        placeholder="Search for case laws, acts or legal articles"
        bg="white"
        boxShadow="sm"
        size="lg"
      />
      <Button size="lg" colorScheme="gray">
        <FiSearch />
        Search
      </Button>
    </HStack>
  );
}
