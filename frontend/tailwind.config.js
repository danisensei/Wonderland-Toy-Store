/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#2D3436',
        light: '#F8F9FA',
        purple: {
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
        },
        pink: {
          400: '#F472B6',
          500: '#EC4899',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'scale-pop': 'scale-pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 107, 107, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-pop': {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundSize: {
        'shimmer-size': '1000px 100%',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 107, 107, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 107, 107, 0.3)',
        'neon': '0 0 30px rgba(78, 205, 196, 0.5)',
      },
    },
  },
  plugins: [],
}

