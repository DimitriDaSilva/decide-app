/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#1C2044",
        white: "#FFFFFF",
        darkGray: "#626262",
        primary: {
          DEFAULT: "#2DAFA2",
          hover: "#20425B",
        },
        secondary: {
          DEFAULT: "#AB50E3",
          hover: "#481B64",
        },
        third: {
          DEFAULT: "#42445D",
          hover: "#53567C",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
      boxShadow: {
        around: "0 0 100px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
