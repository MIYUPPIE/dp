/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			colors: {
				background: '#0b0310',
				secondary: '#1a0620',
				primary: '#633367',
				accent: '#be2030',
				accentAlt: '#f05d2a',
				highlight: '#f4d9ec'
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif']
			},
			boxShadow: {
				glow: '0 0 35px rgba(190, 32, 48, 0.25)'
			}
		}
	},
	plugins: []
};
