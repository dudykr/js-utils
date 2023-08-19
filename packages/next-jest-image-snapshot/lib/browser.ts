import { NextTestServer } from "./next-server";

/**
 * An instance of browser which is bound to a [NextTestServer]
 */
export class BrowserInstance {
  constructor(private readonly server: NextTestServer) {}
}
