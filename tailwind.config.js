/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Almarai is now the primary Arabic typeface (smoother + more elegant).
        // The legacy `changa`/`cairo` aliases are remapped to Almarai so existing
        // class names pick up the new font without touching every component.
        almarai: ['Almarai', 'sans-serif'],
        changa: ['Almarai', 'sans-serif'],
        cairo: ['Almarai', 'sans-serif'],
        messiri: ['"El Messiri"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        magic: {
          gold: '#d4af37',
          goldlight: '#f5d76e',
          deepblue: '#0a0a2e',
          midnight: '#050514',
          purple: '#6b46c1',
          purpleglow: '#9f7aea',
          parchment: '#f4e4bc',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4), 0 0 90px rgba(212, 175, 55, 0.2)',
        'purple-glow': '0 0 20px rgba(159, 122, 234, 0.5), 0 0 40px rgba(159, 122, 234, 0.3)',
        'blue-glow': '0 0 20px rgba(66, 153, 225, 0.5), 0 0 40px rgba(66, 153, 225, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8), 0 0 80px rgba(212, 175, 55, 0.4)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        wandSparkle: {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(var(--x), var(--y)) scale(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
