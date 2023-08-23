import { describe, it, beforeAll, afterAll } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.ts";

describe("NextTestServer", () => {
  let server!: NextTestServer;

  beforeAll(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  afterAll(async () => {
    await server.close();
  });

  describe("[Symbol.dispose]", () => {
    it("works with using", () => {
      console.log(`Ur: ${server.getUrl("/")}`);
    });
  });
});
