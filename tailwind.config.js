const defaultTheme = require("tailwindcss/defaultTheme");
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
        light: "#E5E7EB",
        dark: "#D1D5DB",
      },
      green: {
        DEFAULT: "#00C08B",
        dark: "#00A677",
      },
      red: {
        DEFAULT: "#FF585D",
      },
      royal: {
        DEFAULT: "#0072CE",
      },
      orange: {
        DEFAULT: "#FFB259",
      },
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
