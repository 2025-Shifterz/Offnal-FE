/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
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

