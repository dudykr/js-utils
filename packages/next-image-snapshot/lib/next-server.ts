import { NextServer, NextServerOptions } from "next/dist/server/next";
import { getRandomInt } from "./util";

export class NextTestServer {
  private constructor(private readonly next: NextServer) {}

  public static async create(options: Exclude<NextServerOptions, "port">) {
    const next = new NextServer({
      ...options,
      conf: {
        productionBrowserSourceMaps: true,
        ...options.conf,
      },
      port: getRandomInt(10000, 65000),
    });

    await next.prepare();

    return new NextTestServer(next);
  }

  getUrl(pathname: string): string {
    return `http://${this.next.hostname}:${this.next.port}${pathname}`;
  }
}
