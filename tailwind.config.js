/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18201b",
        cocoo: "#2d6a4f",
        mint: "#d8f3dc",
        leaf: "#74c69d",
        sand: "#f7f3ea",
        clay: "#d88c69"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(24, 32, 27, 0.08)"
      }
    }
  },
  plugins: []
};
