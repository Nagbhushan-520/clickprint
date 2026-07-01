const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  // Desktop editor
  let ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  let pg = await ctx.newPage();
  await pg.addInitScript(() => window.localStorage.clear());
  await pg.goto("http://localhost:3000/design", { waitUntil: "networkidle", timeout: 60000 });
  await pg.waitForTimeout(6000);
  await pg.screenshot({ path: "scripts/antonio-desktop.png" });
  // Open text tool
  try { await pg.getByText("Text", { exact: true }).first().click({ timeout: 4000 }); await pg.waitForTimeout(1500); await pg.screenshot({ path: "scripts/antonio-text.png" }); } catch(e){ console.log("text panel:", e.message); }
  await ctx.close();
  // Mobile editor
  ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  pg = await ctx.newPage();
  await pg.addInitScript(() => window.localStorage.clear());
  await pg.goto("http://localhost:3000/design", { waitUntil: "networkidle", timeout: 60000 });
  await pg.waitForTimeout(6000);
  await pg.screenshot({ path: "scripts/antonio-mobile.png" });
  await ctx.close();
  await b.close();
  console.log("done");
})();
