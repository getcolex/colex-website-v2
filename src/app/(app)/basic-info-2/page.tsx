"use client";

import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Heading,
  HStack,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, useController } from "react-hook-form";
import { chakraComponents, Select as ChakraSelect } from "chakra-react-select";

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

const toOptions = (arr: string[]) => arr.map((v) => ({ label: v, value: v }));
type Option = { label: string; value: string };

interface FormSchema {
  firmName: string;
  currentRole: Option[];
  currentRoleOther: string;
  organization: Option[];
  organizationOther: string;
  mainAreas: Option[];
  mainAreaOther: string;
}

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

  const includesOther = (selected: Option[]) =>
    selected?.some((o) => o.value.toLowerCase() === "other");

  const currentRole = watch("currentRole");
  const organization = watch("organization");
  const mainAreas = watch("mainAreas");

  /* ---------- submit ---------- */
  const onSubmit = (data: FormSchema) => {
    // Flatten option arrays → string[]
    const flatten = (opts: Option[]) => opts.map((o) => o.value);

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

  /* ──────────────────────────────────────────────────────────── */
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
          color="#000"
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
            {/* Firm name */}
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

            {/* Current role */}
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

            {/* Organization */}
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

            {/* Main areas */}
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

const SelectControl = ({
  name,
  control,
  label,
  options,
  placeholder,
  rules,
}: {
  name: keyof FormSchema;
  control: any;
  label: string;
  options: Option[];
  placeholder: string;
  rules?: any;
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Field.Root required invalid={!!error}>
      <Field.Label fontSize="sm" lineHeight={1.42} fontWeight="semibold">
        {label}
      </Field.Label>
      <ChakraSelect
        ref={ref}
        focusRingColor="#000"
        isMulti
        closeMenuOnSelect={false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        components={{
          Option: (props) => {
            const { isSelected, label } = props.data;
            return (
              <chakraComponents.Option {...props}>
                <HStack gap={3}>
                  <Checkbox.Root
                    checked={isSelected}
                    pointerEvents="none"
                    readOnly
                    variant={"solid"}
                    size="sm"
                    _checked={{
                      "& .chakra-checkbox__control": {
                        background: "black",
                        borderColor: "black",
                      },
                    }}
                  >
                    <Checkbox.Control />
                  </Checkbox.Root>
                  <Text>{label}</Text>
                </HStack>
              </chakraComponents.Option>
            );
          },
        }}
        chakraStyles={{
          option: (base, state) => ({
            ...base,
            bg: "white",
            color: "black",
            paddingY: 2,
            paddingX: 4,
          }),
          multiValue: (base) => ({
            ...base,
            bg: "#fff",
            borderRadius: 6,
            padding: "4px 8px",
            fontWeight: 500,
            py: 1,
            my: 2,
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#000",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#000",
            ":hover": {
              bg: "transparent",
              color: "gray.700",
            },
          }),
        }}
      />

      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};
