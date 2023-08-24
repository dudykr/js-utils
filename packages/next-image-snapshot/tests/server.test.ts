import { describe, it, beforeEach, afterEach, expect } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.js";
import "jest-expect-image";

declare let page: any;

describe("NextTestServer", () => {
  let server!: NextTestServer;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  describe("proof of concepts", () => {
    it("works", async () => {
      console.log(`Url: ${server.getUrl("/")}`);

      await page.goto(server.getUrl("/"));
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot();
    });
  });

  afterEach(async () => {
    await server.close();
  });
});
