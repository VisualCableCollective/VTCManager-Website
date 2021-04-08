module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '25vh': '25vh',
      },
      minHeight: {
        '25vh' : '25vh',
      },
      maxWidth: {
        '800px': '800px',
      },
      backgroundColor: {
        'dark-1': '#0d0d0d',
        'dark-2': '#121212',
        'dark-3': '#1c1c1c',
        'dark-4': '#2b2b2b',
        'dark-5': '#363636',
        'sidebar': '#1c1c1c',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    extend: {
      backgroundOpacity: ['active'],
    }
  },
  plugins: [],
}
