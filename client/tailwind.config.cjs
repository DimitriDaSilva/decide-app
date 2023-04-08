import { deviceSizes } from './src/utils/responsive-device';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#1C2044',
        white: '#FFFFFF',
        gray: {
          base: '#9899AA',
          dark: '#626262',
        },
        primary: {
          DEFAULT: '#2DAFA2',
          hover: '#20425B',
        },
        secondary: {
          DEFAULT: '#AB50E3',
          hover: '#481B64',
        },
        third: {
          DEFAULT: '#42445D',
          hover: '#53567C',
        },
      },
      screens: {
        ...deviceSizes,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
