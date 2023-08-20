export class Tester {
  public async render() {}
}

/**
 * A next.js page in app/ directory
 */
export interface NextAppPage {}

/**
 * A next.js page in pages/ directory
 */
export interface NextNormalPage {}

export interface RenderedPage {}

export async function renderPage<P extends NextNormalPage>(
  page: () => Promise<P>,
) {
  await page();
}

export async function renderAppPage<P extends NextAppPage>(
  page: () => Promise<P>,
) {
  await page();
}
