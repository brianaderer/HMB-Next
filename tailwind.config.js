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
          500: '#004dce',
          700: '#0c3657',
        },
        'hmbEnv': {
          'mauve' : '#815c5e',
          'fucshia' : '#942981',
          'yellow' : '#7f8309',
          'cyan' : '#0365b4',
          'flame' : '#a44523',
          'orange' : '#8f5908',
          'ember' : '#dd2d0b',
          'grass' : '#698d00',
          'forest' : 'rgba(5,65,0,0.97)',
          'torquoise' : '#187073',
          'stone' : '#475460',

        }
      },
      scale: {
        '-100': '-1',
      }
    },
  },
  plugins: [
      require("daisyui"),

  ],
  daisyui: {
    themes: [{
      hmbLight : {
        'base-100': '#FAFCFF',
        'base-300': '#badaff',
        'base-200': '#F2F8FF',
        'base-content': '#310046',
        'primary': '#19257D',
        'primary-content': '#FFFAE4',
        'accent': '#8ceed0',
        'accent-content': '#48006b',
        'neutral': '#f2f8ff',
        'neutral-content': '#001733',
        'secondary': '#40005d',
        'secondary-content': '#5cfff8',
      },
      hmbDark : {
        'base-100': '#1a243e',
        'base-300': '#080c10',
        'base-200': '#0a101e',
        'base-content': '#D1F1FF',
        'primary': '#19257D',
        'primary-content': '#FFFAE4',
        'accent-content': '#8cead5',
        'accent': '#270036',
        'neutral': '#585b67',
        'neutral-content': '#EDF4FF',
        'secondary': '#c548f8',
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

