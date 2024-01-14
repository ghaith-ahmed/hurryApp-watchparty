/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        absences: "1fr 4fr",
      },
      spacing: {
        dscreen: "100svh",
        quarter: "25%",
        bgdefault: "calc(100svh - 56px)",
      },
      keyframes: {
        "fade-in-down": {
          from: {
            transform: "translateY(-0.75rem)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0rem)",
            opacity: "1",
          },
        },
        "scale-up-center": {
          from: {
            opacity: "0.5",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.2s ease-in-out both",
        "scale-up-center":
          "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
