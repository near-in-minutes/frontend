const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: {
        DEFAULT: "#FFFFFF",
      },
      gray: {
        DEFAULT: "#f2f2f2",
        dark: "#D1D5DB",
      },
      green: {
        50: "#ECFDF5",
        DEFAULT: "#00C08B",
        dark: "#00A677",
      },
      yellow: colors.amber,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", "Source code pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: [
      "responsive",
      "dark",
      "group-hover",
      "focus-within",
      "hover",
      "focus",
    ],
    scale: ["hover", "active", "group-hover"],
    width: ["hover"],
    padding: ["hover"],
    fontWeight: ["hover"],
    extend: {},
  },
  plugins: [],
};
