/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          dark: '#0056b3',
        },
        brown: {
          500: '#8B4513',
          600: '#723A0F',
        },
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
