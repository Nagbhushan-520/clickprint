const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // /templates browse page
  let context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  let page = await context.newPage();
  await page.goto(`http://localhost:3000/templates`, { waitUntil: "networkidle", timeout: 60000 });
  // Give thumbnails 8 seconds to render (canvas rendering is slow)
  await page.waitForTimeout(8000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/thumb-templates-page.png", fullPage: false, type: "png" });
  await context.close();

  // Editor templates panel
  context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(7000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/thumb-editor.png", type: "png" });
  await context.close();

  await browser.close();
  console.log("Done.");
})();
