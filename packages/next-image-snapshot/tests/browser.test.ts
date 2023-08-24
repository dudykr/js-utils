import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.js";
import "jest-expect-image";
import { Browser } from "../lib/browser.js";
import { disposeAll } from "../lib/index.js";

describe("Browser", () => {
  let server!: NextTestServer;
  let browsers!: Browser[];

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
    browsers = await Browser.all(server, ["chrome", "firefox"]);
  });

  describe("proof of concepts", () => {
    it("works", async () => {
      for (const browser of browsers) {
        await browser.render("/");

        const screenshot = await browser.driver.takeScreenshot();

        expect(screenshot).toMatchSnapshot();
      }
    });
  });

  afterEach(async () => {
    await disposeAll(browsers, server);
  });
});
