/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nateo: {
          dark: "#0a0f14",
          card: "#161c24",
          primary: "#2563eb",
          accent: "#60a5fa",
          text: "#f1f5f9",
        }
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin"),
    require('tailwind-scrollbar-hide'),
  ],
}