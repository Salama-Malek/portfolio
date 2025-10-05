/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        cyrillic: ['var(--font-cyrillic)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
