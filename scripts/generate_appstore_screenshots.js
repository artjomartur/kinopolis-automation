const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

(async () => {
    console.log("🚀 Starting local server...");
    const server = spawn('node', ['server.js'], { cwd: process.cwd(), stdio: 'pipe' });
    
    // Wait for server to be ready
    await new Promise(r => setTimeout(r, 2000));

    console.log("📱 Launching Chromium for App Store screenshots...");
    const browser = await chromium.launch({ headless: true });
    
    const context = await browser.newContext({
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    const page = await context.newPage();
    
    // Artifacts directory
    const artifactsDir = '/Users/artjombecker/.gemini/antigravity-ide/brain/63c7c8ad-e20f-482b-b148-10bd7b45d48d';
    const scratchDir = path.join(artifactsDir, 'scratch');
    if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

    console.log("🌐 Navigating to app...");
    await page.goto('http://localhost:3001');

    // Bypass splash, login, modals
    await page.evaluate(() => {
        localStorage.setItem('kp_guest_mode', 'true');
        localStorage.setItem('ios_banner_dismissed', 'true');
        localStorage.setItem('oli_onboarding_done', 'true');
    });
    await page.reload();
    await new Promise(r => setTimeout(r, 2500));

    // Force hide any overlay modals
    await page.evaluate(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) splash.style.display = 'none';
        
        const deptModal = document.getElementById('dept-modal');
        if (deptModal) deptModal.style.display = 'none';
        
        const onboarding = document.getElementById('oli-onboarding-modal');
        if (onboarding) onboarding.style.display = 'none';

        const handover = document.getElementById('handover-modal');
        if (handover) handover.style.display = 'none';
    });

    const capturedScreens = {};

    // 1. Tab: Live Overview with Rich Mock Movie Sessions
    console.log("📸 Populating and Capturing Tab: Live...");
    await page.evaluate(() => {
        if (window.switchTab) {
            const btn = document.querySelector('.tab-btn[data-tab="live"]');
            window.switchTab('live', btn);
        }

        const now = new Date();
        const currentH = now.getHours();
        const t1 = `${String(currentH).padStart(2, '0')}:30`;
        const t2 = `${String((currentH + 1) % 24).padStart(2, '0')}:00`;
        const t3 = `${String((currentH + 1) % 24).padStart(2, '0')}:30`;
        const t4 = `${String((currentH + 2) % 24).padStart(2, '0')}:00`;

        const mockHalls = [
            {
                name: 'Kino 1 (Dolby Atmos)',
                sessions: [
                    {
                        title: 'Der Super Mario Galaxy Film',
                        time: t1,
                        duration: 110,
                        fsk: 'FSK 6',
                        version: '3D Atmos',
                        seats: { total: 450, occupied: 395, free: 55, occupancyRate: 88 },
                        poster: '/mario-poster.jpg'
                    }
                ]
            },
            {
                name: 'Kino 2 (Laser 4K)',
                sessions: [
                    {
                        title: 'Spider-Man: Beyond the Spider-Verse',
                        time: t2,
                        duration: 135,
                        fsk: 'FSK 12',
                        version: '2D D-Box',
                        seats: { total: 280, occupied: 218, free: 62, occupancyRate: 78 },
                        poster: '/assets/spiderman.jpg'
                    }
                ]
            },
            {
                name: 'Kino 3',
                sessions: [
                    {
                        title: 'Dune: Part Two',
                        time: t3,
                        duration: 166,
                        fsk: 'FSK 12',
                        version: '2D OV',
                        seats: { total: 190, occupied: 162, free: 28, occupancyRate: 85 },
                        poster: '/mario-poster.jpg'
                    }
                ]
            },
            {
                name: 'Kino 4',
                sessions: [
                    {
                        title: 'Deadpool & Wolverine',
                        time: t4,
                        duration: 127,
                        fsk: 'FSK 16',
                        version: '2D Dolby 7.1',
                        seats: { total: 150, occupied: 110, free: 40, occupancyRate: 73 },
                        poster: '/assets/spiderman.jpg'
                    }
                ]
            }
        ];

        if (typeof renderDashboard === 'function') {
            renderDashboard(mockHalls);
        }

        const occ = document.getElementById('live-occupancy');
        if (occ) occ.innerText = '885';
        const occWidget = document.getElementById('occupancy-widget');
        if (occWidget) occWidget.style.display = 'flex';
    });
    await new Promise(r => setTimeout(r, 1500));
    capturedScreens['live'] = path.join(scratchDir, 'screen_live.png');
    await page.screenshot({ path: capturedScreens['live'] });

    // 2. Tab: Funk (Digitaler Nachschub-Ruf) with Active Orders
    console.log("📸 Populating and Capturing Tab: Funk...");
    await page.evaluate(() => {
        if (window.switchTab) {
            const btn = document.querySelector('.tab-btn[data-tab="funk"]');
            window.switchTab('funk', btn);
        }
        if (window.toggleFunkGlobal) {
            window.toggleFunkGlobal('popcorn');
        }
        const popcornCount = document.getElementById('count-popcorn-gross');
        if (popcornCount) popcornCount.innerText = '2';
        const nachoCount = document.getElementById('count-nachos-kaese');
        if (nachoCount) nachoCount.innerText = '1';
    });
    await new Promise(r => setTimeout(r, 1200));
    capturedScreens['funk'] = path.join(scratchDir, 'screen_funk.png');
    await page.screenshot({ path: capturedScreens['funk'] });

    // 3. Tab: Scanner with Active Validated Ticket Overlay
    console.log("📸 Populating and Capturing Tab: Scanner...");
    await page.evaluate(() => {
        if (window.switchTab) {
            const btn = document.querySelector('.tab-btn[data-tab="scanner"]');
            window.switchTab('scanner', btn);
        }
        const qrContainer = document.getElementById('qr-reader');
        if (qrContainer) {
            qrContainer.innerHTML = `
                <div style="background: #000; padding: 2rem 1.5rem; text-align: center; border-radius: 12px; border: 1px solid #222228;">
                    <div style="position: relative; width: 220px; height: 220px; margin: 0 auto 1.5rem; border: 2px dashed #10b981; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: rgba(16,185,129,0.05);">
                        <span style="font-size: 3.5rem;">🎟️</span>
                        <div style="position: absolute; top: 10px; right: 10px; background: #10b981; color: black; font-weight: 800; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px;">SCAN AKTIV</div>
                    </div>
                    <div style="background: rgba(16,185,129,0.12); border: 1px solid #10b981; border-radius: 12px; padding: 1.25rem; text-align: left;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="color: #10b981; font-weight: 800; font-size: 1rem;">✅ TICKET GÜLTIG</span>
                            <span style="font-size: 0.8rem; color: #8e8e98;">Vor 2s</span>
                        </div>
                        <h3 style="margin: 0; font-size: 1.15rem; color: #fff;">Der Super Mario Galaxy Film</h3>
                        <p style="margin: 0.3rem 0 0; font-size: 0.9rem; color: #cbd5e1;">Kino 1 · Reihe 8 · Platz 14 (Parkett)</p>
                        <div style="margin-top: 0.75rem; font-size: 0.8rem; color: #8e8e98; display: flex; justify-content: space-between;">
                            <span>Vorstellung: 19:30 Uhr</span>
                            <span>Tarif: Normalzahler</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    await new Promise(r => setTimeout(r, 1200));
    capturedScreens['scanner'] = path.join(scratchDir, 'screen_scanner.png');
    await page.screenshot({ path: capturedScreens['scanner'] });

    // 4. Tab: Action (Team-Aktionen & FSK Rechner)
    console.log("📸 Populating and Capturing Tab: Action...");
    await page.evaluate(() => {
        if (window.switchTab) {
            const btn = document.querySelector('.tab-btn[data-tab="action"]');
            window.switchTab('action', btn);
        }
        const fskDate = document.getElementById('fsk-birthdate');
        if (fskDate) {
            const d = new Date();
            d.setFullYear(d.getFullYear() - 16);
            fskDate.value = d.toISOString().split('T')[0];
        }
        if (typeof calculateFSK === 'function') calculateFSK();
    });
    await new Promise(r => setTimeout(r, 1500));
    capturedScreens['action'] = path.join(scratchDir, 'screen_action.png');
    await page.screenshot({ path: capturedScreens['action'] });

    // 5. Tab: Mehr Infos (Die neue Mehr-Infos Ansicht)
    console.log("📸 Populating and Capturing Tab: Mehr Infos...");
    await page.evaluate(() => {
        if (window.switchTab) {
            const btn = document.querySelector('.tab-btn[data-tab="mehr"]');
            window.switchTab('mehr', btn);
        }
    });
    await new Promise(r => setTimeout(r, 1800));
    capturedScreens['mehr'] = path.join(scratchDir, 'screen_mehr.png');
    await page.screenshot({ path: capturedScreens['mehr'] });

    console.log("🎨 Designing and rendering App Store slides (1290 x 2796)...");

    const slidesConfig = [
        {
            id: 'appstore_1_live',
            badge: 'ECHTZEIT SAAL-MONITOR',
            title: 'Säle & Vorstellungen<br><span style="color: #3b82f6;">live im Blick</span>',
            subtitle: 'Auslastung, Einlasszeiten und Restlaufzeiten für alle Kinosäle sekundengenau synchronisiert.',
            oli: 'Oli_4_bgless.png',
            screen: capturedScreens['live'],
            accent: '#3b82f6'
        },
        {
            id: 'appstore_2_funk',
            badge: 'DIGITALER FUNKRUF',
            title: 'Nachschub rufen<br><span style="color: #f59e0b;">per Fingertipp</span>',
            subtitle: 'Popcorn, Nachos, Getränke und Becher blitzschnell anfordern – diskret und ohne Funkrauschen.',
            oli: 'Oli_2_bgless.png',
            screen: capturedScreens['funk'],
            accent: '#f59e0b'
        },
        {
            id: 'appstore_3_scanner',
            badge: 'SCHNELLER EINLASS',
            title: 'Ticket-Scanner<br><span style="color: #10b981;">direkt am Handy</span>',
            subtitle: 'QR-Codes scannen, Tickets entwerten und Saalzutritte im Handumdrehen prüfen.',
            oli: 'Oli_Security_bgless.png',
            screen: capturedScreens['scanner'],
            accent: '#10b981'
        },
        {
            id: 'appstore_4_action',
            badge: 'DIGITALE SCHICHTORGANISATION',
            title: 'Team-Aktionen &<br><span style="color: #ef4444;">Checklisten</span>',
            subtitle: 'FSK & JuSchG Rechner, MHD-Listen, Arbeitsplatz-Checks und Störungsmeldungen ohne Zettelchaos.',
            oli: 'Oli_5_bgless.png',
            screen: capturedScreens['action'],
            accent: '#ef4444'
        },
        {
            id: 'appstore_5_mehr',
            badge: 'FILME, KONTAKTE & INFOS',
            title: 'Mehr Infos &<br><span style="color: #8b5cf6;">Kino-Zentrale</span>',
            subtitle: 'Film-Highlights, Telefonliste, Statistiken und direkte Portal-Zugänge an einem zentralen Ort.',
            oli: 'Oli_Success_bgless.png',
            screen: capturedScreens['mehr'],
            accent: '#8b5cf6'
        }
    ];

    const slidePage = await browser.newPage({
        viewport: { width: 1290, height: 2796 },
        deviceScaleFactor: 1
    });

    const getBase64Image = (filePath) => {
        if (!fs.existsSync(filePath)) return '';
        const bitmap = fs.readFileSync(filePath);
        return 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64');
    };

    const logoB64 = getBase64Image(path.join(process.cwd(), 'new_logo.png'));

    const createdSlides = [];

    for (let i = 0; i < slidesConfig.length; i++) {
        const cfg = slidesConfig[i];
        console.log(`🖼️ Rendering Slide ${i + 1}/${slidesConfig.length}: ${cfg.badge}...`);

        const screenB64 = getBase64Image(cfg.screen);
        const oliB64 = getBase64Image(path.join(process.cwd(), 'public', 'assets', 'Oli', cfg.oli));

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    width: 1290px;
                    height: 2796px;
                    background: #000000;
                    color: #ffffff;
                    font-family: 'Outfit', sans-serif;
                    overflow: hidden;
                    position: relative;
                }

                /* Background lighting */
                .bg-glow {
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1200px;
                    height: 1000px;
                    background: radial-gradient(circle, ${cfg.accent}25 0%, transparent 65%);
                    filter: blur(120px);
                    pointer-events: none;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%);
                    -webkit-mask-image: radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%);
                    pointer-events: none;
                }

                /* Header Branding */
                .header-brand {
                    position: absolute;
                    top: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px 28px;
                    border-radius: 50px;
                    backdrop-filter: blur(20px);
                }
                .header-brand img {
                    height: 28px;
                    width: auto;
                }
                .header-brand span {
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: #e4e4e7;
                }

                /* Text Header */
                .text-section {
                    position: absolute;
                    top: 200px;
                    left: 80px;
                    right: 80px;
                    text-align: center;
                    z-index: 10;
                }

                .badge {
                    display: inline-block;
                    font-size: 24px;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: ${cfg.accent};
                    background: ${cfg.accent}15;
                    border: 1px solid ${cfg.accent}40;
                    padding: 10px 24px;
                    border-radius: 50px;
                    margin-bottom: 24px;
                }

                .title {
                    font-size: 78px;
                    font-weight: 900;
                    line-height: 1.08;
                    letter-spacing: -0.03em;
                    margin-bottom: 24px;
                    color: #ffffff;
                }

                .subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: 32px;
                    color: #a1a1aa;
                    line-height: 1.45;
                    max-width: 960px;
                    margin: 0 auto;
                    font-weight: 400;
                }

                /* iPhone Frame Mockup */
                .device-wrapper {
                    position: absolute;
                    bottom: -80px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 900px;
                    height: 1840px;
                    background: #18181b;
                    border-radius: 96px;
                    padding: 20px;
                    box-shadow: 
                        0 40px 100px rgba(0,0,0,0.9),
                        0 0 0 2px #3f3f46,
                        0 0 0 6px #18181b,
                        0 0 60px ${cfg.accent}20;
                    z-index: 5;
                }

                .device-screen {
                    width: 100%;
                    height: 100%;
                    border-radius: 80px;
                    overflow: hidden;
                    background: #000000;
                    position: relative;
                    border: 1px solid #27272a;
                }

                .device-screen img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }

                /* Dynamic Island */
                .dynamic-island {
                    position: absolute;
                    top: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 210px;
                    height: 52px;
                    background: #000000;
                    border-radius: 30px;
                    z-index: 20;
                    border: 1px solid rgba(255,255,255,0.08);
                }

                /* Oli Character */
                .oli-character {
                    position: absolute;
                    bottom: 40px;
                    right: 40px;
                    width: 440px;
                    height: auto;
                    z-index: 15;
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
                    pointer-events: none;
                }
            </style>
        </head>
        <body>
            <div class="bg-glow"></div>
            <div class="bg-grid"></div>

            <div class="header-brand">
                <img src="${logoB64}" alt="Kinopolis Logo">
                <span>Kinopolis Operations</span>
            </div>

            <div class="text-section">
                <div class="badge">${cfg.badge}</div>
                <h1 class="title">${cfg.title}</h1>
                <p class="subtitle">${cfg.subtitle}</p>
            </div>

            <div class="device-wrapper">
                <div class="dynamic-island"></div>
                <div class="device-screen">
                    <img src="${screenB64}" alt="${cfg.title}">
                </div>
            </div>

            <img class="oli-character" src="${oliB64}" alt="Oli Mascot">
        </body>
        </html>
        `;

        await slidePage.setContent(html, { waitUntil: 'networkidle' });
        await new Promise(r => setTimeout(r, 600));

        const outputPath = path.join(artifactsDir, `${cfg.id}.png`);
        await slidePage.screenshot({ path: outputPath, type: 'png' });
        createdSlides.push(outputPath);
        console.log(`✅ Saved: ${outputPath}`);
    }

    console.log("🏁 All 5 App Store screenshots generated successfully with vibrant realistic app screens!");

    await browser.close();
    server.kill();
    process.exit(0);
})();
