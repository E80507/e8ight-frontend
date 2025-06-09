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
        tablet: "600px",
        web: "1025px",
      },
      fontFamily: {
        gibson: ["var(--font-gibson)"],
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          alternative: "hsl(var(--primary-alternative))",
          strong: "hsl(var(--primary-strong))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          alternative: "hsl(var(--background-alternative))",
          natural: "hsl(var(--background-natural))",
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
        "label-normal": "hsl(var(--label-normal))",
        "label-natural": "hsl(var(--label-natural))",
        "label-assistive": "hsl(var(--label-assistive))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        black: "hsl(var(--black))",
        "black-1": "hsl(var(--black-1))",
        error: "hsl(var(--error))",
        "gray-strong": "hsl(var(--gray-strong))",
        "gray-700": "hsl(var(--gray-700))",
        "gray-40": "hsl(var(--gray-40))",
        "line-normal": "hsl(var(--line-normal))",
        "component-natural": "hsl(var(--component-natural))",
        "component-alternative": "hsl(var(--component-alternative))",
        "background-hero": "hsl(var(--background-hero))",
        "toast-bg": "hsl(var(--toast-bg))",
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
      boxShadow: {
        "custom-gray": "0px 4px 18px 0px #D6D6D6",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".gibson-h1-l": {
          fontSize: "48px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-h1-m": {
          fontSize: "40px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-h1-s": {
          fontSize: "24px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-heading-1": {
          fontSize: "36px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-1.5%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-heading-2": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-1.5%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-heading-3": {
          fontSize: "24px",
          lineHeight: "160%",
          fontWeight: "600",
          letterSpacing: "-1.5%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-body-1": {
          fontSize: "32px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-body-2": {
          fontSize: "24px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".gibson-body-3": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-gibson)",
        },
        ".pretendard-display-1": {
          fontSize: "48px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-display-2": {
          fontSize: "40px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-display-3": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-h1-l": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-1.5%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-h1-m": {
          fontSize: "24px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-h1-s": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-h1-r": {
          fontSize: "20px",
          lineHeight: "160%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-title-l": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-title-m": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-title-s": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "700",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-body-1": {
          fontSize: "20px",
          lineHeight: "200%",
          fontWeight: "300",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-body-2": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "300",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-body-3": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-subtitle-l": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "600",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-subtitle-m": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
        ".pretendard-subtitle-s": {
          fontSize: "14px",
          lineHeight: "150%",
          fontWeight: "600",
          letterSpacing: "-0.3%",
          fontFamily: "var(--font-pretendard)",
        },
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
        ".h2-r": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "500",
          letterSpacing: "-0.3%",
        },
        ".h2-s": {
          fontSize: "14px",
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
        },
        ".subtitle-l": {
          fontSize: "18px",
          lineHeight: "150%",
          fontWeight: "600",
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
        },
        ".body-2": {
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: "400",
          letterSpacing: "-0.3%",
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
          fontWeight: "800",
          letterSpacing: "-0.3%",
        },
        ".display-2": {
          fontSize: "40px",
          lineHeight: "160%",
          fontWeight: "800",
          letterSpacing: "-0.3%",
        },
        ".display-3": {
          fontSize: "32px",
          lineHeight: "160%",
          fontWeight: "800",
          letterSpacing: "-0.3%",
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
        ".post-form-container": {
          boxShadow: "10px 14px 30px 0px #8B8B8B40",
        },
      });
    }),
  ],
};
export default config;
