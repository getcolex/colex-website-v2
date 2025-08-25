import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

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
        heading: { value: `"Open Sans Variable", sans-serif` },
        body: { value: `"Open Sans Variable", sans-serif` },
      },
      colors: {
        // Brand Colors
        brand: {
          primary: { value: "#49082D" }, // Deep burgundy/maroon - main brand color
          secondary: { value: "#722F37" }, // Lighter burgundy variation
        },

        // Text Colors
        text: {
          primary: { value: "#000000" }, // Primary text - black
          secondary: { value: "#52525B" }, // Secondary text - zinc-600
          muted: { value: "#71717A" }, // Muted text - zinc-500
        },

        // UI Colors
        ui: {
          background: { value: "#FFFFFF" }, // Main background
          surface: { value: "#FAFAFA" }, // Surface/card backgrounds
          border: { value: "#E4E4E7" }, // Borders - zinc-200
          borderLight: { value: "#F4F4F5" }, // Light borders - zinc-100
        },

        // Button Colors
        button: {
          primary: { value: "#000000" }, // Primary button background
          primaryHover: { value: "#333333" }, // Primary button hover
          primaryActive: { value: "#555555" }, // Primary button active
          secondary: { value: "#F4F4F5" }, // Secondary button background
          secondaryHover: { value: "#E4E4E7" }, // Secondary button hover
        },

        // Status Colors
        status: {
          success: { value: "#10B981" }, // Green
          warning: { value: "#F59E0B" }, // Amber
          error: { value: "#EF4444" }, // Red
          info: { value: "#3B82F6" }, // Blue
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
