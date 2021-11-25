module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 'off',
    'max-classes-per-file': 'off',
    'eslint-disable': 'off',
    'eslint-disable-line': 'off',
    'eslint-disable-next-line': 'off'
  },
};
