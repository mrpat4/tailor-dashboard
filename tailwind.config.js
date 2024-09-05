/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // fontFamily: {
    //   sans: ["SFProDisplay", "sans-serif"],
    // },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        hoverPrimary: "var(--color-hoverPrimary)",
        secondary: "var(--color-secondary)",
        hoverSecondary: "var(--color-hoverSecondary)",
        text: "var(--color-text)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        sidebar: "var(--color-sidebar)",
        mainSection: "var(--color-mainSection)",
        inputBg: "var(--color-inputBg)",
        tableHead: "var(--color-tableHead)",
        lightDark: "#464748",
        border: "var(--color-border)",
        mute: "var(--color-mute)",
      },
      backgroundImage: {},
      borderRadius: {
        "50%": "50%",
      },
      boxShadow: {},
      spacing: {
        17: "1.063rem",
        10.5: "0.656rem",
        102: "6.375rem",
        184: "11.5rem",
        158: "9.875rem",
        253: "15.813rem",
        171: "10.688rem",
      },
      maxWidth: {},
      minWidth: {},
      width: {
        smallMain: "calc(100% - 17rem)",
        bigMain: "calc(100% - 5rem)",
      },
      height: {
        heightMobileSidebar: "calc(100% - 3.7rem)",
      },
      fontSize: {
        18: "1.125rem",
        14: "0.875rem",
        h1: "3.563rem",
        h2: "1.875rem",
        h3: "1.2rem",
        p: "0.75rem",
        span: "1rem",
      },
    },
  },
  plugins: [],
};
