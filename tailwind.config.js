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
        primary:        '#0ea5e9',
        'primary-dark': '#0284c7',
        accent:         '#38bdf8',
        dark:           '#ffffff',
        'dark-2':       '#f0f4f8',
        'dark-3':       '#cbd5e1',
        muted:          '#64748b',
        light:          '#0f172a',
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
