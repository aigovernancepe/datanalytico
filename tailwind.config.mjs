/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#048caa',
          dark: '#037a95',
          light: '#05a8cc',
        },
        accent: {
          DEFAULT: '#ff9933',
          dark: '#e6872e',
          light: '#ffad5c',
        },
        brand: {
          bg: '#F8F7F4',
          dark: '#0E1A2D',
          text: '#1F2937',
          'text-light': '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
