export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
