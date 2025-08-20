import { test, expect, chromium } from "@playwright/test";

test("DetailConditions pixel-perfect (desktop baseline)", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
  });
  const page = await context.newPage();
  await page.goto("http://localhost:5173");
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot("baseline.png", {
    maxDiffPixelRatio: 0.001,
  });
  await browser.close();
});
