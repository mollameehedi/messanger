/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#5F35F5',
        secondary: '#11175D ',
      },
      fontFamily: {
        nunito: ["Nunito Sans", 'sans-serif'], 
      },
    },
  },
  plugins: [],
}