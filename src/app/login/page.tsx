"use client";

import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaMicrosoft, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import EmailLayout from "./emailLayout";

export default function LoginOptions() {
  const router = useRouter();
  return (
    <EmailLayout>
      <Box w="full" maxW={"md"}>
        <Heading fontSize={"36px"} mb={8} textAlign="left">
          Get started on Colex
        </Heading>

        <Stack gap="4">
          <Button variant="outline" justifyContent="flex-start">
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
            onClick={() => router.push("/login/email")}
          >
            <FaEnvelope />
            Continue with Email
          </Button>
        </Stack>
      </Box>
    </EmailLayout>
  );
}
