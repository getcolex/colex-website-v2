import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
} from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: "InterVariable, sans-serif",
        },
        body: {
          value: "InterVariable, sans-serif",
        },
      },
    },
  },
});

export const system = createSystem(defaultBaseConfig, customConfig);
