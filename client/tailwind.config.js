/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e0e6fd",
          500: "#7176b9",
          600: "#504fdd",
        },
      },
    },
  },
  plugins: [],
};
