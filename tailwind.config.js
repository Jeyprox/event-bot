const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      violet: colors.violet,
      indigo: colors.indigo,
      red: colors.red,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
