import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.js";
import "jest-expect-image";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { closeAll } from "../lib/index.js";
import chrome from "selenium-webdriver/chrome";

describe("NextTestServer", () => {
  let driver!: Awaited<ThenableWebDriver>;
  let server!: NextTestServer;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  beforeEach(async () => {
    const builder = new Builder().forBrowser("chrome");
    driver = await builder
      .setChromeOptions(new chrome.Options().headless())
      .build();
  });

  afterEach(async () => {
    await closeAll(driver, server);
  });

  describe("proof of concepts", () => {
    it("works", async () => {
      console.log(`Url: ${server.getUrl("/")}`);

      await driver.get(server.getUrl("/"));
      const image = await driver.takeScreenshot();

      expect(image).toMatchImageSnapshot();
    });
  });
});
