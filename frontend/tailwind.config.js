/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내의 모든 JS/TS/JSX/TSX 파일 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-outline': {
          color: 'transparent',
          '-webkit-text-stroke': '1px #1f2937',
        },
      });
    },
  ],
}
