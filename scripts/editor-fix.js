const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Test 1: Editor with templates panel open — canvas must be visible
  let context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  let page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/fix-editor-panel-open.png", type: "png" });
  await context.close();

  // Test 2: Mobile editor — panel should overlay with backdrop, not consume canvas
  context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/fix-editor-mobile.png", type: "png" });
  await context.close();

  await browser.close();
  console.log("Done.");
})();
