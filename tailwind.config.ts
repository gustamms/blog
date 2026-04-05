import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            a: { color: "#2563eb", "&:hover": { color: "#1d4ed8" } },
            code: { color: "#1e293b" },
          },
        },
        dark: {
          css: {
            color: "#e2e8f0",
            a: { color: "#60a5fa", "&:hover": { color: "#93c5fd" } },
            code: { color: "#f1f5f9" },
            "h1, h2, h3, h4, h5, h6": { color: "#f1f5f9" },
            strong: { color: "#f1f5f9" },
            blockquote: { color: "#94a3b8" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
