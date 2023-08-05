const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      height: {
        "1/10": "10%",
        "9/10": "90%"
      },
      backgroundColor: {
        "app-black": "#121212",
      },
      colors: {
        'color1': '#252729',
        'color2': '#1C1D1F',
        'color3': '#1D1E20',
        'color4': '#1E1E1E',
        'color5': "#323538",
        'color6': "#D1C7C7",
        'color7': "#202224",
        'color8': "#202224",
        'color9': "#1E1E1E",
        'color10': "#D1C7C7",
        'color11': "#262626",
        'color12': "#898989",
        'color13': "#2626262",
        'color14': "#EE4774",
      },
      spacing: {
        '128': '32rem', // following the standard of 128 / 4 = 32
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
