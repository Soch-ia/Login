/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      keyframes: {
        float: {
          '100%' : {translate: '0 -1em', scale: '1.0125', boxshadow: '0 1rem 3rem black'},

        },
      },
      animation: {
        float: 'float 5s infinite alternate ease-in-out '
      }
    },
  },

  plugins: [],
}

