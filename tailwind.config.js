/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        page: '#000000',
        panel: '#09090b',
        card: '#111111',
        border: '#1f1f1f',
        accent: '#10b981', 
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}