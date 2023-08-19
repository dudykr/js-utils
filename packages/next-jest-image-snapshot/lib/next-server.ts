import { NextServer, NextServerOptions } from "next/dist/server/next";
import { getRandomInt } from "./util";

export class NextTestServer {
  private constructor(private next: NextServer) {}

  public static async create(options: Exclude<NextServerOptions, "port">) {
    const next = new NextServer({
      ...options,
      port: getRandomInt(10000, 65000),
    });

    return new NextTestServer(next);
  }
}
