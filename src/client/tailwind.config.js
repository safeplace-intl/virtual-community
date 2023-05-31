/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "spi-violet-50": "#5F0047",
        "spi-violet-75": "#800762",
        "spi-violet-100": "#9B0D78",
        "spi-violet-200": "#E5C1DC",
        "spi-violet-300": "#FDECF9",
        "spi-black-100": "#13020F",
        "spi-black-200": "#666666",
        "spi-black-300": "#CCCCCC",
        "spi-black-400": "#F5F5F5",
        "spi-white-100": "#FFFFFF",
        "spi-modal-100": "#FFFFFF",
        "spi-site-backdrop": "#F7F4F7",
        "spi-success-100": "0C5700",
        "spi-success-200": "EFFFEC",
        "spi-error-100": "#9F1818",
        "spi-error-200": "#FFF3F3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
