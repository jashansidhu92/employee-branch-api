module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  roots: ["<rootDir>/test", "<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
