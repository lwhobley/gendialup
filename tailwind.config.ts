import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F3',
        taupe: '#8B8680',
        'warm-gray': '#D4CECC',
        sage: '#9CAF88',
        coral: '#D97F6F',
        'dark-text': '#2C2622',
        'light-text': '#5C5652',
      },
    },
  },
  plugins: [],
}
export default config
