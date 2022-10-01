/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#ebaf09",
        blackish: "#333",
      },
      fontSize: {
        large: "64px",
      },
      fontFamily: {
        league: ["League Spartan", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundColor: {
        primary: "#f5ba13",
      },
      borderColor: {
        primary: "#f5ba13",
      },
      screens: {
        sm: "375px",
        smL: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
      keyframes: {
        popUp: {
          "0%": { transform: "scale(30%)", opacity: "0" },
          "100%": { transform: "scale(100%)", opacity: "1" },
        },
        popUpY: {
          "0%": { transform: "scaleY(30%)", opacity: "0" },
          "100%": { transform: "scaleY(100%)", opacity: "1" },
        },
        popDown: {
          "0%": { transform: "scale(130%)" },
          "100%": { transform: "scale(100%)" },
        },
      },
    },
  },
  plugins: [],
};
