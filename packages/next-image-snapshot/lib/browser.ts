import { RenderedPage, closeAll } from "lib";
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

  /**
   * Creates an array of browsers. This method will close all browsers if an error occurs.
   */
  public static async all(
    server: NextTestServer,
    browsers: string[],
  ): Promise<Browser[]> {
    const built = await Promise.allSettled(
      browsers.map((browser) => Browser.create(server, browser)),
    );

    // This will close all browsers if an error occurs.
    if (built.some((result) => result.status === "rejected")) {
      await closeAll(built.map((result) => "value" in result && result.value));
    }

    // `await` above will make this code path unreachable if an error occurs.

    return built.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        throw result.reason;
      }
    });
  }

  public async load(pathname: string): Promise<RenderedPage> {
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
