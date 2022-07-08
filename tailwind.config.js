/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'post-shadow': '0px 0px 20px -3px rgba(0, 0, 0, 0.17)',
      },
    },
  },
  plugins: [],
}
