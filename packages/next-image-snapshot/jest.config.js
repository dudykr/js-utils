/** @type import('jest').Config */
module.exports = {
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testTimeout: 90000,
};
