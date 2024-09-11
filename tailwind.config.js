/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      pc: { min: "768px" },
      tablet: { min: "640px" },
    },
    extend: {
      colors: {
        lightPurple: "#F3F0F4",
        primary2: "#252728",
        primary1: "#FF6642",
        border: "#E4E0E5",
        graySuit: "#736A77",
        danger: "#FE2828",
        lightGreen: "#25D366",
        purple: "#4A3353",
        yellow: "#FEB528",
        graySuit: "#736A77",
        graySubHd: "#A69EAA",
        text1: "#344054",
        text2: "#101011",
        percent: "#FFCABE",
      },

      flex: {
        card: "0 0 210px",
      },

      opacity: {
        button: "0.9",
      },
      backgroundImage: {
        bg1: "url('/images/bg1.png')",
        bg2: "url('/images/bg2.png')",
        bg3: "url('/images/bg3.png')",
        bg4: "url('/images/bg4.png')",
        banner: "url('/svg/bg/banner.svg')",
        eBanner: "url('/images/eventsBanner.png')",
        sBanner: "url('/images/servicesBanner.png')"
      },
    },
  },
  plugins: [],
};
