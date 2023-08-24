/** @type import('jest').Config */
module.exports = {
  testRegex: "/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testTimeout: 90000,
};
