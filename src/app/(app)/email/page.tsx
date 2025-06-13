"use client";

import {
  Box,
  Button,
  Field,
  Container,
  Input,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import EmailLayout from "../emailLayout";
import { useRouter } from "next/navigation";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { HomeLoading } from "@/components/ui/HomeLoading";
// import { signInWithCustomToken } from "firebase/auth";

export default function StepEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = async () => {
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email.");
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/email/verify`,
        handleCodeInApp: true,
      });

      // window.localStorage.setItem("emailForSignIn", email);
      router.push("/basic-info-1");
      setEmailError("");
      // alert("Verification link sent to your email");
    } catch (error) {
      console.error(error);
      setEmailError("Failed to send email link.");
    }
  };

  return false ? (
    <Container p={10} h={"484px"} display={"flex"} justifyContent={"center"}>
      <HomeLoading />
    </Container>
  ) : (
    <EmailLayout>
      <Box h={"100%"} position={"relative"}>
        <HStack mb={10}>
          <IconButton
            aria-label="Back"
            variant="outline"
            mr={5}
            onClick={() => {
              router.back();
            }}
          >
            <IoMdArrowBack />
          </IconButton>
          <Heading
            fontSize="2xl"
            lineHeight={1.33}
            alignContent={"center"}
            fontWeight={"semibold"}
            color={"#000"}
          >
            Get started on Colex
          </Heading>
        </HStack>

        <Field.Root invalid={!!emailError}>
          <Field.Label
            fontSize={"sm"}
            lineHeight={1.42}
            mb={1.5}
            fontWeight={"semibold"}
          >
            Email
          </Field.Label>
          <Input
            type="email"
            placeholder="Your email address"
            py={2.5}
            _placeholder={{ color: "#A1A1AA" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field.ErrorText>{emailError}</Field.ErrorText>
        </Field.Root>

        <Button
          fontSize={"sm"}
          position={"absolute"}
          bottom={0}
          lineHeight={1.42}
          _disabled={{ bg: "#E4E4E7", color: "#fff" }}
          fontWeight={"semibold"}
          disabled={!isValidEmail(email)}
          px={4}
          w={"full"}
          py={2}
          onClick={handleContinue}
        >
          Email login link
        </Button>
      </Box>
    </EmailLayout>
  );
}
