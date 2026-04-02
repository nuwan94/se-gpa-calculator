/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#263238",
          light: "#37474f",
          nav: "#263238",
        },
      },
    },
  },
  plugins: [],
};
