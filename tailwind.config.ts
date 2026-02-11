import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6466F1",
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#6B7280",
        },
        border: "#E5E5E5",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
