const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const shots = [
    { name: "v2-editor-default", url: "/design", w: 1440, h: 900 },
    { name: "v2-editor-shapes", url: "/design", w: 1440, h: 900, openPanel: "Shapes" },
    { name: "v2-editor-background-gradient", url: "/design", w: 1440, h: 900, openPanel: "Background", clickAfter: 'text="Gradient"' },
    { name: "v2-editor-layers", url: "/design", w: 1440, h: 900, openPanel: "Layers" },
  ];

  for (const shot of shots) {
    console.log(`Capturing ${shot.name}...`);
    const context = await browser.newContext({
      viewport: { width: shot.w, height: shot.h },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    // Clear localStorage so we start fresh each time
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto(`http://localhost:3000${shot.url}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(4500);

    if (shot.openPanel) {
      try {
        await page.getByRole("button", { name: shot.openPanel, exact: false }).first().click({ timeout: 5000 });
        await page.waitForTimeout(1200);
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
