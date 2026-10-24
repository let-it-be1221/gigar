/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gigar: {
          red:    '#c8102e',  // signature deep red from logo
          redDark:'#8b0a1f',
          navy:   '#1f2d4a',  // deep blue-gray from logo
          navyDark:'#141d33',
          ink:    '#0b0f1c',
          gold:   '#f1b524',
          cream:  '#fff7ed',
          mist:   '#f4f6fb',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gigar-glow': '0 10px 40px -10px rgba(200, 16, 46, 0.35)',
        'gigar-soft': '0 8px 30px -8px rgba(31, 45, 74, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(20,29,51,0.92) 0%, rgba(139,10,31,0.85) 100%)',
        'section-grid':  'linear-gradient(rgba(31,45,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,45,74,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-md': '40px 40px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out',
        'float':   'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.6s linear infinite',
      },
      opacity: {
        8: '0.08', 15: '0.15', 35: '0.35', 45: '0.45', 55: '0.55',
        65: '0.65', 85: '0.85',
      },
    },
  },
  plugins: [],
}
