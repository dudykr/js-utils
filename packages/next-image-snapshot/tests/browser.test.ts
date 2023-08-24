import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.js";
import "jest-expect-image";
import { Browser } from "../lib/browser.js";
import { closeAll } from "../lib/index.js";

describe("Browser", () => {
  let server!: NextTestServer;
  let browsers!: Browser[];

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
    browsers = await Browser.all(server, ["chrome"]);
  });

  afterEach(async () => {
    await closeAll(browsers, server);
  });

  describe("proof of concepts", () => {
    it("works", async () => {
      for (const browser of browsers) {
        await browser.load("/");

        const screenshot = await browser.driver.takeScreenshot();

        expect(screenshot).toMatchImageSnapshot();
      }
    });
  });
});

describe("Browser.all()", () => {
  let server!: NextTestServer;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  afterEach(async () => {
    await closeAll(server);
  });

  describe("when a browser is not installed", () => {
    it("should throw an error", async () => {});

    it("should close other browsers", async () => {
      // TODO: Check browsers
      await Browser.all(server, ["chrome", "firefox"]);
    });
  });
});
