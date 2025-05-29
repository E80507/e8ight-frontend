import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "599px" },
        tablet: { min: "600px", max: "1024px" },
        web: { min: "1025px" },
      },
      fontFamily: {
        gibson: ["var(--font-gibson)"],
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          alternative: "hsl(var(--primary-alternative))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          alternative: "hsl(var(--background-alternative))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        "label-alternative": "hsl(var(--label-alternative))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        black: "hsl(var(--black))",
        error: "hsl(var(--error))",
      },
      borderRadius: {
        lg: "var(--radius)", // 10px
        md: "calc(var(--radius) - 2px)", // 8px
        sm: "calc(var(--radius) - 4px)", // 6px
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".h1-l": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-1.5%",
        },
        ".h1-m": {
          fontSize: "24px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
        },
        ".h1-r": {
          fontSize: "20px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
        },
        ".h1-s": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
        },
        ".h2-l": {
          fontSize: "20px",
          lineHeight: "160%",
          fontWeight: "500",
          letterSpacing: "-0.3%",
        },
        ".h2-m": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "500",
          letterSpacing: "-0.3%",
        },
        ".heading-1": {
          fontSize: "32px",
          lineHeight: "48px",
          fontWeight: "800",
        },
        ".heading-2": {
          fontSize: "24px",
          lineHeight: "36px",
          fontWeight: "800",
        },
        ".heading-3": {
          fontSize: "20px",
          lineHeight: "30px",
          fontWeight: "800",
        },
        ".heading-3-thin": {
          fontSize: "20px",
          lineHeight: "30px",
          fontWeight: "400",
        },
        ".heading-4": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "800",
        },
        ".heading-5": {
          fontSize: "14px",
          lineHeight: "25.2px",
          fontWeight: "800",
        },
        ".heading-6": {
          fontSize: "12px",
          lineHeight: "21.6px",
          fontWeight: "800",
        },
        ".title-l": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
        },
        ".title-s": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".subtitle-m": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
        },
        ".subtitle-s": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
        },
        ".subtitle-1": {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "700",
        },
        ".subtitle-2": {
          fontSize: "14px",
          lineHeight: "25.2px",
          fontWeight: "700",
        },
        ".subtitle-3": {
          fontSize: "12px",
          lineHeight: "21.6px",
          fontWeight: "700",
        },
        ".body-1": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".body-2": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".body-3": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
        },
        ".body-2-bold": {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: "700",
        },
        ".caption": {
          fontSize: "12px",
          lineHeight: "21.6px",
          fontWeight: "400",
        },
        ".caption-bold": {
          fontSize: "12px",
          lineHeight: "21.6px",
          fontWeight: "700",
          letterSpacing: "0.03%",
        },
        ".button-s-cta": {
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: "800",
        },
        ".button-s": {
          fontSize: "12px",
          lineHeight: "21.6px",
          fontWeight: "700",
        },
        ".button-m-cta": {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: "800",
        },
        ".button-m": {
          fontSize: "14px",
          lineHeight: "22.4px",
          fontWeight: "700",
        },
        ".caption2-400": {
          fontSize: "12px",
          lineHeight: "150%",
          fontWeight: "500",
        },
        ".display-1": {
          fontSize: "48px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".display-2": {
          fontSize: "40px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".display-3": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".hide-scroll-bar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and Opera
          },
        },
        ".toast-shadow": {
          boxShadow: "0px 12px 20px 0px #C4C4C440",
        },
      });
    }),
  ],
};
export default config;
