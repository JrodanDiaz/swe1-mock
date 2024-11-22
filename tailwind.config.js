/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-lblue": "#88d3ff",
        "main-blue": "#7ea4d8",
        "off-blue": "#c8d8ee",
        "main-dblue": "#4b6a94"
      }
    },
  },
  plugins: [],
}

