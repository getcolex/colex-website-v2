"use client";

import { Box, Button, Field, Input, VStack, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  FormSchema,
  ROLES,
  ORGANIZATIONS,
  PRACTICE_AREAS,
  toOptions,
} from "@/types/form";
import { SelectControl } from "@/components/SelectControl";

export default function BasicInfo2Page() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormSchema>({
    defaultValues: {
      firmName: "",
      currentRole: [],
      currentRoleOther: "",
      organization: [],
      organizationOther: "",
      mainAreas: [],
      mainAreaOther: "",
    },
    mode: "onChange",
  });

  const includesOther = (selected: { value: string }[]) =>
    selected?.some((o) => o.value.toLowerCase() === "other");

  const currentRole = watch("currentRole");
  const organization = watch("organization");
  const mainAreas = watch("mainAreas");

  const onSubmit = (data: FormSchema) => {
    const flatten = (opts: { value: string }[]) => opts.map((o) => o.value);

    const payload = {
      firmName: data.firmName.trim(),
      currentRole: flatten(data.currentRole),
      currentRoleOther: data.currentRoleOther.trim(),
      organization: flatten(data.organization),
      organizationOther: data.organizationOther.trim(),
      mainAreas: flatten(data.mainAreas),
      mainAreaOther: data.mainAreaOther.trim(),
    };

    console.log("🚀 SUBMIT PAYLOAD", payload);
    router.push("/dashboard");
  };

  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box
        w={450}
        border="1px solid #E4E4E7"
        borderRadius={4}
        position="relative"
        display="flex"
        flexDirection="column"
      >
        <Heading
          my={10}
          fontSize="2xl"
          lineHeight={1.33}
          fontWeight="semibold"
          textAlign="center"
        >
          Tell us about your work
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack
            px={10}
            h={585}
            overflowY="auto"
            gap={5}
            align="stretch"
            pb={40}
          >
            <Field.Root required invalid={!!errors.firmName}>
              <Field.Label
                fontSize="sm"
                lineHeight={1.42}
                fontWeight="semibold"
              >
                Name of Your Firm or Organization
              </Field.Label>
              <Input
                py={2.5}
                borderColor="#000"
                _placeholder={{ color: "#A1A1AA" }}
                placeholder="Enter your firm or organization name"
                {...register("firmName", { required: "Required" })}
              />
              <Field.ErrorText>{errors.firmName?.message}</Field.ErrorText>
            </Field.Root>

            <SelectControl
              name="currentRole"
              control={control}
              label="What is your current role?"
              options={toOptions(ROLES)}
              placeholder="Associate, Partner, General Counsel, etc."
              rules={{ required: "Required" }}
            />
            {includesOther(currentRole) && (
              <Input
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                placeholder="Please specify your role"
                {...register("currentRoleOther", {
                  required: "Please specify your role",
                })}
              />
            )}

            <SelectControl
              name="organization"
              control={control}
              label="Which best describes your organization?"
              options={toOptions(ORGANIZATIONS)}
              placeholder="Law firm, Consultancy, etc."
              rules={{ required: "Required" }}
            />
            {includesOther(organization) && (
              <Input
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                placeholder="Please specify your organization"
                {...register("organizationOther", {
                  required: "Please specify your organization",
                })}
              />
            )}

            <SelectControl
              name="mainAreas"
              control={control}
              label="What are your main area(s) of practice?"
              options={toOptions(PRACTICE_AREAS)}
              placeholder="Family law, Audit and compliance, etc."
              rules={{ required: "Required" }}
            />
            {includesOther(mainAreas) && (
              <Input
                py={2.5}
                _placeholder={{ color: "#A1A1AA" }}
                placeholder="Please specify your practice area"
                {...register("mainAreaOther", {
                  required: "Please specify your practice area",
                })}
              />
            )}
          </VStack>

          <Box w="full" position="absolute" bottom={0} p={10} bg="white">
            <Button
              w="full"
              colorScheme="blackAlpha"
              type="submit"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Submit and join
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
