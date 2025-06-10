"use client";
import ActionCard from "@/components/Dashboard/ActionCard";
import SearchBar from "@/components/Dashboard/SearchBar";
import { auth } from "@/lib/firebase";
import { useAppStore } from "@/store/useAppStore";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlus, FaComments } from "react-icons/fa";
import DashboardLayout from "./dashboardLayout";
import FileUploadCard from "@/components/Dashboard/FileUploadCard";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAppStore();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardLayout>
      <Box h={"100vh"} bg="gray.50" py={10}>
        <Container>
          <Flex justify="flex-end" mb={6}>
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
          <Container flex={1} maxW="5xl">
            <VStack gap={6} align="center" textAlign="center" mb={10}>
              <Heading size="lg">Welcome!</Heading>
              <Text fontSize="lg">How would you like to start?</Text>
            </VStack>

            <SearchBar />

            <SimpleGrid columns={[1, null, 3]} gap={6} mt={10}>
              <ActionCard
                icon={FaPlus}
                title="Create a note"
                description="Add a case matter brief, note down your findings, client grievances"
              />
              <FileUploadCard />
              <ActionCard
                icon={FaComments}
                title="Looking for a starting point"
                description="Talk to the tool about anything related to your case"
              />
            </SimpleGrid>
          </Container>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
