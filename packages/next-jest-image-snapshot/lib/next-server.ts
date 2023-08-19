import { NextServer, NextServerOptions } from "next/dist/server/next";

export class NextTestServer {
  private constructor(private next: NextServer) {}

  public static async create(options: NextServerOptions) {
    const next = new NextServer(options);

    return new NextTestServer(next);
  }
}
