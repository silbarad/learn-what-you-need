module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      // files: ['**/__tests__/unit/*.ts', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      files: ['**/__tests__/unit/*.ts'],
      env: {
        jest: true,
      },
    },
  ],
};
