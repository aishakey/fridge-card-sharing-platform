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
        "dark-tangerine": "#DD6A2C",
        "retro-yellow": "#F9C74F",
        "yellow-main": "#FFC12B",
        "retro-green": "#90BE6D",
        "darkest-custom": "#222020",
        "darker-custom": "#373535",
        "dark-custom": "#454343",
        "cream-custom": "#FFF6DF",
        "cold-gray": "#E8E8E8",
      },
      boxShadow: {
        custom: "-1.5px 2px 0 0 #222020",
        large: "0px 4px 0 0 #222020",
        light: "-1.5px 2px 0 0 #FFF6DF",
        inner: "-1.5px 1px 0 0 #222020",
      },
    },
  },
  plugins: [],
};
