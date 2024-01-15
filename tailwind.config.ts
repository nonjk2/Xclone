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
    fontFamily: {
      twitterFontFamily:
        "font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;",
    },
    colors: {
      gubunsun: "rgb(239, 243, 244)",
      blackText: "rgb(15,20,25)",
      buttonBorderGray: "rgb(207, 217, 222)",
      white: "#ffffff",
      blue: "rgb(29, 155, 240)",
      red: "rgb(249, 24, 128)",
      hoverRed: "rgba(249, 24, 128 , 0.1)",
      green: "rgb(0, 186, 124)",
      hoverGreen: "rgba(0, 186, 124 , 0.1)",
      hoverBlue: "rgb(26, 140, 216)",
      hoverLightBlue: "rgba(29, 155, 240, 0.1)",
      hoverLightBlack: "rgba(15, 20, 25, 0.1)",
      hoverBlack: "rgb(39, 44, 48)",
      lightblack: "rgba(15, 20, 25, 0.1)",
      black: "rgb(15, 20, 25)",
      gray: "rgb(207, 217, 222)",
      inputColor: "rgb(83, 100, 113)",
      modalback: "rgba(82, 82, 82, 0.7)",
      hoverProfile: "rgb(247,249,249)",
      backgroundOpacity: "rgba(0,0,0,0)",
    },
  },

  plugins: [],
};
export default config;
