/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/background.png')",
      },
      fontSize:{
        hero:"74px",
        medium:"64px",
        sub:"32px"
      },
      lineHeight:{
        "leading-large":"101px",
        "leading-mid":"44px"
      }
    },
  },
  plugins: [],
};
