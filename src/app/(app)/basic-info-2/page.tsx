"use client";

import { useState } from "react";
import { Box, Button, Field, Input, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface FormData {
  firmName: string;
  currentRole: string;
  currentRoleOther?: string;
  organizationDesc: string;
  organizationDescOther?: string;
  mainArea: string;
  mainAreaOther?: string;
}

interface FormErrors {
  firmName?: string;
  currentRole?: string;
  organizationDesc?: string;
  mainArea?: string;
}

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firmName.trim()) {
    errors.firmName = "Firm name is required";
  }

  if (!formData.currentRole.trim()) {
    errors.currentRole = "Current role is required";
  }

  if (!formData.organizationDesc.trim()) {
    errors.organizationDesc = "Organization description is required";
  }

  if (!formData.mainArea.trim()) {
    errors.mainArea = "Main area of practice is required";
  }

  return errors;
};

export default function BasicInfo2Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState<FormData>({
    firmName: "",
    currentRole: "",
    currentRoleOther: "",
    organizationDesc: "",
    organizationDescOther: "",
    mainArea: "",
    mainAreaOther: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      // Reset submit status when user makes changes
      if (submitStatus !== "idle") {
        setSubmitStatus("idle");
      }
    };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus("success");

      // Redirect after a short delay to show success state
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      setSubmitStatus("error");
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
        w={450}
        h={626}
        borderRadius={4}
        border={"1px solid #E4E4E7"}
        position={"relative"}
      >
        <VStack overflowY={"scroll"} gap={5}>
          {submitStatus === "success" && (
            <Text color="green.500" fontWeight="medium">
              Form submitted successfully! Redirecting...
            </Text>
          )}
          {submitStatus === "error" && (
            <Text color="red.500" fontWeight="medium">
              Failed to submit form. Please try again.
            </Text>
          )}

          <Field.Root gap={1.5} required invalid={!!errors.firmName}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              Name of Your Firm or Organization
            </Field.Label>
            <Input
              value={formData.firmName}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              onChange={handleInputChange("firmName")}
              placeholder="Enter your firm or organization name"
            />
            <Field.ErrorText>{errors.firmName}</Field.ErrorText>
          </Field.Root>

          <Field.Root gap={1.5} required invalid={!!errors.currentRole}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              What is your current role?
            </Field.Label>
            <Input
              value={formData.currentRole}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              onChange={handleInputChange("currentRole")}
              placeholder="Associate, Partner, General Counsel, etc."
            />
            {formData.currentRole.toLowerCase() === "other" && (
              <Input
                value={formData.currentRoleOther}
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                onChange={handleInputChange("currentRoleOther")}
                placeholder="Please specify your role..."
              />
            )}
            <Field.ErrorText>{errors.currentRole}</Field.ErrorText>
          </Field.Root>

          <Field.Root gap={1.5} required invalid={!!errors.organizationDesc}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              Which best describes your organization?
            </Field.Label>
            <Input
              value={formData.organizationDesc}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              onChange={handleInputChange("organizationDesc")}
              placeholder="Law Firm, Consultancy, Government, etc."
            />
            {formData.organizationDesc.toLowerCase() === "other" && (
              <Input
                value={formData.organizationDescOther}
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                onChange={handleInputChange("organizationDescOther")}
                placeholder="Please specify your organization type..."
              />
            )}
            <Field.ErrorText>{errors.organizationDesc}</Field.ErrorText>
          </Field.Root>

          <Field.Root gap={1.5} required invalid={!!errors.mainArea}>
            <Field.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              What are your main area(s) of practice?
            </Field.Label>
            <Input
              value={formData.mainArea}
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              onChange={handleInputChange("mainArea")}
              placeholder="Family law, Audit and compliance, etc."
            />
            {formData.mainArea.toLowerCase() === "other" && (
              <Input
                value={formData.mainAreaOther}
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                onChange={handleInputChange("mainAreaOther")}
                placeholder="Please specify your practice area..."
              />
            )}
            <Field.ErrorText>{errors.mainArea}</Field.ErrorText>
          </Field.Root>
        </VStack>

        <Button
          mt={5}
          position={"absolute"}
          bottom={10}
          w={370}
          loading={isLoading}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Submit and join
        </Button>
      </Box>
    </Box>
  );
}
