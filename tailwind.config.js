/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4CAF50', // Vert principal
        secondary: '#F1B8C7', // pink
        background: '#F8F9FA', // Gris clair
        text: '#333333', // Noir texte
        accent: '#F5CC00', // jaune
        cream: '#FFF8E1', // Crème
        lime: '#C8E6C9', // Vert clair
        pink: '#F8BBD0', // Rose clair
        blue: '#BBDEFB', // Bleu clair
        green: '#4CAF50', // Vert vibrant
        yellow: '#F5CC00', // Jaune brillant
        dark: '#212121', // Noir profond
      },
    },
  },
  plugins: [],
};
