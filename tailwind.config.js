/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./wp-templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./wp-blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      dropShadow: {
        'blueStandard': '0 25px 25px 10px rgba(0, 49, 58, 0.45)',
      },
      colors: {
        'hmbBright': {
          'cyan': '#22D3EE',
          'cyanDeep': '#018296',
        },
        'hmbNeutral' : {
          DEFAULT: '#5d5d5d',
          500: '#5d5d5d',
        },
        'hmbSlate': {
          DEFAULT: '#4a6880',
          500: '#4a6880',
          100: '#9ab6c7',
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
          'forest' : '#059400F7',
          'torquoise' : '#2ccbcf',
          'stone' : '#7b92a7',

        }
      },
      scale: {
        '-100': '-1',
      }
    },
  },
  plugins: [
      require("daisyui")
  ],
  daisyui: {
    themes: [{
      hmbLight : {
        'base-100': '#f7fdff',
        'base-300': '#4fb2ff',
        'base-200': '#f3fffb',
        'base-content': '#310046',
        'primary': '#19257D',
        'primary-content': '#FFFAE4',
        'accent': '#8ceed0',
        'accent-content': '#6d01a2',
        'neutral': '#f2f8ff',
        'neutral-content': '#434c56',
        'secondary': '#6d01a2',
        'secondary-content': '#33fff8',
      },
      hmbDark : {
        'base-100': '#121b2d',
        'base-300': '#080c10',
        'base-200': '#0a101e',
        'base-content': '#D1F1FF',
        'primary': '#19257D',
        'primary-content': '#FFFAE4',
        'accent-content': '#8cead5',
        'accent': '#270036',
        'neutral': '#353746',
        'neutral-content': '#EDF4FF',
        'secondary': '#cc66ff',
        'secondary-content': '#270036',
      },
    }], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "hmbDark", // name of one of the included themes for dark mode
    lightTheme: "hmbLight",
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

