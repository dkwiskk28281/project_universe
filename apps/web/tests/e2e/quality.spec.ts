import { expect, test } from "@playwright/test";

const routes = ["/", "/diagnostic", "/lesson/ratio-gas-flow", "/practice", "/review", "/tutor", "/knowledge-map"];

for (const route of routes) {
  test(`route ${route} has no console errors or horizontal overflow`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return Math.max(0, root.scrollWidth - root.clientWidth);
    });

    expect(consoleErrors).toEqual([]);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
