/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd3838',
          light: '#ed5c5c',
          dark: '#aa2121',
        },
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
