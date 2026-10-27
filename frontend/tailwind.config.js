/** @type {import('tailwindcss').Config} */
// Brand palette switched to slate grey (per user request). The `red` /
// `redDark` / `navy` / `navyDark` token names are KEPT so existing
// `bg-gigar-red`, `text-gigar-red`, `border-gigar-navy/10` classes across
// the codebase keep working — only the underlying hex values change.
// Gold stays as the accent color (it pairs beautifully with slate grey
// and preserves the "Trading & Technical Center" premium feel).
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gigar: {
          red:       '#475569',  // was #c8102e — now slate-600 (primary grey)
          redDark:   '#334155',  // was #8b0a1f — now slate-700 (hover state)
          navy:      '#1e293b',  // was #1f2d4a — now slate-800 (body text / dark sections)
          navyDark:  '#0f172a',  // was #141d33 — now slate-900 (hero overlays)
          ink:       '#0b0f1c',
          gold:      '#f1b524', // accent — kept, gold + grey = premium palette
          cream:     '#fff7ed',
          mist:      '#f4f6fb',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // updated: red rgba(200,16,46,0.35) → slate rgba(71,85,105,0.35)
        'gigar-glow': '0 10px 40px -10px rgba(71, 85, 105, 0.35)',
        // updated: navy rgba(31,45,74,0.18) → slate rgba(30,41,59,0.18)
        'gigar-soft': '0 8px 30px -8px rgba(30, 41, 59, 0.18)',
      },
      backgroundImage: {
        // hero gradient: navy (slate-900) → red (slate-700)
        'hero-gradient': 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(51,65,85,0.85) 100%)',
        'section-grid':  'linear-gradient(rgba(30,41,59,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.06) 1px, transparent 1px)',
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
