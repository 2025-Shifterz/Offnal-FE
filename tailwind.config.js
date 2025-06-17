// This is a Tailwind CSS configuration file for a React Native project.
// It specifies the content paths, disables dark mode, and extends the theme with custom colors,
// fonts, font sizes, and spacing. It also imports unsupported core plugins from 'tailwindcss-react-native'.

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: { },
      fontFamily: { },
      fontSize: { },
      spacing: { },
    },
  },
  plugins: [],
  corePlugins: require('tailwindcss-react-native/unsupported-core-plugins'),
}
