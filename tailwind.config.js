/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { display: ['Namco', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] }, colors: { charcoal: '#141414', orange: '#FF7A26', 'deep-grey': '#242424', 'off-white': '#F5F3EF', grey: '#777777', muted: '#B8B5AE', line: '#3A3A3A' } } },
  plugins: [],
}
