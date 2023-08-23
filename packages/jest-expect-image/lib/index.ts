declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers {
      toMatchImageSnapshot: MatcherType<typeof toMatchImageSnapshot>;
    }
  }
}

export {};
