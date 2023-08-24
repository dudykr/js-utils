# next-image-snapshot

## Usage

Assuming you are using `jest`, you can use this package like

```ts
// This import will add `toMatchImageSnapshot` to the `expect` global, and will make IDE autocomplete work.
import "jest-expect-image";
import { Browsers, NextTestServer, closeAll } from "next-image-snapshot";

describe("User sign up page", () => {
  let server!: NextTestServer;
  let browsers!: Browsers;

  beforeEach(async () => {
    server = await NextTestServer.create({
      dir: "./examples/next-app",
      dev: true,
    });
    browsers = await Browsers.all(server, ["chrome", "firefox", "safari"], {
      common: {
        headless: true,
      },
    });
  });

  afterEach(async () => {
    await closeAll(browsers, server);
  });

  it("renders properly in all browsers", async () => {
    for (const browser of browsers) {
      await browser.load("/");

      const screenshot = await browser.driver.takeScreenshot();

      expect(screenshot).toMatchImageSnapshot(browser.name);
    }
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
