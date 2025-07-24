/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'red': {
          600: '#dc2626',
        }
      },
      height: {
        '55': '219px', // Height du header selon les specs
      },
      spacing: {
        '55': '219px',
      }
    },
  },
  plugins: [],
};