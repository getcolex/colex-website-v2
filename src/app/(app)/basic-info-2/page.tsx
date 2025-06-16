"use client";

import { Box, Button, Field, Input, VStack, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, useController } from "react-hook-form";
import { Select as ChakraSelect } from "chakra-react-select";

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

const toOptions = (items: string[]) =>
  items.map((item) => ({ label: item, value: item }));

export default function BasicInfo2Page() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      firmName: "",
      currentRole: [],
      currentRoleOther: "",
      organization: [],
      organizationOther: "",
      mainAreas: [],
      mainAreaOther: "",
    },
  });

  const onSubmit = (data: any) => {
    setTimeout(() => {
      console.log(data);
      router.push("/dashboard");
    }, 1000);
  };

  const currentRole = watch("currentRole");
  const organization = watch("organization");
  const mainAreas = watch("mainAreas");

  const includesOther = (arr: any[]) =>
    arr?.some((item) => item?.value?.toLowerCase() === "other");

  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box
        w={450}
        border="1px solid #E4E4E7"
        borderRadius={4}
        position="relative"
        flexDirection={"column"}
      >
        <Heading
          my={10}
          fontSize="2xl"
          lineHeight={1.33}
          fontWeight="semibold"
          textAlign="center"
          color="#000"
        >
          Tell us about your work
        </Heading>
        <VStack
          px={10}
          h={585}
          overflow="scroll"
          gap={5}
          align="stretch"
          pb={40}
        >
          <Field.Root required invalid={!!errors.firmName}>
            <Field.Label>Name of Your Firm or Organization</Field.Label>
            <Input
              {...register("firmName", { required: "Required" })}
              placeholder="Enter your firm or organization name"
            />
          </Field.Root>

          {/* --- Current Role --- */}
          <ControlledSelect
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
              {...register("currentRoleOther", {
                required: "Please specify your role",
              })}
              placeholder="Please specify your role"
            />
          )}

          {/* --- Organization --- */}
          <ControlledSelect
            name="organization"
            control={control}
            label="Which best describes your organization?"
            options={toOptions(ORGANIZATIONS)}
            placeholder="Law Firm, Consultancy, Government, etc."
            rules={{ required: "Required" }}
          />
          {includesOther(organization) && (
            <Input
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              {...register("organizationOther", {
                required: "Please specify your organization",
              })}
              placeholder="Please specify your organization"
            />
          )}

          <ControlledSelect
            name="mainAreas"
            control={control}
            label="What are your main area(s) of practice?"
            options={toOptions(PRACTICE_AREAS)}
            placeholder="Family law, etc."
            rules={{ required: "Required" }}
          />
          {includesOther(mainAreas) && (
            <Input
              py={2.5}
              _placeholder={{ color: "#A1A1AA" }}
              {...register("mainAreaOther", {
                required: "Please specify your practice area",
              })}
              placeholder="Please specify your practice area"
            />
          )}
        </VStack>

        <Box
          w="full"
          justifyContent="center"
          position="absolute"
          bottom={0}
          p={10}
          bg="white"
        >
          <Button
            w="full"
            colorScheme="blackAlpha"
            type="submit"
            loading={isSubmitting}
          >
            Submit and join
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const ControlledSelect = ({
  name,
  control,
  label,
  options,
  placeholder,
  rules,
}: any) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Field.Root required invalid={!!error}>
      <Field.Label fontSize={"sm"} lineHeight={1.42} fontWeight={"semibold"}>
        {label}
      </Field.Label>
      <ChakraSelect
        ref={ref}
        closeMenuOnSelect={false}
        isMulti={true}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
      />
    </Field.Root>
  );
};
