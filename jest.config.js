module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
};
