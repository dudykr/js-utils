/** @type import('jest').Config */
module.exports = {
  preset: "jest-puppeteer",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testTimeout: 90000,
};
