import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Art direction A — Dark cinematic + gold
        ink: {
          DEFAULT: '#0C0A09',
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
        },
        gold: {
          DEFAULT: '#C99A3B',
          400: '#D8B45A',
          600: '#A16207',
          700: '#854D0E',
        },
        sand: '#FAFAF9',
        muted: '#A8A29E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        quote: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
