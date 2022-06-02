const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    colors: {
      gray: colors.zinc,
      blue: colors.indigo,
      violet: colors.violet,
      indigo: colors.indigo,
      red: colors.red,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
