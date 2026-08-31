const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("🎨 Generating App Store slides with 3D-Peeking & Floating Glass Card design...");
    const browser = await chromium.launch({ headless: true });
    
    const artifactsDir = '/Users/artjombecker/.gemini/antigravity-ide/brain/63c7c8ad-e20f-482b-b148-10bd7b45d48d';
    const userUploadedDir = path.join(artifactsDir, '.user_uploaded');
    const publicAppstoreDir = path.join(process.cwd(), 'public', 'assets', 'appstore');
    if (!fs.existsSync(publicAppstoreDir)) fs.mkdirSync(publicAppstoreDir, { recursive: true });

    const slidesConfig = [
        {
            id: 'appstore_1_live',
            badge: 'ECHTZEIT SAAL-MONITOR',
            title: 'Säle & Vorstellungen<br><span style="color: #3b82f6;">live im Blick</span>',
            subtitle: 'Auslastung, Einlasszeiten und Restlaufzeiten für alle Kinosäle sekundengenau synchronisiert.',
            oli: 'Oli_4_bgless.png',
            screen: path.join(userUploadedDir, 'media_1788193365917.png'),
            accent: '#3b82f6',
            tipTitle: 'Live Saal-Radar',
            tipText: 'Saal 1 startet in 15 Min • 280 Plätze belegt',
            peekSide: 'right'
        },
        {
            id: 'appstore_2_funk',
            badge: 'DIGITALER FUNKRUF',
            title: 'Nachschub rufen<br><span style="color: #f59e0b;">per Fingertipp</span>',
            subtitle: 'Popcorn, Nachos, Getränke und Becher blitzschnell anfordern – diskret und ohne Funkrauschen.',
            oli: 'Oli_2_bgless.png',
            screen: path.join(userUploadedDir, 'media_1788193365950.png'),
            accent: '#f59e0b',
            tipTitle: 'Funk-Meldung',
            tipText: 'Nachschub Popcorn & Becher an Kasse 2 gesendet',
            peekSide: 'left'
        },
        {
            id: 'appstore_3_scanner',
            badge: 'SCHNELLER EINLASS',
            title: 'Ticket-Scanner<br><span style="color: #10b981;">direkt am Handy</span>',
            subtitle: 'QR-Codes scannen, Tickets entwerten und Saalzutritte im Handumdrehen prüfen.',
            oli: 'Oli_Security_bgless.png',
            screen: path.join(userUploadedDir, 'media_1788193365947.png'),
            accent: '#10b981',
            tipTitle: 'Einlasskontrolle',
            tipText: 'Ticket gültig • Saal 4 • Reihe 8 Platz 14',
            peekSide: 'right'
        },
        {
            id: 'appstore_4_action',
            badge: 'FSK & JUSCHG RECHNER',
            title: 'Ausweiskontrolle<br><span style="color: #ef4444;">in Sekunden</span>',
            subtitle: 'Rechtssichere Alters- und Stichtagsprüfung mit integriertem Kalender ohne Kopfrechnen.',
            oli: 'Oli_6_bgless.png',
            screen: path.join(userUploadedDir, 'media_1788193365941.png'),
            accent: '#ef4444',
            tipTitle: 'FSK & Jugendschutz',
            tipText: 'Stichtag 2008 geprüft • Ab 16 Jahren freigegeben',
            peekSide: 'left'
        },
        {
            id: 'appstore_5_mehr',
            badge: 'DIGITALE SCHICHTORGANISATION',
            title: 'Team & Aktionen<br><span style="color: #8b5cf6;">ohne Zettelchaos</span>',
            subtitle: 'Schicht-Zeiterfassung, Waren-Transfers, Reinigungschecks und Aufgaben übersichtlich vereint.',
            oli: 'Oli_5_bgless.png',
            screen: path.join(userUploadedDir, 'media_1788193365919.png'),
            accent: '#8b5cf6',
            tipTitle: 'Schichtleiter-Status',
            tipText: 'Plakatwechsel & Foyer-Checkliste abgeschlossen',
            peekSide: 'right'
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

    for (let i = 0; i < slidesConfig.length; i++) {
        const cfg = slidesConfig[i];
        console.log(`🖼️ Rendering Slide ${i + 1}/${slidesConfig.length}: ${cfg.badge}...`);

        const screenB64 = getBase64Image(cfg.screen);
        const oliB64 = getBase64Image(path.join(process.cwd(), 'public', 'assets', 'Oli', cfg.oli));

        const isRightPeek = cfg.peekSide === 'right';

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
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
                    top: -150px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1200px;
                    height: 900px;
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
                    top: 90px;
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
                    top: 185px;
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
                    margin-bottom: 22px;
                }

                .title {
                    font-size: 76px;
                    font-weight: 900;
                    line-height: 1.08;
                    letter-spacing: -0.03em;
                    margin-bottom: 20px;
                    color: #ffffff;
                }

                .subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: 30px;
                    color: #a1a1aa;
                    line-height: 1.45;
                    max-width: 960px;
                    margin: 0 auto;
                    font-weight: 400;
                }

                /* 3D Peeking Oli Mascot Behind Phone */
                .oli-peeking {
                    position: absolute;
                    top: 860px;
                    ${isRightPeek ? 'right: 120px;' : 'left: 120px;'}
                    width: 320px;
                    height: auto;
                    z-index: 4;
                    filter: drop-shadow(0 25px 40px rgba(0,0,0,0.85));
                    transform: ${isRightPeek ? 'rotate(12deg)' : 'rotate(-12deg)'};
                    pointer-events: none;
                }

                /* iPhone Frame Mockup */
                .device-wrapper {
                    position: absolute;
                    bottom: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 900px;
                    height: 1840px;
                    background: #18181b;
                    border-radius: 96px;
                    padding: 18px;
                    box-shadow: 
                        0 40px 100px rgba(0,0,0,0.95),
                        0 0 0 2px #3f3f46,
                        0 0 0 6px #18181b,
                        0 0 80px ${cfg.accent}30;
                    z-index: 8;
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
                    object-position: top center;
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

                /* Floating Glassmorphism Action Card */
                .floating-card {
                    position: absolute;
                    bottom: 120px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 860px;
                    background: rgba(18, 18, 24, 0.88);
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1.5px solid rgba(255, 255, 255, 0.15);
                    border-radius: 36px;
                    padding: 24px 32px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    box-shadow: 
                        0 30px 80px rgba(0,0,0,0.9),
                        0 0 40px ${cfg.accent}35,
                        inset 0 1px 0 rgba(255,255,255,0.2);
                    z-index: 25;
                }

                .avatar-wrap {
                    position: relative;
                    width: 90px;
                    height: 90px;
                    background: radial-gradient(circle, ${cfg.accent}40, rgba(255,255,255,0.05));
                    border: 1.5px solid ${cfg.accent}80;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 0 25px ${cfg.accent}50;
                }

                .avatar-wrap img {
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                }

                .card-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .card-header-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .card-title {
                    font-size: 26px;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.01em;
                }

                .pulse-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                    font-weight: 700;
                    color: ${cfg.accent};
                    background: ${cfg.accent}20;
                    padding: 6px 14px;
                    border-radius: 20px;
                    border: 1px solid ${cfg.accent}50;
                }

                .pulse-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: ${cfg.accent};
                    box-shadow: 0 0 10px ${cfg.accent};
                }

                .card-message {
                    font-family: 'Inter', sans-serif;
                    font-size: 23px;
                    font-weight: 500;
                    color: #e4e4e7;
                    line-height: 1.35;
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

            <!-- Peeking 3D Character -->
            <img class="oli-peeking" src="${oliB64}" alt="Oli Mascot">

            <div class="device-wrapper">
                <div class="dynamic-island"></div>
                <div class="device-screen">
                    <img src="${screenB64}" alt="${cfg.title}">
                </div>
            </div>

            <!-- Floating Glassmorphism Benefit Card -->
            <div class="floating-card">
                <div class="avatar-wrap">
                    <img src="${oliB64}" alt="Oli">
                </div>
                <div class="card-body">
                    <div class="card-header-row">
                        <div class="card-title">${cfg.tipTitle}</div>
                        <div class="pulse-badge">
                            <span class="pulse-dot"></span>
                            <span>AKTIV</span>
                        </div>
                    </div>
                    <div class="card-message">${cfg.tipText}</div>
                </div>
            </div>
        </body>
        </html>
        `;

        await slidePage.setContent(html, { waitUntil: 'networkidle' });
        await new Promise(r => setTimeout(r, 600));

        const outputPath = path.join(artifactsDir, `${cfg.id}.png`);
        await slidePage.screenshot({ path: outputPath, type: 'png' });
        
        // Also copy to public/assets/appstore
        fs.copyFileSync(outputPath, path.join(publicAppstoreDir, `${cfg.id}.png`));
        console.log(`✅ Saved & Copied: ${cfg.id}.png`);
    }

    console.log("🏁 All 5 App Store screenshots generated perfectly with 3D-Peeking & Floating Glass Card design!");
    await browser.close();
    process.exit(0);
})();
