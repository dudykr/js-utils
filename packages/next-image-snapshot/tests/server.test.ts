import { describe, it, beforeAll } from "@jest/globals";
import { NextTestServer } from "../lib/next-server.ts";

describe("NextTestServer", () => {
  let server!: NextTestServer;

  beforeAll(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  describe("[Symbol.dispose]", () => {
    it("works with using", () => {
      console.log(`Ur: ${server.getUrl("/")}`);
    });
  });
});
