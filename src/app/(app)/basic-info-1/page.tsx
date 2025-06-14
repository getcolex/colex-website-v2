"use client";

import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  VStack,
  PinInput,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOBILE_REGEX = /^[0-9]{10}$/;
const OTP_LENGTH = 5;

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  phoneOtp: string[];
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  otp?: string;
}

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!MOBILE_REGEX.test(formData.mobile)) {
    errors.mobile = "Please enter a valid 10-digit mobile number";
  }

  return errors;
};

export default function BasicInfo1Page() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobile: "",
    phoneOtp: [],
  });
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const isFormValid = !Object.keys(validateForm(formData)).length;

  const router = useRouter();

  const handleInputChange =
    (field: keyof Omit<FormData, "phoneOtp">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleOTPChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, phoneOtp: value }));
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
  };

  const handleContinue = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (!otpSent) {
        // TODO: Implement OTP sending logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setOtpSent(true);
        setResendTimer(30); // Start 30 second timer
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // TODO: Implement OTP verification logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setIsOTPVerified(true);
        router.push("basic-info-2");
      }
    } catch (err: unknown) {
      console.error("Error during OTP process:", err);
      setErrors((prev) => ({
        ...prev,
        otp: "Something went wrong. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement OTP resend logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setOtpSent(true);
      setFormData((prev) => ({ ...prev, phoneOtp: [] }));
      setResendTimer(30);
    } catch (err: unknown) {
      console.error("Error during OTP resend:", err);
      setErrors((prev) => ({
        ...prev,
        otp: "Failed to resend OTP. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        p={10}
        mx={"auto"}
        maxW={450}
        borderRadius={4}
        h={626}
        border={"1px solid #E4E4E7"}
        position={"relative"}
      >
        <Heading
          mb={5}
          fontSize="2xl"
          lineHeight={1.33}
          fontWeight={"semibold"}
          color={"#000"}
        >
          Tell us about you
        </Heading>

        <HStack gap={3} mb={5}>
          <Field.Root gap={1.5} required invalid={!!errors.firstName}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              First Name
            </Field.Label>
            <Input
              value={formData.firstName}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              placeholder="John"
              onChange={handleInputChange("firstName")}
            />
            <Field.ErrorText>{errors.firstName}</Field.ErrorText>
          </Field.Root>
          <Field.Root gap={1.5} required invalid={!!errors.lastName}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              Last Name
            </Field.Label>
            <Input
              value={formData.lastName}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              placeholder="Doe"
              onChange={handleInputChange("lastName")}
            />
            <Field.ErrorText>{errors.lastName}</Field.ErrorText>
          </Field.Root>
        </HStack>

        <Field.Root mb={5} gap={1.5} required invalid={!!errors.mobile}>
          <Field.Label
            fontSize={"sm"}
            lineHeight={1.42}
            fontWeight={"semibold"}
          >
            Enter mobile number
          </Field.Label>
          <Input
            value={formData.mobile}
            py={2.5}
            _placeholder={{ color: "#A1A1AA" }}
            onChange={handleInputChange("mobile")}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          <Field.ErrorText>{errors.mobile}</Field.ErrorText>
        </Field.Root>
        {otpSent && (
          <Field.Root mb={5} gap={1} invalid={!!errors.otp}>
            <Field.Label>Enter OTP</Field.Label>

            <PinInput.Root
              value={formData.phoneOtp}
              colorPalette={isOTPVerified ? "green" : "gray"}
              onValueChange={(e) => handleOTPChange(e.value)}
            >
              <PinInput.HiddenInput />
              <PinInput.Control>
                <PinInput.Input index={0} />
                <PinInput.Input index={1} />
                <PinInput.Input index={2} />
                <PinInput.Input index={3} />
                <PinInput.Input index={4} />
              </PinInput.Control>
            </PinInput.Root>
            <Field.ErrorText>{errors.otp}</Field.ErrorText>
            {isOTPVerified && (
              <Field.Label color={"green"}>Verified!</Field.Label>
            )}
          </Field.Root>
        )}
        {otpSent ? (
          <VStack position={"absolute"} bottom={10}>
            <Button
              variant={"ghost"}
              loading={isLoading}
              w={370}
              onClick={handleResendOTP}
              disabled={resendTimer > 0}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </Button>
            <Button
              loading={isLoading}
              onClick={handleContinue}
              w={370}
              disabled={!isFormValid || formData.phoneOtp.length !== OTP_LENGTH}
            >
              {isOTPVerified ? "Verified" : "Verify & Continue"}
            </Button>
          </VStack>
        ) : (
          <Button
            w={180}
            position={"absolute"}
            bottom={10}
            onClick={handleContinue}
            loading={isLoading}
            disabled={!isFormValid}
          >
            Continue
          </Button>
        )}
      </Box>
    </Box>
  );
}
