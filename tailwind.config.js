/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans:["Open Sans"]
      },
      gridTemplateColumns:{
        "1/5": "1fr 5fr "
      },
      colors: {
        'blue-main':'#3C96FF',
        'green-main':'#41DB6D',
       
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

