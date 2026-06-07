import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        inkDeep: "#090909",
        surface: "#111111",
        hairline: "rgba(255,255,255,0.14)",
        mirai: "#D6FF3F",
        cyan: "#56D7FF"
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      keyframes: {
        lineGrow: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" }
        },
        floatSlow: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        lineGrow: "lineGrow 1.2s ease-out forwards",
        floatSlow: "floatSlow 9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
