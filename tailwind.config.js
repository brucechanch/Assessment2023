/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '1/16': '6.25%', // Adds the 1/16 width utility
      },
    },
  },
  plugins: [],
}
