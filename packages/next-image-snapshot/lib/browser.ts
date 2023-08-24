import { RenderedPage, closeAll } from "./index.js";
import { NextTestServer } from "./next-server.js";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import safari from "selenium-webdriver/safari";
import ie from "selenium-webdriver/ie";
import edge from "selenium-webdriver/edge";

type Mapper<T> = (value: T) => T;

type BrowserOptions = {
  chrome?: Mapper<import("selenium-webdriver/chrome").Options>;
  firefox?: Mapper<import("selenium-webdriver/firefox").Options>;
  safari?: Mapper<import("selenium-webdriver/safari").Options>;

  ie?: Mapper<import("selenium-webdriver/ie").Options>;
  edge?: Mapper<import("selenium-webdriver/edge").Options>;
};

/**
 * An instance of browser which is bound to a [NextTestServer]
 */
export class Browser {
  constructor(
    private readonly server: NextTestServer,
    public readonly driver: Awaited<ThenableWebDriver>,
    public readonly name: string,
  ) {}

  public static async create(
    server: NextTestServer,
    browser: string,
    options?: BrowserOptions,
  ): Promise<Browser> {
    const builder = new Builder().forBrowser(browser);

    if (options?.chrome) {
      const opts = new chrome.Options();
      builder.setChromeOptions(options.chrome(opts));
    }
    if (options?.ie) {
      const opts = new ie.Options();
      builder.setIeOptions(options.ie(opts));
    }
    if (options?.edge) {
      const opts = new edge.Options();
      builder.setEdgeOptions(options.edge(opts));
    }
    if (options?.firefox) {
      const opts = new firefox.Options();
      builder.setFirefoxOptions(options.firefox(opts));
    }
    if (options?.safari) {
      const opts = new safari.Options();
      builder.setSafariOptions(options.safari(opts));
    }

    const driver = await builder.build();

    return new Browser(server, driver, browser);
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
