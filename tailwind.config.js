const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    colors: colors,
    extends:{
      colors:{
        'transparent':'transparent',
      }
    }
  },
 
  plugins: [
    require('@tailwindcss/forms'),
  ],

}
