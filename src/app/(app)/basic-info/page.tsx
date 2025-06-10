"use client";

import {
  useInitiateMobileLogin,
  useUpdateProfile,
  useVerifyMobileLogin,
} from "@/lib/hooks/useUserAuth";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  VStack,
  PinInput,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BasicInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [areas, setAreas] = useState("");
  const [mobile, setMobile] = useState("");
  const [phoneOtp, setPhoneOtp] = useState<string[]>([]);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isFormValid = firstName && lastName && /^[0-9]{10}$/.test(mobile);

  const router = useRouter();
  const { token } = useAuthStore();
  const { setProfileData } = useAppStore();
  const { isPending: isUpdating } = useUpdateProfile();

  const { mutate: initiateMobileLogin, isPending: isInitiating } =
    useInitiateMobileLogin();
  const { mutate: verifyMobileLogin, isPending: isVerifying } =
    useVerifyMobileLogin();

  const { user, loading } = useAppStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (otpSent && phoneOtp.length !== 4)
      newErrors.otp = "Enter a 4-digit OTP.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!otpSent) {
      if (validateFields()) {
        initiateMobileLogin(
          { mobile, token: token! },
          {
            onSuccess: () => {
              setOtpSent(true);
            },
            onError: () => {
              //     setErrors((prev) => ({
              //       ...prev,
              //       mobile: err.data.message,
              //     }));
            },
          }
        );
      }
    } else {
      if (validateFields()) {
        verifyMobileLogin(
          {
            otp: phoneOtp.join(""),
            token: token!,
            mobile: mobile,
            profileData: {
              firstName: firstName,
              lastName: lastName,
              city: city,
              areas: areas,
              mobile: mobile,
            },
          },
          {
            onSuccess: () => {
              setProfileData({
                firstName: firstName,
                lastName: lastName,
                city: city,
                areas: areas,
                mobile: mobile,
              });
              setIsOTPVerified(true);
              router.push("/dashboard");
            },
          }
        );
      }
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="20"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb="6" size="lg">
        Tell us about you
      </Heading>

      <VStack gap={4} align="stretch">
        <HStack>
          <Field.Root required invalid={!!errors.firstName}>
            <Field.Label>First Name</Field.Label>
            <Input
              value={firstName}
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Field.ErrorText>{errors.firstName}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.lastName}>
            <Field.Label>Last Name</Field.Label>
            <Input
              value={lastName}
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Field.ErrorText>{errors.lastName}</Field.ErrorText>
          </Field.Root>
        </HStack>

        <Field.Root>
          <Field.Label>
            City of practice{" "}
            <Field.RequiredIndicator
              fallback={
                <Badge size="xs" variant="surface">
                  Optional
                </Badge>
              }
            />
          </Field.Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Bengaluru, India"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>
            Areas of practice{" "}
            <Field.RequiredIndicator
              fallback={
                <Badge size="xs" variant="surface">
                  Optional
                </Badge>
              }
            />
          </Field.Label>
          <Input
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
            placeholder="e.g., Family Law, Criminal Law, Corporate Law"
          />
        </Field.Root>

        <Field.Root required invalid={!!errors.mobile}>
          <Field.Label>Enter mobile number</Field.Label>
          <Input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          <Field.ErrorText>{errors.mobile}</Field.ErrorText>
        </Field.Root>
        {otpSent && (
          <Field.Root mb="4" invalid={!!errors.otp}>
            <Field.Label>Enter OTP</Field.Label>

            <PinInput.Root
              value={phoneOtp}
              colorPalette={isOTPVerified ? "green" : "gray"}
              onValueChange={(e) => setPhoneOtp(e.value)}
            >
              <PinInput.HiddenInput />
              <PinInput.Control>
                <PinInput.Input index={0} />
                <PinInput.Input index={1} />
                <PinInput.Input index={2} />
                <PinInput.Input index={3} />
              </PinInput.Control>
            </PinInput.Root>
            <Field.ErrorText>{errors.otp}</Field.ErrorText>
            {isOTPVerified && (
              <Field.Label color={"green"}>Verified!</Field.Label>
            )}
          </Field.Root>
        )}

        <Button
          loading={isVerifying || isInitiating || isUpdating}
          mt="4"
          colorScheme="blackAlpha"
          onClick={handleContinue}
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
}
