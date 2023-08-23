import { NextServerOptions } from "next/dist/server/next";
import { getRandomInt, spawnAsync } from "./util.ts";
import { ChildProcess } from "child_process";

export class NextTestServer {
  private constructor(
    private readonly next: ChildProcess,
    private readonly options: NextServerOptions,
  ) {}

  public static async create(options?: Exclude<NextServerOptions, "port">) {
    options = options ?? {};
    options.port = getRandomInt(3000, 4000);

    console.log(`Starting a next.js app at ${options.dir}`);

    const app = await spawnAsync(
      "node",
      ["node_modules/next/dist/bin/next", "dev", "-p", options.port.toString()],
      {
        stdio: "inherit",
        cwd: options.dir,
      },
    );

    const s = new NextTestServer(app as ChildProcess, options);

    console.log(`Next.js app is running at ${s.getUrl("/")}`);

    return s;
  }

  getUrl(pathname: string): string {
    return `http://${this.options.hostname ?? "localhost"}:${
      this.options.port
    }${pathname}`;
  }

  async [Symbol.asyncDispose]() {
    await this.close();
  }

  async close() {
    console.log(`Closing a next.js app at ${this.options.dir}`);
    this.next.kill();
  }
}
