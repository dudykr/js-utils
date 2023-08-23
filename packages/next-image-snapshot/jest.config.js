module.exports = {
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
