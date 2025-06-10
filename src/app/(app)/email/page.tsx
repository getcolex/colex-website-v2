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
import {
  useInitiateEmailLogin,
  useVerifyEmailLogin,
} from "@/lib/hooks/useUserAuth";
import { useAuthStore } from "@/store/useAuthStore";
// import { auth } from "@/lib/firebase";
// import { signInWithCustomToken } from "firebase/auth";

export default function StepEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOtp] = useState<string[]>([]);
  const [otpError, setOtpError] = useState("");
  const router = useRouter();
  const { setToken, token } = useAuthStore();

  const { mutate: initiateLogin, isPending: isInitiating } =
    useInitiateEmailLogin();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyEmailLogin();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = () => {
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email.");
      return;
    }

    initiateLogin(email, {
      onSuccess: (res) => {
        console.log(res);
        setToken(res.data.token); // store token
        setOtpSent(true);
        setEmailError("");
      },
      onError: () => {
        setEmailError("Failed to send OTP.");
      },
    });
  };

  const handleContinue = () => {
    if (otp.join("").length !== 6) {
      setOtpError("Please enter a 6-digit OTP.");
      return;
    }

    verifyOtp(
      { otp: otp.join(""), token: token! },
      {
        onSuccess: async (data) => {
          console.log("data", data.data.token, "anc", data.token);
          try {
            setIsOTPVerified(true);
            setToken(data.data.token);
            // await signInWithCustomToken(auth, data.data.token); // TODO: Uncomment this when firebase is ready
            setOtpError("");
            router.push("/basic-info");
          } catch (firebaseError) {
            console.error("Firebase login failed", firebaseError);
            setOtpError("Something went wrong during login.");
          }
        },
        onError: () => {
          setOtpError("OTP verification failed");
        },
      }
    );
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
            <HStack justify="space-between" mt={8}>
              <Button
                disabled={otp.length !== 6}
                loading={isVerifying}
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
          </>
        )}

        {!otpSent && (
          <Button
            mt="6"
            disabled={!email}
            loading={isInitiating}
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
