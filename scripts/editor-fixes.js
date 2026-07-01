const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Mobile: text panel
  let context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  let page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(6000);
  try {
    await page.getByRole("button", { name: "Text", exact: false }).first().click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: "/agent/workspace/clickprint/scripts/fix-text-panel-mobile.png", type: "png" });
  } catch (e) { console.log("error:", e.message); }
  await context.close();

  // Desktop templates with upload button
  context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/fix-templates-upload.png", type: "png" });
  await context.close();

  await browser.close();
  console.log("Done.");
})();
