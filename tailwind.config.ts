import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-audiowide)', 'sans-serif'],
                display: ['var(--font-orbitron)', 'sans-serif'],
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
                audiowide: ['var(--font-audiowide)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config