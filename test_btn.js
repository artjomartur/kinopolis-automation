const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('file://' + __dirname + '/src/index.html', { waitUntil: 'networkidle2' });
    
    const btn = await page.$('.user-profile-btn');
    if (btn) {
        await btn.click();
        await new Promise(r => setTimeout(r, 1000));
        const classesAfter = await page.evaluate(() => document.body.className);
        console.log("Classes after click:", classesAfter);
    }
    
    await browser.close();
})();
