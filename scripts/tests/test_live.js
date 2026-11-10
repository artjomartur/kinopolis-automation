const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('https://kinopolis.artjombecker.com', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(3000);
  
  const dashboardHtml = await page.evaluate(() => {
      const d = document.getElementById('dashboard');
      return d ? d.innerHTML : 'NULL';
  });
  console.log('--- DASHBOARD HTML ---');
  console.log(dashboardHtml.substring(0, 500));
  
  const headerHtml = await page.evaluate(() => {
      const d = document.querySelector('.dashboard-header');
      return d ? d.outerHTML : 'NULL';
  });
  console.log('--- HEADER HTML ---');
  console.log(headerHtml.substring(0, 500));
  
  const bannerHtml = await page.evaluate(() => {
      const d = document.querySelector('.ios-banner');
      return d ? d.outerHTML : 'NULL';
  });
  console.log('--- BANNER HTML ---');
  console.log(bannerHtml.substring(0, 500));
  
  await browser.close();
})();
