import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        borderColor: {
          DEFAULT: "#E4E7EC",
        },
        primaryDark: {
          DEFAULT: "#101928",
          100: "#cfd1d4",
          200: "#9fa3a9",
          300: "#70757e",
          400: "#404753",
          500: "#101928",
          600: "#0d1420",
          700: "#0a0f18",
          800: "#060a10",
          900: "#030508",
        },

        primaryLight: {
          DEFAULT: "#2754f3",
          100: "#d4ddfd",
          200: "#a9bbfa",
          300: "#7d98f8",
          400: "#5276f5",
          500: "#2754f3",
          600: "#1f43c2",
          700: "#173292",
          800: "#102261",
          900: "#081131",
        },

        layer: {
          DEFAULT: "#1d2739",
          100: "#d2d4d7",
          200: "#a5a9b0",
          300: "#777d88",
          400: "#4a5261",
          500: "#1d2739",
          600: "#171f2e",
          700: "#111722",
          800: "#0c1017",
          900: "#06080b",
        },
        grey: {
          DEFAULT: "#f5f6f8",
          100: "#fefefe",
          200: "#fdfdfd",
          300: "#fbfcfd",
          400: "#fafbfc",
          500: "#f9fafb",
          600: "#c7c8c9",
          700: "#959697",
          800: "#646464",
          900: "#323232",
        },
        bg: {
          DEFAULT: "#f5f6f8",
          100: "#fdfdfe",
          200: "#fbfbfc",
          300: "#f9fafb",
          400: "#f7f8f9",
          500: "#f5f6f8",
          600: "#c4c5c6",
          700: "#939495",
          800: "#626263",
          900: "#313132",
        },

        loginOther: {
          DEFAULT: "#44b8ff",
          100: "#daf1ff",
          200: "#b4e3ff",
          300: "#8fd4ff",
          400: "#69c6ff",
          500: "#44b8ff",
          600: "#3693cc",
          700: "#296e99",
          800: "#1b4a66",
          900: "#0e2533",
        },
        outline: {
          DEFAULT: "#f5f6f8",
          100: "#f6f7f8",
          200: "#eceef1",
          300: "#e3e6eb",
          400: "#d9dde4",
          500: "#d0d5dd",
          600: "#a6aab1",
          700: "#7d8085",
          800: "#535558",
          900: "#2a2b2c",
        },
        textColor: {
          DEFAULT: "#667185",
          100: "#e0e3e7",
          200: "#c2c6ce",
          300: "#a3aab6",
          400: "#858d9d",
          500: "#667185",
          600: "#525a6a",
          700: "#3d4450",
          800: "#292d35",
          900: "#14171b",
        },
        textColor2: {
          DEFAULT: "#101928",
          100: "#cfd1d4",
          200: "#9fa3a9",
          300: "#70757e",
          400: "#404753",
          500: "#101928",
          600: "#0d1420",
          700: "#0a0f18",
          800: "#060a10",
          900: "#030508",
        },
      },
      fontSize: {
        md: "26px",
        sm: "14px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
