"use client";

import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Portal,
  createListCollection,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLES = ["Associate", "Partner", "General Counsel", "Other"];
const ORGANIZATIONS = ["Law firm", "Consultancy", "Government", "Other"];
const PRACTICE_AREAS = [
  "Family law",
  "Audit and compliance",
  "Criminal law",
  "Contract law",
  "Mediation",
  "Other",
];

const createCollection = (items: string[]) =>
  createListCollection({
    items: items.map((v) => ({ value: v, label: v })),
  });

const currentRoleOptions = createCollection(ROLES);
const organizationDescOptions = createCollection(ORGANIZATIONS);
const mainAreaOptions = createCollection(PRACTICE_AREAS);

export default function BasicInfo2Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    firmName: "",
    currentRole: [] as string[],
    currentRoleOther: "",
    organization: [] as string[],
    organizationOther: "",
    mainAreas: [] as string[],
    mainAreaOther: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const includesOther = (arr: string[]) =>
    arr.some((item) => item.toLowerCase() === "other");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firmName.trim()) newErrors.firmName = "Required";
    if (!form.currentRole.length) newErrors.currentRole = "Required";
    if (includesOther(form.currentRole) && !form.currentRoleOther.trim()) {
      newErrors.currentRoleOther = "Please specify your role";
    }
    if (!form.organization.length) newErrors.organization = "Required";
    if (includesOther(form.organization) && !form.organizationOther.trim()) {
      newErrors.organizationOther = "Please specify your organization type";
    }
    if (!form.mainAreas.length) newErrors.mainAreas = "Required";
    if (includesOther(form.mainAreas) && !form.mainAreaOther.trim()) {
      newErrors.mainAreaOther = "Please specify your practice area";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      // TODO: API call
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (e) {
      console.error("Submission failed", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box w={450} h={626} border="1px solid #E4E4E7" borderRadius={4}>
        <VStack flex={1} gap={5} p={10} overflowY="auto">
          <Field.Root required invalid={!!errors.firmName}>
            <Field.Label>Name of Your Firm or Organization</Field.Label>
            <Input
              value={form.firmName}
              onChange={(e) => setForm({ ...form, firmName: e.target.value })}
              placeholder="Enter your firm or organization name"
            />
            <Field.ErrorText>{errors.firmName}</Field.ErrorText>
          </Field.Root>

          {/* Current Role */}
          <Select.Root
            multiple
            collection={currentRoleOptions}
            onValueChange={(e) => setForm({ ...form, currentRole: e.value })}
          >
            <Select.Label>What is your current role?</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Associate, Partner, General Counsel, etc." />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {currentRoleOptions.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          {includesOther(form.currentRole) && (
            <Field.Root invalid={!!errors.currentRoleOther}>
              <Input
                value={form.currentRoleOther}
                onChange={(e) =>
                  setForm({ ...form, currentRoleOther: e.target.value })
                }
                placeholder="Please specify your role"
              />
              <Field.ErrorText>{errors.currentRoleOther}</Field.ErrorText>
            </Field.Root>
          )}

          {/* Organization */}
          <Select.Root
            multiple
            collection={organizationDescOptions}
            onValueChange={(e) => setForm({ ...form, organization: e.value })}
          >
            <Select.Label
              fontSize={"sm"}
              lineHeight={1.42}
              fontWeight={"semibold"}
            >
              Which best describes your organization?
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Law Firm, Consultancy, Government, etc." />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {organizationDescOptions.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          {includesOther(form.organization) && (
            <Field.Root invalid={!!errors.organizationOther}>
              <Input
                value={form.organizationOther}
                onChange={(e) =>
                  setForm({ ...form, organizationOther: e.target.value })
                }
                placeholder="Please specify your organization"
              />
              <Field.ErrorText>{errors.organizationOther}</Field.ErrorText>
            </Field.Root>
          )}

          {/* Practice Areas */}
          <Select.Root
            multiple
            collection={mainAreaOptions}
            onValueChange={(e) => setForm({ ...form, mainAreas: e.value })}
          >
            <Select.Label>What are your main area(s) of practice?</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Family law, Audit and compliance, etc." />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {mainAreaOptions.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          {includesOther(form.mainAreas) && (
            <Field.Root invalid={!!errors.mainAreaOther}>
              <Input
                value={form.mainAreaOther}
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                onChange={(e) =>
                  setForm({ ...form, mainAreaOther: e.target.value })
                }
                placeholder="Please specify your practice area"
              />
              <Field.ErrorText>{errors.mainAreaOther}</Field.ErrorText>
            </Field.Root>
          )}

          <Button
            colorScheme="blackAlpha"
            w="full"
            alignSelf={"flex-end"}
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Submit and join
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
