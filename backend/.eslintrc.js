module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020, // understands let, const and other features
  },
  env: {
    commonjs: true, // add browser globals variables like document and window
    es6: true, // add globals like Set
    node: true,
  },
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
};
