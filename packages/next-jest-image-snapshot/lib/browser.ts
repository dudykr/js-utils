import { NextTestServer } from "./next-server";
import { ThenableWebDriver } from "selenium-webdriver";

/**
 * An instance of browser which is bound to a [NextTestServer]
 */
export class BrowserInstance {
  constructor(
    private readonly server: NextTestServer,
    private readonly driver: Awaited<ThenableWebDriver>,
  ) {}
}
