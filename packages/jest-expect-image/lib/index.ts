function toMatchImageSnapshot() {}

type MatcherType<T> = T extends (
  instance: any,
  ...args: infer TArgs
) => infer TRet
  ? (...args: TArgs) => TRet
  : never;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers {
      toMatchImageSnapshot: MatcherType<typeof toMatchImageSnapshot>;
    }
  }
}

export {};
