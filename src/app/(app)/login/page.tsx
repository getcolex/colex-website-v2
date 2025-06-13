"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Container,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaMicrosoft, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import EmailLayout from "../emailLayout";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  const { user, loading } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("✅ Logged in user:", user);

      router.push("/dashboard");
      // You can redirect to dashboard or store user info
    } catch (error) {
      console.error("❌ Google login failed:", error);
    }
  };

  if (!mounted || loading) return <p>Loading...</p>;

  return (
    <EmailLayout>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Container>
          <Heading
            fontSize="2xl"
            mb={10}
            lineHeight={1.33}
            fontWeight={"semibold"}
            textAlign={"center"}
            color={"#000"}
          >
            Get started on Colex
          </Heading>

          <VStack gap={4}>
            <AuthButton
              icon={FcGoogle}
              label="Continue with Google"
              onClick={handleGoogleLogin}
            />

            <AuthButton
              icon={FaLinkedin}
              color="#0077b5"
              label="Continue with Linkedin"
              onClick={() => {}}
            />

            <AuthButton
              icon={FaMicrosoft}
              color="#00A4EF"
              label="Continue with Outlook"
              onClick={() => {}}
            />
          </VStack>
          <Box my={8} h="1px" w="100%" bg="gray.200" />
          <AuthButton
            icon={FaEnvelope}
            color="#000"
            label="Continue with Email"
            onClick={() => router.push("/email")}
          />
        </Container>
      </Flex>
    </EmailLayout>
  );
}

function AuthButton({
  icon,
  label,
  color,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="outline"
      color={"#27272A"}
      textAlign={"center"}
      fontSize={"sm"}
      px={4}
      py={2.5}
      fontWeight={"semibold"}
      justifyContent={"flex-start"}
      lineHeight={1.42}
      w="full"
      onClick={onClick}
    >
      <Icon as={icon} h={20} w={20} boxSize={5} color={color} />
      <Text flex={1} textAlign={"center"}>
        {label}
      </Text>
    </Button>
  );
}
