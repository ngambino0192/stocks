module.exports = {
  parser: "babel-eslint", // define babel as the parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:tailwind/recommended",
    "prettier",
  ],
  plugins: ["react", "emotion"],
  parserOptions: {
    ecmaVersion: 2020, // understands let, const and other features
    sourceType: "module", // understands the use of import and export
    ecmaFeatures: {
      jsx: true, // understands the use of tags inside js files
    },
  },
  env: {
    browser: true, // add browser globals variables like document and window
    es6: true, // add globals like Set
    node: true,
  },
  rules: {
    "no-console": "warning",
    "react/prop-types": "off",
    "tailwind/class-order": "off",
  },
};
