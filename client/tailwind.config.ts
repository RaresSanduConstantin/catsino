import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse": {
          "0%, 100%": { transform: "scale(1)", color: '#fde047', opacity: '1' },
          "50%": { transform: "scale(1.05)", color: '#eab308', opacity: '1' },
        },
        "ping": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping": 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config