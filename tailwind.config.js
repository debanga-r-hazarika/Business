/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f2ff',
          100: '#e9e8ff',
          200: '#d4d0ff',
          300: '#b4a9ff',
          400: '#9580ff',
          500: '#7C3AED', // Main primary color
          600: '#6426dd',
          700: '#5617be',
          800: '#47169a',
          900: '#3b147d',
          950: '#230c4a',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd3fd',
          400: '#36c0fa',
          500: '#0ca4e8',
          600: '#0082c5',
          700: '#016aa0',
          800: '#065986',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fff1f0',
          100: '#ffe2df',
          200: '#ffc9c4',
          300: '#ffa299',
          400: '#ff7268',
          500: '#F97066', // Main accent color
          600: '#e93325',
          700: '#c4251a',
          800: '#a32218',
          900: '#86231a',
          950: '#490e09',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 6px 24px rgba(0, 0, 0, 0.07)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
};