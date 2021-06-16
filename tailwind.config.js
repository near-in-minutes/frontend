const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Source code pro', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'near-black': '#000000',
        'near-white': '#FFFFFF',
        'near-gray': '#F2F2F2',
        'near-red': '#FF585D',
        'near-orange': '#FFB259',
        'near-yellow': '#F0EC74',
        'near-green': '#00C08B',
        'near-blue': '#00C1DE',
        'near-royal': '#0072CE',
        gray: {
          DEFAULT: '#f2f2f2',
          light: '#E5E7EB',
          dark: '#D1D5DB'
        },
        green: {
          DEFAULT: '#00C08B',
          dark: '#00A677'
        },
        red: {
          DEFAULT: '#FF585D'
        },
        royal: {
          DEFAULT: '#0072CE'
        },
        orange: {
          DEFAULT: '#FFB259'
        }
      }
    }
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
