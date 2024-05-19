/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "whatxapp-bp": "755px",
      }
    },
  },
  plugins: [],
}
