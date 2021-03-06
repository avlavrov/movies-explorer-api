module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
  ],
  plugins: [
    'react',
  ],

  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
