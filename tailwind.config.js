/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:       '#14b8a6',
        'primary-dark':'#0f9688',
        accent:        '#2dd4bf',
        dark:          '#0a1628',
        'dark-2':      '#0d1e33',
        'dark-3':      '#134e4a',
        muted:         '#5eead4',
        light:         '#ccfbf1',
      },
      fontFamily: {
        sans:    ['var(--font-ubuntu)', 'Ubuntu', 'sans-serif'],
        display: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'fill-bar': 'fillBar 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity:'0', transform:'translateY(20px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        slideUp: { '0%': { opacity:'0', transform:'translateY(40px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        fillBar: { '0%': { width:'0%' }, '100%': { width:'var(--bar-width)' } },
      },
    },
  },
  plugins: [],
}
