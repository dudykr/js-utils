import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.js";
import "jest-expect-image";
import { Browsers } from "../lib/browser.js";
import { closeAll, renderPage } from "../lib/index.js";

describe("renderPage", () => {
  let server!: NextTestServer;
  let browsers!: Browsers;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
    browsers = await Browsers.all(server, ["chrome"], {
      common: {
        headless: true,
      },
    });
  });

  afterEach(async () => {
    await closeAll(browsers, server);
  });

  describe("api", () => {
    it("works", async () => {
      await renderPage(() => import("../examples/next-app/app/page.jsx"));

      for (const browser of browsers) {
        await browser.load("/");

        const screenshot = await browser.driver.takeScreenshot();

        expect(screenshot).toMatchImageSnapshot({
          comparisonMethod: "ssim",
          failureThreshold: 0.05,
          failureThresholdType: "percent",
          dumpDiffToConsole: true,
        });
      }
    });
  });
});
