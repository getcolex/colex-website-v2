"use client";

import {
  Box,
  Button,
  Field,
  Input,
  Heading,
  HStack,
  PinInput,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import EmailLayout from "../emailLayout";
import { useRouter } from "next/navigation";

export default function StepEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOtp] = useState<string[]>([]);
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = () => {
    if (!email) {
      setEmailError("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    setOtpSent(true);
  };

  const handleContinue = () => {
    if (otp.join("").length !== 6) {
      setOtpError("Please enter a 6-digit code.");
      return;
    }

    setOtpError("");
    setIsOTPVerified(true);
    // onNext(); // You could verify the OTP here via backend
  };

  const handleLogin = () => {
    router.push("/basic-info");
  };

  return (
    <EmailLayout>
      <Box w="full" maxW={"md"}>
        <Heading fontSize="2xl" mb={4}>
          Get started on Colex
        </Heading>
        <IconButton
          aria-label="Back"
          mb={8}
          size="sm"
          variant="outline"
          onClick={() => {
            setOtpSent(false);
            router.back();
          }}
        >
          <IoMdArrowBack />
        </IconButton>

        <Field.Root mb="4" invalid={!!emailError}>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field.ErrorText>{emailError}</Field.ErrorText>
        </Field.Root>

        {otpSent && (
          <>
            <Field.Root mb="4" invalid={!!otpError}>
              <Field.Label>Enter verification code</Field.Label>

              <PinInput.Root
                colorPalette={isOTPVerified ? "green" : "gray"}
                value={otp}
                onValueChange={(e) => setOtp(e.value)}
              >
                <PinInput.HiddenInput />
                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                  <PinInput.Input index={4} />
                  <PinInput.Input index={5} />
                </PinInput.Control>
              </PinInput.Root>
              <Field.ErrorText>{otpError}</Field.ErrorText>
              {isOTPVerified && (
                <Field.Label color={"green"}>Verified!</Field.Label>
              )}
            </Field.Root>

            {isOTPVerified ? (
              <HStack justify="space-between" mt={8}>
                <Button p={2} flex={1} onClick={handleLogin}>
                  Login
                </Button>
              </HStack>
            ) : (
              <HStack justify="space-between" mt={8}>
                <Button
                  disabled={otp.length !== 6}
                  p={2}
                  flex={1}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
                <Text
                  flex={1}
                  fontSize="sm"
                  textAlign={"center"}
                  color="blackAlpha.800"
                  cursor="pointer"
                  onClick={handleSendOtp}
                >
                  Resend code
                </Text>
              </HStack>
            )}
          </>
        )}

        {!otpSent && (
          <Button
            mt="6"
            disabled={!email}
            colorScheme="blackAlpha"
            onClick={handleSendOtp}
          >
            Send verification code
          </Button>
        )}
      </Box>
    </EmailLayout>
  );
}
