const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        gothic: "var(--font-family-gothic)",
      },
      maxHeight: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666666%",
        "1/4": "25%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
      },
      dropShadow: {
        "glow-white": "1px 0 20px rgba(255, 255, 255,1)",
        "glow-red": "1px 0 20px rgba(255, 0, 0,1)",
        "glow-blue": "1px 0 20px rgba(0, 0, 255,1)",
        "glow-green": "1px 0 20px rgba(0, 255, 0,1)",
        "glow-purple": "1px 0 20px rgba(255, 255, 255,1)",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        // ... custom themes
      },
    }),
  ],
};

export default config;
