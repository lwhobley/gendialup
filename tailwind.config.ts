import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* Original palette */
        cream: '#FAF8F3',
        taupe: '#8B8680',
        'warm-gray': '#D4CECC',
        sage: '#9CAF88',
        coral: '#D97F6F',
        'dark-text': '#2C2622',
        'light-text': '#5C5652',

        /* 90s Neon colors */
        'neon-pink': '#FF006E',
        'neon-orange': '#FB5607',
        'neon-yellow': '#FFBE0B',
        'neon-purple': '#8338EC',
        'neon-blue': '#3A86FF',
        'neon-cyan': '#00D9FF',
        'neon-lime': '#06FFA5',
        'neon-red': '#FF4757',

        /* 90s Pastels */
        'pastel-pink': '#FFB6D9',
        'pastel-blue': '#B4D7FF',
        'pastel-purple': '#E6D5FF',
        'pastel-yellow': '#FFF5BA',
        'pastel-green': '#D4F1DE',

        /* Vibrant accent colors */
        'vibrant-magenta': '#E60965',
        'vibrant-orange': '#FF6B00',
        'vibrant-teal': '#00B4A0',
      },
      backgroundImage: {
        /* Gradient backgrounds */
        'gradient-90s-neon': 'linear-gradient(135deg, #FF006E 0%, #FB5607 25%, #FFBE0B 50%, #8338EC 75%, #3A86FF 100%)',
        'gradient-90s-sunset': 'linear-gradient(135deg, #FF6B9D 0%, #FFA548 50%, #FFD166 100%)',
        'gradient-90s-cool': 'linear-gradient(135deg, #06FFA5 0%, #00D9FF 50%, #7209B7 100%)',
        'gradient-90s-warm': 'linear-gradient(135deg, #FF4757 0%, #FFA502 50%, #FFD32A 100%)',
        'gradient-90s-vibrant': 'linear-gradient(135deg, #FF006E 0%, #00D9FF 50%, #FFBE0B 100%)',
        'gradient-retro': 'linear-gradient(45deg, #FB5607 0%, #FFD32A 25%, #06FFA5 50%, #3A86FF 75%, #8338EC 100%)',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'neon-blue': '0 0 20px rgba(58, 134, 255, 0.5)',
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
        'retro': '0 8px 16px rgba(0, 0, 0, 0.1), 0 0 30px rgba(255, 0, 110, 0.2)',
      },
      fontSize: {
        'retro-xl': ['3rem', { lineHeight: '1.2', fontWeight: 'bold' }],
        'retro-lg': ['2rem', { lineHeight: '1.3', fontWeight: 'bold' }],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 8s infinite',
      },
    },
  },
  plugins: [],
}

export default config
