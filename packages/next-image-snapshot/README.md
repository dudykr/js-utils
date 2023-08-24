# next-image-snapshot

## Usage

```ts
describe("Browser", () => {
  let server!: NextTestServer;
  let browsers!: Browsers;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
    browsers = await Browsers.all(server, ["chrome"], {
      chrome: (options) => options.headless(),
      firefox: (options) => options.headless(),
    });
  });

  afterEach(async () => {
    await closeAll(browsers, server);
  });

  describe("proof of concepts", () => {
    it("works", async () => {
      for (const browser of browsers) {
        await browser.load("/");

        const screenshot = await browser.driver.takeScreenshot();

        expect(screenshot).toMatchImageSnapshot(browser.name);
      }
    });
  });
});

describe("Browsers.all()", () => {
  let server!: NextTestServer;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
  });

  afterEach(async () => {
    await closeAll(server);
  });

  describe("options.common", () => {
    let server!: NextTestServer;

    beforeEach(async () => {
      server = await NextTestServer.create({
        dir: "./examples/next-app",
        dev: true,
      });
    });

    afterEach(async () => {
      await closeAll(server);
    });

    describe("headless", () => {
      it("should propagate to all browsers", async () => {
        const browsers = await Browsers.all(server, ["chrome"], {
          common: {
            headless: true,
          },
        });

        try {
          for (const browser of browsers) {
            const cap = await browser.driver.getCapabilities();
            console.log(cap);
            // expect(cap.get("goog:chromeOptions").args).toContain("--headless");
          }
        } finally {
          await closeAll(browsers);
        }
      });
    });
  });

  describe("when a browser is not installed", () => {
    it("should throw an error", async () => {
      expect(
        Browsers.all(server, ["chrome", "unknown-browser"]),
      ).rejects.toBeInstanceOf(Error);
    });

    it("should close other browsers", async () => {
      // TODO: Check browsers
      try {
        await Browsers.all(server, ["chrome", "unknown-browser"]);
      } catch (e: unknown) {
        console.log(e);
      }
    });
  });
});
```

### TODO: `renderAppPage`

```ts
const page = await renderAppPage(() => import("./page.tsx"));
```

### TODO: `renderPage`

```ts
const page = await renderPage(() => import("./page.tsx"));
```
