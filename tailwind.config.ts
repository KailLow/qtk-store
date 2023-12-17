import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ".src/app/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#009099',
        'secondary': '#C95D3B',
        'background-50': '#283342',
        'background-100': '#1D242E',
        'text': '#3E334E',
      },
    },
  },
  plugins: [flowbite],
}
export default config
