import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Peace platform theme colors inspired by the images
        'cyber-dark': '#0a0e27',
        'cyber-blue': '#00ffff',
        'neon-purple': '#b026ff',
        'neon-pink': '#ff006e',
        'peace-gradient': {
          start: '#667eea',
          end: '#764ba2',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'peace-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
}
export default config
