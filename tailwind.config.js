module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        main: '#202631',
        primary: '#C15E0B',
      }, 
      height: {
        'paralax': '300vh',
      }
    },
  },
  plugins: [],
}
