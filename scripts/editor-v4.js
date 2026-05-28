const { chromium } = require("playwright");

async function scrollFullPage(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

(async () => {
  const browser = await chromium.launch();

  const shots = [
    { name: "v4-templates-page", url: "/templates", w: 1440, h: 900, full: true },
    { name: "v4-templates-mobile", url: "/templates", w: 390, h: 844, full: true, mobile: true },
    { name: "v4-editor-templates", url: "/design", w: 1440, h: 900, openPanel: "Templates" },
    { name: "v4-editor-photos", url: "/design", w: 1440, h: 900, openPanel: "Photos" },
    { name: "v4-editor-qrcode", url: "/design", w: 1440, h: 900, openPanel: "QR Code" },
  ];

  for (const shot of shots) {
    console.log(`Capturing ${shot.name}...`);
    const context = await browser.newContext({
      viewport: { width: shot.w, height: shot.h },
      deviceScaleFactor: 2,
      isMobile: !!shot.mobile,
      hasTouch: !!shot.mobile,
    });
    const page = await context.newPage();
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto(`http://localhost:3000${shot.url}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(4500);

    if (shot.full) {
      await scrollFullPage(page);
    }

    if (shot.openPanel) {
      try {
        await page.getByRole("button", { name: shot.openPanel, exact: false }).first().click({ timeout: 5000 });
        await page.waitForTimeout(2000);
      } catch (e) {}
    }

    await page.screenshot({
      path: `/agent/workspace/clickprint/scripts/${shot.name}.png`,
      fullPage: !!shot.full,
      type: "png",
    });
    await context.close();
  }

  await browser.close();
  console.log("Done.");
})();
