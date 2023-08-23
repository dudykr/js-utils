import { describe, it, beforeEach, afterEach } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.ts";

describe("NextTestServer", () => {
  let server!: NextTestServer;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  describe("[Symbol.dispose]", () => {
    it("works with using", async () => {
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
