import { Control, useController } from "react-hook-form";
import { Field, HStack, Text } from "@chakra-ui/react";
import { chakraComponents, Select as ChakraSelect } from "chakra-react-select";
import { Checkbox } from "@chakra-ui/react";
import { FormSchema, Option } from "@/types/form";

interface SelectControlProps {
  name: keyof FormSchema;
  control: Control<FormSchema>;
  label: string;
  options: Option[];
  placeholder: string;
  rules?: Record<string, unknown>;
}

export const SelectControl = ({
  name,
  control,
  label,
  options,
  placeholder,
  rules,
}: SelectControlProps) => {
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
