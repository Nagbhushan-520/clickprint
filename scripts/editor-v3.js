const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const shots = [
    { name: "v3-stickers", url: "/design", w: 1440, h: 900, openPanel: "Stickers" },
    { name: "v3-brand-kit", url: "/design", w: 1440, h: 900, openPanel: "Brand kit" },
    { name: "v3-background-image", url: "/design", w: 1440, h: 900, openPanel: "Background", clickAfter: 'text="Image"' },
  ];

  for (const shot of shots) {
    console.log(`Capturing ${shot.name}...`);
    const context = await browser.newContext({
      viewport: { width: shot.w, height: shot.h },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto(`http://localhost:3000${shot.url}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(4500);

    if (shot.openPanel) {
      try {
        await page.getByRole("button", { name: shot.openPanel, exact: false }).first().click({ timeout: 5000 });
        await page.waitForTimeout(1500);
      } catch (e) {}
    }
    if (shot.clickAfter) {
      try {
        await page.locator(shot.clickAfter).click({ timeout: 5000 });
        await page.waitForTimeout(800);
      } catch (e) {}
    }

    await page.screenshot({
      path: `/agent/workspace/clickprint/scripts/${shot.name}.png`,
      type: "png",
    });
    await context.close();
  }

  await browser.close();
  console.log("Done.");
})();
