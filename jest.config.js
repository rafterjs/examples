const reportDir = `${__dirname}/coverage`;

module.exports = {
  setupFiles: [],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['dist', 'node_modules'],
  modulePathIgnorePatterns: [],
  coverageDirectory: reportDir,
  roots: [
    '<rootDir>/examples/api',
  ],
};
