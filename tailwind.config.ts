import type { Config } from "tailwindcss";

// Color tokens point to CSS variables (R G B channels) so that the same
// utility classes (bg-ink-900, text-bone-100, bg-sage-900/20 …) re-theme
// automatically between light and dark. Opacity modifiers work via the
// `<alpha-value>` placeholder.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: v("ink-950"),
          900: v("ink-900"),
          850: v("ink-850"),
          800: v("ink-800"),
          700: v("ink-700"),
          600: v("ink-600"),
        },
        bone: {
          50: v("bone-50"),
          100: v("bone-100"),
          200: v("bone-200"),
          300: v("bone-300"),
          400: v("bone-400"),
        },
        sage: {
          50: v("sage-50"),
          100: v("sage-100"),
          200: v("sage-200"),
          300: v("sage-300"),
          400: v("sage-400"),
          500: v("sage-500"),
          600: v("sage-600"),
          700: v("sage-700"),
          800: v("sage-800"),
          900: v("sage-900"),
        },
        terra: {
          50: v("terra-50"),
          100: v("terra-100"),
          200: v("terra-200"),
          300: v("terra-300"),
          400: v("terra-400"),
          500: v("terra-500"),
          600: v("terra-600"),
          700: v("terra-700"),
        },
        clay: {
          400: v("clay-400"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
      },
      letterSpacing: {
        widest: "0.18em",
      },
      borderRadius: {
        // Friendlier, rounder corners
        sm: "0.5rem",
        DEFAULT: "0.75rem",
        md: "0.875rem",
        lg: "1.1rem",
        xl: "1.4rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--shadow) / 0.04), 0 8px 24px -12px rgb(var(--shadow) / 0.18)",
        pop: "0 2px 6px rgb(var(--shadow) / 0.06), 0 18px 40px -16px rgb(var(--shadow) / 0.28)",
      },
      animation: {
        "breath-in": "breathIn 3s ease-in-out forwards",
        "breath-out": "breathOut 6s ease-in-out forwards",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "pop-in": "popIn 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        breathIn: {
          "0%": { transform: "scale(0.55)", opacity: "0.55" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        breathOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.55)", opacity: "0.55" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
