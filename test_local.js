const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, // iPhone viewport
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  
  await page.goto('http://localhost:5002');
  
  // Wait for the dashboard to render
  await page.waitForSelector('.hall-card', { timeout: 10000 });
  await page.waitForTimeout(2000); // give it a moment to render animations
  
  await page.screenshot({ path: '/Users/artjombecker/.gemini/antigravity-ide/brain/613edf2b-81a7-43cd-bb9d-52b8db12fd7b/ios_layout_screenshot.png' });
  
  console.log("Screenshot saved!");
  await browser.close();
})();
