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
    it("works with using", () => {
      console.log(`Url: ${server.getUrl("/")}`);
    });
  });

  afterEach(async () => {
    await server.close();
  });
});
