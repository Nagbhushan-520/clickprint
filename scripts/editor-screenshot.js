const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const shots = [
    { name: "editor-default", url: "/design", w: 1440, h: 900 },
    { name: "editor-templates", url: "/design", w: 1440, h: 900, openPanel: "Templates" },
    { name: "editor-text", url: "/design", w: 1440, h: 900, openPanel: "Text" },
    { name: "editor-shapes", url: "/design", w: 1440, h: 900, openPanel: "Shapes" },
    { name: "editor-ai", url: "/design", w: 1440, h: 900, openPanel: "AI" },
    { name: "editor-mobile", url: "/design", w: 390, h: 844, mobile: true },
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
    await page.goto(`http://localhost:3000${shot.url}`, { waitUntil: "networkidle", timeout: 90000 });
    // Wait for editor to mount + canvas to render template
    await page.waitForTimeout(4000);

    if (shot.openPanel) {
      // Click the labelled toolbar button (matching the LeftToolbar button label)
      try {
        await page.getByRole("button", { name: shot.openPanel, exact: false }).first().click({ timeout: 5000 });
        await page.waitForTimeout(1500);
      } catch (e) {
        console.warn(`Could not open panel ${shot.openPanel}: ${e.message}`);
      }
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
