module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  coverageThreshold: {
      global: {
          function: 90,
          lines: 90,
          statements: 90,
          branches: 90
      }
  },
  testPathIgnorePatterns: ['./dist/*']
}