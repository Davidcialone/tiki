// Remplacer module.exports par export default

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aquatico: ["Aquatico", ...defaultTheme.fontFamily.sans], // Ajout de la police Aquatico
      },
    },
  },
  plugins: [],
};
