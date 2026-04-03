/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a1f2e",
          light: "#252b3a",
          border: "#2a3040",
        },
        green: {
          tms: "#3a8c5c",
          hover: "#2d7049",
          light: "#dcfce7",
          text: "#166534",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
