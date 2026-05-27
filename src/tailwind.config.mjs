/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.025em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.025em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.025em', fontWeight: '500' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.025em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.025em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.025em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.025em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.025em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.025em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.025em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "syne",
                paragraph: "azeret-mono",
                handwriting: "caveat"
            },
            colors: {
                'neon-red-orange': '#FF4500',
                'warm-amber': '#D4A373',
                'whiskey-glow': '#F0E68C',
                destructive: '#DC2626',
                'destructive-foreground': '#FFFFFF',
                background: '#222222',
                secondary: '#D4A373',
                foreground: '#FFFFFF',
                'secondary-foreground': '#000000',
                'primary-foreground': '#FFFFFF',
                primary: '#FF4500'
            },
            backgroundImage: {
                'grain': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /%3E%3CfeColorMatrix in="noise" type="saturate" values="0" /%3E%3C/filter%3E%3Crect width="400" height="400" fill="%23222222" /%3E%3Crect width="400" height="400" fill="%23000000" opacity="0.03" filter="url(%23noiseFilter)" /%3E%3C/svg%3E")',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
