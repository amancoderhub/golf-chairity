export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14, 165, 233, 0.18)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top, rgba(14,165,233,0.18), transparent 45%), radial-gradient(circle at right, rgba(244,114,182,0.16), transparent 30%)"
      }
    }
  },
  plugins: []
};
