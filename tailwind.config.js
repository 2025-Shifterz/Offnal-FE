/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      background: 'var(--color-bg-app)',
    }
  },
  plugins: [],
}
