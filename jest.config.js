const { pathsToModuleNameMapper } = require('ts-jest')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: true,
  // moduleNameMapper: {
  //   '^react-native$': 'react-native-web',
  //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  //   '^src/(.*)$': '<rootDir>/src/$1',
  //   '^assets/(.*)$': '<rootDir>/src/assets/$1',
  //   '^api/(.*)$': '<rootDir>/src/api/$1',
  //   '^components/(.*)$': '<rootDir>/src/components/$1',
  //   '^constants/(.*)$': '<rootDir>/src/constants/$1',
  //   '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
  //   '^types/(.*)$': '<rootDir>/src/types/$1',
  //   '^utils/(.*)$': '<rootDir>/src/utils/$1',
  //   '^enums/(.*)$': '<rootDir>/src/enums/$1',
  //   '^store/(.*)$': '<rootDir>/src/store/$1',
  //   '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
  // },
}
