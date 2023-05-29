/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx', './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors:{
        'primary':{
          black:'#1b1521',
          brow:'#44021e',
          red:"#af162a"
        }
      },
      fontSize:{
        12:10,
      }
    },
  },
  plugins: [],
}

