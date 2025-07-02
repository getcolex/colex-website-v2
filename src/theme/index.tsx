import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
} from "@chakra-ui/react";
import "@fontsource-variable/inter";

const customBreakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "90em", // 1440px - NEW for MacBook Pro 16"
};

const customConfig = defineConfig({
  theme: {
    breakpoints: {
      ...customBreakpoints,
    },
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
