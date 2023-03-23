/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['Nunito', 'sans-serif']
      }, 
    },
  },
  plugins: [],
}
