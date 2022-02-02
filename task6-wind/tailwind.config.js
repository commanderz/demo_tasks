module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: { //fontSize, lineHeight
      textsm: ['20px', '30px'],
      textxl: ['25px', '35px'],
    },
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {},
  },
}


