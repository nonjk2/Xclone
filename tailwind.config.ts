import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      gubunsun: "rgb(239, 243, 244)",
      blackText: "rgb(15,20,25)",
      buttonBorderGray: "rgb(207, 217, 222)",
      white: "#ffffff",
      blue: "rgb(29, 155, 240)",
      hoverBlue: "rgb(26, 140, 216)",
      hoverLightBlue: "rgba(29, 155, 240, 0.1)",
      hoverLightBlack: "rgba(15, 20, 25, 0.1)",
      hoverBlack: "rgb(39, 44, 48)",
      lightblack: "rgba(15, 20, 25, 0.1)",
      black: "rgb(15, 20, 25)",
      gray: "rgb(207, 217, 222)",
      inputColor: "rgb(83, 100, 113)",
      modalback: "rgba(82, 82, 82, 0.7)",
      // primary: "#2DDAB0",
      // darkMint: "#00C092",
      // lightMint: "#ACECDC",
      // lightestMint: "#DEFFF7",
      // secondary: "#2752C2",
      // gray1: "#1F1F1F",
      // gray2: "#404040",
      // gray3: "#555555",
      // gray4: "#787878",
      // gray5: "#B8B8B8",
      // gray6: "#D9D9D9",
      // gray7: "#F2F2F2",
      // white: "#FFFFFF",
      // customYellows: "#FEE500",
    },
  },

  plugins: [],
};
export default config;
