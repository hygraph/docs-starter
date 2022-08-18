/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      boxShadow: {
        image: '0 2px 6px rgba(0,0,0,.08)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
