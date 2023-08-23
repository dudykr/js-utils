import next, { NextServer, NextServerOptions } from "next/dist/server/next";
import { getRandomInt } from "./util";

export class NextTestServer {
  private constructor(private readonly next: NextServer) {}

  public static async create(options?: Exclude<NextServerOptions, "port">) {
    options = options ?? {};
    const app = next({
      ...options,
      conf: {
        productionBrowserSourceMaps: true,
        ...options.conf,
      },
      port: getRandomInt(10000, 65000),
      hostname: "localhost",
    });

    console.log(`Starting a next.js app at ${app.options.dir}`);

    // await app.prepare();

    return new NextTestServer(app);
  }

  getUrl(pathname: string): string {
    return `http://${this.next.hostname}:${this.next.port}${pathname}`;
  }

  async [Symbol.asyncDispose]() {
    await this.close();
  }

  async close() {
    console.log(`Closing a next.js app at ${this.next.options.dir}`);
    await this.next.close();
  }
}
