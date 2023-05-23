/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
			sans: ['"Poppins"', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: {
					50: '#fefaec',
					100: '#fbf1ca',
					200: '#f7e390',
					300: '#f4d160',
					400: '#f0ba2f',
					500: '#e99b17',
					600: '#ce7611',
					700: '#ab5412',
					800: '#8b4215',
					900: '#733614',
					950: '#421b06',
				},
				secondary: {
					50: '#f7f7f7',
					100: '#eaeaea',
					200: '#d4d4d4',
					300: '#bcbcbc',
					400: '#9e9e9e',
					500: '#7e7e7e',
					600: '#5e5e5e',
				},
			},
		},
  },
  plugins: [],
}