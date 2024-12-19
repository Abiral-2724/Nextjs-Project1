import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Ensure `dark` class toggling is implemented in your app
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html}" // Added support for standalone HTML files
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background, 0 0% 100%))", // Added default values
        foreground: "hsl(var(--foreground, 220 13% 18%))",
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 98%))",
          foreground: "hsl(var(--card-foreground, 220 13% 18%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 98%))",
          foreground: "hsl(var(--popover-foreground, 220 13% 18%))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 215 60% 55%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0 0% 94%))",
          foreground: "hsl(var(--secondary-foreground, 220 13% 18%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 220 10% 90%))",
          foreground: "hsl(var(--muted-foreground, 220 13% 18%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 180 50% 50%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 100%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 50% 50%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        border: "hsl(var(--border, 220 13% 18%))",
        input: "hsl(var(--input, 220 13% 18%))",
        ring: "hsl(var(--ring, 220 13% 18%))",
        chart: {
          "1": "hsl(var(--chart-1, 215 60% 55%))",
          "2": "hsl(var(--chart-2, 180 50% 50%))",
          "3": "hsl(var(--chart-3, 0 50% 50%))",
          "4": "hsl(var(--chart-4, 45 80% 50%))",
          "5": "hsl(var(--chart-5, 300 50% 50%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 8px)", // Added default values
        md: "calc(var(--radius, 8px) - 2px)",
        sm: "calc(var(--radius, 8px) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure this plugin is installed
} satisfies Config;
