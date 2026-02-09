/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./index.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#050505",
        accent: "#00FF99",
        border: "#1A1A1A",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'telemetry': '0.4em',
      },
      fontSize: {
        '2xs': '8px',
      }
    },
  },
  plugins: [],
}