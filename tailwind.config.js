<<<<<<< Main
=======
const { blackA, green, mauve, slate, violet } = require('@radix-ui/colors');
const withMT = require("@material-tailwind/react/utils/withMT");


>>>>>>> local
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
<<<<<<< Main
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
};
=======
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'), require('tailwind-scrollbar'),],
});
>>>>>>> local
