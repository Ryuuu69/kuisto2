/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: { 
        bigRed: '#DC2626' 
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '55': '219px',
      }
    },
  },
  plugins: [],
};