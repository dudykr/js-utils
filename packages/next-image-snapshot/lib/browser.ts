import { RenderedPage } from "lib";
import { NextTestServer } from "./next-server";
import { Builder, ThenableWebDriver } from "selenium-webdriver";

/**
 * An instance of browser which is bound to a [NextTestServer]
 */
export class Browser {
  constructor(
    private readonly server: NextTestServer,
    public readonly driver: Awaited<ThenableWebDriver>,
  ) {}

  public static async create(
    server: NextTestServer,
    browser: string,
  ): Promise<Browser> {
    const driver = await new Builder().forBrowser(browser).build();

    return new Browser(server, driver);
  }

  public static async all(
    server: NextTestServer,
    browsers: string[],
  ): Promise<Browser[]> {
    return Promise.all(
      browsers.map((browser) => Browser.create(server, browser)),
    );
  }

  public async render(pathname: string): Promise<RenderedPage> {
    console.log(`Rendering ${pathname}...`);

    await this.driver.get(this.server.getUrl(pathname));

    return {};
  }

  public async [Symbol.asyncDispose]() {
    await this.driver.quit();
  }

  public async close() {
    await this.driver.quit();
  }
}
