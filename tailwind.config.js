/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "custom-heading": ["Luckiest Guy", "sans-serif"],
        "custom-paragraph": ["Quicksand", "sans-serif"],
        "custom-extra": ["Indie Flower", "sans-serif"],
      },
      colors: {
        "cherry-main": "#F94144",
        "bright-tangerine": "#F3722C",
        "retro-yellow": "#F9C74F",
        "yellow-main": "#FFC12B",
        "retro-green": "#90BE6D",
        "darkest-custom": "#222020",
        "darker-custom": "#373535",
        "dark-custom": "#454343",
        "cream-custom": "#FFF6DF",
        "cold-gray": "#E8E8E8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
