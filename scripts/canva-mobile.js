const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Mobile editor home (with bottom nav)
  let context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  let page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(7000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/canva-mobile-home.png", type: "png" });

  // Open templates sheet
  try {
    await page.getByRole("button", { name: "Templates", exact: false }).first().click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "/agent/workspace/clickprint/scripts/canva-mobile-templates.png", type: "png" });
  } catch(e) { console.log("Could not open templates:", e.message); }

  await context.close();

  // Desktop view (should still work)
  context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  page = await context.newPage();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(`http://localhost:3000/design`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "/agent/workspace/clickprint/scripts/canva-mobile-desktop.png", type: "png" });
  await context.close();

  await browser.close();
  console.log("Done.");
})();
