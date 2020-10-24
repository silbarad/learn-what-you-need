module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
  },
  testMatch: ['**/__tests__/unit/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,vue}', '!**/node_modules/**', '!**/__tests__/**'],
};
