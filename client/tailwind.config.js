/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       keyframes: {
        gradientGlow: {
      "0%, 100%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
    },
    glowPulse: {
      "0%, 100%": { opacity: "0.6" },
      "50%": { opacity: "1" },
    },
  },
  animation: {
    gradientGlow: "gradientGlow 6s linear infinite",
    glowPulse: "glowPulse 4s ease-in-out infinite",
  },
    },
  },
  plugins: [],
}

