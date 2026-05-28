const { chromium } = require("playwright");

async function scrollFullPage(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 400;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(180);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

(async () => {
  const browser = await chromium.launch();

  // First we need an order ID for the order detail page
  // Try to read from the orders file
  const fs = require("fs");
  let orderId = null;
  try {
    const data = JSON.parse(fs.readFileSync(".data/orders.json", "utf-8"));
    // Use the paid order
    const paid = data.orders.find((o) => o.status === "paid" || o.status === "in_production");
    orderId = paid?.id;
  } catch (e) {
    console.error("could not find orders file");
  }

  const shots = [
    { name: "upload-empty", url: "/upload", w: 1440, h: 900 },
    { name: "checkout-desktop", url: "/checkout?orderId=" + (orderId || ""), w: 1440, h: 900, full: true },
    { name: "checkout-mobile", url: "/checkout?orderId=" + (orderId || ""), w: 390, h: 844, full: true, mobile: true },
    { name: "order-confirm-desktop", url: "/order/" + (orderId || "DEMO"), w: 1440, h: 900, full: true },
    { name: "order-confirm-mobile", url: "/order/" + (orderId || "DEMO"), w: 390, h: 844, full: true, mobile: true },
    { name: "admin-desktop", url: "/admin", w: 1440, h: 900, full: true },
    { name: "refunds-desktop", url: "/refunds", w: 1440, h: 900 },
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
    await page.goto(`http://localhost:3000${shot.url}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);
    if (shot.full) {
      await scrollFullPage(page);
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
