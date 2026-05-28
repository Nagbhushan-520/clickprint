const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // 1) Editor with bleed/safe area visible
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(5500);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/print-bleed-safe.png", type: "png" });
  await context.close();

  await browser.close();
  console.log("Done.");
})();
