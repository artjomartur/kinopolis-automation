const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

(async () => {
    console.log("Starting server...");
    const server = spawn('node', ['server.js'], { cwd: process.cwd(), stdio: 'pipe' });
    
    // Wait for server to start
    await new Promise(r => setTimeout(r, 2000));

    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // iPad Pro 11" Landscape
    await page.setViewport({ width: 1194, height: 834 });
    
    console.log("Opening app...");
    await page.goto('http://localhost:3001');

    // Bypass splash and login
    await page.evaluate(() => {
        localStorage.setItem('kp_guest_mode', 'true');
    });
    await page.reload();

    // Wait for splash screen to hide
    await new Promise(r => setTimeout(r, 3000));

    // Force hide splash screen just in case
    await page.evaluate(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) splash.style.display = 'none';
        
        const deptModal = document.getElementById('dept-modal');
        if (deptModal) deptModal.style.display = 'none';
        
        const onboarding = document.getElementById('oli-onboarding-modal');
        if (onboarding) onboarding.style.display = 'none';
    });

    const screenshots = [];
    const artifactsDir = path.join('/Users/artjombecker/.gemini/antigravity-ide/brain/5c0b8f17-59ff-4840-be45-675f65c51a2d', 'scratch');
    if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir, { recursive: true });

    const tabs = ['live', 'action', 'tasks', 'intern', 'stats'];
    
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        console.log(`Switching to tab: ${tab}`);
        await page.evaluate((t) => {
            if (window.switchTab) window.switchTab(t);
        }, tab);
        await new Promise(r => setTimeout(r, 1500)); // wait for animations
        
        const filename = path.join(artifactsDir, `screen_ipad_${tab}.png`);
        await page.screenshot({ path: filename });
        screenshots.push(filename);
        console.log(`Saved screenshot ${i+1}`);
    }

    console.log("Generating AppLaunchpad Slides...");
    const slidesConfig = [
        { title: "Kinopolis<br>Dashboard", subtitle: "Dein smarter Begleiter für den Kino-Alltag. Alles Wichtige an einem Ort.", oli: "Oli_1.png" },
        { title: "Theke &<br>Einlass", subtitle: "Verwalte Popcorn-Verkäufe, Becher-Rückgaben und Live-Checks mit einem Klick.", oli: "Oli_2.png" },
        { title: "Interne<br>Aufgaben", subtitle: "Nie wieder Zettelchaos. Digitale Checklisten und Tech-Tickets für dein Team.", oli: "Oli_3.png" },
        { title: "News &<br>Updates", subtitle: "Das interne Handover und alle wichtigen Ankündigungen auf einen Blick.", oli: "Oli_5.png" },
        { title: "Analysen &<br>Statistiken", subtitle: "Auslastungstrends und Performance-Metriken intelligent aufbereitet.", oli: "Oli_6.png" }
    ];

    const slidePage = await browser.newPage();
    await slidePage.setViewport({ width: 1920, height: 1080 });

    const generatedSlides = [];

    for (let i = 0; i < slidesConfig.length; i++) {
        const cfg = slidesConfig[i];
        const screenUrl = `file://${screenshots[i]}`;
        const oliUrl = `file://${path.join(process.cwd(), 'public', 'assets', cfg.oli)}`;
        
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;900&display=swap');
                body { margin: 0; overflow: hidden; font-family: 'Outfit', sans-serif; }
                .slide {
                    width: 1920px; height: 1080px; position: relative;
                    /* Match the dashboard dark theme */
                    background: radial-gradient(circle at 0% 0%, rgba(0, 120, 255, 0.15) 0%, #060608 50%, rgba(229, 9, 20, 0.15) 100%);
                    display: flex; align-items: center; justify-content: center;
                }
                .text-container {
                    position: absolute;
                    left: 100px;
                    top: 150px;
                    width: 800px;
                    color: white;
                    z-index: 10;
                }
                .title { font-size: 110px; font-weight: 900; line-height: 1.05; margin-bottom: 30px; letter-spacing: -2px; }
                .subtitle { font-size: 40px; color: rgba(255,255,255,0.7); line-height: 1.4; margin-bottom: 40px; font-weight: 500; }
                
                .ipad-mockup {
                    position: absolute;
                    right: -100px; /* Let it bleed off the edge slightly for style */
                    top: 250px;
                    width: 1100px;
                    height: 768px; /* iPad aspect ratio approx */
                    background: #111;
                    border-radius: 40px;
                    border: 18px solid #222;
                    box-shadow: -30px 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0, 120, 255, 0.1);
                    overflow: hidden;
                    z-index: 5;
                }
                .ipad-mockup img { width: 100%; height: 100%; object-fit: cover; object-position: top left; }
                
                .oli-img {
                    position: absolute;
                    right: 800px;
                    bottom: -30px;
                    height: 600px;
                    z-index: 20;
                    filter: drop-shadow(-20px 20px 40px rgba(0,0,0,0.6));
                }
            </style>
        </head>
        <body>
            <div class="slide">
                <div class="text-container">
                    <div class="title">${cfg.title}</div>
                    <div class="subtitle">${cfg.subtitle}</div>
                </div>
                <div class="ipad-mockup">
                    <img src="${screenUrl}" />
                </div>
                <img class="oli-img" src="${oliUrl}" />
            </div>
        </body>
        </html>
        `;

        await slidePage.setContent(html, { waitUntil: 'load' });
        
        // Ensure images are loaded
        await slidePage.evaluate(() => {
            return Promise.all(Array.from(document.images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => { img.onload = img.onerror = resolve; });
            }));
        });

        const slideFilename = path.join('/Users/artjombecker/.gemini/antigravity-ide/brain/5c0b8f17-59ff-4840-be45-675f65c51a2d', `slide_ipad_${i+1}.png`);
        await slidePage.screenshot({ path: slideFilename });
        generatedSlides.push(slideFilename);
        console.log(`Generated slide ${i+1}`);
    }

    await browser.close();
    server.kill();
    console.log("Done!");
    console.log("SLIDES:", generatedSlides.join(','));
})();
