import { RenderedPage } from "lib";
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

  public async render(pathname: string): Promise<RenderedPage> {
    console.log(`Rendering ${pathname}...`);

    await this.driver.get(this.server.getUrl(pathname));
  }
}
