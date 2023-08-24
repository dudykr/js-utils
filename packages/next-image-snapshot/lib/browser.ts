import { RenderedPage, closeAll } from "./index.js";
import { NextTestServer } from "./next-server.js";
import { Builder, ThenableWebDriver } from "selenium-webdriver";

type Mapper<T> = (value: T) => T;

type BrowserOptions = {
  chrome?: Mapper<import("selenium-webdriver/chrome").Options>;
  firefox?: Mapper<import("selenium-webdriver/firefox").Options>;
  safari?: Mapper<import("selenium-webdriver/safari").Options>;

  ie?: import("selenium-webdriver/ie").Options;
  edge?: import("selenium-webdriver/edge").Options;
};

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
    options?: BrowserOptions,
  ): Promise<Browser> {
    const builder = new Builder().forBrowser(browser);

    if (options?.chrome) {
      builder.setChromeOptions(options.chrome(builder.getChromeOptions()));
    }
    if (options?.ie) {
      builder.setIeOptions(options.ie);
    }
    if (options?.edge) {
      builder.setEdgeOptions(options.edge);
    }
    if (options?.firefox) {
      builder.setFirefoxOptions(options.firefox(builder.getFirefoxOptions()));
    }
    if (options?.safari) {
      builder.setSafariOptions(options.safari(builder.getSafariOptions()));
    }

    const driver = await builder.build();

    return new Browser(server, driver);
  }

  /**
   * Creates an array of browsers. This method will close all browsers if an error occurs.
   */
  public static async all(
    server: NextTestServer,
    browsers: string[],
    options?: BrowserOptions,
  ): Promise<Browser[]> {
    const built = await Promise.allSettled(
      browsers.map((browser) => Browser.create(server, browser, options)),
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
