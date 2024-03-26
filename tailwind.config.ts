import { type Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        image: '0 2px 6px rgba(0,0,0,.08)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
