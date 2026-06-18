import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#EEEDFE",
          100: "#E0DEFC",
          200: "#C7C4F7",
          300: "#A6A2FA",
          400: "#7A74F6",
          500: "#5F58F4",
          600: "#4A43D6",
          700: "#3E38B8",
          800: "#2E2A6B",
          900: "#221F52",
        },
        indigo: {
          50: "#EEEDFE",
          100: "#E0DEFC",
          200: "#C7C4F7",
          300: "#A6A2FA",
          400: "#7A74F6",
          500: "#5F58F4",
          600: "#4A43D6",
          700: "#3E38B8",
          800: "#2E2A6B",
          900: "#221F52",
        },
        sky: {
          300: "#A6A2FA",
          400: "#7A74F6",
          500: "#5F58F4",
        },
        cyan: {
          300: "#A6A2FA",
          400: "#7A74F6",
          500: "#5F58F4",
        },
      },
    },
  },
  plugins: [],
};

export default config;
