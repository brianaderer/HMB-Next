/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./wp-templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./wp-blocks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hmbNeutral' : {
          DEFAULT: '#5d5d5d',
          500: '#5d5d5d',
        },
        'hmbSlate': {
          DEFAULT: '#4a6880',
          500: '#4a6880',
        },
        'hmbBlue': {
          DEFAULT: '#0c3657',
          100: '#edeff2',
          200: '#dfe1e6',
          300: '#4f6b98',
          700: '#0c3657',
        },
        'hmbEnv': {
          'mauve' : '#d49499',
          'fucshia' : '#dd3cba',
          'yellow' : '#fcfe09',
          'cyan' : '#0892ff',
          'flame' : '#fd4333',
          'orange' : '#fe9a0e',
          'ember' : '#dd2d0b',
          'grass' : '#8bbf00',
          'torquoise' : '#2ccbcf',
          'stone' : '#7b92a7',

        }
      },
    },
  },
  plugins: [],
}

