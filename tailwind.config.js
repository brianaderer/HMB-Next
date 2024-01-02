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
    },
  },
  plugins: [
      require("daisyui")
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

