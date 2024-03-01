/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				rubik: ["Rubik", "sans-serif"],
			},

			screens: {
				sm: "400px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},

			colors: {
				primary: "#003B95",
				accent: "#edf6f9",
				sec: "#fca311",
				sec2: "#f8f9fa",
				secText: "#262626 ",
			},
		},
	},
	plugins: [],
};
