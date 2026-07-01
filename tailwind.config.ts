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
        // Semantic tokens driven by CSS variables (see app/globals.css).
        // Names kept as ink/gold/sand for low churn; values swap per [data-theme].
        // "ink" = background/surfaces, "gold" = accent, "sand" = foreground text.
        ink: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          900: 'rgb(var(--c-surface) / <alpha-value>)',
          800: 'rgb(var(--c-surface-2) / <alpha-value>)',
          700: 'rgb(var(--c-surface-3) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          400: 'rgb(var(--c-accent-400) / <alpha-value>)',
          600: 'rgb(var(--c-accent-600) / <alpha-value>)',
          700: 'rgb(var(--c-accent-700) / <alpha-value>)',
        },
        sand: 'rgb(var(--c-fg) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        onaccent: 'rgb(var(--c-on-accent) / <alpha-value>)',
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
