/** @type {import('tailwindcss').Config} */
// Brand palette: warm beige-grey (#A8A492) as primary, warm dark as the
// "navy" body/dark-section color. The token names (`red`, `redDark`, `navy`,
// `navyDark`) are KEPT so existing bg-gigar-red / text-gigar-red /
// border-gigar-navy/10 classes across the codebase keep working — only the
// underlying hex values changed.
//
// Navbar hover text color is set to RED (#c8102e) directly in Navbar.jsx
// (per user request) — that's the only red on the site now; everything
// else is the beige-grey + warm dark + gold accent.
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gigar: {
          red:       '#A8A492',  // was #475569 (slate-600) — now warm beige-grey (primary)
          redDark:   '#8E8A77',  // was #334155 (slate-700) — darker beige-grey (hover)
          navy:      '#3D3A33',  // was #1e293b (slate-800) — warm dark (body text, dark sections)
          navyDark:  '#2A2823',  // was #0f172a (slate-900) — deeper warm dark (hero overlays)
          ink:       '#0b0f1c',
          gold:      '#f1b524', // accent — kept (gold + beige-grey = warm industrial palette)
          cream:     '#fff7ed',
          mist:      '#f4f6fb',
          // The actual red used for navbar hover only (kept as a separate token
          // so it's easy to find/change later).
          redHover:  '#c8102e',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // slate rgba(71,85,105,0.35) → warm beige-grey rgba(168,164,146,0.35)
        'gigar-glow': '0 10px 40px -10px rgba(168, 164, 146, 0.35)',
        // slate rgba(30,41,59,0.18) → warm dark rgba(61,58,51,0.18)
        'gigar-soft': '0 8px 30px -8px rgba(61, 58, 51, 0.18)',
      },
      backgroundImage: {
        // hero gradient: warm dark → beige-grey
        'hero-gradient': 'linear-gradient(135deg, rgba(42,40,35,0.92) 0%, rgba(142,138,119,0.85) 100%)',
        'section-grid':  'linear-gradient(rgba(61,58,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,58,51,0.06) 1px, transparent 1px)',
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
