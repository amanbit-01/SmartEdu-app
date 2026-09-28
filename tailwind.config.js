/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#142D4E',
          50: '#f0f4f8',
          100: '#dbe5f0',
          200: '#bacce0',
          300: '#8eabc9',
          400: '#5e85ad',
          500: '#3e6a96',
          600: '#2b527b',
          700: '#234265',
          800: '#142d4e',
          900: '#152741',
        },
        accent: {
          DEFAULT: '#087F8C',
          50: '#f0f9fa',
          100: '#d9f0f3',
          200: '#b6e0e6',
          300: '#85c9d2',
          400: '#4da6b2',
          500: '#318996',
          600: '#087F8C',
          700: '#235c67',
          800: '#244c56',
          900: '#224049',
        },
        background: '#F6F8FB',
        surface: '#ffffff',
        text: {
          main: '#172033',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.875rem', // 14px
      }
    },
  },
  plugins: [],
}
