/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Jira-style color palette
        primary: {
          50: '#E6FCFF',
          100: '#B3F5FF',
          200: '#79E2F2',
          300: '#00C7E6',
          400: '#00B8D9',
          500: '#0052CC', // Primary blue
          600: '#0747A6',
          700: '#0C3A7D',
          800: '#172B4D',
          900: '#091E42',
        },
        success: {
          light: '#79F2C0',
          DEFAULT: '#36B37E',
          dark: '#006644',
        },
        warning: {
          light: '#FFF0B3',
          DEFAULT: '#FFAB00',
          dark: '#FF8B00',
        },
        danger: {
          light: '#FFBDAD',
          DEFAULT: '#FF5630',
          dark: '#DE350B',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F4F5F7',
          200: '#EBECF0',
          300: '#DFE1E6',
          400: '#C1C7D0',
          500: '#B3BAC5',
          600: '#A5ADBA',
          700: '#7A869A',
          800: '#42526E',
          900: '#253858',
          1000: '#091E42',
        },
      },
      borderRadius: {
        'jira': '3px',
      },
      boxShadow: {
        'jira': '0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
        'jira-md': '0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
        'jira-lg': '0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
