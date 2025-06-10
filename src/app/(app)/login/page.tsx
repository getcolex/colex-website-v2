"use client";

import { Box, Button, Heading, Stack } from "@chakra-ui/react";
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
      <Box w="full" maxW={"md"}>
        <Heading fontSize={"36px"} mb={8} textAlign="left">
          Get started on Colex
        </Heading>

        <Stack gap="4">
          <Button
            variant="outline"
            justifyContent="flex-start"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            Continue with Google
          </Button>

          <Button variant="outline" justifyContent="flex-start">
            <FaLinkedin color="#0077b5" />
            Continue with LinkedIn
          </Button>

          <Button variant="outline" justifyContent="flex-start">
            <FaMicrosoft color="#00A4EF" />
            Continue with Outlook
          </Button>

          <Box h="1px" w="100%" bg="gray.200" />

          <Button
            variant="outline"
            justifyContent="flex-start"
            onClick={() => router.push("/email")}
          >
            <FaEnvelope />
            Continue with Email
          </Button>
        </Stack>
      </Box>
    </EmailLayout>
  );
}
