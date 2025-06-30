import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
} from "@chakra-ui/react";
import "@fontsource-variable/inter";

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `"Inter Variable", sans-serif` },
        body: { value: `"Inter Variable", sans-serif` },
      },
      colors: {
        heading: { value: "#000000" },
        text: { value: "#000000" },
      },
    },
  },
});

export const system = createSystem(defaultBaseConfig, customConfig);
