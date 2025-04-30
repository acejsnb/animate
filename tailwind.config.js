import {heroui} from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/component/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      transform: {
        'scale-105': 'scale(105)'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}

export default config;
