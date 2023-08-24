/** @type import('jest').Config */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testTimeout: 90000,
};
