import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        sans: ["Open Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"],
      },
      colors: {
        "dark-bg": "#141619",
        primary: "#4A46FF",
      },
      fontSize: {
        headline: "4.875rem",
        sectitle: "3.5rem",
      },
      buttonColor: {
        primary: "#4A46FF",
      },
      keyframes: {
        "slide-infinite": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "scale-infinite": {
          "0%, 100%": { transform: "scale(0.75)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "slide-infinite": "slide-infinite 30s linear infinite",
        "scale-infinite": "scale-infinite 15s ease-in-out infinite",
      },
    },
  },

  darkMode: "class",

  plugins: [
    nextui({
      defaultTheme: "dark",
    }),
  ],
};
